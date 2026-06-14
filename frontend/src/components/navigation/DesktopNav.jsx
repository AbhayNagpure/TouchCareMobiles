import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import { LogOut, ChevronDown, MoreVertical } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { useLanguage } from '../LanguageProvider';

const DesktopNav = ({ navLinks }) => {
  const { user, loginWithGoogle, logout } = useAuth();
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: (tokenResponse) => loginWithGoogle(tokenResponse.access_token),
    onError: (error) => console.error('Google Login Failed:', error),
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left: Logo */}
          <Link to="/" className="flex items-center group">
            <span
              className="font-black italic text-3xl tracking-tighter text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-105"
              style={{ transform: 'skewX(-8deg)' }}
            >
              MCT
            </span>
          </Link>

          {/* Center/Right: Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            
            {/* Nav Links (Desktop Only) */}
            <div className="hidden md:flex items-center gap-1 mr-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200
                      ${isActive
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:block w-px h-5 bg-border/60 mx-1" />

            {/* 3-dot menu for Theme & Language */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-background border border-border rounded-xl shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 flex flex-col gap-1">
                    
                    {/* Theme Toggle */}
                    <button
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setTheme(theme === 'dark' ? 'light' : 'dark');
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground">Dark Mode</span>
                      <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                    </button>

                    {/* Language Toggle */}
                    <button
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        toggleLanguage();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground">Language</span>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                        {language === 'en' ? 'EN' : 'HI'}
                      </span>
                    </button>

                  </div>
                </div>
              )}
            </div>

            {/* Auth Button / Profile Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1.5 md:gap-2 rounded-full pl-1 pr-1 md:pr-2 py-1 hover:bg-muted/60 transition-all"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-blue-500/40">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <ChevronDown className={`hidden md:block w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-60 bg-background border border-border rounded-xl shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500/30 flex-shrink-0">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold">
                              {user.name?.charAt(0) || 'U'}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-1.5">
                      <button
                        onMouseDown={async (e) => { e.stopPropagation(); await logout(); setShowDropdown(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
