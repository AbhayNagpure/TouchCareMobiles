import { PhoneCall, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../components/LanguageProvider';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-foreground mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We are here to help you with your device repairs and purchases. Reach out to us anytime!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Phone */}
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
            <PhoneCall className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Call Us</h3>
          <p className="text-muted-foreground">+91 99999 99999</p>
          <p className="text-muted-foreground">+91 88888 88888</p>
        </div>

        {/* Email */}
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Email Us</h3>
          <p className="text-muted-foreground">support@touchcaremobiles.com</p>
          <p className="text-muted-foreground">kamlesh@touchcaremobiles.com</p>
        </div>

        {/* Address */}
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Visit Us</h3>
          <p className="text-muted-foreground">Main Market, Hatta</p>
          <p className="text-muted-foreground">Balaghat, Madhya Pradesh 481331</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
