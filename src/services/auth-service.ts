import axios from 'axios';
import { useUIStore } from '@/stores/ui-store';
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  password_confirmation: string;
}

const ApiURL = useUIStore.getState().ApiURL;
export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await axios.post(`${ApiURL}/login`, credentials);
    return response.data;
  },

  register: async (userData: RegisterData) => {
    const response = await axios.post(`${ApiURL}/register`, userData);
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(`${ApiURL}/logout`, {}, {
      withCredentials: true
    });
    return response.data;
  },

  getMe: async () => {
    const response = await axios.get(`${ApiURL}/me`, {
      withCredentials: true
    });
    return response.data;
  },

  setAuthHeader: (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  removeAuthHeader: () => {
    delete axios.defaults.headers.common['Authorization'];
  }
}; 