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
      const { token } = response;
      
      document.cookie = `jwt=${token}; path=/; max-age=86400`;
      
      authService.setAuthHeader(token);
      
      await fetchUser();
      
      return response;
    } catch (error) {
      console.error('Error during login:', error);
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
    // Verificamos si hay un usuario en el store y también un token en las cookies
    const token = getCookie('jwt');
    return user !== null && token !== null;
  };

  return {
    user,
    login,
    register,
    logout,
    fetchUser,
    isAuthenticated,
  };
}; 