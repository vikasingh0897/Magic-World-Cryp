import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronDown, CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const UserHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    closeMenu();
    await logout();
    navigate('/login');
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-background ${
        isScrolled
          ? 'h-16 border-b border-outline-variant/30 shadow-lg'
          : 'h-20 border-b border-outline-variant/10'
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-10 h-full max-w-screen-2xl mx-auto">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="font-headline font-extrabold tracking-tighter text-on-surface uppercase text-sm sm:text-xl whitespace-nowrap">
            Magic World <span className="text-primary">Crypto</span>
          </span>
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center gap-2 p-1.5 pr-3 rounded-full transition-all active:scale-95 ${
              isMenuOpen
                ? 'bg-surface-container-highest'
                : 'hover:bg-surface-container-high'
            }`}
          >
            <div className="h-8 w-8 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center overflow-hidden">
              <User size={18} className="text-primary" />
            </div>

            <span className="hidden sm:block font-label font-bold text-sm text-on-surface">
              {user?.username || 'Account'}
            </span>
            <ChevronDown
              size={14}
              className={`text-outline transition-transform duration-300 ${
                isMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-3 w-56 origin-top-right bg-surface-container-highest border border-outline-variant/50 rounded-xl shadow-2xl backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-outline-variant/30">
                <p className="text-[10px] font-label text-outline uppercase tracking-widest">
                  Account Status
                </p>
                <p className="text-secondary text-xs font-bold flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  Verified Professional
                </p>
              </div>

              <div className="p-2">
                <Link
                  to="/user/me/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/10 hover:text-primary rounded-lg transition-colors group"
                >
                  <User
                    size={16}
                    className="text-outline group-hover:text-primary"
                  />
                  Profile
                </Link>

                <Link
                  to="/user/me/transactions"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-on-surface hover:bg-primary/10 hover:text-primary rounded-lg transition-colors group"
                >
                  <CreditCard
                    size={16}
                    className="text-outline group-hover:text-primary"
                  />
                  Transactions
                </Link>
              </div>

              <div className="p-2 border-t border-outline-variant/30 bg-error/5">
                <button
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-error hover:bg-error hover:text-on-primary rounded-lg transition-all"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserHeader;
