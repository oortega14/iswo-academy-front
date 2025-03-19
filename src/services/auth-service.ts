import axios from 'axios';
import { useUIStore } from '@/stores/ui-store';

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
    const response = await axios.post(`${ApiURL}/users/sign_in`, 
      credentials);
    return response.data;
  },

  register: async (userData: RegisterData) => {
    const response = await axios.post(`${ApiURL}/users`, userData);
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(`${ApiURL}/users/sign_out`, {}, {
      withCredentials: true
    });
    return response.data;
  },

  getMe: async () => {
    const response = await axios.get(`${ApiURL}/users/me`, {
      withCredentials: true
    });
    return response.data;
  },

  confirmEmail: async (token: string) => {
    const response = await axios.post(
      `${ApiURL}/users/confirmation`, 
      { confirmation_token: token },
      { withCredentials: true }
    );
    return response.data;
  },

  setAuthHeader: (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  removeAuthHeader: () => {
    delete axios.defaults.headers.common['Authorization'];
  }
}; 