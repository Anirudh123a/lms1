import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

// Auth Components
import Login from '../pages/auth/Login';

// Layouts / Dashboards
import SuperAdminDashboard from '../pages/dashboards/SuperAdminDashboard';
import AdminDashboard from '../pages/dashboards/AdminDashboard';
import VendorDashboard from '../pages/dashboards/VendorDashboard';
import OrganizationDashboard from '../pages/dashboards/OrganizationDashboard'; // College Role
import MentorLayout from '../pages/dashboards/Mentor/MentorLayout';
import StudentDashboard from '../pages/dashboards/Student/Dashboard/StudentDashboard';

// Protected Route Component matching exact MySQL ENUM values
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Ensure uppercase comparison matching database schema layout constraints
  const userRole = user.role?.toUpperCase();
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect cleanly to their respective homes if they hit the wrong endpoint
    const homeRoutes = {
      'SUPER_ADMIN': '/dashboard/super-admin',
      'ADMIN': '/dashboard/admin',
      'VENDOR': '/dashboard/vendor',
      'COLLEGE': '/dashboard/college',
      'MENTOR': '/mentor',
      'STUDENT': '/student'
    };
    return <Navigate to={homeRoutes[userRole] || '/auth/login'} replace />;
  }

  return children;
};

export default function AppRoutes() {
  const { user } = useAuth();
  const userRole = user?.role?.toUpperCase();

  return (
    <Routes>
      {/* Root Path Direct Redirection Filter */}
      <Route path="/" element={
        !user ? <Navigate to="/auth/login" replace /> : (
          userRole === 'SUPER_ADMIN' ? <Navigate to="/dashboard/super-admin" replace /> :
          userRole === 'ADMIN' ? <Navigate to="/dashboard/admin" replace /> :
          userRole === 'VENDOR' ? <Navigate to="/dashboard/vendor" replace /> :
          userRole === 'COLLEGE' ? <Navigate to="/dashboard/college" replace /> :
          userRole === 'MENTOR' ? <Navigate to="/mentor" replace /> :
          userRole === 'STUDENT' ? <Navigate to="/student" replace /> : <Navigate to="/auth/login" replace />
        )
      } />

      {/* Auth Public View */}
      <Route path="/auth/login" element={
        user ? (
          userRole === 'SUPER_ADMIN' ? <Navigate to="/dashboard/super-admin" replace /> :
          userRole === 'ADMIN' ? <Navigate to="/dashboard/admin" replace /> :
          userRole === 'VENDOR' ? <Navigate to="/dashboard/vendor" replace /> :
          userRole === 'COLLEGE' ? <Navigate to="/dashboard/college" replace /> :
          userRole === 'MENTOR' ? <Navigate to="/mentor" replace /> :
          userRole === 'STUDENT' ? <Navigate to="/student" replace /> : <Login />
        ) : <Login />
      } />

      {/* SUPER ADMIN Protected Dashboard Matrix */}
      <Route path="/dashboard/super-admin/*" element={
        <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
          <SuperAdminDashboard />
        </ProtectedRoute>
      } />

      {/* ADMIN Protected Dashboard Matrix */}
      <Route path="/dashboard/admin/*" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* VENDOR Protected Dashboard Matrix */}
      <Route path="/dashboard/vendor/*" element={
        <ProtectedRoute allowedRoles={['VENDOR']}>
          <VendorDashboard />
        </ProtectedRoute>
      } />

      {/* COLLEGE Protected Dashboard Matrix */}
      <Route path="/dashboard/college/*" element={
        <ProtectedRoute allowedRoles={['COLLEGE']}>
          <OrganizationDashboard />
        </ProtectedRoute>
      } />

      {/* MENTOR Protected Dashboard Matrix */}
      <Route path="/mentor/*" element={
        <ProtectedRoute allowedRoles={['MENTOR']}>
          <MentorLayout />
        </ProtectedRoute>
      } />

      {/* STUDENT Protected Dashboard Matrix */}
      <Route path="/student/*" element={
        <ProtectedRoute allowedRoles={['STUDENT']}>
          <StudentDashboard />
        </ProtectedRoute>
      } />

      {/* Fallback Catch-All Route Optimization */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}