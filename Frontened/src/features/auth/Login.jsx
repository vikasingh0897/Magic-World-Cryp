import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import API, { loginUser } from '../../api/auth.js';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser(formData);
      login(data.user, data.accessToken);
      toast.success('Authentication successful');

      const targetPath =
        data.user.role === 'admin' ? '/user/admin' : '/user/me';
      navigate(targetPath);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('auth/forgot-password', {
        email: formData.email,
      });
      toast.success(data.message || 'Reset link sent to your email');
      setIsForgotMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060e20] flex items-center justify-center p-6">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#131b2e',
            color: '#fff',
            border: '1px solid #424656',
          },
        }}
      />

      <div className="w-full max-w-md">
        <button
          onClick={() =>
            isForgotMode ? setIsForgotMode(false) : navigate('/')
          }
          className="inline-flex items-center text-[#8c90a1] hover:text-[#afc6ff] transition-colors mb-6 text-sm group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          {isForgotMode ? 'Back to Login' : 'Back to Home'}
        </button>

        <form
          onSubmit={isForgotMode ? handleForgotPassword : handleLogin}
          className="w-full space-y-6 bg-[#131b2e] p-8 rounded-2xl border border-[#424656]/30 shadow-2xl"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#dae2fd] tracking-tight">
              {isForgotMode ? 'Reset Security Access' : 'Access Account'}
            </h2>
            <p className="text-[#8c90a1] text-sm mt-2">
              {isForgotMode
                ? 'Enter your email to receive a reset link'
                : 'Secure gateway to your digital assets'}
            </p>
          </div>

          <div className="space-y-4">
            <div className="group">
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                className="w-full p-3.5 rounded-xl bg-[#060e20] border border-[#424656]/50 text-white focus:border-[#afc6ff] focus:ring-1 focus:ring-[#afc6ff]/30 outline-none transition-all placeholder:text-[#424656]"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            {!isForgotMode && (
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  className="w-full p-3.5 rounded-xl bg-[#060e20] border border-[#424656]/50 text-white focus:border-[#afc6ff] focus:ring-1 focus:ring-[#afc6ff]/30 outline-none transition-all pr-12 placeholder:text-[#424656]"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8c90a1] hover:text-[#afc6ff] transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            )}
          </div>

          {!isForgotMode && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsForgotMode(true)}
                className="text-xs text-[#8c90a1] hover:text-[#afc6ff] transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            disabled={loading}
            className="w-full py-3.5 bg-[#afc6ff] text-[#060e20] font-black rounded-xl hover:bg-[#90afff] hover:shadow-lg hover:shadow-[#afc6ff]/10 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                {isForgotMode ? 'Sending Link...' : 'Verifying Session...'}
              </span>
            ) : isForgotMode ? (
              'Send Reset Link'
            ) : (
              'Sign In'
            )}
          </button>

          <div className="pt-4 space-y-4 text-center">
            {!isForgotMode && (
              <p className="text-sm text-[#8c90a1]">
                New to the platform?{' '}
                <Link
                  to="/signup"
                  className="text-[#afc6ff] font-semibold hover:underline"
                >
                  Create Account
                </Link>
              </p>
            )}

            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="h-px w-8 bg-[#424656]/30"></span>
              <span className="text-[10px] text-[#424656] font-bold uppercase tracking-[0.2em]">
                Secure Protocol
              </span>
              <span className="h-px w-8 bg-[#424656]/30"></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
