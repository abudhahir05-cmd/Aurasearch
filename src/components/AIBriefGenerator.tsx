import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Target, Users, MapPin, Briefcase, TrendingUp, CheckCircle, Lightbulb, Loader2, Download, Play } from 'lucide-react';
import { generateBriefFallback } from '../lib/apiFallback';

export const AIBriefGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState<any>(null);
  const [formData, setFormData] = useState({
    brandName: '',
    city: 'Coimbatore',
    category: 'FMCG',
    goal: ''
  });

  const generateBrief = async () => {
    if (!formData.brandName || !formData.goal) return;
    setLoading(true);
    setBrief(null);
    try {
      const response = await fetch('/api/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }
      const data = await response.json();
      setBrief(data);
    } catch (err) {
      console.warn("API generate-brief failed, falling back to local strategist generator:", err);
      const fallbackData = generateBriefFallback(formData.brandName, formData.city, formData.category, formData.goal);
      setBrief(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="py-12">
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Form Panel */}
        <div className="lg:col-span-2 bg-white rounded-3xl border-l-[6px] border-coral border-y border-r border-border-warm shadow-warm p-8">
           <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted uppercase">Brand Name</label>
                  <input 
                    value={formData.brandName}
                    onChange={e => setFormData({...formData, brandName: e.target.value})}
                    className="w-full bg-warm-beige p-3 rounded-xl border border-border-warm focus:outline-none focus:ring-2 focus:ring-coral/20" 
                    placeholder="e.g. Nykaa, Zomato"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted uppercase">Target City</label>
                  <select 
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    className="w-full bg-warm-beige p-3 rounded-xl border border-border-warm focus:outline-none"
                  >
                    {['Coimbatore', 'Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Kochi', 'Pune'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase">Brand Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-warm-beige p-3 rounded-xl border border-border-warm focus:outline-none"
                >
                  {['FMCG', 'Transport', 'Food & Bev', 'Fashion', 'Finance', 'Health', 'Education', 'Tech', 'Beauty', 'Auto'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase">Campaign Goal</label>
                <textarea 
                  rows={2}
                  value={formData.goal}
                  onChange={e => setFormData({...formData, goal: e.target.value})}
                  className="w-full bg-warm-beige p-3 rounded-xl border border-border-warm focus:outline-none focus:ring-2 focus:ring-coral/20" 
                  placeholder="e.g. Get more ride bookings from college students in Coimbatore"
                />
              </div>

              <button 
                onClick={generateBrief}
                disabled={loading || !formData.brandName || !formData.goal}
                className="w-full bg-coral text-white font-bold py-4 rounded-xl shadow-warm hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <><Sparkles size={20} /> Generate Brief</>}
              </button>
           </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-3 min-h-[400px] relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm rounded-3xl"
              >
                <div className="text-coral animate-pulse font-serif text-xl font-bold mb-4">AuraSearch AI is writing your brief...</div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </motion.div>
            ) : brief ? (
              <motion.div 
                key="brief"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-border-warm p-8 space-y-10"
              >
                {/* Header Row */}
                <div className="flex justify-between items-start">
                   <div>
                      <h3 className="font-serif text-3xl font-bold text-deep-navy mb-3">{brief.brief_title}</h3>
                      <span className="bg-teal/10 text-teal px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">{brief.target_audience}</span>
                   </div>
                   <div className="flex gap-2">
                      <button onClick={handleExport} className="p-2 border border-border-warm rounded-lg hover:bg-warm-beige transition-colors"><Download size={18} className="text-deep-navy"/></button>
                      <button className="p-2 bg-coral text-white rounded-lg hover:scale-105 transition-all"><Play size={18}/></button>
                   </div>
                </div>

                {/* Hook Row */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                  className="p-6 bg-coral/5 border-l-4 border-coral rounded-r-2xl italic font-serif text-xl text-deep-navy"
                >
                  "{brief.campaign_hook}"
                </motion.div>

                {/* Content Pillars */}
                <div className="grid md:grid-cols-3 gap-4">
                   {brief.content_pillars.map((pillar: string, i: number) => (
                      <motion.div 
                        key={pillar}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i * 0.1) }}
                        className="p-4 bg-deep-navy text-white rounded-2xl flex flex-col justify-between aspect-square"
                      >
                         <Target size={24} className="opacity-50" />
                         <div className="text-xs font-bold leading-snug">{pillar}</div>
                      </motion.div>
                   ))}
                </div>

                {/* Profile Box */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                  className="bg-teal/5 p-6 rounded-2xl border border-teal/20"
                >
                   <div className="flex items-center gap-2 mb-3">
                      <Users size={18} className="text-teal" />
                      <span className="text-xs font-bold text-teal uppercase tracking-widest">Ideal Creator Profile</span>
                   </div>
                   <p className="text-sm text-deep-navy leading-relaxed">{brief.creator_profile}</p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-warm-beige/30 rounded-2xl border border-border-warm">
                    <div className="text-[10px] font-bold text-muted uppercase mb-1">Duration</div>
                    <div className="text-sm font-bold text-deep-navy">{brief.campaign_duration}</div>
                  </div>
                  <div className="p-4 bg-warm-beige/30 rounded-2xl border border-border-warm">
                    <div className="text-[10px] font-bold text-muted uppercase">Budget Range</div>
                    <div className="text-sm font-bold text-deep-navy">{brief.estimated_budget_range}</div>
                  </div>
                  <div className="bg-deep-navy p-4 rounded-2xl md:col-span-2 text-white">
                    <div className="text-[10px] font-bold opacity-60 uppercase mb-2">Best Posting Times</div>
                    <div className="flex flex-wrap gap-2">
                       {brief.best_posting_times.map((time: string) => <span key={time} className="text-[10px] bg-white/10 px-2 py-0.5 rounded">{time}</span>)}
                    </div>
                  </div>
                </div>

                {/* Hashtags & Metrics */}
                <div className="space-y-6">
                   <div className="flex flex-wrap gap-2">
                      {brief.top_hashtags.map((tag: string) => <span key={tag} className="text-xs font-bold text-coral bg-coral/5 px-3 py-1 rounded-full">{tag}</span>)}
                   </div>
                   <div className="grid md:grid-cols-3 gap-6">
                      {brief.success_metrics.map((metric: string) => (
                        <div key={metric} className="flex items-center gap-2">
                           <CheckCircle size={16} className="text-teal shrink-0" />
                           <span className="text-xs font-bold text-deep-navy">{metric}</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Pro Tip */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                  className="bg-coral/5 border border-coral/20 p-6 rounded-2xl flex items-start gap-3"
                >
                   <Lightbulb className="text-coral mt-1 shrink-0" size={20} />
                   <div>
                      <div className="text-xs font-bold text-coral uppercase tracking-widest mb-1">SCRAG Pro Tip</div>
                      <p className="text-sm text-deep-navy leading-relaxed">{brief.pro_tip}</p>
                   </div>
                </motion.div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted border-2 border-dashed border-border-warm rounded-[32px] p-8 text-center italic">
                <Sparkles size={48} className="mb-4 opacity-10" />
                Your campaign brief will appear here after generation.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
