import App from './App';
import './App.css';
import { AppRouter } from './AppRouter';
import { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';

function AppProvider() {
  const { fetchUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await fetchUser();
      setLoading(false);
    };

    initializeAuth();
  }, []);

  if (loading) {
    return (
      <div className='loading-container'>
        <div className='loading-spinner'></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <>
      <App>
        <AppRouter />
      </App>
    </>
  );
}

export default AppProvider;
