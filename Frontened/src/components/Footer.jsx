import {
  IoLocationOutline,
  IoMailOutline,
  IoPaperPlaneOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';

const Footer = () => {
  const githubUsername = 'vikasingh0897';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#060e20] border-t border-[#424656]/20 font-body text-[#dae2fd]">
      <div className="max-w-screen-2xl mx-auto px-6 pt-12 pb-8 md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between items-start md:items-center mb-12">
          <div className="space-y-4 w-full md:w-auto text-center md:text-left">
            <div>
              <h2 className="text-xl md:text-2xl font-headline font-bold tracking-tighter text-[#dae2fd]">
                MAGIC WORLD{' '}
                <span className="text-[#afc6ff] italic">CRYPTO</span>
              </h2>
              <p className="text-[#4edea3] font-label text-[10px] uppercase tracking-[0.25em] font-bold mt-1">
                Trade . Build . Innovate
              </p>
            </div>
            <div className="flex items-start justify-center md:justify-start gap-2 text-[#c2c6d8]">
              <IoLocationOutline className="text-lg text-[#afc6ff] shrink-0" />
              <p className="text-[11px] leading-snug opacity-70">
                Office No. 2104, Marina Plaza,
                <br />
                Dubai Marina, Dubai, UAE
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-64">
            <h3 className="text-[10px] font-bold text-[#8c90a1] uppercase tracking-[0.2em] mb-1 text-center md:text-left">
              Secure Support
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="mailto:support111magiccrypto@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#131b2e]/50 border border-[#424656]/20 hover:bg-[#131b2e] hover:border-[#afc6ff]/40 transition-all active:scale-95"
              >
                <IoMailOutline className="text-base text-[#afc6ff]" />
                <span className="text-[11px] font-medium truncate">
                  Email Support
                </span>
              </a>
              <a
                href="https://t.me/marinasolution"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#131b2e]/50 border border-[#424656]/20 hover:bg-[#131b2e] hover:border-[#4edea3]/40 transition-all active:scale-95"
              >
                <IoPaperPlaneOutline className="text-base text-[#4edea3]" />
                <span className="text-[11px] font-medium">
                  Telegram Channel
                </span>
              </a>
            </div>
          </div>

          <a
            href="https://linkedin.com/in/vikasingh0897"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 p-1.5 pr-6 bg-gradient-to-r from-[#131b2e] to-transparent border border-[#424656]/30 rounded-full w-full md:w-auto transition-all hover:border-[#afc6ff] hover:shadow-[0_0_20px_rgba(175,198,255,0.05)]"
          >
            <div className="relative">
              <img
                src={`https://github.com/${githubUsername}.png`}
                alt="Architect"
                className="h-10 w-10 rounded-full border-2 border-[#4edea3]/30 object-cover group-hover:border-[#afc6ff] transition-colors"
              />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-[#4edea3] border-2 border-[#060e20] rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-[#8c90a1] uppercase font-bold tracking-widest">
                Architect
              </span>
              <h4 className="text-[13px] font-bold text-[#dae2fd]">
                Vikas Singh
              </h4>
            </div>
          </a>
        </div>

        <div className="pt-8 border-t border-[#424656]/20">
          <p className="text-[9px] text-[#8c90a1]/40 text-center max-w-3xl mx-auto mb-8 leading-relaxed uppercase tracking-wide">
            Transactions are subject to market risks. The company is not liable
            for incorrect wallet details or network errors.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-[9px] text-[#8c90a1] uppercase tracking-[0.15em] font-semibold">
            <p className="opacity-60">
              © {currentYear} MAGIC WORLD CRYPTO SOLUTIONS LTD
            </p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-[#4edea3]">
                <IoShieldCheckmarkOutline className="text-sm" />
                Verified Node
              </span>
              <span className="px-2 py-0.5 rounded bg-[#131b2e] text-[8px] border border-[#424656]/40">
                v4.0.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
