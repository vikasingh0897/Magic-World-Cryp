import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

// Components & Pages
import ProtectedRoute from './components/ProtectedRoute.jsx';
import UserPage from './pages/UserPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import Custom404 from './pages/Custom404.jsx';

// Auth Features
import Login from './features/auth/Login.jsx';
import Signup from './features/auth/Signup.jsx';
import VerifyEmail from './features/auth/VerifyEmail.jsx';
import ForgotPassword from './features/auth/ForgotPassword.jsx';
import ResetPassword from './features/auth/ResetPassword.jsx';

// Route Guards
import { RootRedirect, AuthPageGuard } from './routes/RouteGuards.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootRedirect />} />

          {/* Auth Flow */}
          <Route
            path="/login"
            element={
              <AuthPageGuard>
                <Login />
              </AuthPageGuard>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthPageGuard>
                <Signup />
              </AuthPageGuard>
            }
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Authenticated User Routes */}
          <Route
            path="/user/me/*"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />

          {/* Authenticated Admin Routes */}
          <Route
            path="/user/admin/*"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Custom404 />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
