import App from './App';
import './App.css';
import { AppRouter } from './AppRouter';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from './hooks/useAuth';
import { Toaster } from 'sonner';
import LoadingModal from './components/ui/Modal/LoadingModal';
import { useUserStore } from './stores/user-store';
function AppProvider() {
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);
  const auth = useAuth();
  const refreshAttemptedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        if (refreshAttemptedRef.current) {
          setLoading(false);
          return;
        }

        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          setLoading(false);
          return;
        }

        refreshAttemptedRef.current = true;
        await auth.fetchUser();
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
  }, []);

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
