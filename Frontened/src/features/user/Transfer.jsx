import { useState } from 'react';
import { Send, Loader2, ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import API from '../../api/auth.js';

const Transfer = () => {
  const [formData, setFormData] = useState({
    recipientUsername: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (formData.amount <= 0) return toast.error('Invalid amount');

    setLoading(true);
    try {
      const { data } = await API.post('transfers', {
        recipientIdentifier: formData.recipientUsername,
        amount: Number(formData.amount),
      });

      toast.success(data.message || 'Transfer Successful!');
      setTimeout(() => navigate('/user/me'), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface pt-28 px-4 flex justify-center">
      <Toaster position="top-right" />
      <div className="max-w-md w-full space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-outline hover:text-primary transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/20 shadow-2xl">
          <h1 className="text-2xl font-headline font-extrabold mb-6 tracking-tight">
            SEND <span className="text-primary">ASSETS</span>
          </h1>

          <form onSubmit={handleTransfer} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-label uppercase tracking-widest text-outline ml-1">
                Recipient Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                  size={18}
                />
                <input
                  type="text"
                  required
                  placeholder="e.g. crypto_king"
                  className="w-full bg-background border border-outline-variant/30 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-primary transition-all"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      recipientUsername: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-label uppercase tracking-widest text-outline ml-1">
                Amount (USDT)
              </label>
              <input
                type="number"
                required
                placeholder="0.00"
                className="w-full bg-background border border-outline-variant/30 rounded-xl py-3.5 px-4 outline-none focus:border-primary font-mono text-lg"
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Send size={18} /> Confirm Transfer
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
