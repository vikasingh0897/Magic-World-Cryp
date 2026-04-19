import React from 'react';
import {
  Bolt,
  ShieldCheck,
  Waves,
  Lock,
  Eye,
  Key,
  Smartphone,
  Activity,
} from 'lucide-react';

const Features = () => {
  return (
    <section className="bg-background py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-10 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-6 md:w-8 bg-primary"></div>
            <span className="text-primary font-label text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">
              Institutional Grade
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-on-surface">
            Engineered for <span className="text-primary italic">Velocity</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2 bg-surface-container-low rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 md:p-12 border border-outline-variant/10 hover:border-primary/30 transition-all group relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 md:mb-8 border border-primary/20">
                <Bolt className="text-primary w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline mb-3 md:mb-4 text-on-surface">
                Real-Time Execution
              </h3>
              <p className="text-on-surface-variant text-base md:text-lg max-w-md leading-relaxed">
                Our matching engine operates at sub-millisecond speeds, ensuring
                your orders are filled at the best possible price with zero
                slippage.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 group-hover:scale-110 pointer-events-none">
              <Activity size={240} className="md:size-[320px] text-primary" />
            </div>
          </div>

          <div className="bg-surface-container rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 border border-outline-variant/10 hover:border-secondary/30 transition-all group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 md:mb-6 border border-secondary/20">
              <ShieldCheck className="text-secondary w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-bold font-headline mb-2 md:mb-3 text-on-surface">
              Advanced Risk Engine
            </h3>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              Automated liquidation protection and real-time collateral
              management for high-leverage portfolios.
            </p>
          </div>

          <div className="bg-surface-container rounded-[1.5rem] md:rounded-[2rem] p-6 sm:p-8 border border-outline-variant/10 hover:border-tertiary/30 transition-all group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-tertiary/10 flex items-center justify-center mb-4 md:mb-6 border border-tertiary/20">
              <Waves className="text-tertiary w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-bold font-headline mb-2 md:mb-3 text-on-surface">
              Global Liquidity
            </h3>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              Access deep order books aggregated from top-tier institutional
              providers across four continents.
            </p>
          </div>

          <div className="md:col-span-2 bg-surface-container-low rounded-[1.5rem] md:rounded-[2rem] border border-outline-variant/10 overflow-hidden group hover:border-primary/20 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 border border-primary/20 shadow-[0_0_15px_rgba(175,198,255,0.1)]">
                  <Lock className="text-primary w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline mb-3 md:mb-4 text-on-surface">
                  Custodial-Grade Security
                </h3>
                <p className="text-on-surface-variant text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">
                  98% of assets are stored in cold wallets with multi-signature
                  authorization.
                </p>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  {[
                    { icon: ShieldCheck, text: 'Cold Storage' },
                    { icon: Key, text: 'Multi-Sig' },
                    { icon: Eye, text: 'Audit Logs' },
                    { icon: Smartphone, text: 'MPC Tech' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-[10px] md:text-xs font-label uppercase tracking-widest text-on-surface/70 font-bold"
                    >
                      <item.icon
                        size={14}
                        className="text-secondary shrink-0"
                      />
                      <span className="truncate">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[220px] md:min-h-[300px] bg-surface-container-high/30 flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l border-outline-variant/10">
                <div className="absolute inset-0 bg-primary/5 blur-[60px] animate-pulse"></div>

                <div className="relative w-48 h-60 md:w-56 md:h-72 bg-background rounded-2xl border border-outline-variant/20 shadow-2xl p-4 flex flex-col gap-4 transform group-hover:scale-105 transition-transform duration-500">
                  <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-error/40"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary/40"></div>
                    </div>
                    <div className="text-[8px] font-label text-outline uppercase tracking-widest font-bold">
                      Secure Node
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-8 bg-surface-container rounded-lg border border-outline-variant/5 flex items-center px-3 justify-between">
                      <div className="w-12 h-1.5 bg-outline-variant/20 rounded"></div>
                      <div className="w-4 h-4 rounded-full border border-primary/30 flex items-center justify-center">
                        <div className="w-1 h-1 bg-primary rounded-full animate-ping"></div>
                      </div>
                    </div>
                    <div className="h-8 bg-surface-container rounded-lg border border-outline-variant/5 flex items-center px-3">
                      <div className="w-20 h-1.5 bg-outline-variant/20 rounded"></div>
                    </div>
                  </div>
                  <div className="mt-auto flex flex-col items-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/20 flex items-center justify-center bg-surface-container mb-2">
                      <Lock size={16} className="text-primary" />
                    </div>
                    <div className="text-[7px] md:text-[8px] text-secondary font-label uppercase tracking-tighter font-bold">
                      AES-256 Encrypted
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
