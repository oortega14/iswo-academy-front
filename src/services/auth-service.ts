import axios from 'axios';
import { useUIStore } from '@/stores/ui-store';
import api from '../lib/axiosConfig';

export interface LoginCredentials {
  user: {
    email: string;
    password: string;
  }
}

export interface RegisterData {
  user: {
    email: string;
    user_detail_attributes: {
      first_name: string;
      last_name: string;
    };
  };
}

const ApiURL = useUIStore.getState().ApiURL;
export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post(`${ApiURL}/users/sign_in`, 
      credentials);
    return response.data;
  },

  register: async (userData: RegisterData) => {
    const response = await api.post(`${ApiURL}/users`, userData);
    return response.data;
  },

  logout: async () => {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('refreshToken');
    const response = await api.post(`${ApiURL}/users/sign_out`, {}, {
      withCredentials: true
    });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get(`${ApiURL}/users/me`, {
      withCredentials: true
    });
    return response.data;
  },

  confirmEmail: async (token: string) => {
    const response = await api.post(
      `${ApiURL}/users/confirmation`, 
      { confirmation_token: token },
      { withCredentials: true }
    );
    return response.data;
  },

  refresh: async (refreshToken: string) => {
    const response = await api.post(`${ApiURL}/users/refresh`, {
      refresh_token: refreshToken,
    }, {
      withCredentials: true
    });
    return response.data;
  },

  setAuthHeader: (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  removeAuthHeader: () => {
    delete api.defaults.headers.common['Authorization'];
  }
}; 