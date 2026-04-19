import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  History,
  UserCircle,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const AdminHeader = () => {
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-background/80 backdrop-blur-md ${
        isScrolled
          ? 'h-16 border-b border-primary/20 shadow-xl'
          : 'h-20 border-b border-outline-variant/10'
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-10 h-full max-w-screen-2xl mx-auto">
        <Link to="/user/admin" className="flex items-center gap-3 group">
          <div className="bg-primary p-1.5 rounded-lg">
            <ShieldCheck className="text-on-primary" size={20} />
          </div>
          <span className="font-headline font-extrabold tracking-tighter text-on-surface uppercase text-sm sm:text-xl">
            Admin<span className="text-primary">Panel</span>
          </span>
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all active:scale-95 ${
              isMenuOpen
                ? 'bg-primary/10 border-primary/40'
                : 'bg-surface-container-low border-outline-variant/50 hover:border-primary/30'
            }`}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-on-primary font-bold text-xs shadow-inner">
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>

            <div className="hidden sm:flex flex-col items-start leading-none text-left">
              <span className="font-bold text-[13px] text-on-surface">
                {user?.username || 'Administrator'}
              </span>
              <span className="text-[10px] text-primary font-medium">
                System Admin
              </span>
            </div>

            <ChevronDown
              size={14}
              className={`text-outline transition-transform duration-300 ${
                isMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-3 w-64 origin-top-right bg-surface-container-highest border border-outline-variant/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="px-5 py-4 bg-primary/5 border-b border-outline-variant/30">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                  Menu Options
                </p>
              </div>

              <div className="p-2">
                <Link
                  to="/user/admin/manage-users"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-on-surface hover:bg-primary/10 hover:text-primary rounded-xl transition-all group"
                >
                  <Users
                    size={18}
                    className="text-outline group-hover:text-primary"
                  />
                  <div className="flex flex-col">
                    <span>All Users</span>
                    <span className="text-[10px] text-outline group-hover:text-primary/70">
                      Access control & permissions
                    </span>
                  </div>
                </Link>

                <Link
                  to="/user/admin/transactions"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-on-surface hover:bg-primary/10 hover:text-primary rounded-xl transition-all group"
                >
                  <History
                    size={18}
                    className="text-outline group-hover:text-primary"
                  />
                  <div className="flex flex-col">
                    <span>Transaction History</span>
                    <span className="text-[10px] text-outline group-hover:text-primary/70">
                      Audit system transactions
                    </span>
                  </div>
                </Link>

                <Link
                  to="/user/admin/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-on-surface hover:bg-primary/10 hover:text-primary rounded-xl transition-all group"
                >
                  <UserCircle
                    size={18}
                    className="text-outline group-hover:text-primary"
                  />
                  <div className="flex flex-col">
                    <span>Account Settings</span>
                    <span className="text-[10px] text-outline group-hover:text-primary/70">
                      Security & Preferences
                    </span>
                  </div>
                </Link>
              </div>

              <div className="p-2 border-t border-outline-variant/30 bg-error/5">
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-error hover:bg-error hover:text-on-primary rounded-xl transition-all"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
