import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, Loader2, Mail, MapPin } from 'lucide-react';

export const AvailabilityAlerts = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-[32px] border border-border-warm shadow-warm p-8 md:p-12">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid md:grid-cols-5 gap-12 items-center"
          >
            <div className="md:col-span-2">
               <div className="w-12 h-12 bg-coral/10 text-coral rounded-xl flex items-center justify-center mb-6">
                  <Bell size={24} />
               </div>
               <h3 className="font-serif text-3xl font-bold text-deep-navy mb-4">Never Miss a Regional Star</h3>
               <p className="text-muted text-sm leading-relaxed">Get notified when high-trust creators in your target cities become available for new brand collaborations.</p>
            </div>
            
            <div className="md:col-span-3 space-y-6">
               <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                     <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                     <input 
                       required type="email" value={email} onChange={e => setEmail(e.target.value)}
                       placeholder="Enter your work email"
                       className="w-full bg-warm-beige pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral/20"
                     />
                  </div>
                  <button type="submit" disabled={loading} className="bg-coral text-white font-bold px-8 py-4 rounded-xl shadow-warm flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50">
                     {loading ? <Loader2 size={20} className="animate-spin"/> : "Set Alerts"}
                  </button>
               </form>
               <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest">
                     <div className="w-2 h-2 rounded-full bg-teal" /> City-Specific
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest">
                     <div className="w-2 h-2 rounded-full bg-teal" /> Niche Filters
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest">
                     <div className="w-2 h-2 rounded-full bg-teal" /> Scrag Pulse
                  </div>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
             <div className="w-16 h-16 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} />
             </div>
             <h3 className="font-serif text-2xl font-bold text-deep-navy mb-2">Alerts Configured</h3>
             <p className="text-muted text-sm">We'll alert you at {email} as soon as regional talent match your filters.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
