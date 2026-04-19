import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  History,
  TrendingUp,
  TrendingDown,
  PlusCircle,
} from 'lucide-react';
import API from '../../api/auth.js';
import { useAuth } from '../../context/AuthContext.jsx';

const UserTransactions = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [type, setType] = useState('all');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    const filter = type !== 'all' ? `&type=${type}` : '';

    API.get(`users/transactions?page=${page}&limit=10${filter}`)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
          setTotalPages(res.data.pagination.totalPages);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, type]);

  return (
    <div className="min-h-screen bg-background text-on-surface pt-28 pb-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-primary mb-2">
              <History size={20} />
              <span className="text-[10px] font-label font-black uppercase tracking-[0.2em]">
                Ledger Protocol
              </span>
            </div>
            <h1 className="text-3xl font-headline font-extrabold tracking-tighter uppercase">
              Transaction <span className="text-primary">History</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2 bg-surface-container-low/50 p-1.5 rounded-2xl border border-outline-variant/10 backdrop-blur-md">
            {['all', 'credited', 'debited', 'added'].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setType(t);
                  setPage(1);
                }}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  type === t
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105'
                    : 'text-outline hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-low rounded-[2.5rem] border border-outline-variant/20 shadow-2xl overflow-hidden backdrop-blur-sm">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-primary" size={40} />
              <p className="text-xs font-label text-outline animate-pulse uppercase tracking-widest">
                Syncing with Blockchain...
              </p>
            </div>
          ) : data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/40 text-outline text-[10px] font-black uppercase tracking-[0.15em]">
                    <th className="px-8 py-5">Transaction Type</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Timestamp</th>
                    <th className="px-8 py-5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {data.map((tx) => {
                    // A 'debited' tx is incoming if the current user is the toUser (they received it)
                    const isIncoming =
                      tx.type === 'added' ||
                      tx.type === 'credited' ||
                      (tx.type === 'debited' && tx.toUser?._id === user?.id);
                    const displayLabel = isIncoming
                      ? tx.type === 'added'
                        ? 'added'
                        : 'received'
                      : 'sent';

                    return (
                      <tr
                        key={tx._id}
                        className="group hover:bg-primary/5 transition-all duration-200"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-3 rounded-2xl border transition-transform duration-300 group-hover:scale-110 ${
                                isIncoming
                                  ? tx.type === 'added'
                                    ? 'bg-primary/10 text-primary border-primary/20'
                                    : 'bg-secondary/10 text-secondary border-secondary/20'
                                  : 'bg-outline/10 text-outline border-outline/20'
                              }`}
                            >
                              {isIncoming ? (
                                tx.type === 'added' ? (
                                  <PlusCircle size={18} />
                                ) : (
                                  <TrendingUp size={18} />
                                )
                              ) : (
                                <TrendingDown size={18} />
                              )}
                            </div>
                            <div>
                              <span className="text-sm font-bold block capitalize tracking-tight">
                                {displayLabel}
                              </span>
                              <span className="text-[10px] text-outline font-mono opacity-60">
                                #{tx._id.slice(-8).toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-tighter text-secondary/80">
                              Finalized
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <p className="text-xs font-medium text-on-surface">
                            {new Date(tx.createdAt).toLocaleDateString(
                              undefined,
                              {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              }
                            )}
                          </p>
                          <p className="text-[10px] text-outline mt-0.5">
                            {new Date(tx.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </td>
                        <td
                          className={`px-8 py-5 text-right font-mono font-bold text-base ${isIncoming ? 'text-secondary' : 'text-on-surface'}`}
                        >
                          <span className="flex items-center justify-end gap-1">
                            {isIncoming ? '+' : '-'}
                            {tx.amount.toLocaleString()}
                            <span className="text-[10px] font-label text-outline">
                              USDT
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center mx-auto opacity-20">
                <History size={32} />
              </div>
              <p className="text-outline font-label uppercase text-xs tracking-widest">
                No activity detected in this sector
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4">
          <p className="text-[10px] font-label text-outline uppercase tracking-widest">
            Showing Page {page} of {totalPages}
          </p>
          <div className="flex gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-3 rounded-xl border border-outline-variant/20 hover:bg-surface-container-high transition-colors disabled:opacity-20 disabled:cursor-not-allowed group"
            >
              <ChevronLeft
                size={20}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-3 rounded-xl border border-outline-variant/20 hover:bg-surface-container-high transition-colors disabled:opacity-20 disabled:cursor-not-allowed group"
            >
              <ChevronRight
                size={20}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTransactions;
