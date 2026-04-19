import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Loader2,
  Wallet,
  User as UserIcon,
  ShieldCheck,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import API from '../../api/auth.js';

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Balance Form State
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await API.get('admin/users');
        const user = res.data.find((u) => u._id === userId);
        setUserData(user);
      } catch (err) {
        console.error('Failed to fetch user details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleBalanceUpdate = async (action) => {
    if (!amount || Number(amount) <= 0) {
      return setStatus({
        type: 'error',
        message: 'Enter a valid amount',
      });
    }

    try {
      setSubmitting(true);
      setStatus({ type: '', message: '' });

      const res = await API.patch(`admin/users/${userId}/balance`, {
        action: action === 'add' ? 'balance_credit' : 'balance_debit',
        amount: Number(amount),
        reason: reason || `Manual ${action} by Admin`,
      });

      setUserData({ ...userData, balance: res.data.updatedBalance });
      setStatus({
        type: 'success',
        message: `${action === 'add' ? 'Credited' : 'Deducted'} successfully`,
      });
      setAmount('');
      setReason('');
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Transaction failed',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-[10px] font-black uppercase tracking-widest text-outline">
          Loading Profile
        </p>
      </div>
    );

  if (!userData) return <div className="p-10 text-center">User not found</div>;

  return (
    <div className="min-h-screen bg-background text-on-surface pb-10">
      {/* Fixed Top Nav for Mobile */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-outline-variant/10 px-4 py-4 md:py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-outline hover:text-primary transition-colors font-bold text-sm"
          >
            <ArrowLeft size={18} />{' '}
            <span className="hidden sm:inline">Back to Directory</span>
          </button>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-outline leading-none">
              Management Console
            </p>
            <h1 className="text-sm font-black uppercase tracking-widest text-primary">
              User_Node_{userData.username.slice(0, 3)}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-6 md:mt-10 px-4 space-y-6">
        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: Identity Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 shadow-xl text-center relative overflow-hidden group">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <UserIcon size={120} />
              </div>

              <div className="relative z-10">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-primary-container rounded-3xl flex items-center justify-center mx-auto mb-4 text-on-primary shadow-lg shadow-primary/20">
                  <UserIcon size={40} />
                </div>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight break-words">
                  {userData.username}
                </h2>
                <p className="text-outline text-xs md:text-sm mb-4 truncate px-2">
                  {userData.email}
                </p>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-primary/20">
                  <ShieldCheck size={12} /> {userData.role}
                </div>
              </div>
            </div>

            {/* Quick Balance View */}
            <div className="bg-surface-container-high/40 p-6 rounded-[2rem] border border-outline-variant/10 backdrop-blur-sm">
              <p className="text-[9px] font-black uppercase text-outline tracking-[0.2em] mb-4">
                Verified Assets
              </p>
              <div className="flex items-center justify-between">
                <div className="bg-secondary/20 p-3 rounded-2xl text-secondary">
                  <Wallet size={24} />
                </div>
                <div className="text-right">
                  <h3 className="text-2xl md:text-3xl font-mono font-bold text-secondary leading-none">
                    {userData.balance?.toLocaleString() || '0.00'}
                  </h3>
                  <p className="text-[9px] text-outline font-black uppercase mt-1">
                    USDT Available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Action Form */}
          <div className="lg:col-span-8">
            <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 shadow-xl h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-primary rounded-full" />
                <h3 className="text-xl font-black uppercase tracking-tighter">
                  Modify Balance
                </h3>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-black uppercase text-outline tracking-widest ml-1">
                    Transaction Amount (USDT)
                  </label>
                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-outline">
                      $
                    </span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-background border border-outline-variant/20 rounded-2xl py-4 pl-8 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-outline tracking-widest ml-1">
                    Internal Note / Reason
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="E.g., Referral bonus, Correction..."
                    rows="3"
                    className="w-full bg-background border border-outline-variant/20 rounded-2xl p-4 mt-2 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
                  />
                </div>

                {status.message && (
                  <div
                    className={`flex items-center gap-3 p-4 rounded-2xl text-xs font-bold animate-in fade-in slide-in-from-top-2 ${
                      status.type === 'success'
                        ? 'bg-secondary/10 text-secondary border border-secondary/20'
                        : 'bg-error/10 text-error border border-error/20'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    {status.message}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    disabled={submitting}
                    onClick={() => handleBalanceUpdate('add')}
                    className="group flex items-center justify-center gap-2 bg-secondary text-on-secondary py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 text-xs"
                  >
                    <Plus
                      size={18}
                      className="group-hover:rotate-90 transition-transform"
                    />{' '}
                    Add Funds
                  </button>
                  <button
                    disabled={submitting}
                    onClick={() => handleBalanceUpdate('deduct')}
                    className="group flex items-center justify-center gap-2 bg-surface-container-highest text-error py-4 rounded-2xl font-black uppercase tracking-widest border border-error/20 hover:bg-error hover:text-on-primary active:scale-[0.98] transition-all disabled:opacity-50 text-xs"
                  >
                    <Minus
                      size={18}
                      className="group-hover:scale-125 transition-transform"
                    />{' '}
                    Deduct Funds
                  </button>
                </div>

                <p className="text-[9px] text-center text-outline uppercase font-bold tracking-widest pt-4 border-t border-outline-variant/10">
                  Transactions are logged and irreversible
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
