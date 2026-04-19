import { useState, useEffect } from 'react';
import {
  User,
  Mail,
  ShieldCheck,
  Loader2,
  ChevronRight,
  LogOut,
  Fingerprint,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import API from '../../api/auth.js';

const UserProfile = () => {
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
      console.error('Reset request failed', error);
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

  const fullName =
    profile?.firstName && profile?.lastName
      ? `${profile.firstName} ${profile.lastName}`
      : profile?.username || 'Authorized User';

  return (
    <div className="min-h-screen bg-background text-on-surface pt-28 pb-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="flex items-end justify-between px-2">
          <div>
            <h1 className="text-3xl font-headline font-black tracking-tighter uppercase">
              Account <span className="text-primary">Profile</span>
            </h1>
            <p className="text-outline text-sm">
              Manage system identity and security protocols
            </p>
          </div>
        </header>

        <div className="relative overflow-hidden bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/20 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[100px] rounded-full" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 text-primary rounded-3xl flex items-center justify-center mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
              <User size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight capitalize">
              {fullName}
            </h2>
            <p className="text-outline font-mono text-sm mt-1 opacity-70">
              @{profile?.username}
            </p>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary border border-secondary/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={12} />
                {profile?.role || 'User Access'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/20 shadow-xl">
          <div className="px-8 py-5 border-b border-outline-variant/10 bg-surface-container-high/30">
            <h3 className="text-sm font-label font-bold uppercase tracking-widest text-outline">
              Verified Credentials
            </h3>
          </div>
          <div className="divide-y divide-outline-variant/10">
            <ProfileItem
              icon={<Fingerprint size={20} />}
              label="Network Identifier"
              value={profile?.username}
              isCode
            />
            <ProfileItem
              icon={<Mail size={20} />}
              label="Communication Address"
              value={profile?.email}
            />

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
                      ? 'Recovery link dispatched'
                      : 'Update Credentials'}
                  </p>
                </div>
              </div>
              {!resetSent && (
                <ChevronRight
                  size={18}
                  className="text-outline/20 group-hover:text-primary group-hover:translate-x-1 transition-all"
                />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-6 hover:bg-error/5 transition-all duration-200 group"
            >
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 rounded-xl bg-background border border-outline-variant/20 flex items-center justify-center text-error/60 group-hover:text-error group-hover:border-error/30 transition-colors">
                  <LogOut size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-error/60 font-label uppercase tracking-widest mb-0.5">
                    Session
                  </p>
                  <p className="font-bold text-base tracking-tight text-error">
                    Terminate Session
                  </p>
                </div>
              </div>
              <ChevronRight
                size={18}
                className="text-error/20 group-hover:text-error group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>
        </div>
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
          {value || 'Unavailable'}
        </p>
      </div>
    </div>
    <ChevronRight
      size={18}
      className="text-outline/20 group-hover:text-primary transition-transform group-hover:translate-x-1"
    />
  </div>
);

export default UserProfile;
