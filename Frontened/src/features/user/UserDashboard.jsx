import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  PlusCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import API from '../../api/auth.js';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [profileRes, transRes] = await Promise.all([
          API.get('users/me'),
          API.get('users/transactions?limit=5'),
        ]);

        if (profileRes.data.success) setUserData(profileRes.data.user);
        if (transRes.data.success) setTransactions(transRes.data.data);
      } catch (error) {
        console.error('System synchronization error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface p-4 md:py-12 flex flex-col items-center min-h-fit md:min-h-[70vh] justify-start md:justify-center transition-all duration-300">
      <div className="max-w-2xl w-full space-y-6">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center bg-surface-container-low/50 p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-xl backdrop-blur-sm">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-headline font-black text-on-primary-container tracking-tight">
              Welcome back,{' '}
              <span className="text-primary">
                {userData?.firstName
                  ? `${userData.firstName} ${userData.lastName}`.trim()
                  : userData?.username}
              </span>
            </h1>
            <div className="flex items-center gap-2 text-outline">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                Liquidity Pool
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="hover:text-primary transition-all p-1 active:scale-90"
              >
                {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>
          </div>
          <div className="mt-6 md:mt-0 text-left md:text-right">
            <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tighter text-on-surface">
              {showBalance
                ? `${userData?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}`
                : '••••••••'}
              <span className="text-lg ml-2 font-bold text-primary opacity-80">
                USDT
              </span>
            </h2>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/user/me/add"
            className="group bg-primary text-on-primary font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all text-sm shadow-lg shadow-primary/20"
          >
            <PlusCircle
              size={18}
              className="group-hover:rotate-90 transition-transform"
            />
            Add Assets
          </Link>
          <Link
            to="/user/me/transfer"
            className="group bg-surface-container-highest text-on-surface font-black py-4 rounded-2xl flex items-center justify-center gap-2 border border-outline-variant/30 hover:bg-surface-container-high active:scale-[0.98] transition-all text-sm"
          >
            <Send
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
            Transfer
          </Link>
        </div>

        <section className="bg-surface-container-low rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <h3 className="font-headline font-black text-sm uppercase tracking-widest text-on-surface-variant">
                Recent Activity
              </h3>
            </div>
            <Link
              to="/user/me/transactions"
              className="text-primary text-xs font-black uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              Audit All
            </Link>
          </div>

          <div className="space-y-1 divide-y divide-outline-variant/5">
            {transactions && transactions.length > 0 ? (
              transactions.map((tx) => {
                const isCredit =
                  tx.type === 'added' ||
                  tx.type === 'credited' ||
                  (tx.type === 'debited' && tx.toUser?._id === userData?.id);
                return (
                  <div
                    key={tx._id}
                    className="flex items-center justify-between py-5 group transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl border transition-colors ${
                          isCredit
                            ? 'bg-secondary/5 text-secondary border-secondary/10'
                            : 'bg-outline/5 text-outline border-outline/10'
                        }`}
                      >
                        {isCredit ? (
                          <ArrowDownLeft size={18} />
                        ) : (
                          <ArrowUpRight size={18} />
                        )}
                      </div>
                      <div>
                        <p className="font-black text-sm uppercase tracking-tight text-on-surface">
                          {tx.type}
                        </p>
                        <p className="text-[10px] font-mono text-outline uppercase mt-0.5">
                          {new Date(tx.createdAt).toLocaleDateString(
                            undefined,
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-mono font-bold text-base ${
                          isCredit ? 'text-secondary' : 'text-on-surface'
                        }`}
                      >
                        {isCredit ? '+' : '-'}
                        {tx.amount?.toLocaleString()}
                      </p>
                      <p className="text-[9px] uppercase font-black text-outline/40 tracking-widest">
                        {tx.status || 'Settled'}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-outline/5 flex items-center justify-center text-outline/20">
                  <Send size={24} />
                </div>
                <p className="text-outline text-xs font-bold uppercase tracking-widest">
                  No activity history detected
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
