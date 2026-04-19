import { ArrowLeft, Copy, Check, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import qrImg from '../../assets/qrImg.jpeg';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const AddBalance = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const walletAddress = '0xf8bC45fb4300698FbfFb7575455A2bc3921A82d9';
  const telegramUsername = 'marinasolution';

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    toast.success('Address Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface pt-20 sm:pt-28 px-4 flex justify-center pb-10">
      <Toaster position="top-right" />

      <div className="max-w-md w-full space-y-4 sm:space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-outline hover:text-secondary transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="bg-surface-container-low rounded-[2rem] sm:rounded-[2.5rem] border border-outline-variant/20 shadow-2xl p-5 sm:p-8 text-center">
          <div className="inline-flex flex-col items-center mb-4 w-full">
            <div className="bg-white overflow-hidden rounded-2xl sm:rounded-3xl border-4 border-secondary/20 shadow-xl mb-3 w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
              <img
                src={qrImg}
                alt="USDT BEP20 QR Code"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-secondary">
                Network: BEP20
              </span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-headline font-extrabold tracking-tight mb-2">
            DEPOSIT <span className="text-secondary">USDT</span>
          </h1>

          <div className="bg-background border border-outline-variant/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-6 sm:mb-8">
            <p className="text-[9px] text-outline font-label uppercase tracking-widest mb-2">
              Your BEP20 Deposit Address
            </p>
            <div className="flex items-start justify-between gap-2">
              <code className="text-[10px] sm:text-[11px] text-primary break-all text-left font-mono leading-relaxed">
                {walletAddress}
              </code>
              <button
                onClick={handleCopy}
                className="shrink-0 p-2 hover:bg-surface-container-high rounded-lg transition-colors"
              >
                {copied ? (
                  <Check size={16} className="text-secondary" />
                ) : (
                  <Copy size={16} className="text-outline" />
                )}
              </button>
            </div>
          </div>

          <div className="text-left space-y-3 sm:space-y-4 bg-surface-container-high/30 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-outline-variant/10">
            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Instructions
            </h3>
            <ol className="text-[11px] sm:text-xs text-on-surface-variant space-y-2 sm:space-y-3 list-decimal ml-4 leading-relaxed">
              <li>Transfer the desired amount using the **BEP20** network.</li>
              <li>
                Take a **clear screenshot** of the successful transaction.
              </li>
              <li>Send the screenshot and your **username** to support.</li>
            </ol>

            <a
              href={`https://t.me/${telegramUsername}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-secondary text-on-secondary text-sm font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <MessageSquare size={16} /> Send Screenshot
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBalance;
