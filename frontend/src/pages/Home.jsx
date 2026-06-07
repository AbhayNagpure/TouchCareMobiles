import React from 'react';
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
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 px-4 overflow-hidden bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-blue-500/20 dark:bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 dark:bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-600/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm mb-8 border border-blue-100 dark:border-blue-800"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{t('home', 'badge')}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 tracking-tight leading-[1.1]"
            >
              {t('home', 'heroTitle1')} <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 text-transparent bg-clip-text">
                {t('home', 'heroTitle2')}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10"
            >
              {t('home', 'heroSubtitle')}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
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
              className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground font-medium"
            >
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=e2e8f0`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-500">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span>{t('home', 'trustText')}</span>
              </div>
            </motion.div>
          </div>

          {/* 360 Rotating Phone Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:flex justify-center items-center perspective-1000"
          >
            {/* The Phone Mockup */}
            <motion.div 
              animate={{ rotateY: [0, 360] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="relative z-20 w-[320px] h-[640px] bg-black rounded-[3rem] p-4 shadow-2xl border-[8px] border-gray-800 preserve-3d"
            >
              {/* Screen */}
              <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-blue-900 to-black rounded-[2rem] overflow-hidden relative border border-blue-500/30">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10"></div>
                
                {/* Screen Content - Microchip styling */}
                <div className="p-6 pt-16 h-full flex flex-col justify-between text-white relative z-0">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                  
                  <div className="relative z-10 text-center mt-4">
                    <div className="inline-block bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-4 border border-blue-500/50">
                      ADVANCED REPAIRS
                    </div>
                    <h3 className="text-2xl font-black tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                      TouchCareMobiles
                    </h3>
                    <p className="text-sm font-medium text-gray-400">By Kamlesh Dashhare</p>
                  </div>

                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Wrench className="w-5 h-5 text-orange-400" />
                        <p className="text-sm font-bold text-gray-200">IC Level Experts</p>
                      </div>
                      <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-[95%] h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"></div>
                      </div>
                    </div>

                    <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-5 h-5 text-cyan-400" />
                        <p className="text-sm font-bold text-gray-200">Motherboard Diagnostics</p>
                      </div>
                      <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-[100%] h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="mt-2 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-center font-bold rounded-xl text-sm shadow-lg shadow-blue-500/20 cursor-pointer">
                      {t('home', 'chatToBuy')}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
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
