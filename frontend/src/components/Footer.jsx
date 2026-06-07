import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-12 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-foreground mb-4">TouchCare Mobile</h2>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          Your local trusted shop for premium second-hand devices and reliable repairs.
        </p>
        <p className="text-sm text-muted-foreground/70">
          © {new Date().getFullYear()} TouchCare. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
