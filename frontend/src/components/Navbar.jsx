import React from 'react';
import { Home, Store, Shield, PhoneCall } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import DesktopNav from './navigation/DesktopNav';
import MobileNav from './navigation/MobileNav';

const Navbar = () => {
  const { t } = useLanguage();

  const navLinks = [
    { name: t('nav', 'home'), path: '/', icon: <Home className="w-4 h-4" /> },
    { name: t('nav', 'store'), path: '/store', icon: <Store className="w-4 h-4" /> },
    { name: t('nav', 'contact') || 'Contact', path: '/contact', icon: <PhoneCall className="w-4 h-4" /> },
    { name: t('nav', 'admin') || 'Admin', path: '/admin', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <>
      <DesktopNav navLinks={navLinks} />
      <MobileNav navLinks={navLinks} />
    </>
  );
};

export default Navbar;
