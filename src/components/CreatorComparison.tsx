import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Trophy, TrendingUp, Users, Target, Activity, Zap, CheckCircle } from 'lucide-react';
import { CREATORS_DATA, Creator } from '../creatorsData';

export const CreatorComparison = () => {
  const [creatorA, setCreatorA] = useState<Creator | null>(null);
  const [creatorB, setCreatorB] = useState<Creator | null>(null);
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredA = useMemo(() => 
    CREATORS_DATA.filter(c => c.name.toLowerCase().includes(searchA.toLowerCase())).slice(0, 5),
    [searchA]
  );
  
  const filteredB = useMemo(() => 
    CREATORS_DATA.filter(c => c.name.toLowerCase().includes(searchB.toLowerCase())).slice(0, 5),
    [searchB]
  );

  const dimensions = [
    { key: 'scragS', label: 'Social Activity', short: 'S' },
    { key: 'scragC', label: 'Context Relevance', short: 'C' },
    { key: 'scragR', label: 'Regional Influence', short: 'R' },
    { key: 'scragA', label: 'Audience Trust', short: 'A' },
    { key: 'scragG', label: 'Growth Momentum', short: 'G' },
  ];

  const handleCompare = () => {
    if (creatorA && creatorB) setShowResults(true);
  };

  const getWinner = (key: keyof Creator) => {
    if (!creatorA || !creatorB) return null;
    if (creatorA[key] > creatorB[key]) return 'A';
    if (creatorB[key] > creatorA[key]) return 'B';
    return 'Tie';
  };

  return (
    <div className="py-12">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Creator A Search */}
        <div className="relative group">
           <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-border-warm shadow-sm focus-within:ring-2 focus-within:ring-coral/20 transition-all">
              <Search size={20} className="text-muted" />
              <input 
                value={creatorA?.name || searchA}
                onChange={e => { setSearchA(e.target.value); if (creatorA) setCreatorA(null); }}
                placeholder="Select Creator A"
                className="w-full bg-transparent focus:outline-none text-deep-navy font-bold"
              />
           </div>
           {!creatorA && searchA && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-border-warm shadow-xl z-30 overflow-hidden">
                 {filteredA.map(c => (
                    <button 
                      key={c.id} onClick={() => { setCreatorA(c); setSearchA(''); }}
                      className="w-full text-left p-4 hover:bg-warm-beige border-b border-border-warm last:border-none flex justify-between items-center"
                    >
                       <span className="font-bold text-sm">{c.name}</span>
                       <span className="text-[10px] uppercase font-bold text-muted">{c.city}</span>
                    </button>
                 ))}
              </div>
           )}
        </div>

        {/* Creator B Search */}
        <div className="relative group">
           <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-border-warm shadow-sm focus-within:ring-2 focus-within:ring-coral/20 transition-all">
              <Search size={20} className="text-muted" />
              <input 
                value={creatorB?.name || searchB}
                onChange={e => { setSearchB(e.target.value); if (creatorB) setCreatorB(null); }}
                placeholder="Select Creator B"
                className="w-full bg-transparent focus:outline-none text-deep-navy font-bold"
              />
           </div>
           {!creatorB && searchB && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-border-warm shadow-xl z-30 overflow-hidden">
                 {filteredB.map(c => (
                    <button 
                      key={c.id} onClick={() => { setCreatorB(c); setSearchB(''); }}
                      className="w-full text-left p-4 hover:bg-warm-beige border-b border-border-warm last:border-none flex justify-between items-center"
                    >
                       <span className="font-bold text-sm">{c.name}</span>
                       <span className="text-[10px] uppercase font-bold text-muted">{c.city}</span>
                    </button>
                 ))}
              </div>
           )}
        </div>
      </div>

      <div className="flex justify-center mb-16">
         <button 
           onClick={handleCompare}
           disabled={!creatorA || !creatorB}
           className="bg-coral text-white font-bold px-12 py-4 rounded-full shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50"
         >
           ✦ Compare Creators
         </button>
      </div>

      <AnimatePresence mode="wait">
        {showResults && creatorA && creatorB && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="space-y-12"
          >
            <div className="grid md:grid-cols-2 gap-8 relative">
              {/* Radar Chart Placeholder (Visual Decor) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block opacity-10">
                 <svg width="200" height="200" viewBox="0 0 100 100">
                    <polygon points="50,5 95,35 80,95 20,95 5,35" className="fill-none stroke-deep-navy" strokeWidth="1" />
                    <line x1="50" y1="50" x2="50" y2="5" className="stroke-deep-navy" strokeWidth="0.5" />
                    <line x1="50" y1="50" x2="95" y2="35" className="stroke-deep-navy" strokeWidth="0.5" />
                    <line x1="50" y1="50" x2="80" y2="95" className="stroke-deep-navy" strokeWidth="0.5" />
                    <line x1="50" y1="50" x2="20" y2="95" className="stroke-deep-navy" strokeWidth="0.5" />
                    <line x1="50" y1="50" x2="5" y2="35" className="stroke-deep-navy" strokeWidth="0.5" />
                 </svg>
              </div>

              {/* Creator Card A */}
              <div className={`bg-white p-8 rounded-[40px] border shadow-2xl transition-all ${creatorA.scragTotal > creatorB.scragTotal ? 'border-coral ring-4 ring-coral/5 scale-105 z-20' : 'border-border-warm'}`}>
                 {creatorA.scragTotal > creatorB.scragTotal && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-coral text-white text-[10px] font-black uppercase px-4 py-1 rounded-full shadow-lg">Overall Winner</span>}
                 <div className="flex justify-between items-start mb-8">
                    <div>
                       <h4 className="text-2xl font-serif font-bold text-deep-navy">{creatorA.name}</h4>
                       <div className="flex gap-2 mt-2">
                          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{creatorA.city}</span>
                          <span className="text-[10px] font-bold text-teal uppercase tracking-widest">{creatorA.niche}</span>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="text-3xl font-black text-deep-navy">{creatorA.scragTotal}</div>
                       <div className="text-[10px] font-bold text-muted uppercase">SCRAG SCORE</div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    {dimensions.map(dim => (
                       <div key={dim.key} className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-bold text-muted uppercase">
                             <span>{dim.label}</span>
                             <span className={getWinner(dim.key as keyof Creator) === 'A' ? 'text-coral' : ''}>{creatorA[dim.key as keyof Creator] as number}/20</span>
                          </div>
                          <div className="h-2 w-full bg-border-warm rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }} animate={{ width: `${((creatorA[dim.key as keyof Creator] as number) / 20) * 100}%` }}
                               className={`h-full ${getWinner(dim.key as keyof Creator) === 'A' ? 'bg-coral' : 'bg-muted/30'}`}
                             />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Creator Card B */}
              <div className={`bg-white p-8 rounded-[40px] border shadow-2xl transition-all ${creatorB.scragTotal > creatorA.scragTotal ? 'border-coral ring-4 ring-coral/5 scale-105 z-20' : 'border-border-warm'}`}>
                 {creatorB.scragTotal > creatorA.scragTotal && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-coral text-white text-[10px] font-black uppercase px-4 py-1 rounded-full shadow-lg">Overall Winner</span>}
                 <div className="flex justify-between items-start mb-8">
                    <div>
                       <h4 className="text-2xl font-serif font-bold text-deep-navy">{creatorB.name}</h4>
                       <div className="flex gap-2 mt-2">
                          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{creatorB.city}</span>
                          <span className="text-[10px] font-bold text-teal uppercase tracking-widest">{creatorB.niche}</span>
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="text-3xl font-black text-deep-navy">{creatorB.scragTotal}</div>
                       <div className="text-[10px] font-bold text-muted uppercase">SCRAG SCORE</div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    {dimensions.map(dim => (
                       <div key={dim.key} className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-bold text-muted uppercase">
                             <span>{dim.label}</span>
                             <span className={getWinner(dim.key as keyof Creator) === 'B' ? 'text-coral' : ''}>{creatorB[dim.key as keyof Creator] as number}/20</span>
                          </div>
                          <div className="h-2 w-full bg-border-warm rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }} animate={{ width: `${((creatorB[dim.key as keyof Creator] as number) / 20) * 100}%` }}
                               className={`h-full ${getWinner(dim.key as keyof Creator) === 'B' ? 'bg-coral' : 'bg-muted/30'}`}
                             />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Verdict Box */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="bg-teal/5 p-8 rounded-3xl border border-teal/20 text-center"
            >
               <div className="inline-block bg-teal text-white text-[10px] font-black px-4 py-1 rounded-full uppercase mb-4 tracking-widest">AI Verdict</div>
               <p className="text-lg font-serif font-bold text-deep-navy italic max-w-2xl mx-auto">
                 "Based on SCRAG analysis, {creatorA.scragTotal > creatorB.scragTotal ? creatorA.name : creatorB.name} is a stronger fit for hyper-local campaigns due to higher {creatorA.scragR > creatorB.scragR ? 'Regional Influence' : 'Audience Trust'} scores."
               </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
