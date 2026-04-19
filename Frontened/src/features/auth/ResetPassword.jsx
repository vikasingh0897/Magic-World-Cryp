import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../../api/auth.js';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    const token = searchParams.get('token');
    const id = searchParams.get('id');

    setLoading(true);
    try {
      const { data } = await API.post('auth/reset-password', {
        token,
        id,
        newPassword,
      });
      toast.success(data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060e20] flex items-center justify-center p-6">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md space-y-6 bg-[#131b2e] p-8 rounded-2xl border border-[#424656]/30"
      >
        <h2 className="text-2xl font-bold text-[#dae2fd] text-center">
          New Credentials
        </h2>
        <input
          type="password"
          placeholder="Enter new strong password"
          className="w-full p-3 rounded-lg bg-[#060e20] border border-[#424656]/50 text-white focus:border-[#4edea3] outline-none"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          disabled={loading}
          className="w-full py-3 bg-[#4edea3] text-[#060e20] font-bold rounded-lg hover:brightness-110"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
