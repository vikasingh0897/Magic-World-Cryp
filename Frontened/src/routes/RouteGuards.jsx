import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import LandingPage from '../pages/LandingPage.jsx';

export const LoadingSpinner = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export const RootRedirect = () => {
  const { user, authStatus } = useAuth();

  if (authStatus === 'loading') return <LoadingSpinner />;

  if (authStatus === 'authenticated' && user) {
    const dashboardPath = user.role === 'admin' ? '/user/admin' : '/user/me';
    return <Navigate to={dashboardPath} replace />;
  }

  if (authStatus === 'expired') return <Navigate to="/login" replace />;

  return <LandingPage />;
};

export const AuthPageGuard = ({ children }) => {
  const { user, authStatus } = useAuth();

  if (authStatus === 'loading') return <LoadingSpinner />;

  if (authStatus === 'authenticated' && user) {
    const dashboardPath = user.role === 'admin' ? '/user/admin' : '/user/me';
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};
