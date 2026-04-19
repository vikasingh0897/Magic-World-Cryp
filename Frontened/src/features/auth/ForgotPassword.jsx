import React, { useState } from 'react';
import API from '../../api/auth.js';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post('auth/forgot-password', { email });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060e20] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-[#131b2e] p-8 rounded-2xl border border-[#424656]/30"
      >
        <h2 className="text-2xl font-bold text-[#dae2fd] text-center">
          Reset Security Access
        </h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          className="w-full p-3 rounded-lg bg-[#060e20] border border-[#424656]/50 text-white focus:border-[#afc6ff] outline-none"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          disabled={loading}
          className="w-full py-3 bg-[#afc6ff] text-[#060e20] font-bold rounded-lg hover:brightness-110 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
