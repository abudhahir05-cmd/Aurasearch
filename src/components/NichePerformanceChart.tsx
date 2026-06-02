import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { CREATORS_DATA } from '../creatorsData';

export const NichePerformanceChart = () => {
  const [activeCity, setActiveCity] = useState('All');
  const cities = ['All', 'Coimbatore', 'Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Kochi', 'Pune'];

  const nicheStats = useMemo(() => {
    const data = activeCity === 'All' ? CREATORS_DATA : CREATORS_DATA.filter(c => c.city === activeCity);
    
    const niches = data.reduce((acc, c) => {
      if (!acc[c.niche]) {
        acc[c.niche] = { name: c.niche, scores: [], count: 0, engagement: 0 };
      }
      acc[c.niche].scores.push(c.scragTotal);
      acc[c.niche].count += 1;
      acc[c.niche].engagement += c.engagementRate;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(niches)
      .map(n => ({
        ...n,
        avgScore: Math.round(n.scores.reduce((a:number, b:number) => a + b, 0) / (n.count || 1)),
        avgEng: (n.engagement / (n.count || 1)).toFixed(1)
      }))
      .sort((a, b) => b.avgScore - a.avgScore);
  }, [activeCity]);

  const topNiche = nicheStats[0];

  return (
    <div className="py-12">
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {cities.map(city => (
            <button 
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${activeCity === city ? 'bg-deep-navy text-white' : 'bg-white border border-border-warm text-muted hover:bg-warm-beige'}`}
            >
              {city}
            </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-6">
          {nicheStats.map((niche, idx) => (
            <div key={niche.name} className="space-y-2 group">
              <div className="flex justify-between items-end text-sm">
                <span className="font-bold text-deep-navy">{niche.name}</span>
                <span className="text-muted font-bold">{niche.avgScore} <span className="text-[10px] uppercase">pts</span></span>
              </div>
              <div className="h-2.5 w-full bg-border-warm rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(niche.avgScore / 100) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                  className="h-full bg-coral relative group-hover:brightness-90 transition-all"
                >
                  {/* Tooltip */}
                  <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pb-2 pointer-events-none">
                    <div className="bg-deep-navy text-white px-2 py-1 rounded text-[8px] whitespace-nowrap">
                      {niche.count} Creators · {niche.avgEng}% Eng
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-teal/5 border-l-4 border-teal p-8 rounded-r-3xl">
            <h4 className="text-teal text-[10px] font-bold tracking-widest uppercase mb-4">Regional Insight</h4>
            <div className="text-deep-navy font-serif text-lg font-bold leading-snug">
              {activeCity === 'All' 
                ? `Across India, ${topNiche?.name} creators are driving the highest trust scores this week.`
                : `In ${activeCity}, ${topNiche?.name} creators average a SCRAG score of ${topNiche?.avgScore}—the highest in the city.`
              }
            </div>
            <p className="mt-4 text-muted text-xs leading-relaxed">
              Based on real-time sentiment analysis of {nicheStats.reduce((acc, n) => acc + n.count, 0)} local creators.
            </p>
          </div>
          
          <div className="bg-coral p-8 rounded-3xl text-white shadow-xl shadow-coral/20">
             <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-2">Editor's Pick</div>
             <div className="text-xl font-bold mb-4 italic leading-tight">"Micro-influencers in {topNiche?.name} have 3.4x higher recall than national celebrities."</div>
             <div className="text-[10px] font-bold uppercase">— AuraSearch AI Insights</div>
          </div>
        </div>
      </div>
    </div>
  );
};
