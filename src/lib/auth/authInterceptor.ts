import axios from 'axios';
import { authService } from '@/services/auth-service'
import { useUIStore } from '@/stores/ui-store';

const ApiURL = useUIStore.getState().ApiURL;
let currentAccessToken: string | null = null;
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeToTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      return null;
    }
    
    const response = await axios.post(`${ApiURL}/users/refresh`, { 
      refresh_token: refreshToken 
    });
    
    const newAccessToken = response.data.access_token;
    const newRefreshToken = response.data.refresh_token;
    
    currentAccessToken = newAccessToken;
    localStorage.setItem('refreshToken', newRefreshToken);
    
    authService.setAuthHeader(newAccessToken);
    
    return newAccessToken;
  } catch (error) {
    localStorage.removeItem('refreshToken');
    currentAccessToken = null;
    return null;
  }
};

export const initAuth = async (): Promise<boolean> => {
  const savedRefreshToken = localStorage.getItem('refreshToken');
  
  if (savedRefreshToken) {
    try {
      const newAccessToken = await refreshAccessToken();
      
      if (newAccessToken) {
        currentAccessToken = newAccessToken;
        return true; 
      }
    } catch (error) {
      localStorage.removeItem('refreshToken');
    }
  }
  return false; 
};

export const setupInterceptors = () => {
  axios.interceptors.request.clear();
  axios.interceptors.response.clear();
  
  axios.interceptors.request.use(config => {
    if (currentAccessToken) {
      config.headers.Authorization = `Bearer ${currentAccessToken}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(resolve => {
            subscribeToTokenRefresh(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axios(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refreshAccessToken();
          
          if (newToken) {
            onTokenRefreshed(newToken);
            
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
          } else {
            window.location.href = '/login';
            return Promise.reject(error);
          }
        } catch (refreshError) {
          window.location.href = '/login';
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      
      return Promise.reject(error);
    }
  );
}; 