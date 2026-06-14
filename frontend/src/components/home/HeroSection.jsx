import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import technicianImg from '../../assets/technician.jpg';

const HeroSection = () => {
  return (
    <section className="bg-background min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden relative transition-colors duration-300 pt-10">
      <div className="flex-1 flex items-center justify-center w-full pb-10">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between relative z-10">
          
          {/* LEFT */}
          <div className="flex-1 max-w-xl text-center md:text-left mt-6 md:mt-0 w-full">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[2.2rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 md:mb-5 tracking-tight px-2 sm:px-0"
            >
              <span className="sm:whitespace-nowrap">We Fix Your Phone</span><br />
              <span className="text-blue-600 dark:text-blue-400">Fast and Easy.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-white/60 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-xs sm:max-w-md mx-auto md:mx-0 px-2 sm:px-0"
            >
              We fix screens, batteries, and cameras. <br />
              Fast repair with good parts.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-10 w-full px-4 sm:px-0 max-w-xs sm:max-w-none mx-auto md:mx-0"
            >
              <a 
                href="https://wa.me/917477090100?text=Hi%20MobileCareTech,%20I%20would%20like%20to%20book%20a%20repair%20for%20my%20device." 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-5 text-base rounded-2xl shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1">
                  Book a Repair
                </Button>
              </a>
              <Link to="/store" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-300 dark:border-white/20 text-slate-700 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white px-6 py-5 text-base rounded-2xl transition-all">
                  Shop Devices
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start text-sm font-semibold text-slate-700 dark:text-slate-300 pt-6"
            >
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">• <span className="text-slate-700 dark:text-slate-300">90-Day Guarantee</span></div>
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">• <span className="text-slate-700 dark:text-slate-300">Same-Day Fix</span></div>
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">• <span className="text-slate-700 dark:text-slate-300">Trained Staff</span></div>
            </motion.div>
          </div>

          {/* RIGHT — Realistic Image */}
          <div className="flex-none w-full md:w-[450px] lg:w-[500px] mt-10 md:mt-0 relative z-20">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#1c1c1e] bg-slate-200 dark:bg-black">
              <img 
                src={technicianImg} 
                alt="Mobile Repair Technician" 
                className="w-full h-[300px] md:h-[400px] lg:h-[450px] object-cover hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl p-2 px-3 shadow-lg border border-slate-200 dark:border-white/10">
                <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-none">2000+</p>
                <p className="text-[10px] text-slate-600 dark:text-white/60 font-bold uppercase tracking-wider mt-0.5">Phones Fixed</p>
              </div>
              <div className="absolute bottom-1 right-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl p-2.5 pr-4 flex items-center gap-3 shadow-lg border border-slate-200 dark:border-white/10">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Expert Tech</h4>
                  <p className="text-[11px] text-slate-600 dark:text-white/60">15+ years working</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
