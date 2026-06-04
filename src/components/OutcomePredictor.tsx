import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Users, Target, Activity, AlertCircle, CheckCircle, Info, Loader2, Sparkles, RefreshCcw } from 'lucide-react';

export const OutcomePredictor = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [inputs, setInputs] = useState({
    score: 75,
    budget: 50000,
    platform: 'Instagram',
    contentType: 'Reel',
    nicheMatch: 15,
    tier: 'Tier 2 (Chennai/Hyderabad/Pune)'
  });

  const predictOutcome = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/predict-outcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });
      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
      alert('Prediction engine failed — try again');
    } finally {
      setLoading(false);
    }
  };

  const getSuccessColor = (prob: number) => {
    if (prob >= 75) return 'text-teal stroke-teal';
    if (prob >= 50) return 'text-deep-navy stroke-deep-navy';
    return 'text-coral stroke-coral';
  };

  const getLabel = (prob: number) => {
    if (prob >= 75) return 'High Success';
    if (prob >= 50) return 'Moderate Success';
    return 'Risky — Reconsider';
  };

  return (
    <div className="py-12">
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Left Panel: Inputs */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-border-warm shadow-warm p-8 space-y-8">
           <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-deep-navy uppercase tracking-widest">
                <span>Creator SCRAG Score</span>
                <span className="text-coral">{inputs.score}</span>
              </div>
              <input 
                type="range" min="0" max="100" value={inputs.score}
                onChange={e => setInputs({...inputs, score: parseInt(e.target.value)})}
                className="w-full accent-coral"
              />
           </div>

           <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-deep-navy uppercase tracking-widest">
                <span>Campaign Budget</span>
                <span className="text-coral">₹{inputs.budget.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="10000" max="1000000" step="10000" value={inputs.budget}
                onChange={e => setInputs({...inputs, budget: parseInt(e.target.value)})}
                className="w-full accent-coral"
              />
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-muted uppercase">Platform</label>
                <div className="flex flex-wrap gap-2">
                   {['Instagram', 'YouTube', 'TikTok'].map(p => (
                      <button 
                        key={p} onClick={() => setInputs({...inputs, platform: p})}
                        className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all border ${inputs.platform === p ? 'bg-deep-navy text-white border-deep-navy' : 'bg-transparent text-muted border-border-warm hover:bg-warm-beige'}`}
                      >
                        {p}
                      </button>
                   ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-muted uppercase">Content Type</label>
                <div className="flex flex-wrap gap-2">
                   {['Video', 'Reel', 'Story', 'Post'].map(c => (
                      <button 
                        key={c} onClick={() => setInputs({...inputs, contentType: c})}
                        className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all border ${inputs.contentType === c ? 'bg-deep-navy text-white border-deep-navy' : 'bg-transparent text-muted border-border-warm hover:bg-warm-beige'}`}
                      >
                        {c}
                      </button>
                   ))}
                </div>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-deep-navy uppercase tracking-widest">
                <span>Niche Match Score</span>
                <span className="text-coral">{inputs.nicheMatch}/20</span>
              </div>
              <input 
                type="range" min="0" max="20" value={inputs.nicheMatch}
                onChange={e => setInputs({...inputs, nicheMatch: parseInt(e.target.value)})}
                className="w-full accent-coral"
              />
              <p className="text-[10px] text-muted">How relevant is this creator to your brand?</p>
           </div>

           <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted uppercase">City Tier</label>
              <select 
                value={inputs.tier}
                onChange={e => setInputs({...inputs, tier: e.target.value})}
                className="w-full bg-warm-beige p-3 rounded-xl border border-border-warm focus:outline-none"
              >
                {['Tier 1 (Mumbai/Delhi/Bangalore)', 'Tier 2 (Chennai/Hyderabad/Pune)', 'Tier 3 (Coimbatore/Kochi)'].map(t => <option key={t}>{t}</option>)}
              </select>
           </div>

           <button 
              onClick={predictOutcome}
              disabled={loading}
              className="w-full bg-coral text-white font-bold py-4 rounded-xl shadow-warm hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCcw size={20} className="animate-spin" /> : <><Sparkles size={20} /> Predict Outcome</>}
            </button>
        </div>

        {/* Right Panel: Output */}
        <div className="lg:col-span-3 min-h-[400px] relative">
           <AnimatePresence mode="wait">
             {loading ? (
               <motion.div 
                 key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm rounded-3xl"
               >
                 <div className="text-coral animate-pulse font-serif text-xl font-bold mb-4">AuraSearch AI is simulating your campaign...</div>
                 <div className="w-16 h-16 border-4 border-coral/20 border-t-coral rounded-full animate-spin"></div>
               </motion.div>
             ) : prediction ? (
               <motion.div 
                 key="prediction" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                 className="bg-white rounded-3xl border border-border-warm p-8 space-y-10"
               >
                  {/* Gauge Section */}
                  <div className="flex flex-col items-center justify-center py-6">
                     <div className="relative w-48 h-48">
                        <svg className="w-full h-full -rotate-90">
                           <circle cx="96" cy="96" r="80" className="fill-none stroke-border-warm" strokeWidth="12" />
                           <motion.circle 
                             cx="96" cy="96" r="80" className={`fill-none ${getSuccessColor(prediction.success_probability)}`} 
                             strokeWidth="12" strokeLinecap="round"
                             initial={{ strokeDashoffset: 502 }}
                             animate={{ strokeDashoffset: 502 - (prediction.success_probability / 100) * 502 }}
                             style={{ strokeDasharray: 502 }}
                             transition={{ duration: 1.2, ease: "easeOut" }}
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-5xl font-black text-deep-navy">{prediction.success_probability}%</span>
                           <span className={`text-[10px] font-bold uppercase tracking-widest ${getSuccessColor(prediction.success_probability)}`}>{getLabel(prediction.success_probability)}</span>
                        </div>
                     </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {[
                       { label: 'Predicted Reach', value: prediction.predicted_reach, icon: <Users size={16}/> },
                       { label: 'Engagement Rate', value: prediction.predicted_engagement_rate, icon: <Activity size={16}/> },
                       { label: 'Estimated Conversions', value: prediction.predicted_conversions, icon: <Target size={16}/> }
                     ].map((stat, i) => (
                        <motion.div 
                          key={stat.label}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + (i * 0.1) }}
                          className="bg-warm-beige/30 border border-border-warm p-4 rounded-2xl"
                        >
                           <div className="flex items-center gap-2 mb-2 text-muted">
                              {stat.icon}
                              <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                           </div>
                           <div className="text-lg font-bold text-deep-navy">{stat.value}</div>
                        </motion.div>
                     ))}
                  </div>

                  {/* ROI Box */}
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                    className="bg-deep-navy p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-xl shadow-deep-navy/10"
                  >
                     <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Estimated ROI</div>
                     <div className="text-4xl font-black text-coral">{prediction.roi_estimate}</div>
                  </motion.div>

                  {/* Factors */}
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-3">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Risk Factors</span>
                        <div className="flex flex-wrap gap-2">
                           {prediction.risk_factors.map((risk: string) => (
                             <span key={risk} className="text-[10px] font-bold text-coral bg-coral/5 border border-coral/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                <AlertCircle size={12}/> {risk}
                             </span>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-3">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Success Factors</span>
                        <div className="flex flex-wrap gap-2">
                           {prediction.success_factors.map((success: string) => (
                             <span key={success} className="text-[10px] font-bold text-teal bg-teal/5 border border-teal/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                <CheckCircle size={12}/> {success}
                             </span>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Verdict & Recommendation */}
                  <div className="pt-8 border-t border-border-warm space-y-6">
                     <div className="text-center font-serif text-lg font-bold text-deep-navy italic">
                        "{prediction.verdict}"
                     </div>
                     <div className="bg-teal/5 p-6 rounded-2xl border border-teal/20 flex gap-4">
                        <Info className="text-teal shrink-0 mt-1" size={20}/>
                        <div>
                           <div className="text-[10px] font-bold text-teal uppercase mb-1">Recommendation</div>
                           <p className="text-sm text-deep-navy leading-relaxed">{prediction.recommendation}</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-muted border-2 border-dashed border-border-warm rounded-[32px] p-8 text-center italic">
                 <TrendingUp size={48} className="mb-4 opacity-10" />
                 Simulation results will appear here after calculation.
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
