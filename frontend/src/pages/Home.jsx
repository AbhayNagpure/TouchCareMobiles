import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wrench, ShieldCheck, Zap, Star, MapPin, Clock, Phone, Send } from 'lucide-react';

import technicianImg from '../assets/technician.jpg';

const Home = () => {

  const [feedbacks, setFeedbacks] = useState([
    { id: 1, name: "Rahul S.", text: "Great service! Fixed my screen perfectly." },
    { id: 2, name: "Priya M.", text: "Very professional and affordable prices." },
    { id: 3, name: "Amit K.", text: "Quick battery replacement. Highly recommended!" }
  ]);
  const [formData, setFormData] = useState({ name: '', message: '' });

  // Carousel State
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

  const [fetchedRepairs, setFetchedRepairs] = useState([]);
  const displayRepairs = fetchedRepairs.length > 0 ? fetchedRepairs : fallbackRepairs;

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % displayRepairs.length);
    }, 6000); // 6 seconds normal speed
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

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setFeedbacks([{ id: Date.now(), name: formData.name, text: formData.message }, ...feedbacks]);
    setFormData({ name: '', message: '' });
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* SECTION 1: HERO & TRUST BAR */}
      <section className="bg-background min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden relative transition-colors duration-300 pt-10">

        <div className="flex-1 flex items-center justify-center w-full pb-10">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between relative z-10">
          
          {/* LEFT */}
          <div className="flex-1 max-w-xl text-center md:text-left mt-6 md:mt-0 w-full">
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 rounded-full mb-4 md:mb-5"
            >
              <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" />
              MobileCareTech
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[2.2rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 md:mb-5 tracking-tight px-2 sm:px-0"
            >
              <span className="sm:whitespace-nowrap">Your Phone Deserves</span><br />
              <span className="text-blue-600 dark:text-blue-400">Expert Care.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-white/60 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-xs sm:max-w-md mx-auto md:mx-0 px-2 sm:px-0"
            >
              Fast, affordable mobile repair with genuine parts.
              Screen, battery, camera — we fix it all with precision.
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
              className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 pt-6 border-t border-slate-200 dark:border-white/10 justify-center md:justify-start"
            >
              {[["2000+","Devices Fixed"],["4.9 ★","Customer Rating"],["1 hr","Avg Repair Time"]].map(([n,l]) => (
                <div key={l} className="text-center md:text-left px-2 sm:px-0">
                  <p className="text-slate-900 dark:text-white text-lg sm:text-xl md:text-2xl font-extrabold">{n}</p>
                  <p className="text-slate-500 dark:text-white/40 text-[10px] sm:text-[11px] md:text-xs mt-0.5 font-medium">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Realistic Image */}
          <div className="flex-none w-full md:w-[450px] lg:w-[500px] mt-10 md:mt-0 relative z-20">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#1c1c1e] bg-slate-200 dark:bg-black">
              {/* Main Image */}
              <img 
                src={technicianImg} 
                alt="Mobile Repair Technician" 
                className="w-full h-[300px] md:h-[400px] lg:h-[450px] object-cover hover:scale-105 transition-transform duration-700" 
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-1 right-2 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl p-2.5 pr-4 flex items-center gap-3 shadow-lg border border-slate-200 dark:border-white/10">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Expert Technician</h4>
                  <p className="text-[11px] text-slate-600 dark:text-white/60">15+ years experience</p>
                </div>
              </div>
            </div>
            
          </div>
          </div>
        </div>

        {/* Trust Bar (Now inside Section 1) */}
        <div className="w-full border-t border-slate-200 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-md py-4 sm:py-5 px-4 relative z-20">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 md:gap-16 text-[10px] sm:text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">
            <div className="flex items-center gap-1.5 sm:gap-2"><ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" /> 90-Day Warranty</div>
            <div className="flex items-center gap-1.5 sm:gap-2"><Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" /> Same-Day Repairs</div>
            <div className="flex items-center gap-1.5 sm:gap-2"><Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" /> Certified Techs</div>
            <div className="flex items-center gap-1.5 sm:gap-2"><Star className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" /> 5-Star Service</div>
          </div>
        </div>
      </section>



      {/* SECTION 2: Before & After Showcase */}
      <section className="min-h-screen py-24 px-4 bg-background transition-colors duration-300 flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text & Features (Now shifted to right on desktop) */}
          <div className="flex flex-col text-center lg:text-left max-w-2xl mx-auto lg:mx-0 order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
              Real Repairs.<br className="hidden lg:block"/> <span className="text-blue-600 dark:text-blue-400">Real Results.</span>
            </h2>
            <p className="text-slate-600 dark:text-white/60 text-base sm:text-lg mb-8 lg:mb-10">
              See the magic we do everyday. From completely shattered to brand new. We pride ourselves on transparent, high-quality repairs that bring your devices back to life.
            </p>
            
            <div className="space-y-6 hidden sm:flex flex-col items-center lg:items-start">
              <div className="flex items-start gap-4 text-left max-w-sm">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Premium Quality</h4>
                  <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">We use only top-grade, rigorously tested components to ensure your device runs like new.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 text-left max-w-sm">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 flex-shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Fast Turnaround</h4>
                  <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">We know you need your phone. Most of our standard repairs are completed within just a few hours.</p>
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

      {/* SECTION 3: Quick Estimate & Location */}
      <section className="min-h-screen py-24 px-4 bg-background relative overflow-hidden flex flex-col justify-center transition-colors duration-300">
        
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Feedbacks List */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full max-h-[500px] pr-2 lg:pr-6"
          >
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">
              What Customers Say.
            </h3>
            
            <div className="flex-1 overflow-y-auto pr-4 space-y-5 custom-scrollbar">
              {feedbacks.map(fb => (
                <div key={fb.id} className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-900 dark:text-white text-xs font-bold flex-shrink-0">
                      {fb.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white block">{fb.name}</span>
                      <div className="flex text-yellow-500 text-[10px] mt-0.5">
                        <Star className="w-2.5 h-2.5 fill-yellow-500" /><Star className="w-2.5 h-2.5 fill-yellow-500" /><Star className="w-2.5 h-2.5 fill-yellow-500" /><Star className="w-2.5 h-2.5 fill-yellow-500" /><Star className="w-2.5 h-2.5 fill-yellow-500" />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">"{fb.text}"</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Store Info & Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8 justify-center"
          >
            {/* Store Info */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Visit Our Store.</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-xs text-slate-900 dark:text-white mb-0.5">Location</div>
                    <p className="text-sm text-slate-600 dark:text-white/50">high school chowk, Hatta, Balaghat (MP).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-xs text-slate-900 dark:text-white mb-0.5">Hours</div>
                    <p className="text-sm text-slate-600 dark:text-white/50">Daily: 10:00 AM - 7:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-xs text-slate-900 dark:text-white mb-0.5">Call Us</div>
                    <p className="text-sm text-slate-600 dark:text-white/50">+91 74770 90100</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Leave a Review</h3>
              <form className="space-y-3" onSubmit={handleFeedbackSubmit}>
                <div className="flex flex-col gap-3">
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your Name" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-lg px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow" />
                </div>
                <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows="2" placeholder="Share your experience..." className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-lg px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none transition-shadow"></textarea>
                <Button type="submit" size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-transform hover:-translate-y-0.5 shadow-sm shadow-blue-500/20 text-xs">
                  Post Review <Send className="w-3 h-3 ml-2" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
