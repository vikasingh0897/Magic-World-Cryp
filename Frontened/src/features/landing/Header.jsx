import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserPlus, LogIn } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface-container/95 backdrop-blur-md border-b border-outline-variant/30 h-16 shadow-xl'
          : 'bg-transparent h-20'
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-10 h-full max-w-screen-2xl mx-auto flex-nowrap gap-2">
        <div className="flex-shrink-0 cursor-pointer">
          <span className="font-headline font-extrabold tracking-tighter text-on-surface uppercase text-[13px] xs:text-[15px] sm:text-xl whitespace-nowrap">
            Magic World <span className="text-primary">Crypto</span>
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-4 flex-shrink-0">
          <Link
            to="/login"
            className="group flex items-center gap-1.5 px-3 py-2 text-on-primary-container hover:bg-white/10 rounded-lg transition-all cursor-pointer font-label font-bold text-[12px] sm:text-sm active:scale-95"
          >
            <LogIn
              size={16}
              className="text-primary group-hover:scale-110 transition-transform"
            />
            <span className="whitespace-nowrap">Login</span>
          </Link>

          <Link
            to="/signup"
            className="flex items-center gap-1.5 px-4 py-2 bg-primary-container text-on-primary-container rounded-lg font-label font-bold text-[12px] sm:text-sm cursor-pointer hover:brightness-125 active:scale-95 transition-all shadow-lg shadow-primary-container/20 border border-primary/20"
          >
            <UserPlus size={16} />
            <span className="hidden xs:inline whitespace-nowrap">Sign Up</span>
            <span className="xs:hidden">Join</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
