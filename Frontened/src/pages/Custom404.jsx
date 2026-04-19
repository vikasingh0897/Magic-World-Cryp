import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const Custom404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex items-center justify-center p-6 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10">
        <div className="mb-8 flex justify-center">
          <div className="p-5 rounded-full bg-surface-container border border-outline-variant/20">
            <Search size={40} className="text-primary" />
          </div>
        </div>

        <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 mb-6">
          <span className="text-[10px] font-label uppercase tracking-[0.2em] text-outline font-bold">
            Status Code: 404
          </span>
        </div>

        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4 text-on-surface">
          Not Found
        </h1>

        <p className="text-on-surface-variant text-base md:text-lg mb-10 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Please
          check the URL or return to the dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-primary-container text-on-primary-container font-bold rounded-xl transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-primary-container/10"
          >
            <Home size={18} />
            Go Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-4 border border-outline-variant/30 bg-transparent hover:bg-surface-container transition-all font-bold rounded-xl text-on-surface active:scale-95"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 w-full text-center px-6 opacity-30">
        <p className="text-[10px] uppercase tracking-[0.2em] text-outline font-label">
          © {new Date().getFullYear()} Magic World // Kinetic Precision
        </p>
      </div>
    </div>
  );
};

export default Custom404;
