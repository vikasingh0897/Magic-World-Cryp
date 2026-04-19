import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Wallet,
  PlusCircle,
  TrendingUp,
  Activity,
  Loader2,
  Search,
  ArrowRight,
  History,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import API from '../../api/auth.js';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLiquidity: 0,
    recentSignups: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const res = await API.get('admin/stats');
        const data = res.data.success ? res.data.data : res.data;

        setStats({
          totalUsers: data.totalUsers || 0,
          totalLiquidity: data.totalLiquidity || 0,
          recentSignups: data.recentSignups || 0,
        });
      } catch (error) {
        console.error('Data acquisition error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface p-4 md:py-12 flex flex-col items-center min-h-fit md:min-h-[70vh]">
      <div className="max-w-4xl w-full space-y-6">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end bg-surface-container-low/50 p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm">
          <div>
            <span className="text-[10px] font-label uppercase tracking-widest text-primary font-bold">
              Admin Portal
            </span>
            <h1 className="text-2xl md:text-3xl font-headline font-extrabold text-on-primary-container">
              Welcome back, {user?.username || 'Administrator'}
            </h1>
            <p className="text-outline text-sm mt-1">
              System overview and management
            </p>
          </div>
          <Link
            to="manage-users"
            className="mt-4 md:mt-0 p-3 bg-surface-container-highest rounded-full hover:bg-primary/10 transition-colors"
          >
            <Search size={20} className="text-primary" />
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary text-on-primary p-8 rounded-[2rem] shadow-lg shadow-primary/20 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 opacity-80">
                <Wallet size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Total Liquidity
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tight">
                {stats.totalLiquidity.toLocaleString()}
                <span className="text-lg ml-2 font-medium opacity-70">
                  USDT
                </span>
              </h2>
            </div>
            <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:rotate-12 transition-transform duration-500" />
          </div>

          <div className="bg-surface-container-low border border-outline-variant/20 p-8 rounded-[2rem] hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-2 mb-4 text-secondary">
              <Users size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Platform Users
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
                {stats.totalUsers.toLocaleString()}
              </h2>
              <span className="text-sm font-bold text-outline uppercase">
                Members
              </span>
            </div>
            <div className="mt-6 flex items-center gap-2 bg-secondary/10 w-fit px-3 py-1.5 rounded-full border border-secondary/10">
              <Activity size={14} className="text-secondary animate-pulse" />
              <p className="text-[10px] font-black text-secondary uppercase">
                +{stats.recentSignups} Registered this week
              </p>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <h3 className="font-headline font-bold text-base text-on-surface-variant px-2">
            Administrative Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="credit-user"
              className="group flex items-center justify-between bg-secondary/10 hover:bg-secondary/20 p-5 rounded-2xl transition-all border border-secondary/20"
            >
              <div className="flex items-center gap-4">
                <div className="bg-secondary text-on-secondary p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                  <PlusCircle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">
                    Add Balance to User
                  </h4>
                  <p className="text-xs text-outline">
                    Perform manual USDT adjustments
                  </p>
                </div>
              </div>
              <ArrowRight
                size={20}
                className="text-secondary group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              to="transactions"
              className="group flex items-center justify-between bg-surface-container-highest p-5 rounded-2xl transition-all border border-outline-variant/30 hover:border-primary/50"
            >
              <div className="flex items-center gap-4">
                <div className="bg-surface-container-low text-primary p-3 rounded-xl border border-outline-variant/20 group-hover:scale-110 transition-transform">
                  <History size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Transactions</h4>
                  <p className="text-xs text-outline">
                    Audit manual entry history
                  </p>
                </div>
              </div>
              <ArrowRight
                size={20}
                className="text-outline group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
