import axios from 'axios';
import { useAuthStore } from '@/stores/auth-store';
import { useUserStore } from '@/stores/user-store';

const ApiURL = import.meta.env.VITE_API_URL;


const api = axios.create({
  baseURL: ApiURL,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { setUser } = useUserStore();
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry && 
        !originalRequest.url?.includes('refresh')) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(`${ApiURL}/users/refresh`, { refresh_token: refreshToken });
        
        const { access_token, user } = response.data;
        useAuthStore.getState().setAccessToken(access_token);
        setUser(user);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().setAccessToken(null);
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;