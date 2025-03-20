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
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          setLoading(false);
          return;
        }

        await fetchUser();
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
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
