import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  ProtectedRoute,
  PublicOnlyRoute,
} from './components/routes/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { RoutesWithNotFound } from './components/routes/RoutesWithNotFound';
import { Home } from './pages/Home';
import MainLayout from './layouts/MainLayout';
import LoginLayout from './layouts/LoginLayout';
import LoginContainer from './components/auth/LoginContainer';
import RegisterContainer from './components/auth/RegisterContainer';
import UserEmailStep from './components/auth/UserEmailStep';
import UserEmailConfirmation from './components/auth/UserEmailConfirmation';
import CompleteProfileLayout from './layouts/CompleteProfileLayout';
import PersonalInfoStep from './components/complete-profile/PersonalInfoStep';
import UpdatePasswordStep from './components/complete-profile/UpdatePasswordStep';

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
              <LoginLayout>
                <LoginContainer />
              </LoginLayout>
            </PublicOnlyRoute>
          }
        />

        <Route
          path='/register'
          element={
            <PublicOnlyRoute>
              <LoginLayout>
                <RegisterContainer />
              </LoginLayout>
            </PublicOnlyRoute>
          }
        />

        <Route
          path='/user/email-step'
          element={
            <PublicOnlyRoute>
              <LoginLayout>
                <UserEmailStep />
              </LoginLayout>
            </PublicOnlyRoute>
          }
        />

        <Route
          path='/user/email-confirmation'
          element={
            <PublicOnlyRoute>
              <LoginLayout>
                <UserEmailConfirmation />
              </LoginLayout>
            </PublicOnlyRoute>
          }
        />

        {/* Rutas protegidas (requieren estar loggeado) */}
        <Route
          path='/user/complete-profile/personal-info'
          element={
            <ProtectedRoute>
              <CompleteProfileLayout>
                <PersonalInfoStep currentStep={'personal_info_step'} setCurrentStep={() => {}} />
              </CompleteProfileLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path='/user/complete-profile/update-password'
          element={
            <ProtectedRoute>
              <CompleteProfileLayout>
                <UpdatePasswordStep currentStep={'update_password_step'} setCurrentStep={() => {}} />
              </CompleteProfileLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path='/choose-academy'
          element={
            <ProtectedRoute>
              <div>
                Escoger academia (requiere login) - Bienvenido,{' '}
                {user?.user_detail.first_name || 'Usuario'}
              </div>
            </ProtectedRoute>
          }
        />

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
