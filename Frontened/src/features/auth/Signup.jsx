import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { signupUser } from '../../api/auth.js';
import { FiArrowLeft } from 'react-icons/fi';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signupUser(formData);
      const successMsg =
        response.data?.message || 'Account created successfully!';
      toast.success(successMsg);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      toast.error(errorMsg);
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
        <Link
          to="/"
          className="inline-flex items-center text-[#8c90a1] hover:text-[#4edea3] transition-colors mb-6 text-sm group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4 bg-[#131b2e] p-8 rounded-2xl border border-[#424656]/30 shadow-2xl"
        >
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-[#dae2fd]">
              Join Magic World
            </h2>
            <p className="text-[#8c90a1] text-sm mt-2">
              Start your crypto journey today
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              className="w-full p-3 rounded-lg bg-[#060e20] border border-[#424656]/50 text-white focus:border-[#4edea3] outline-none transition-all"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              className="w-full p-3 rounded-lg bg-[#060e20] border border-[#424656]/50 text-white focus:border-[#4edea3] outline-none transition-all"
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            className="w-full p-3 rounded-lg bg-[#060e20] border border-[#424656]/50 text-white focus:border-[#4edea3] outline-none transition-all"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            className="w-full p-3 rounded-lg bg-[#060e20] border border-[#424656]/50 text-white focus:border-[#4edea3] outline-none transition-all"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            className="w-full p-3 rounded-lg bg-[#060e20] border border-[#424656]/50 text-white focus:border-[#4edea3] outline-none transition-all"
            onChange={handleChange}
            required
          />

          <button
            disabled={loading}
            className="w-full py-3 mt-2 bg-[#4edea3] text-[#060e20] font-bold rounded-lg hover:bg-[#3dbd8a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center text-[#8c90a1] text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-[#4edea3] hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
