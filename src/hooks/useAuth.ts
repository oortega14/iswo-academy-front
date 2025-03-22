import { useUserStore } from '@/stores/user-store';
import { User } from '@/models/user-model';
import { authService, LoginCredentials, RegisterData } from '@/services/auth-service';
import { useAuthStore } from '@/stores/auth-store';

export const useAuth = () => {
  const { user, setUser, clearUser } = useUserStore();

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      const { user, access_token, refresh_token } = response;
      localStorage.setItem('refreshToken', refresh_token);
      useAuthStore.getState().setAccessToken(access_token);
      authService.setAuthHeader(access_token);
      setUser(user);
      return response;
    } catch (error) {
      console.error('Error al procesar la respuesta:', error);
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
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) return null;
      const response = await authService.refresh(refreshToken);
      const { access_token, user } = response;
      
      // Asegúrate de que la actualización del estado sea de forma sincrónica
      useAuthStore.getState().setAccessToken(access_token);
      useUserStore.getState().setUser(user); // Asegúrate de usar el método correcto
      
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      clearUser(null);
      localStorage.removeItem('refreshToken');
      useAuthStore.getState().setAccessToken(null);
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