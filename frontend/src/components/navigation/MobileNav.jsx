import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav = ({ navLinks }) => {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/50 z-50 pb-safe">
      <div className="flex items-center h-16 px-2">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`
                flex-1 flex flex-col items-center justify-center h-full gap-1 transition-colors
                ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground'}
              `}
            >
              {link.icon}
              <span className="text-xs font-semibold">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
