
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Smartphone, Wrench, ShieldCheck, Zap, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const Home = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <section className="relative min-h-[75vh] flex items-center justify-center pt-8 pb-24 px-4 overflow-hidden bg-background">
        {/* Faded Background Image */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none bg-cover bg-right bg-no-repeat"
          style={{ 
            backgroundImage: "url('/ic_repair.png')",
            maskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 80%, black 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 30%, black 80%, black 100%)",
            opacity: 0.5
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-blue-500/20 dark:bg-blue-600/20 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 dark:bg-purple-600/20 blur-[100px] rounded-full pointer-events-none z-0" />
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-600/20 blur-[100px] rounded-full pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center lg:items-start mb-8"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-2xl opacity-30 dark:opacity-50"></div>
              <img 
                src="/kamlesh.jpg" 
                alt="Kamlesh Dashhare" 
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-background shadow-2xl"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-2">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 text-transparent bg-clip-text">
                TouchCareMobiles
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-bold text-muted-foreground">
              By Kamlesh Dashhare
            </p>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10"
          >
            {t('home', 'heroSubtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full"
          >
            <Link to="/store" className="w-full sm:w-auto">
              <Button size="lg" className="w-full rounded-full font-semibold text-md h-14 px-8 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:-translate-y-1">
                {t('home', 'btnExplore')} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full font-semibold text-md h-14 px-8 bg-background/50 backdrop-blur-sm border-border hover:bg-accent transition-all hover:-translate-y-1">
              {t('home', 'btnRepair')}
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground font-medium"
          >
            <div className="flex -space-x-3">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=e2e8f0`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-center sm:text-left">
              <div className="flex justify-center sm:justify-start text-yellow-500 mb-1">
                {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span>{t('home', 'trustText')}</span>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('home', 'whyTitle')}</h2>
            <p className="text-muted-foreground text-lg">{t('home', 'whySubtitle')}</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: <Smartphone className="w-8 h-8" />, 
                title: t('home', 'feature1Title'), 
                desc: t('home', 'feature1Desc'),
                color: "text-blue-600 dark:text-blue-400",
                bg: "bg-blue-100 dark:bg-blue-900/30"
              },
              { 
                icon: <Wrench className="w-8 h-8" />, 
                title: t('home', 'feature2Title'), 
                desc: t('home', 'feature2Desc'),
                color: "text-orange-600 dark:text-orange-400",
                bg: "bg-orange-100 dark:bg-orange-900/30"
              },
              { 
                icon: <ShieldCheck className="w-8 h-8" />, 
                title: t('home', 'feature3Title'), 
                desc: t('home', 'feature3Desc'),
                color: "text-green-600 dark:text-green-400",
                bg: "bg-green-100 dark:bg-green-900/30"
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="bg-card p-8 rounded-3xl text-center border border-border shadow-sm hover:shadow-md transition-shadow group">
                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-2xl ${feature.bg} ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900 clip-path-slant opacity-5"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-card border border-border p-12 md:p-16 rounded-[3rem] shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">{t('home', 'ctaTitle')}</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t('home', 'ctaSubtitle')}
          </p>
          <Link to="/store">
            <Button size="lg" className="rounded-full h-16 px-10 text-lg shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform">
              {t('home', 'btnViewInventory')} <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
