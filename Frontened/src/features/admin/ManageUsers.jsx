import { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Loader2,
  User as UserIcon,
  Wallet,
  MoreVertical,
  Mail,
  Calendar,
  Filter,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/auth.js';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await API.get('admin/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-primary" size={48} />
          <p className="text-outline animate-pulse font-label uppercase tracking-widest text-xs">
            Accessing Database...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface min-h-screen pb-12">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-outline-variant/10 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-primary/10 rounded-full transition-colors text-primary"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-right">
            <h1 className="text-lg md:text-2xl font-black uppercase tracking-tight leading-none">
              User <span className="text-primary">Directory</span>
            </h1>
            <p className="text-[10px] text-outline font-bold uppercase">
              {users.length} Records
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Search & Filter Header */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-grow">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by identity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl py-4 pl-12 pr-4 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline/50"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative flex items-center gap-2 bg-surface-container-low border border-outline-variant/20 rounded-2xl px-4 py-2 flex-grow lg:flex-grow-0 min-w-[140px]">
              <Filter size={18} className="text-outline shrink-0" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-transparent text-on-surface border-none py-2 text-sm font-bold focus:outline-none cursor-pointer w-full appearance-none pr-6 z-10"
              >
                {/* Inline styles for option backgrounds ensure they stay dark on mobile/chrome */}
                <option value="all" className="bg-[#1C1B1F] text-on-surface">
                  All Roles
                </option>
                <option value="user" className="bg-[#1C1B1F] text-on-surface">
                  Users
                </option>
                <option value="admin" className="bg-[#1C1B1F] text-on-surface">
                  Admins
                </option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 text-outline pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Responsive Content */}
        <div className="bg-surface-container-low md:rounded-[2rem] rounded-3xl border border-outline-variant/10 overflow-hidden shadow-xl">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/50 text-outline uppercase text-[10px] tracking-widest font-black">
                  <th className="px-8 py-5">Identities</th>
                  <th className="px-8 py-5">Financial Status</th>
                  <th className="px-8 py-5">Registration</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filteredUsers.map((u) => (
                  <tr
                    key={u._id}
                    className="hover:bg-primary/5 transition-all group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <UserIcon size={24} />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-base text-on-surface leading-none mb-1">
                            {u.username}
                          </span>
                          <span className="text-xs text-outline flex items-center gap-1">
                            <Mail size={12} /> {u.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 text-on-surface font-mono font-bold text-lg">
                          <Wallet size={16} className="text-secondary" />
                          {u.balance?.toLocaleString() || '0'}
                          <span className="text-[10px] text-outline font-label uppercase">
                            USDT
                          </span>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-outline/50 mt-1 font-black">
                          Available Balance
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-outline text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(u.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate(`/user/admin/manage-users/${u._id}`)
                          }
                          className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary hover:text-on-primary transition-all"
                        >
                          Details
                        </button>
                        <button
                          onClick={() =>
                            navigate(
                              `/user/admin/credit-user?id=${u._id}&name=${u.username}`
                            )
                          }
                          className="p-2 hover:bg-surface-container-highest rounded-xl text-outline hover:text-primary transition-all"
                        >
                          <MoreVertical size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-outline-variant/10">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <div
                  key={u._id}
                  className="p-5 space-y-4 active:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <UserIcon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm leading-none">
                          {u.username}
                        </h3>
                        <p className="text-[11px] text-outline truncate max-w-[150px]">
                          {u.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        navigate(
                          `/user/admin/credit-user?id=${u._id}&name=${u.username}`
                        )
                      }
                      className="p-2 text-outline"
                    >
                      <MoreVertical size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-2">
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase font-black text-outline/60 tracking-tighter">
                        Balance
                      </p>
                      <div className="flex items-center gap-1 font-mono font-bold text-sm">
                        <Wallet size={12} className="text-secondary" />
                        {u.balance?.toLocaleString() || '0'}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase font-black text-outline/60 tracking-tighter">
                        Joined
                      </p>
                      <div className="flex items-center gap-1 text-outline text-xs font-bold">
                        <Calendar size={12} />
                        {new Date(u.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/user/admin/manage-users/${u._id}`)
                    }
                    className="w-full py-3 bg-primary text-on-primary rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    View Full Profile <ExternalLink size={14} />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-4 px-6">
                <Search size={40} className="text-outline/20" />
                <p className="text-xs font-black uppercase tracking-widest text-outline/40 text-center leading-relaxed">
                  No personnel found in current sector
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2 opacity-60">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-center sm:text-left">
            Displaying {filteredUsers.length} of {users.length} active nodes
          </p>
          <div className="h-px bg-outline-variant/30 flex-grow mx-4 hidden sm:block"></div>
          <p className="text-[9px] font-black uppercase tracking-[0.2em]">
            System v4.0.2 // Secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
