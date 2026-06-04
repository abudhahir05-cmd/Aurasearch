import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, Users, Target, Banknote, Percent, Info, Activity, Sparkles } from 'lucide-react';
import { CREATORS_DATA } from '../creatorsData';

export const ROIEstimator = () => {
  const [inputs, setInputs] = useState({
    budget: 100000,
    city: 'Coimbatore',
    niche: 'Food',
    count: 5
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [displayStats, setDisplayStats] = useState<any>(null);
  const [trendData, setTrendData] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [range, setRange] = useState<'7days' | '30days' | 'quarterly'>('30days');

  const calculateROI = (currentTrend = trendData) => {
    setIsCalculating(true);
    
    // Slight delay for "calculation" effect
    setTimeout(() => {
      const cityCreators = CREATORS_DATA.filter(c => c.city === inputs.city && c.niche === inputs.niche);
      const avgScore = cityCreators.reduce((acc, c) => acc + c.scragTotal, 0) / (cityCreators.length || 1);
      const avgEngagement = cityCreators.reduce((acc, c) => acc + c.engagementRate, 0) / (cityCreators.length || 1);
      
      const multiplier = currentTrend ? currentTrend.trendMultiplier : 1.0;
      
      const reach = inputs.budget * 0.8 * (1 + (inputs.count * 0.05)); // Slight bonus for more creators (reach overlap accounted)
      const engagement = reach * (avgEngagement / 100) * multiplier;
      const conversions = engagement * (avgScore / 1000) * multiplier;
      const revenue = conversions * 1500;
      const roi = revenue / inputs.budget;

      setDisplayStats({
        reach: Math.round(reach).toLocaleString(),
        engagement: Math.round(engagement).toLocaleString(),
        conversions: Math.round(conversions).toLocaleString(),
        roi: roi.toFixed(1) + 'x',
        costPerEng: '₹' + (inputs.budget / engagement).toFixed(2),
        revenueImpact: '₹' + Math.round(revenue).toLocaleString(),
        multiplier: roi
      });
      setIsCalculating(false);
    }, 600);
  };

  const analyzeTrend = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-trend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: inputs.city,
          niche: inputs.niche,
          range: range,
        }),
      });
      
      if (!response.ok) {
        let errMsg = 'Failed to analyze trend';
        try {
          const errData = await response.json();
          errMsg = errData.error || errMsg;
        } catch (_) {}
        throw new Error(errMsg);
      }
      
      let data;
      try {
        data = await response.json();
      } catch (err) {
        throw new Error('Server returned an invalid response — please try again.');
      }
      setTrendData(data);
      calculateROI(data);
    } catch (error: any) {
      console.error('Error analyzing trend:', error);
      alert(error.message || 'Error executing intelligence trend request.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRangeChange = (newRange: '7days' | '30days' | 'quarterly') => {
    setRange(newRange);
    setTrendData(null);
  };

  // Initial calculation
  React.useEffect(() => {
    calculateROI();
  }, []);

  const verdict = useMemo(() => {
    if (!displayStats) return null;
    const m = displayStats.multiplier;
    if (m > 5) return { text: 'Exceptional Opportunity: This regional niche is undersaturated. Aggressive spending is recommended.', color: 'text-teal bg-teal/5 border-teal/10' };
    if (m > 3) return { text: 'High Efficiency: Strong niche alignment found. Your budget will deliver high regional trust.', color: 'text-deep-navy bg-white border-border-warm' };
    return { text: 'Moderate Potential: standard regional returns expected. Consider tightening your niche selection.', color: 'text-muted bg-warm-beige border-border-warm' };
  }, [displayStats]);

  return (
    <div className="py-12">
      <div className="grid lg:grid-cols-5 gap-12">
        {/* Input Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-white/5 p-8 rounded-3xl border border-border-warm dark:border-white/10 shadow-warm space-y-8">
           <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-black text-deep-navy dark:text-white uppercase tracking-widest">
                <span>Total Budget</span>
                <span className="text-coral">₹{inputs.budget.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="1000000" 
                step="10000" 
                value={inputs.budget} 
                onChange={e => { setInputs({...inputs, budget: parseInt(e.target.value)}); setTrendData(null); }} 
                className="w-full accent-coral" 
              />
              <div className="flex justify-between text-[10px] font-bold text-muted uppercase">
                 <span>₹10k</span>
                 <span>₹1M</span>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase">Target City</label>
                <select value={inputs.city} onChange={e => { setInputs({...inputs, city: e.target.value}); setTrendData(null); }} className="w-full bg-warm-beige dark:bg-white/5 p-3 rounded-xl border border-border-warm dark:border-white/10 text-sm font-bold dark:text-white focus:outline-none">
                  {['Coimbatore', 'Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Kochi', 'Pune'].map(c => <option key={c} className="text-black">{c}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase">Niche</label>
                <select value={inputs.niche} onChange={e => { setInputs({...inputs, niche: e.target.value}); setTrendData(null); }} className="w-full bg-warm-beige dark:bg-white/5 p-3 rounded-xl border border-border-warm dark:border-white/10 text-sm font-bold dark:text-white focus:outline-none">
                  {['Fashion', 'Food', 'Tech', 'Travel', 'Fitness', 'Finance', 'Education', 'Beauty', 'Auto'].map(n => <option key={n} className="text-black">{n}</option>)}
                </select>
              </div>
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-bold text-muted uppercase">Number of Creators</label>
              <div className="flex gap-2">
                 {[1, 3, 5, 10].map(n => (
                   <button
                     key={n}
                     onClick={() => { setInputs({...inputs, count: n}); setTrendData(null); }}
                     className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border ${inputs.count === n ? 'bg-deep-navy text-white border-deep-navy' : 'bg-warm-beige dark:bg-white/5 text-muted border-border-warm dark:border-white/10 hover:border-coral'}`}
                   >
                     {n}
                   </button>
                 ))}
              </div>
           </div>

           <div className="space-y-4 pt-1.5 border-t border-border-warm dark:border-white/10 mb-2">
             <label className="text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-wider block">Trend Timeframe Filter</label>
             <div className="grid grid-cols-3 gap-1 p-1 bg-warm-beige dark:bg-white/5 rounded-2xl border border-border-warm dark:border-white/10">
                {[
                  { id: '7days', label: '7-Day Spike' },
                  { id: '30days', label: '30-Day Velocity' },
                  { id: 'quarterly', label: 'Quarterly' }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleRangeChange(t.id as any)}
                    className={`py-3 px-1 rounded-xl text-[10px] sm:text-xs font-bold transition-all ${range === t.id ? 'bg-deep-navy text-white dark:bg-white/15 dark:text-white shadow-sm' : 'text-muted hover:text-deep-navy dark:hover:text-white'}`}
                  >
                    {t.label}
                  </button>
                ))}
             </div>
           </div>

           <div className="space-y-3">
             <button 
               onClick={() => calculateROI()}
               disabled={isCalculating || isAnalyzing}
               className="w-full bg-coral text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-lg hover:bg-deep-navy transition-all flex items-center justify-center gap-3 disabled:opacity-50"
             >
               {isCalculating ? (
                 <Activity className="animate-spin" size={20} />
               ) : (
                 <>Calculate Projected ROI</>
               )}
             </button>

             <button 
               onClick={analyzeTrend}
               disabled={isCalculating || isAnalyzing}
               className="w-full bg-deep-navy text-white font-black uppercase tracking-[0.2em] py-4 rounded-2xl border-2 border-teal/20 hover:border-coral transition-all flex items-center justify-center gap-3 disabled:opacity-50"
             >
               {isAnalyzing ? (
                 <Activity className="animate-spin text-coral" size={20} />
               ) : (
                 <>
                   <Sparkles className="text-teal animate-pulse" size={18} />
                   Analyze Trend
                 </>
               )}
             </button>
           </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
           <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Estimated Reach', value: displayStats?.reach, icon: <Users size={20}/>, color: 'text-coral' },
                { label: 'Total Engagements', value: displayStats?.engagement, icon: <Activity size={20}/>, color: 'text-coral' },
                { label: 'Est. Conversions', value: displayStats?.conversions, icon: <Target size={20}/>, color: 'text-teal' },
                { label: 'Cost Per Engagement', value: displayStats?.costPerEng, icon: <Info size={20}/>, color: 'text-deep-navy dark:text-white' },
                { label: 'Revenue Impact', value: displayStats?.revenueImpact, icon: <Banknote size={20}/>, color: 'text-teal' },
                { label: 'ROI Multiplier', value: displayStats?.roi, icon: <Percent size={20}/>, color: 'text-deep-navy dark:text-white' },
              ].map((stat, i) => (
                 <motion.div 
                   key={stat.label}
                   initial={{ opacity: 0, y: 10 }}
                   animate={displayStats ? { opacity: 1, y: 0 } : { opacity: 0 }}
                   transition={{ delay: i * 0.05 }}
                   className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-border-warm dark:border-white/10 shadow-sm"
                 >
                    <div className={`mb-3 ${stat.color}`}>{stat.icon}</div>
                    <div className="text-[10px] font-bold text-muted dark:text-white/40 uppercase mb-1">{stat.label}</div>
                    <div className="text-xl font-black text-deep-navy dark:text-white">
                       {isCalculating ? '...' : stat.value || '0'}
                    </div>
                 </motion.div>
              ))}
           </div>

           {trendData && !isCalculating && (
             <motion.div 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-4 p-6 rounded-3xl border border-teal/20 bg-teal/5 text-deep-navy flex gap-4 items-start"
             >
                <div className="w-10 h-10 rounded-full bg-[#E8614A]/10 flex items-center justify-center shrink-0 shadow-sm text-coral">
                   <Sparkles size={20} className="animate-pulse" />
                </div>
                <div className="flex-1 font-sans">
                   <div className="flex items-center gap-2 mb-1 flex-wrap">
                     <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Gemini Regional Trend Intelligence ({range === '7days' ? '7-Day Spike' : range === '30days' ? '30-Day Velocity' : 'Quarterly Growth'})</span>
                     <span className="bg-coral/15 text-coral text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                       {trendData.growthStatus}
                     </span>
                   </div>
                   <p className="text-sm font-bold leading-relaxed">{trendData.trendInsight}</p>
                   <div className="flex gap-6 mt-3 text-xs opacity-80 border-t border-border-warm dark:border-white/10 pt-2.5">
                     <div>
                       <span className="font-semibold block text-[10px] uppercase text-muted">Recommended Platform</span>
                       <span className="font-black text-coral">{trendData.recommendedPlatform}</span>
                     </div>
                     <div>
                       <span className="font-semibold block text-[10px] uppercase text-muted">Aura Multiplier</span>
                       <span className="font-black text-teal font-mono">+{((trendData.trendMultiplier - 1) * 100).toFixed(0)}% ({trendData.trendMultiplier}x)</span>
                     </div>
                   </div>
                </div>
             </motion.div>
           )}

           {verdict && !isCalculating && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className={`mt-6 p-6 rounded-3xl border flex gap-4 items-start ${verdict.color}`}
             >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                   <TrendingUp size={20} />
                </div>
                <div>
                   <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">SCRAG Regional Verdict</div>
                   <p className="text-sm font-bold leading-relaxed">{verdict.text}</p>
                </div>
             </motion.div>
           )}
        </div>
      </div>
    </div>
  );
};
