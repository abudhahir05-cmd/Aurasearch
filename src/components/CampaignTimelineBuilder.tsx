import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Sparkles, Loader2, ArrowRight, TrendingUp } from 'lucide-react';

export const CampaignTimelineBuilder = () => {
  const [loading, setLoading] = useState(false);
  const [timeline, setTimeline] = useState<any>(null);
  const [inputs, setInputs] = useState({
    brand: '',
    city: 'Coimbatore',
    niche: 'Fashion',
    goal: '',
    duration: '14 Days'
  });

  const buildTimeline = async () => {
    if (!inputs.brand || !inputs.goal) return;
    setLoading(true);
    try {
      const response = await fetch('/api/generate-timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });
      const data = await response.json();
      setTimeline(data);
    } catch (err) {
      console.error(err);
      alert('Timeline engine failed — try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Form Panel */}
        <div className="lg:col-span-2 space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase">Brand</label>
                <input 
                  value={inputs.brand} onChange={e => setInputs({...inputs, brand: e.target.value})}
                  className="w-full bg-warm-beige p-3 rounded-xl border border-border-warm text-sm font-bold focus:outline-none"
                  placeholder="e.g. AuraSearch"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase">Duration</label>
                <select 
                  value={inputs.duration} onChange={e => setInputs({...inputs, duration: e.target.value})}
                  className="w-full bg-warm-beige p-3 rounded-xl border border-border-warm text-sm font-bold focus:outline-none"
                >
                  {['7 Days', '14 Days', '30 Days'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
           </div>
           
           <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted uppercase">Target City</label>
              <select 
                value={inputs.city} onChange={e => setInputs({...inputs, city: e.target.value})}
                className="w-full bg-warm-beige p-3 rounded-xl border border-border-warm text-sm font-bold focus:outline-none"
              >
                {['Coimbatore', 'Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Kochi', 'Pune'].map(c => <option key={c}>{c}</option>)}
              </select>
           </div>

           <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted uppercase">Niche</label>
              <select 
                value={inputs.niche} onChange={e => setInputs({...inputs, niche: e.target.value})}
                className="w-full bg-warm-beige p-3 rounded-xl border border-border-warm text-sm font-bold focus:outline-none"
              >
                {['Fashion', 'Food', 'Tech', 'Travel', 'Fitness', 'Finance', 'Education', 'Beauty', 'Auto'].map(n => <option key={n}>{n}</option>)}
              </select>
           </div>

           <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted uppercase">Campaign Goal</label>
              <textarea 
                rows={3} value={inputs.goal} onChange={e => setInputs({...inputs, goal: e.target.value})}
                className="w-full bg-warm-beige p-3 rounded-xl border border-border-warm text-sm font-bold focus:outline-none"
                placeholder="e.g. Drive awareness for new store opening"
              />
           </div>

           <button 
             onClick={buildTimeline}
             disabled={loading || !inputs.brand || !inputs.goal}
             className="w-full bg-deep-navy text-white font-bold py-4 rounded-xl shadow-lg hover:bg-coral transition-all flex items-center justify-center gap-2 disabled:opacity-50"
           >
             {loading ? <Loader2 size={20} className="animate-spin" /> : <><Sparkles size={20} /> Build Timeline</>}
           </button>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-3 min-h-[400px]">
           <AnimatePresence mode="wait">
             {loading ? (
               <motion.div 
                 key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 className="flex flex-col items-center justify-center h-full space-y-4"
               >
                 <div className="relative w-12 h-12">
                   <div className="absolute inset-0 border-4 border-coral/20 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-t-coral rounded-full animate-spin"></div>
                 </div>
                 <span className="text-muted text-sm font-bold italic">Sequencing campaign events...</span>
               </motion.div>
             ) : timeline ? (
               <motion.div 
                 key="timeline" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                 className="space-y-8"
               >
                 <div className="relative pl-8 space-y-12 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border-warm before:z-0">
                    {timeline.timeline.map((item: any, i: number) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative z-10"
                      >
                         <div className="absolute -left-8 top-1 w-6 h-6 bg-white border-2 border-coral rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-coral rounded-full" />
                         </div>
                         <div className="bg-white p-6 rounded-2xl border border-border-warm shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                               <span className="text-[10px] font-black text-coral uppercase tracking-tighter">{item.day}</span>
                               <span className="text-[10px] font-bold text-muted uppercase">{item.platform}</span>
                            </div>
                            <h4 className="font-bold text-deep-navy mb-1">{item.phase}</h4>
                            <p className="text-sm text-muted mb-3 italic">"{item.action}"</p>
                            <div className="flex justify-between text-[10px] font-bold">
                               <span className="text-teal uppercase">{item.content_type}</span>
                               <span className="text-deep-navy uppercase">{item.goal}</span>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-coral p-6 rounded-3xl text-white">
                       <Clock size={20} className="mb-2" />
                       <div className="text-[10px] font-bold uppercase opacity-60 mb-1">Peak Day</div>
                       <div className="text-lg font-bold">{timeline.peak_day}</div>
                    </div>
                    <div className="bg-deep-navy p-6 rounded-3xl text-white">
                       <TrendingUp size={20} className="mb-2" />
                       <div className="text-[10px] font-bold uppercase opacity-60 mb-1">Warm-up Tip</div>
                       <div className="text-xs leading-relaxed">{timeline.warm_up_tip}</div>
                    </div>
                 </div>

                 <div className="bg-teal/5 border border-teal/10 p-6 rounded-3xl flex gap-4">
                    <div className="w-10 h-10 bg-teal text-white rounded-full flex items-center justify-center shrink-0">
                       <ArrowRight size={20} />
                    </div>
                    <div>
                       <div className="text-[10px] font-bold text-teal uppercase mb-1">Scale Strategy</div>
                       <p className="text-sm text-deep-navy">{timeline.scale_tip}</p>
                    </div>
                 </div>
               </motion.div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-muted border-2 border-dashed border-border-warm rounded-[32px] p-8 text-center italic">
                 <Calendar size={48} className="mb-4 opacity-10" />
                 Campaign timeline will appear here after generation.
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
