import { Link } from 'react-router-dom';
import { TrendingUp, UserPlus, LogIn, BarChart3, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-4 sm:px-6 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20 mb-6 md:mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.5)]"></span>
              </span>
              <span className="text-[10px] md:text-xs font-label uppercase tracking-widest text-secondary font-medium">
                System Status: Optimal
              </span>
            </div>

            <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] md:leading-[0.95] mb-6 text-on-surface">
              INSTITUTIONAL GRADE <br className="hidden sm:block" />
              <span className="text-primary italic">PRECISION TRADING</span>
            </h1>

            <p className="font-body text-base md:text-xl text-on-surface-variant max-w-xl mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed">
              Execute with extreme speed on the most robust risk engine ever
              built. High-frequency liquidity and cold-storage security for
              modern digital assets.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/signup"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-primary-container text-on-primary-container font-bold text-lg rounded-xl shadow-lg shadow-primary-container/10 transition-all hover:scale-[1.02] active:scale-95 hover:brightness-110"
              >
                Create Account <UserPlus size={20} />
              </Link>

              <Link
                to="/login"
                className="flex items-center justify-center gap-2 px-8 py-4 border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container-high transition-colors font-bold text-lg rounded-xl text-on-surface active:scale-95"
              >
                Login <LogIn size={20} />
              </Link>
            </div>

            <div className="mt-10 md:mt-12 flex flex-wrap justify-center lg:justify-start items-center gap-6 md:gap-8 border-t border-outline-variant/10 pt-8">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-2">
                  <BarChart3 size={16} className="text-primary" />
                  <span className="font-label text-xl md:text-2xl font-bold text-on-surface">
                    2.4M+
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-outline">
                  Trades/Sec
                </span>
              </div>
              <div className="hidden sm:block h-10 w-px bg-outline-variant/20"></div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-secondary" />
                  <span className="font-label text-xl md:text-2xl font-bold text-on-surface">
                    $14B+
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-outline">
                  Daily Vol
                </span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:h-[500px]">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none opacity-40"></div>

            <div className="relative w-full max-w-[500px] lg:max-w-none bg-surface-container/60 backdrop-blur-xl border border-outline-variant/20 rounded-2xl p-4 md:p-6 shadow-2xl overflow-hidden shadow-black/50">
              <div className="flex justify-between items-center mb-6 md:mb-10">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-error/30"></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-tertiary/30"></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-secondary/30"></div>
                </div>
                <div className="font-label text-[8px] md:text-[10px] text-outline tracking-[0.2em] uppercase flex items-center gap-2">
                  <span className="w-1 h-1 bg-secondary rounded-full animate-pulse"></span>
                  Live Execution Terminal
                </div>
              </div>

              <div className="h-32 md:h-48 flex items-end gap-1 md:gap-1.5 mb-6 md:mb-8">
                {[50, 30, 70, 40, 85, 60, 35, 75, 95, 50, 65, 40, 80].map(
                  (h, i) => (
                    <div
                      key={i}
                      className={`w-full rounded-t-sm transition-all ${
                        i === 8
                          ? 'bg-primary'
                          : i > 7
                            ? 'bg-secondary/40'
                            : 'bg-surface-container-highest'
                      }`}
                      style={{
                        height: `${h}%`,
                        animation: `pulseBar ${2 + i * 0.2}s infinite ease-in-out`,
                      }}
                    />
                  )
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-surface-container-low p-3 md:p-4 rounded-xl border border-outline-variant/10">
                  <div className="text-[9px] md:text-[10px] text-outline uppercase font-label mb-1 tracking-wider">
                    Spot Price
                  </div>
                  <div className="text-lg md:text-2xl font-label font-bold text-on-surface tracking-tight">
                    64,281.42
                  </div>
                </div>
                <div className="bg-surface-container-low p-3 md:p-4 rounded-xl border border-outline-variant/10">
                  <div className="flex justify-between items-start">
                    <div className="text-[9px] md:text-[10px] text-outline uppercase font-label mb-1 tracking-wider">
                      24h Change
                    </div>
                    <TrendingUp size={12} className="text-secondary" />
                  </div>
                  <div className="text-lg md:text-2xl font-label font-bold text-secondary">
                    +4.12%
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] opacity-40"></div>
            </div>
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes pulseBar {
              0%, 100% { transform: scaleY(1); opacity: 1; }
              50% { transform: scaleY(0.7); opacity: 0.6; }
            }
          `,
          }}
        />
      </section>
    </div>
  );
};

export default Hero;
