import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { RoutesWithNotFound } from './components/routes/RoutesWithNotFound';
import { Home } from './pages/Home';
import MainLayout from './layouts/MainLayout';

export const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Router>
      <RoutesWithNotFound>
        {/* Rutas públicas (accesibles sin estar loggeado) */}
        <Route
          path='/'
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Rutas sólo para usuarios no autenticados */}
        <Route
          path='/login'
          element={
            <PublicOnlyRoute>
              <div>Página de login (no accesible si ya estás loggeado)</div>
            </PublicOnlyRoute>
          }
        />

        <Route
          path='/register'
          element={
            <PublicOnlyRoute>
              <div>Página de registro (no accesible si ya estás loggeado)</div>
            </PublicOnlyRoute>
          }
        />

        {/* Rutas protegidas (requieren estar loggeado) */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <div>
                Dashboard (requiere login) - Bienvenido,{' '}
                {user?.user_detail.first_name || 'Usuario'}
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <div>Perfil de usuario (requiere login)</div>
            </ProtectedRoute>
          }
        />

        {/* Ruta para cuando no se encuentra la página */}
        <Route path='*' element={<div>Página no encontrada (404)</div>} />
      </RoutesWithNotFound>
    </Router>
  );
};
