import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ReviewsSection = () => {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, name: "Rahul S.", text: "Great service! Fixed my screen perfectly and it works like new." },
    { id: 2, name: "Priya M.", text: "Very professional staff and affordable prices. Highly recommend." },
    { id: 3, name: "Amit K.", text: "Quick battery replacement. I didn't have to wait long at all!" }
  ]);
  const [formData, setFormData] = useState({ name: '', message: '' });

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setFeedbacks([{ id: Date.now(), name: formData.name, text: formData.message }, ...feedbacks]);
    setFormData({ name: '', message: '' });
  };

  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Reviews Grid */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-10 text-center">
            Customer Reviews
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feedbacks.slice(0, 3).map((fb, idx) => (
              <motion.div 
                key={fb.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-card p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-yellow-500 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-500" />)}
                  </div>
                  <p className="text-slate-700 dark:text-white/80 mb-6 font-medium leading-relaxed">"{fb.text}"</p>
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">- {fb.name}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Store Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          
          {/* Store Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-blue-600 dark:bg-blue-900/40 rounded-3xl p-8 md:p-10 text-white flex flex-col justify-center gap-8 shadow-xl shadow-blue-900/10"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">Visit Our Shop</h3>
              <p className="text-blue-100">We are open every day and ready to help you.</p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-8 md:gap-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold mb-0.5">Location</div>
                  <div className="font-medium text-sm md:text-base">High School Chowk, Hatta</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold mb-0.5">Hours</div>
                  <div className="font-medium text-sm md:text-base">10:00 AM - 7:00 PM</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold mb-0.5">Call Us</div>
                  <div className="font-medium text-sm md:text-base">+91 74770 90100</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Leave a Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white dark:bg-card rounded-3xl p-8 md:p-10 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-center"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Leave a Review</h3>
            <p className="text-sm text-slate-500 dark:text-white/50 mb-6">Tell us about your repair experience.</p>
            
            <form className="space-y-4" onSubmit={handleFeedbackSubmit}>
              <input 
                required 
                type="text" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="Your Name" 
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" 
              />
              <textarea 
                required 
                value={formData.message} 
                onChange={e => setFormData({...formData, message: e.target.value})} 
                rows="3" 
                placeholder="What did you think?" 
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-shadow"
              ></textarea>
              <Button type="submit" className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-400 font-bold py-5 rounded-xl transition-colors shadow-sm text-sm">
                Submit Review <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
