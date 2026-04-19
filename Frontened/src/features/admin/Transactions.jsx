import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Loader2,
  Calendar,
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import API from '../../api/auth.js';

const Transactions = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 15;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await API.get(
          `admin/transactions?page=${currentPage}&limit=${limit}`
        );
        if (res.data?.success) {
          setTransactions(res.data.logs);
          setTotalPages(res.data.totalPages);
        }
      } catch (error) {
        console.error('Audit log synchronization error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [currentPage]);

  const filteredTransactions = transactions.filter((tx) => {
    const targetName = tx.targetUserId?.username?.toLowerCase() || '';
    const reason = tx.reason?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      targetName.includes(search) || reason.includes(search);
    const matchesFilter = filterAction === 'all' || tx.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface p-4 md:py-12 flex flex-col items-center min-h-screen">
      <div className="max-w-6xl w-full space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-outline hover:text-primary transition-all mb-2 text-sm font-bold group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Return
            </button>
            <h1 className="text-3xl font-headline font-black text-on-primary-container">
              System Audit Logs
            </h1>
            <p className="text-outline text-sm">
              Comprehensive ledger of manual balance overrides
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                size={18}
              />
              <input
                type="text"
                placeholder="Search page..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/20 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-64 transition-all"
              />
            </div>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/20 rounded-xl py-2.5 px-4 text-sm font-bold focus:outline-none cursor-pointer hover:border-primary/30 transition-colors"
            >
              <option value="all">Full History</option>
              <option value="balance_credit">Credits (+)</option>
              <option value="balance_debit">Debits (-)</option>
            </select>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/50 text-outline uppercase text-[10px] tracking-widest font-black">
                  <th className="px-6 py-5">Target Account</th>
                  <th className="px-6 py-5">Classification</th>
                  <th className="px-6 py-5">Delta Amount</th>
                  <th className="px-6 py-5">Adjustment Reason</th>
                  <th className="px-6 py-5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <tr
                      key={tx._id}
                      className="hover:bg-primary/5 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/5">
                            <UserIcon size={16} />
                          </div>
                          <span className="font-bold text-sm text-on-surface">
                            {tx.targetUserId?.username || 'Unknown identity'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase border ${
                            tx.action === 'balance_credit'
                              ? 'bg-secondary/5 text-secondary border-secondary/20'
                              : 'bg-error/5 text-error border-error/20'
                          }`}
                        >
                          {tx.action === 'balance_credit' ? (
                            <ArrowDownLeft size={12} />
                          ) : (
                            <ArrowUpRight size={12} />
                          )}
                          {tx.action === 'balance_credit' ? 'Credit' : 'Debit'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span
                            className={`font-mono font-bold text-base ${
                              tx.action === 'balance_credit'
                                ? 'text-secondary'
                                : 'text-error'
                            }`}
                          >
                            {tx.action === 'balance_credit' ? '+' : '-'}
                            {tx.amountChanged?.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                          <span className="text-[9px] font-black text-outline/60 tracking-tighter">
                            USDT SETTLEMENT
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-on-surface-variant text-xs italic max-w-[200px] truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all">
                          {tx.reason || 'Manual override - no documentation'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-bold text-on-surface">
                            {new Date(tx.createdAt).toLocaleDateString(
                              undefined,
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </span>
                          <span className="text-[10px] text-outline font-mono">
                            {new Date(tx.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                            })}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-24 text-center">
                      <div className="flex flex-col items-center opacity-20">
                        <Calendar className="mb-4" size={56} />
                        <p className="font-headline font-black text-lg uppercase tracking-widest">
                          No Records Found
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-surface-container-high/30 px-6 py-4 flex items-center justify-between border-t border-outline-variant/10">
            <div className="text-xs font-bold text-outline uppercase tracking-wider">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="p-2 rounded-xl border border-outline-variant/20 hover:bg-primary/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="p-2 rounded-xl border border-outline-variant/20 hover:bg-primary/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
