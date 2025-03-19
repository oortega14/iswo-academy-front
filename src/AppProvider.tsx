import App from './App';
import './App.css';
import { AppRouter } from './AppRouter';
import { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { Toaster } from 'sonner';
import axios from 'axios';
import LoadingModal from './components/ui/Modal/LoadingModal';

function AppProvider() {
  const { fetchUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const { setupInterceptors, initAuth } = await import(
        './lib/auth/authInterceptor'
      );

      setupInterceptors();

      const isAuthenticated = await initAuth();

      if (isAuthenticated) {
        await fetchUser();
      }

      setLoading(false);
    };

    initializeAuth();
  }, [fetchUser]);

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <>
      <App>
        <AppRouter />
      </App>
      <Toaster theme='system' position='top-right' richColors />
    </>
  );
}

export default AppProvider;
