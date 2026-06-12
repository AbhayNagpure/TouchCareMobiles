import { PhoneCall, MapPin, Clock, Navigation } from 'lucide-react';

const Contact = () => {
  // Simple check for open/close status (Assuming 10 AM to 8 PM, Monday-Saturday)
  const today = new Date();
  const hour = today.getHours();
  const day = today.getDay(); // 0 = Sunday
  const isOpen = day !== 0 && hour >= 10 && hour < 20;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-extrabold text-foreground mb-2 md:mb-4">Contact MobileCareTech</h1>
        <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
          We are here to help you with your device repairs and purchases. Reach out to us anytime!
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 items-stretch">
        
        {/* Left Column: Contact Cards Stack */}
        <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
          
          {/* Phone & WhatsApp */}
          <div className="bg-card p-4 md:p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2 md:mb-4 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1 md:mb-2">Call or Chat</h3>
            <p className="text-muted-foreground text-xs md:text-sm font-medium mb-3 md:mb-4">+91 74770 90100</p>
            
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full mt-auto">
              <a 
                href="https://wa.me/917477090100?text=Hi! I need help from MobileCareTech."
                target="_blank"
                rel="noreferrer"
                className="w-full px-4 py-2 md:py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs md:text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                WhatsApp
              </a>
              <a 
                href="tel:+917477090100"
                className="w-full px-4 py-2 md:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                Call Shop
              </a>
            </div>
          </div>

          {/* Store Status & Hours */}
          <div className="bg-card p-4 md:p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2 md:mb-4">
              <Clock className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1 md:mb-2">Business Hours</h3>
            
            {isOpen ? (
              <div className="inline-flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] md:text-xs font-bold mb-2 md:mb-3 animate-pulse">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500"></span>
                OPEN NOW
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-[10px] md:text-xs font-bold mb-2 md:mb-3">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500"></span>
                CLOSED
              </div>
            )}
            
            <p className="text-muted-foreground text-xs md:text-sm">Mon - Sat: 10:00 AM - 8:00 PM</p>
            <p className="text-muted-foreground text-xs md:text-sm mt-0.5 md:mt-1">Sunday: Closed</p>
          </div>

          {/* Address */}
          <div className="bg-card p-4 md:p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2 md:mb-4">
              <MapPin className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1 md:mb-2">Visit MCT</h3>
            <p className="text-muted-foreground text-xs md:text-sm">Main Market, Hatta</p>
            <p className="text-muted-foreground text-xs md:text-sm">Balaghat, Madhya Pradesh 481331</p>
            
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Main+Market,+Hatta,+Balaghat,+Madhya+Pradesh+481331"
              target="_blank"
              rel="noreferrer"
              className="mt-auto pt-3 md:pt-4 text-purple-600 hover:text-purple-700 dark:text-purple-400 text-xs md:text-sm font-bold flex items-center gap-1"
            >
              <Navigation className="w-3 h-3 md:w-4 md:h-4" /> Get Directions
            </a>
          </div>

        </div>

        {/* Right Column: Embedded Map */}
        <div className="lg:col-span-3 bg-card p-4 md:p-6 rounded-3xl shadow-sm border border-border flex flex-col mt-4 lg:mt-0">
          <h2 className="text-xl md:text-2xl font-bold pb-4 text-center lg:text-left">Find us on the Map</h2>
          <div className="w-full flex-1 rounded-2xl overflow-hidden bg-muted min-h-[300px] md:min-h-[400px] lg:min-h-full">
            <iframe 
              src="https://maps.google.com/maps?q=Main%20Market,%20Hatta,%20Balaghat,%20Madhya%20Pradesh%20481331&layer=c&cbll=21.80,80.18&cbp=12,0,0,0,0&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '100%' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="MobileCareTech Location Map"
            ></iframe>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Contact;
