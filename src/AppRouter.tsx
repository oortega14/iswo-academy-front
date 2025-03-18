import { BrowserRouter,  Route } from 'react-router-dom'
import { RoutesWithNotFound } from './components/routes/RoutesWithNotFound'
import { Home } from './pages/Home'
import MainLayout from './layouts/MainLayout'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        {/* 🌟 Rutas públicas */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        
        {/* 🌟 Rutas con layouts específicos 
        <Route path="/video/:videoId" element={<VideoLayout><VideoPlayer /></VideoLayout>} />
        <Route path="/academies/:academyId/courses" element={<MainLayout><Courses /></MainLayout>} />

        {/* 🔒 Rutas privadas 
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        </Route>

        {/* 🔒 Rutas solo para admin 
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<DashboardLayout><div>Admin Panel</div></DashboardLayout>} />
        </Route>
        */}
      </RoutesWithNotFound >
    </BrowserRouter>
  )
}