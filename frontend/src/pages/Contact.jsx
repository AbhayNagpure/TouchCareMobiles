import { PhoneCall, MapPin, Clock, Navigation } from 'lucide-react';

const Contact = () => {
  // Simple check for open/close status (Assuming 10 AM to 8 PM, Monday-Saturday)
  const today = new Date();
  const hour = today.getHours();
  const day = today.getDay(); // 0 = Sunday
  const isOpen = day !== 0 && hour >= 10 && hour < 20;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">Contact MobileCareTech</h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          We are here to help you with your device repairs and purchases. Reach out to us anytime!
        </p>
      </div>

      {/* Top Section: 3 Horizontal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* Phone & WhatsApp */}
        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 transition-transform hover:scale-110">
            <PhoneCall className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">Call or Chat</h3>
          <p className="text-muted-foreground text-sm font-medium mb-6">+91 74770 90100</p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-auto">
            <a 
              href="https://wa.me/917477090100?text=Hi! I need help from MobileCareTech."
              target="_blank"
              rel="noreferrer"
              className="flex-1 px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center shadow-sm"
            >
              WhatsApp
            </a>
            <a 
              href="tel:+917477090100"
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center shadow-sm"
            >
              Call Shop
            </a>
          </div>
        </div>

        {/* Store Status & Hours */}
        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 transition-transform hover:scale-110">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">Business Hours</h3>
          
          {isOpen ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold mb-4 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              OPEN NOW
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              CLOSED
            </div>
          )}
          
          <p className="text-muted-foreground text-sm font-medium">Mon - Sat: 10:00 AM - 8:00 PM</p>
          <p className="text-muted-foreground text-sm mt-1">Sunday: Closed</p>
        </div>

        {/* Address */}
        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 transition-transform hover:scale-110">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">Visit MCT</h3>
          <p className="text-muted-foreground text-sm font-medium">High School Chowk, Hatta</p>
          <p className="text-muted-foreground text-sm">Balaghat, Madhya Pradesh 481331</p>
          
          <a 
            href="https://www.google.com/maps/search/?api=1&query=High+School+Chowk,+Hatta,+Balaghat,+Madhya+Pradesh+481331"
            target="_blank"
            rel="noreferrer"
            className="mt-auto pt-4 text-purple-600 hover:text-purple-700 dark:text-purple-400 text-sm font-bold flex items-center gap-1 transition-colors"
          >
            <Navigation className="w-4 h-4" /> Get Directions
          </a>
        </div>

      </div>

      {/* Bottom Section: Full Width Map */}
      <div className="bg-card p-2 md:p-4 rounded-3xl shadow-sm border border-border flex flex-col">
        <div className="w-full rounded-2xl overflow-hidden bg-muted h-[300px] md:h-[500px]">
          <iframe 
            src="https://maps.google.com/maps?q=High%20School%20Chowk,%20Hatta,%20Balaghat,%20Madhya%20Pradesh%20481331&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="MobileCareTech Location Map"
          ></iframe>
        </div>
      </div>

    </div>
  );
};

export default Contact;
