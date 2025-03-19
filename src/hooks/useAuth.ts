import { useUserStore } from '@/stores/user-store';
import { User } from '@/models/user-model';
import { authService, LoginCredentials, RegisterData } from '@/services/auth-service';

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const useAuth = () => {
  const { user, setUser, clearUser } = useUserStore();

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);    
      const { access_token, refresh_token } = response;
      localStorage.setItem('refreshToken', refresh_token)
      authService.setAuthHeader(access_token);
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Intentar hacer logout en el servidor
      await authService.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Siempre limpiar datos locales, incluso si falla la petición
      document.cookie = 'jwt=; path=/; max-age=0';
      authService.removeAuthHeader();
      clearUser(null);
    }
  };

  const fetchUser = async (): Promise<User | null> => {
    try {
      const token = getCookie('jwt');
      if (!token) {
        clearUser(null);
        return null;
      }

      authService.setAuthHeader(token);
      
      const userData = await authService.getMe();
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error fetching user:', error);
      clearUser(null);
      return null;
    }
  };

  const isAuthenticated = (): boolean => {
    if (user) return true;
    const refreshToken = localStorage.getItem('refreshToken');
    return !!refreshToken;
  };

  const confirmEmail = async (token: string) => {
    try {
      const response = await authService.confirmEmail(token);
      return response;
    } catch (error) {
      console.error('Error during email confirmation:', error);
      throw error;
    }
  };

  return {
    user,
    login,
    register,
    logout,
    fetchUser,
    isAuthenticated,
    confirmEmail,
  };
}; 