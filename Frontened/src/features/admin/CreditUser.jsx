import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  User as UserIcon,
  DollarSign,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Search,
  Wallet,
} from 'lucide-react';
import API from '../../api/auth.js';

const CreditUser = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    userId: '',
    selectedUsername: '',
    action: 'balance_credit',
    amount: '',
    reason: '',
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await API.get('admin/users');
        setUsers(res.data);

        const paramId = searchParams.get('id');
        const paramName = searchParams.get('name');
        if (paramId && paramName) {
          setFormData((prev) => ({
            ...prev,
            userId: paramId,
            selectedUsername: paramName,
          }));
          setSearchTerm(paramName);
        }
      } catch (err) {
        setStatus({
          type: 'error',
          message: 'Could not load the user list.',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return [];
    return users.filter((u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const handleSelectUser = (user) => {
    setFormData({
      ...formData,
      userId: user._id,
      selectedUsername: user.username,
    });
    setSearchTerm(user.username);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.amount) return;

    try {
      setSubmitting(true);
      setStatus({ type: '', message: '' });

      const res = await API.patch(`admin/users/${formData.userId}/balance`, {
        action: formData.action,
        amount: Number(formData.amount),
        reason: formData.reason,
      });

      if (res.status === 200) {
        setStatus({
          type: 'success',
          message: 'Balance updated successfully!',
        });
        setFormData({
          userId: '',
          selectedUsername: '',
          amount: '',
          reason: '',
          action: 'balance_credit',
        });
        setSearchTerm('');
        setTimeout(() => navigate(-1), 2000);
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message:
          err.response?.data?.message ||
          'Something went wrong. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-on-surface px-4 py-6 md:py-12 flex flex-col items-center min-h-screen">
      <div className="max-w-xl w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-outline hover:text-primary transition-colors mb-6 text-sm font-bold group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Go Back
        </button>

        <div className="bg-surface-container-low p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-outline-variant/10 shadow-xl">
          <header className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-headline font-black text-on-primary-container">
              Update User Balance
            </h1>
            <p className="text-outline text-xs md:text-sm mt-1">
              Manually add or remove funds from an account.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            <div className="space-y-2 relative" ref={dropdownRef}>
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-outline ml-1">
                Search User
              </label>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Type a username..."
                  value={searchTerm}
                  onFocus={() => setIsDropdownOpen(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-10 md:pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium transition-all"
                />
              </div>

              {isDropdownOpen && searchTerm && (
                <div className="absolute z-50 w-full mt-2 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-2xl max-h-60 overflow-y-auto backdrop-blur-xl">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <div
                        key={u._id}
                        onClick={() => handleSelectUser(u)}
                        className="flex items-center justify-between p-3 md:p-4 hover:bg-primary/10 cursor-pointer transition-colors border-b border-outline-variant/10 last:border-none"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="bg-primary/20 p-2 rounded-lg text-primary shrink-0">
                            <UserIcon size={14} />
                          </div>
                          <span className="font-bold text-sm truncate">
                            {u.username}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-secondary font-mono text-[10px] md:text-xs bg-secondary/10 px-2 md:px-3 py-1 rounded-full border border-secondary/10 shrink-0">
                          <Wallet size={10} />
                          {u.balance?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          }) || '0.00'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-outline text-xs italic">
                      No users found.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-outline ml-1">
                  Action
                </label>
                <select
                  value={formData.action}
                  onChange={(e) =>
                    setFormData({ ...formData, action: e.target.value })
                  }
                  className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl md:rounded-2xl py-3.5 md:py-4 px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer appearance-none"
                >
                  <option value="balance_credit">Add Funds (+)</option>
                  <option value="balance_debit">Remove Funds (-)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-outline ml-1">
                  Amount (USDT)
                </label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                    size={16}
                  />
                  <input
                    type="number"
                    required
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-10 md:pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-outline ml-1">
                Reason for Change
              </label>
              <textarea
                placeholder="Why are you changing this balance?"
                rows="2"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-xl md:rounded-2xl py-3.5 md:py-4 px-4 md:px-5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            {status.message && (
              <div
                className={`flex items-start gap-3 p-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold animate-in fade-in slide-in-from-top-2 ${
                  status.type === 'success'
                    ? 'bg-secondary/10 text-secondary border border-secondary/20'
                    : 'bg-error/10 text-error border border-error/20'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !formData.userId}
              className="w-full bg-primary text-on-primary font-black py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              {submitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Send size={18} /> Update Balance
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreditUser;
