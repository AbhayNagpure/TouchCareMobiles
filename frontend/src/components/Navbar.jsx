import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, Store, Settings, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from './LanguageProvider';

const Navbar = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const navLinks = [
    { name: t('nav', 'home'), path: '/', icon: <Smartphone className="w-5 h-5" /> },
    { name: t('nav', 'store'), path: '/store', icon: <Store className="w-5 h-5" /> },
    { name: t('nav', 'admin'), path: '/admin', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">TouchCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-blue-600' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-2 border-l border-border pl-6">
              <LanguageToggle />
              <ThemeToggle />
              <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium transition">
                <User className="w-4 h-4" />
                {t('nav', 'signIn')}
              </button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Mobile Bottom Navigation (Visible only on small screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-50 pb-safe">
        <div className="flex justify-between items-center h-16 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                location.pathname === link.path ? 'text-blue-600' : 'text-muted-foreground'
              }`}
            >
              {link.icon}
              <span className="text-[10px] font-medium">{link.name}</span>
            </Link>
          ))}
          <div className="w-px h-8 bg-border mx-2"></div>
          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
