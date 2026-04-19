import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Mail,
  Loader2,
  ChevronRight,
  LogOut,
  Fingerprint,
  KeyRound,
  CheckCircle2,
  Activity,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import API from '../../api/auth.js';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    API.get('users/me')
      .then((res) => {
        if (res.data.success) setProfile(res.data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handlePasswordResetRequest = async () => {
    if (!profile?.email) return;
    setResetLoading(true);
    try {
      await API.post('auth/forgot-password', { email: profile.email });
      setResetSent(true);
      setTimeout(() => setResetSent(false), 5000);
    } catch (error) {
      console.error('Security update failed:', error);
    } finally {
      setResetLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-primary">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin" size={40} />
          <p className="text-sm font-label tracking-widest uppercase opacity-50">
            Establishing Secure Connection...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface pt-28 pb-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-end justify-between px-2">
          <div>
            <div className="flex items-center gap-2 text-primary mb-1">
              <ShieldCheck size={18} />
              <span className="text-[10px] font-label font-black uppercase tracking-[0.2em]">
                System Authority
              </span>
            </div>
            <h1 className="text-3xl font-headline font-extrabold tracking-tighter uppercase">
              Admin <span className="text-primary">Identity</span>
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
            <Activity size={14} className="text-primary animate-pulse" />
            <span className="text-[10px] font-bold text-primary uppercase">
              Active Session
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden bg-surface-container-low rounded-[2rem] p-8 border border-primary/20 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[100px] rounded-full" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-primary text-on-primary rounded-3xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20 transform -rotate-2 hover:rotate-0 transition-all duration-500">
              <ShieldCheck size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-on-surface">
              {profile?.username || 'Administrator'}
            </h2>
            <p className="text-primary font-label text-[10px] uppercase tracking-[0.25em] font-black mt-1">
              Level 4 clearance
            </p>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/20 shadow-xl">
          <div className="px-8 py-5 border-b border-outline-variant/10 bg-surface-container-high/30">
            <h3 className="text-sm font-label font-bold uppercase tracking-widest text-outline">
              System Access Details
            </h3>
          </div>
          <div className="divide-y divide-outline-variant/10">
            <ProfileItem
              icon={<Mail size={20} />}
              label="Authorized Email"
              value={profile?.email}
            />
            <ProfileItem
              icon={<Fingerprint size={20} />}
              label="Verified Username"
              value={profile?.username}
              isCode
            />
          </div>
        </div>

        <div className="bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/20 shadow-xl">
          <div className="px-8 py-5 border-b border-outline-variant/10 bg-surface-container-high/30">
            <h3 className="text-sm font-label font-bold uppercase tracking-widest text-outline">
              Credential Management
            </h3>
          </div>
          <button
            onClick={handlePasswordResetRequest}
            disabled={resetLoading || resetSent}
            className="w-full flex items-center justify-between p-6 hover:bg-primary/5 transition-all duration-200 group disabled:opacity-70"
          >
            <div className="flex items-center gap-5">
              <div
                className={`w-10 h-10 rounded-xl bg-background border border-outline-variant/20 flex items-center justify-center transition-colors ${resetSent ? 'text-secondary border-secondary/30' : 'text-outline group-hover:text-primary group-hover:border-primary/30'}`}
              >
                {resetLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : resetSent ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <KeyRound size={20} />
                )}
              </div>
              <div className="text-left">
                <p className="text-[10px] text-outline font-label uppercase tracking-widest mb-0.5">
                  Security
                </p>
                <p className="font-bold text-base tracking-tight">
                  {resetSent
                    ? 'Recovery Email Dispatched'
                    : 'Update Credentials'}
                </p>
              </div>
            </div>
            {!resetSent && !resetLoading && (
              <ChevronRight
                size={18}
                className="text-outline group-hover:text-primary transition-transform group-hover:translate-x-1"
              />
            )}
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="group w-full py-5 flex items-center justify-center gap-3 text-error font-bold border border-error/20 rounded-[2rem] hover:bg-error hover:text-on-primary transition-all duration-300 shadow-lg hover:shadow-error/20"
        >
          <LogOut
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Terminate Admin Session
        </button>
      </div>
    </div>
  );
};

const ProfileItem = ({ icon, label, value, isCode }) => (
  <div className="flex items-center justify-between p-6 hover:bg-primary/5 transition-all duration-200 group">
    <div className="flex items-center gap-5">
      <div className="w-10 h-10 rounded-xl bg-background border border-outline-variant/20 flex items-center justify-center text-outline group-hover:text-primary group-hover:border-primary/30 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-outline font-label uppercase tracking-widest mb-0.5">
          {label}
        </p>
        <p
          className={`font-bold text-base tracking-tight ${isCode ? 'font-mono text-primary' : 'text-on-surface'}`}
        >
          {value || 'Not Configured'}
        </p>
      </div>
    </div>
    <ChevronRight
      size={18}
      className="text-outline/20 group-hover:text-primary transition-transform group-hover:translate-x-1"
    />
  </div>
);

export default AdminProfile;
