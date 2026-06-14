import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
const fallbackRepairs = [
  { 
    title: "iPhone 13 Pro Max", 
    issue: "Smashed OLED Screen", 
    before: "https://images.unsplash.com/photo-1592839719941-8e2651039d01?q=80&w=800", 
    after: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800" 
  },
  { 
    title: "Samsung S22 Ultra", 
    issue: "Shattered Back Glass", 
    before: "https://images.unsplash.com/photo-1605170439002-90845e8c0137?q=80&w=800", 
    after: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800" 
  },
  { 
    title: "MacBook Pro M1", 
    issue: "Water Damage Recovery", 
    before: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800", 
    after: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800" 
  }
];

const ShowcaseSection = () => {
  const [fetchedRepairs, setFetchedRepairs] = useState([]);
  const displayRepairs = fetchedRepairs.length > 0 ? fetchedRepairs : fallbackRepairs;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % displayRepairs.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displayRepairs.length]);

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const response = await axios.get('/api/v1/products');
        const data = response.data.data || response.data.products || response.data;
        if (Array.isArray(data)) {
          const validRepairs = data
            .filter(p => p.category === 'REPAIR' && p.imageUrls && p.imageUrls.length >= 2)
            .map(p => ({
              title: p.name,
              issue: p.description || "Repair Service",
              before: p.imageUrls[0],
              after: p.imageUrls[1]
            }));
          if (validRepairs.length > 0) {
            setFetchedRepairs(validRepairs);
          }
        }
      } catch (error) {
        console.error("Failed to fetch repairs:", error);
      }
    };
    fetchRepairs();
  }, []);

  return (
    <section className="min-h-screen py-24 px-4 bg-background transition-colors duration-300 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Text & Features */}
        <div className="flex flex-col text-center lg:text-left max-w-2xl mx-auto lg:mx-0 order-1 lg:order-2">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
            Real Broken Phones.<br className="hidden lg:block"/> <span className="text-blue-600 dark:text-blue-400">Fixed Like New.</span>
          </h2>
          <p className="text-slate-600 dark:text-white/60 text-base sm:text-lg mb-8 lg:mb-10">
            See our work. From completely broken to looking brand new again. We do good work and make your phone alive again.
          </p>
          
          <div className="space-y-6 hidden sm:flex flex-col items-center lg:items-start">
            <div className="flex items-start gap-4 text-left max-w-sm">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">High Quality</h4>
                <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">We use only the best parts to make sure your phone works perfectly.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 text-left max-w-sm">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Fast Fix</h4>
                <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">We know you need your phone. We finish most repairs in just a few hours.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full order-2 lg:order-1 flex flex-col gap-4">
          <motion.div 
            key={activeSlide}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-card border border-slate-200 dark:border-white/10 rounded-lg p-4 sm:p-6 shadow-sm"
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{displayRepairs[activeSlide].title}</h3>
              <p className="text-sm text-slate-600 dark:text-white/60">Fixed: {displayRepairs[activeSlide].issue}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Before</div>
                <img src={displayRepairs[activeSlide].before} alt="Before Repair" className="w-full h-[200px] sm:h-[250px] object-cover rounded border border-slate-200 dark:border-white/10" />
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">After</div>
                <img src={displayRepairs[activeSlide].after} alt="After Repair" className="w-full h-[200px] sm:h-[250px] object-cover rounded border border-slate-200 dark:border-white/10" />
              </div>
            </div>
          </motion.div>

          {/* Simple Navigation Dots */}
          <div className="flex justify-center gap-2 mt-2">
            {displayRepairs.map((_, dot) => (
              <button 
                key={dot}
                onClick={() => setActiveSlide(dot)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${activeSlide === dot ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
