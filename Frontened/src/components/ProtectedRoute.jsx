import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, authStatus } = useAuth();

  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (authStatus === 'expired' || !user) {
    return <Navigate to={authStatus === 'expired' ? '/login' : '/'} replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/user/me" replace />;
  }

  return children;
};

export default ProtectedRoute;
