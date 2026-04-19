import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import API from '../../api/auth.js';
import { toast } from 'react-hot-toast';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get('token');
      const id = searchParams.get('id');

      try {
        await API.get(`auth/verify-email?token=${token}&id=${id}`);
        setStatus('success');
        toast.success('Identity confirmed');
        setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        setStatus('error');
        toast.error(
          error.response?.data?.message || 'Verification link invalid'
        );
      }
    };
    verify();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-[#060e20] flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-md bg-[#131b2e] p-10 rounded-[2rem] border border-[#424656]/30 shadow-2xl text-center flex flex-col items-center">
        {status === 'verifying' && (
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
              <Loader2
                className="animate-spin text-[#afc6ff] relative z-10"
                size={48}
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tight">
                Authenticating Access
              </h2>
              <p className="text-[#8c90a1] text-sm leading-relaxed">
                Syncing with secure protocol. Please remain on this page.
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 bg-[#4edea3]/10 rounded-full flex items-center justify-center text-[#4edea3] border border-[#4edea3]/20">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#4edea3] tracking-tight uppercase">
                Identity Verified
              </h2>
              <p className="text-[#8c90a1] text-sm">
                Node activated. Preparing your secure dashboard...
              </p>
            </div>
            <div className="pt-4">
              <div className="h-1 w-full bg-[#060e20] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4edea3] animate-[loading_3s_ease-in-out]"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="w-16 h-16 bg-red-400/10 rounded-full flex items-center justify-center text-red-400 border border-red-400/20">
              <XCircle size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-red-400 tracking-tight uppercase">
                Link Expired
              </h2>
              <p className="text-[#8c90a1] text-sm">
                The security token has expired or is no longer valid.
              </p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all font-bold text-sm"
            >
              Back to Login <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center gap-2 opacity-30">
        <span className="h-px w-8 bg-[#424656]" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">
          Encrypted Handshake
        </span>
        <span className="h-px w-8 bg-[#424656]" />
      </div>
    </div>
  );
};

export default VerifyEmail;
