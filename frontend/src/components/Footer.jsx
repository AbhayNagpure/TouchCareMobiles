import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border pt-12 pb-8 mt-auto transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Brand Info */}
          <div>
            <h3 className="text-lg font-extrabold text-foreground tracking-tight mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              MCT <span className="text-muted-foreground font-medium text-sm ml-1">(Mobile Care Tech)</span>
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Your trusted local destination in Hatta, Balaghat for fast, reliable smartphone repairs, quality accessories, and expert technical advice.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:text-right">
            <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="flex flex-col md:items-end gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link to="/store" className="hover:text-blue-500 transition-colors">Our Store</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Mobile Care Tech. All rights reserved.</p>
          <p>Proudly serving Hatta, Balaghat.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
