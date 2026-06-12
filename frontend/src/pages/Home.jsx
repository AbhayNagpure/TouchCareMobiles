import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Smartphone, Wrench, ShieldCheck, Zap, Star, ArrowRight, Battery, Droplets, ShoppingBag, MapPin, Clock, Phone, Send } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import gsap from 'gsap';

const Home = () => {
  const { t } = useLanguage();
  const phoneRef = useRef();
  const tool1 = useRef(), tool2 = useRef(), tool3 = useRef();

  const [feedbacks, setFeedbacks] = useState([
    { id: 1, name: "Rahul S.", text: "Great service! Fixed my screen perfectly." },
    { id: 2, name: "Priya M.", text: "Very professional and affordable prices." },
    { id: 3, name: "Amit K.", text: "Quick battery replacement. Highly recommended!" }
  ]);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });

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
    setFormData({ name: '', contact: '', message: '' });
  };

  useEffect(() => {
    gsap.to(phoneRef.current, {
      y: -14, duration: 2.2,
      ease: "sine.inOut", yoyo: true, repeat: -1,
    });
    gsap.to(tool1.current, {
      y: -8, rotation: 30, duration: 2.8,
      ease: "sine.inOut", yoyo: true, repeat: -1,
    });
    gsap.to(tool2.current, {
      y: 8, rotation: -20, duration: 3.2,
      ease: "sine.inOut", yoyo: true, repeat: -1,
    });
    gsap.to(tool3.current, {
      y: -6, rotation: -25, duration: 2.5,
      ease: "sine.inOut", yoyo: true, repeat: -1,
    });
  }, []);

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
      {/* SECTION 1: HERO & TRUST BAR */}
      <section className="bg-slate-50 dark:bg-[#0a0a0a] min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden relative transition-colors duration-300 pt-10">

        {/* Blue glow bg */}
        <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute left-[5%] bottom-0 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

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
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 text-transparent bg-clip-text">Expert Care.</span>
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
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-5 text-base rounded-2xl shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1">
                Book a Repair
              </Button>
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

          {/* RIGHT — CSS 3D Phone */}
          <div className="flex-none w-full md:w-96 flex items-center justify-center relative mt-6 sm:mt-12 md:mt-0 h-[280px] sm:h-[350px] md:h-auto scale-[0.65] sm:scale-90 md:scale-100 origin-center" style={{ perspective: "1000px" }}>
            {/* Glow rings */}
            <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-blue-500/20 dark:border-blue-500/15 animate-[spin_10s_linear_infinite]" />
            <div className="absolute w-80 h-80 md:w-[400px] md:h-[400px] rounded-full border border-cyan-500/10 dark:border-cyan-500/7 animate-[spin_15s_linear_infinite_reverse]" />

            {/* Phone */}
            <div ref={phoneRef} style={{ transform: "rotateY(-25deg) rotateX(10deg)", transformStyle: "preserve-3d" }} className="z-20">
              <div className="w-40 h-80 md:w-48 md:h-96 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-[#1c1c1e] dark:to-[#2a2a2e] rounded-[2rem] border-4 border-slate-300 dark:border-white/10 relative shadow-[20px_20px_60px_rgba(0,0,0,0.1)] dark:shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-800 dark:bg-black rounded-b-xl z-10" />
                {/* Screen */}
                <div className="absolute inset-1.5 bg-gradient-to-b from-blue-50 to-white dark:from-[#0a1526] dark:to-[#0a0a12] rounded-[1.5rem] p-4 flex flex-col gap-3 overflow-hidden">
                  <div className="bg-blue-100 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/25 rounded-xl p-3 shadow-sm">
                    <p className="text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-1"><Wrench className="w-3 h-3" /> Screen Repair</p>
                    <p className="text-slate-500 dark:text-white/40 text-[10px] mt-1">Diagnostics in progress...</p>
                    <div className="h-1.5 bg-blue-200 dark:bg-white/10 rounded-full mt-2 overflow-hidden">
                      <div className="h-full w-3/4 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[["🔋","Battery"],["📷","Camera"],["🔌","Charging"],["🖥️","Display"]].map(([icon,txt]) => (
                      <div key={txt} className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-sm">
                        <div className="text-lg mb-1">{icon}</div>
                        <div className="text-slate-600 dark:text-white/60 text-[9px] font-medium">{txt}</div>
                      </div>
                    ))}
                  </div>

                  
                  {/* MCT Logo / Brand on Screen */}
                  <div className="absolute bottom-6 left-0 w-full flex justify-center opacity-50">
                     <div className="text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase">MCT</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating tools */}
            <div ref={tool1} className="absolute top-0 md:top-10 right-10 md:right-4 text-4xl opacity-80 drop-shadow-xl z-30" style={{ transform: "rotate(25deg)" }}>🔧</div>
            <div ref={tool2} className="absolute bottom-10 md:bottom-20 right-4 md:-right-4 text-4xl opacity-80 drop-shadow-xl z-30" style={{ transform: "rotate(-15deg)" }}>⚙️</div>
            <div ref={tool3} className="absolute top-20 md:top-32 left-10 md:-left-4 text-3xl opacity-80 drop-shadow-xl z-30 text-blue-500" style={{ transform: "rotate(-30deg)" }}>⚡</div>
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
      <section className="min-h-screen py-24 px-4 bg-slate-50 dark:bg-[#050505] transition-colors duration-300 flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text & Features */}
          <div className="flex flex-col text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
              Real Repairs.<br className="hidden lg:block"/> <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 text-transparent bg-clip-text">Real Results.</span>
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

          <div className="relative w-full">
            {/* Carousel Container */}
            <div className="relative h-[400px] sm:h-[450px] lg:h-[550px] w-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl dark:shadow-blue-900/10 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111] group">
              
              {/* Slides */}
              {displayRepairs.map((repair, idx) => (
                <div 
                  key={idx} 
                  className={`absolute inset-0 flex flex-col md:flex-row transition-all duration-1000 ease-in-out ${activeSlide === idx ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}
                >
                  {/* Before */}
                  <div className="flex-1 relative border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10">
                    <img src={repair.before} alt="Before Repair" className="w-full h-full object-cover opacity-90 saturate-50 contrast-125" />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-6 sm:p-8">
                      <div className="bg-red-500 text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-3 py-1 sm:px-4 sm:py-1.5 rounded-full w-max">Before</div>
                    </div>
                  </div>

                  {/* After */}
                  <div className="flex-1 relative">
                    <img src={repair.after} alt="After Repair" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-6 sm:p-8">
                      <div className="flex justify-end">
                        <div className="bg-emerald-500 text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-3 py-1 sm:px-4 sm:py-1.5 rounded-full w-max shadow-lg">After</div>
                      </div>
                      
                      {/* Text Overlay on Bottom of After Image */}
                      <div className="mt-auto">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-1 sm:mb-2 drop-shadow-md">{repair.title}</h3>
                        <p className="text-emerald-400 font-semibold text-sm sm:text-lg flex items-center gap-2 drop-shadow-md">
                          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" /> Fixed: {repair.issue}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Dots */}
              <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20 bg-black/30 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 rounded-full">
                {displayRepairs.map((_, dot) => (
                  <button 
                    key={dot}
                    onClick={() => setActiveSlide(dot)}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${activeSlide === dot ? 'bg-white scale-125 w-4 sm:w-6' : 'bg-white/40 hover:bg-white/70'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Quick Estimate & Location */}
      <section className="min-h-screen py-24 px-4 bg-white dark:bg-[#0a0a0a] relative overflow-hidden flex flex-col justify-center transition-colors duration-300">
        <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-900/10 clip-path-slant pointer-events-none"></div>
        
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
