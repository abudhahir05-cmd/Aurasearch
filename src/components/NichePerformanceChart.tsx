import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Layers, Target, ShieldCheck, Zap, TrendingUp, 
  BarChart2, Star, CheckCircle, RefreshCw, MapPin, Globe, 
  Loader2, Sparkles, AlertTriangle, Compass, ChevronDown, Award, HelpCircle
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { CREATORS_DATA, Creator } from '../creatorsData';

// Dynamic Language mapper
const getCreatorLanguage = (city: string) => {
  if (city === 'Chennai' || city === 'Coimbatore') return 'Tamil';
  if (city === 'Kochi') return 'Malayalam';
  if (city === 'Bangalore') return 'Kannada';
  if (city === 'Hyderabad') return 'Telugu';
  if (city === 'Pune') return 'Marathi';
  if (city === 'Mumbai' || city === 'Delhi') return 'Hindi';
  return 'English';
};

// Enhanced Creators base list
const ENHANCED_CREATORS = CREATORS_DATA.map(c => ({
  ...c,
  language: getCreatorLanguage(c.city)
}));

export const NichePerformanceChart = () => {
  // Global filter states
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  // Filter option sets
  const citiesList = useMemo(() => ['All', ...Array.from(new Set(ENHANCED_CREATORS.map(c => c.city)))], []);
  const nichesList = useMemo(() => ['All', ...Array.from(new Set(ENHANCED_CREATORS.map(c => c.niche)))], []);
  const languagesList = useMemo(() => ['All', ...Array.from(new Set(ENHANCED_CREATORS.map(c => c.language)))], []);

  // Filtered Creators pool
  const filteredCreators = useMemo(() => {
    return ENHANCED_CREATORS.filter(c => {
      const cityMatch = selectedCity === 'All' || c.city === selectedCity;
      const nicheMatch = selectedNiche === 'All' || c.niche === selectedNiche;
      const langMatch = selectedLanguage === 'All' || c.language === selectedLanguage;
      return cityMatch && nicheMatch && langMatch;
    });
  }, [selectedCity, selectedNiche, selectedLanguage]);

  // Group creators into matching the scope filters or other creators for optimal UX
  const { matchingCreators, otherCreators } = useMemo(() => {
    const matching: typeof ENHANCED_CREATORS = [];
    const others: typeof ENHANCED_CREATORS = [];
    
    ENHANCED_CREATORS.forEach(c => {
      const cityMatch = selectedCity === 'All' || c.city === selectedCity;
      const nicheMatch = selectedNiche === 'All' || c.niche === selectedNiche;
      const langMatch = selectedLanguage === 'All' || c.language === selectedLanguage;
      if (cityMatch && nicheMatch && langMatch) {
        matching.push(c);
      } else {
        others.push(c);
      }
    });

    // Sort alphabetically by name
    matching.sort((a, b) => a.name.localeCompare(b.name));
    others.sort((a, b) => a.name.localeCompare(b.name));
    
    return { matchingCreators: matching, otherCreators: others };
  }, [selectedCity, selectedNiche, selectedLanguage]);

  // Creator Selections
  const [creatorAId, setCreatorAId] = useState<number>(1); // Sathish
  const [creatorBId, setCreatorBId] = useState<number>(32); // Harish

  // Dynamic Creator A & B objects
  const creatorA = useMemo(() => {
    return ENHANCED_CREATORS.find(c => c.id === creatorAId) || ENHANCED_CREATORS[0];
  }, [creatorAId]);

  const creatorB = useMemo(() => {
    return ENHANCED_CREATORS.find(c => c.id === creatorBId) || ENHANCED_CREATORS[1] || ENHANCED_CREATORS[0];
  }, [creatorBId]);

  // AI intelligence endpoints state
  const [aiReport, setAiReport] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Fallback Dynamic AI simulation logic
  const simulateAiReport = () => {
    const sDiff = creatorA.scragS - creatorB.scragS;
    const rDiff = creatorA.scragR - creatorB.scragR;
    const aLeadA = getCategoryLeadershipScore(creatorA);
    const aLeadB = getCategoryLeadershipScore(creatorB);

    const matchA_Niche = creatorA.niche;
    const matchB_Niche = creatorB.niche;

    const summaryStr = sDiff > 0 
      ? `${creatorA.name} offers a ${Math.abs(sDiff) * 5}% frequency advantage in social publishing rhythms, which is superb for campaign frequency and top-of-mind recall.`
      : `${creatorB.name} sustains weekly posting frequencies at ${creatorB.postsPerWeek} posts/week, enabling consistent touchpoints.`;

    const relevanceStr = rDiff > 0
      ? `Within local ${creatorA.city} channels, ${creatorA.name}'s dialect authenticity drives robust trust nodes.`
      : `${creatorB.name}'s strategic regional alignment has high organic relevance in ${creatorB.city} territories.`;

    setAiReport({
      creatorAStrengths: `${creatorA.name} stands out as a powerful candidate in local ${matchA_Niche} content circles. ${summaryStr} Audience sentiment maps skew highly favorable.`,
      creatorBStrengths: `${creatorB.name} commands deep engagement at ${creatorB.engagementRate}% in the ${creatorB.city} market. ${relevanceStr} Excels at continuous viewer interactions.`,
      suitabilityAnalysis: aLeadA > aLeadB 
        ? `Recommend ${creatorA.name} for high-frequency conversion actions or launch programs requiring immediate local buzz. Choose ${creatorB.name} for targeted community loyalty trust campaigns.`
        : `Recommend ${creatorB.name} for high-conversion micro-vlogger alignments. Leverage ${creatorA.name} for macro scale awareness programs.`,
      marketPositionA: getMarketPosition(creatorA),
      marketPositionB: getMarketPosition(creatorB),
      categoryLeadershipA: aLeadA,
      categoryLeadershipB: aLeadB
    });
  };

  useEffect(() => {
    let active = true;
    const getAnalysis = async () => {
      if (!creatorA || !creatorB) return;
      setAiLoading(true);
      try {
        const resp = await fetch('/api/benchmark-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ creatorA, creatorB })
        });
        if (!resp.ok) {
          throw new Error();
        }
        const data = await resp.json();
        if (active) {
          setAiReport(data);
        }
      } catch (err) {
        if (active) {
          simulateAiReport();
        }
      } finally {
        if (active) {
          setAiLoading(false);
        }
      }
    };
    getAnalysis();
    return () => {
      active = false;
    };
  }, [creatorAId, creatorBId]);

  // Analytics Helpers
  const getRanking = (creator: any, field: 'city' | 'niche' | 'language') => {
    const matchValue = creator[field];
    const sameGroup = ENHANCED_CREATORS.filter(c => c[field] === matchValue);
    const sorted = [...sameGroup].sort((a, b) => b.scragTotal - a.scragTotal);
    const idx = sorted.findIndex(c => c.id === creator.id);
    return {
      rank: idx + 1,
      total: sorted.length
    };
  };

  const getCategoryLeadershipScore = (creator: any) => {
    const followersScore = Math.min(100, (Math.log10(creator.followers) / 6.5) * 100);
    const engagementScore = Math.min(100, (creator.engagementRate / 14) * 100);
    const scragScore = creator.scragTotal;
    const score = Math.round((scragScore * 0.45) + (followersScore * 0.25) + (engagementScore * 0.3));
    return Math.min(100, Math.max(25, score));
  };

  const getMarketPosition = (creator: any) => {
    const score = getCategoryLeadershipScore(creator);
    if (score >= 82) return "Category Pioneer";
    if (score >= 70) return "High-Impact Specialist";
    if (score >= 55) return "Rising Segment Champion";
    if (score >= 40) return "Consistent Local Anchor";
    return "Niche Explorer";
  };

  // Metric Difference calculations
  const calculateDiff = (valA: number, valB: number) => {
    if (valB === 0) return 0;
    const diff = ((valA - valB) / valB) * 100;
    return parseFloat(diff.toFixed(1));
  };

  // Recharts radar preparation
  const radarData = useMemo(() => {
    return [
      { subject: 'Social Activity', A: creatorA.scragS * 5, B: creatorB.scragS * 5 },
      { subject: 'Context Relevance', A: creatorA.scragC * 5, B: creatorB.scragC * 5 },
      { subject: 'Regional Influence', A: creatorA.scragR * 5, B: creatorB.scragR * 5 },
      { subject: 'Audience Trust', A: creatorA.scragA * 5, B: creatorB.scragA * 5 },
      { subject: 'Growth Momentum', A: creatorA.scragG * 5, B: creatorB.scragG * 5 },
    ];
  }, [creatorA, creatorB]);

  // Recharts bar preparation
  const performanceData = useMemo(() => {
    return [
      {
        name: 'Engagement Rate (%)',
        [creatorA.name]: creatorA.engagementRate,
        [creatorB.name]: creatorB.engagementRate,
      },
      {
        name: 'Weekly Posts (Ratio)',
        [creatorA.name]: creatorA.postsPerWeek,
        [creatorB.name]: creatorB.postsPerWeek,
      },
      {
        name: 'Growth 30D (%)',
        [creatorA.name]: creatorA.growth30dPct,
        [creatorB.name]: creatorB.growth30dPct,
      }
    ];
  }, [creatorA, creatorB]);

  return (
    <div className="py-2 space-y-8 text-slate-800 dark:text-slate-100">
      {/* Intro section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-white dark:bg-deep-navy/30 p-6 rounded-3xl border border-border-warm dark:border-white/10 shadow-sm">
        <div>
          <span className="text-[10px] font-mono font-bold text-coral bg-coral/10 px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
            Enterprise Module
          </span>
          <h2 className="font-serif text-2xl font-bold text-deep-navy dark:text-white leading-tight">
            Creator Benchmark Intelligence
          </h2>
          <p className="text-xs text-muted dark:text-white/60 leading-relaxed mt-1">
            Perform side-by-side competitive audits on SCRAG parameters, niche positioning, local Dialect relevance index, and leadership ranks.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-teal bg-teal/5 border border-teal/10 px-3 py-1.5 rounded-xl shrink-0">
          <Layers size={14} className="text-teal" />
          <span>Benchmark Intelligence Framework v3.2</span>
        </div>
      </div>

      {/* Main Grid Floor */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: FILTERS & SELECTORS (cols-span-3) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-deep-navy/20 p-5 rounded-3xl border border-border-warm dark:border-white/10 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-border-warm dark:border-white/5 pb-3">
              <span className="p-1 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
                <Compass size={16} />
              </span>
              <h3 className="font-serif text-sm font-bold text-deep-navy dark:text-white uppercase tracking-wider">Benchmark Scope</h3>
            </div>

            {/* Segment filters */}
            <div className="space-y-4">
              {/* City Filter */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-wider block">City Segment</label>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-warm-beige dark:bg-white/5 p-2.5 rounded-xl border border-border-warm dark:border-white/10 text-xs font-bold text-deep-navy dark:text-white focus:outline-none appearance-none cursor-pointer pr-8"
                  >
                    {citiesList.map(city => (
                      <option key={city} className="text-deep-navy" value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>
              </div>

              {/* Niche Filter */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-wider block">Content Niche</label>
                <div className="relative">
                  <select
                    value={selectedNiche}
                    onChange={(e) => setSelectedNiche(e.target.value)}
                    className="w-full bg-warm-beige dark:bg-white/5 p-2.5 rounded-xl border border-border-warm dark:border-white/10 text-xs font-bold text-deep-navy dark:text-white focus:outline-none appearance-none cursor-pointer pr-8"
                  >
                    {nichesList.map(niche => (
                      <option key={niche} className="text-deep-navy" value={niche}>{niche}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>
              </div>

              {/* Language Filter */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-wider block">Language Focus</label>
                <div className="relative">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full bg-warm-beige dark:bg-white/5 p-2.5 rounded-xl border border-border-warm dark:border-white/10 text-xs font-bold text-deep-navy dark:text-white focus:outline-none appearance-none cursor-pointer pr-8"
                  >
                    {languagesList.map(lang => (
                      <option key={lang} className="text-deep-navy" value={lang}>{lang}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Selection divider */}
            <div className="border-t border-border-warm dark:border-white/5 pt-4 space-y-4">
              {/* Creator A Selections */}
              <div className="space-y-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-black text-teal uppercase tracking-widest block font-sans">Anchor (Creator A)</label>
                  <span className="text-[8px] font-bold bg-teal/10 text-teal px-1.5 py-0.5 rounded leading-none font-mono">TARGET</span>
                </div>
                <div className="relative">
                  <select
                    value={creatorAId}
                    onChange={(e) => setCreatorAId(parseInt(e.target.value))}
                    className="w-full bg-teal/[0.04] dark:bg-teal/5 p-3 rounded-xl border border-teal/20 text-xs font-bold text-deep-navy dark:text-white focus:outline-none appearance-none cursor-pointer pr-8"
                  >
                    {matchingCreators.length > 0 && (
                      <optgroup label="Scope Matches" className="text-teal font-extrabold bg-white dark:bg-deep-navy">
                        {matchingCreators.map(c => (
                          <option key={c.id} value={c.id} className="text-deep-navy dark:text-white bg-white dark:bg-deep-navy">
                            ✨ {c.name} ({c.city} · {c.niche})
                          </option>
                        ))}
                      </optgroup>
                    )}
                    {otherCreators.length > 0 && (
                      <optgroup label="All Influencers Pool" className="text-muted bg-white dark:bg-deep-navy">
                        {otherCreators.map(c => (
                          <option key={c.id} value={c.id} className="text-deep-navy dark:text-white bg-white dark:bg-deep-navy">
                            {c.name} ({c.city} · {c.niche})
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-teal pointer-events-none" />
                </div>
              </div>

              {/* Creator B Selections */}
              <div className="space-y-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-black text-coral uppercase tracking-widest block font-sans">Benchmark B (Creator B)</label>
                  <span className="text-[8px] font-bold bg-coral/10 text-coral px-1.5 py-0.5 rounded leading-none font-mono">COMPETITOR</span>
                </div>
                <div className="relative">
                  <select
                    value={creatorBId}
                    onChange={(e) => setCreatorBId(parseInt(e.target.value))}
                    className="w-full bg-coral/[0.04] dark:bg-coral/5 p-3 rounded-xl border border-coral/20 text-xs font-bold text-deep-navy dark:text-white focus:outline-none appearance-none cursor-pointer pr-8"
                  >
                    {matchingCreators.length > 0 && (
                      <optgroup label="Scope Matches" className="text-coral font-extrabold bg-white dark:bg-deep-navy">
                        {matchingCreators.map(c => (
                          <option key={c.id} value={c.id} className="text-deep-navy dark:text-white bg-white dark:bg-deep-navy">
                            ✨ {c.name} ({c.city} · {c.niche})
                          </option>
                        ))}
                      </optgroup>
                    )}
                    {otherCreators.length > 0 && (
                      <optgroup label="All Influencers Pool" className="text-muted bg-white dark:bg-deep-navy">
                        {otherCreators.map(c => (
                          <option key={c.id} value={c.id} className="text-deep-navy dark:text-white bg-white dark:bg-deep-navy">
                            {c.name} ({c.city} · {c.niche})
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-coral pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Info tip */}
            <div className="p-3 bg-warm-beige/50 dark:bg-white/5 rounded-2xl border border-border-warm dark:border-white/5">
              <div className="flex gap-2 items-start text-[10px] leading-relaxed text-muted dark:text-white/40">
                <AlertTriangle size={12} className="text-coral shrink-0 mt-0.5" />
                <span>
                  Change the scope dropdown filters to narrow down the target pools of candidate comparisons.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER PANEL: VISUAL COMPARISONS (cols-span-6) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* SCRAG Comparison Matrix */}
          <div className="bg-white dark:bg-deep-navy/20 p-6 rounded-3xl border border-border-warm dark:border-white/10 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-border-warm dark:border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-coral/10 text-coral">
                  <Layers size={16} />
                </span>
                <h3 className="font-serif text-sm font-bold text-deep-navy dark:text-white uppercase tracking-wider">SCRAG Parameter Matrix</h3>
              </div>
              <span className="text-[9px] font-mono font-bold text-muted dark:text-white/40 uppercase tracking-widest bg-warm-beige dark:bg-white/5 px-2 py-1 rounded">
                Scale 0 - 100 Fitting
              </span>
            </div>

            <div className="space-y-4">
              {/* S: Social Activity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-deep-navy dark:text-white/80">Social Activity Frequency (S)</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-teal font-extrabold">{creatorA.scragS * 5}%</span>
                    <span className="text-muted/40">vs</span>
                    <span className="text-coral font-extrabold">{creatorB.scragS * 5}%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-warm-beige dark:bg-white/10 rounded-full relative flex overflow-hidden">
                  <div className="h-full bg-teal" style={{ width: `${creatorA.scragS * 5}%` }} />
                  <div className="h-full bg-coral/60 ml-auto border-l border-white/20" style={{ width: `${creatorB.scragS * 5}%` }} />
                </div>
              </div>

              {/* C: Context Relevance */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-deep-navy dark:text-white/80">Contextual Relevance (C)</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-teal font-extrabold">{creatorA.scragC * 5}%</span>
                    <span className="text-muted/40">vs</span>
                    <span className="text-coral font-extrabold">{creatorB.scragC * 5}%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-warm-beige dark:bg-white/10 rounded-full relative flex overflow-hidden">
                  <div className="h-full bg-teal" style={{ width: `${creatorA.scragC * 5}%` }} />
                  <div className="h-full bg-coral/60 ml-auto border-l border-white/20" style={{ width: `${creatorB.scragC * 5}%` }} />
                </div>
              </div>

              {/* R: Regional Influence */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-deep-navy dark:text-white/80">Regional Tamil/Local Resonance (R)</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-teal font-extrabold">{creatorA.scragR * 5}%</span>
                    <span className="text-muted/40">vs</span>
                    <span className="text-coral font-extrabold">{creatorB.scragR * 5}%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-warm-beige dark:bg-white/10 rounded-full relative flex overflow-hidden">
                  <div className="h-full bg-teal" style={{ width: `${creatorA.scragR * 5}%` }} />
                  <div className="h-full bg-coral/60 ml-auto border-l border-white/20" style={{ width: `${creatorB.scragR * 5}%` }} />
                </div>
              </div>

              {/* A: Audience Trust */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-deep-navy dark:text-white/80">Audience Trust Index (A)</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-teal font-extrabold">{creatorA.scragA * 5}%</span>
                    <span className="text-muted/40">vs</span>
                    <span className="text-coral font-extrabold">{creatorB.scragA * 5}%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-warm-beige dark:bg-white/10 rounded-full relative flex overflow-hidden">
                  <div className="h-full bg-teal" style={{ width: `${creatorA.scragA * 5}%` }} />
                  <div className="h-full bg-coral/60 ml-auto border-l border-white/20" style={{ width: `${creatorB.scragA * 5}%` }} />
                </div>
              </div>

              {/* G: Growth Momentum */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-deep-navy dark:text-white/80">Growth Momentum Trend (G)</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-teal font-extrabold">{creatorA.scragG * 5}%</span>
                    <span className="text-muted/40">vs</span>
                    <span className="text-coral font-extrabold">{creatorB.scragG * 5}%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-warm-beige dark:bg-white/10 rounded-full relative flex overflow-hidden">
                  <div className="h-full bg-teal" style={{ width: `${creatorA.scragG * 5}%` }} />
                  <div className="h-full bg-coral/60 ml-auto border-l border-white/20" style={{ width: `${creatorB.scragG * 5}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Radar & Perf visualization combined grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Visual Radar chart */}
            <div className="bg-white dark:bg-deep-navy/20 p-5 rounded-3xl border border-border-warm dark:border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-widest block mb-4">Radar Parameter Compare</h4>
                <div className="h-48 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                      <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#888888', fontSize: 8, fontWeight: 'bold' }} />
                      <Radar name={creatorA.name} dataKey="A" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.25} />
                      <Radar name={creatorB.name} dataKey="B" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.25} />
                      <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="pt-2 flex justify-center gap-4 text-[9px] font-bold uppercase mt-1">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-teal inline-block" />
                  <span className="text-deep-navy dark:text-white/80">{creatorA.name.split(' ')[0]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-coral inline-block" />
                  <span className="text-deep-navy dark:text-white/80">{creatorB.name.split(' ')[0]}</span>
                </div>
              </div>
            </div>

            {/* Performance metrics stacked visualization */}
            <div className="bg-white dark:bg-deep-navy/20 p-5 rounded-3xl border border-border-warm dark:border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-widest block mb-4">Performance Metrics comparison</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fill: '#888888', fontSize: 8 }} />
                      <YAxis tick={{ fill: '#888888', fontSize: 8 }} />
                      <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                      <Bar dataKey={creatorA.name} fill="#14b8a6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey={creatorB.name} fill="#f43f5e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <span className="text-[9px] text-muted dark:text-white/40 italic block text-center mt-2">
                Comparative ratios mapping engagement rate, active frequency and growth velocity.
              </span>
            </div>
          </div>

          {/* Quick Stats differences matrix box */}
          <div className="bg-white dark:bg-deep-navy/20 p-5 rounded-3xl border border-border-warm dark:border-white/10 shadow-sm">
            <h4 className="text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-widest block mb-3 leading-none">Statistical Divergence Audit (A vs B)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3.5 bg-warm-beige/30 dark:bg-white/5 rounded-2xl border border-border-warm dark:border-white/5 text-center">
                <span className="text-[8px] font-mono font-bold text-muted uppercase block">Follower Diff</span>
                <span className={`text-sm font-mono font-extrabold block mt-0.5 ${creatorA.followers > creatorB.followers ? 'text-teal' : 'text-coral'}`}>
                  {creatorA.followers > creatorB.followers ? '+' : ''}{calculateDiff(creatorA.followers, creatorB.followers)}%
                </span>
              </div>
              <div className="p-3.5 bg-warm-beige/30 dark:bg-white/5 rounded-2xl border border-border-warm dark:border-white/5 text-center">
                <span className="text-[8px] font-mono font-bold text-muted uppercase block">Engagement Diff</span>
                <span className={`text-sm font-mono font-extrabold block mt-0.5 ${creatorA.engagementRate > creatorB.engagementRate ? 'text-teal' : 'text-coral'}`}>
                  {creatorA.engagementRate > creatorB.engagementRate ? '+' : ''}{calculateDiff(creatorA.engagementRate, creatorB.engagementRate)}%
                </span>
              </div>
              <div className="p-3.5 bg-warm-beige/30 dark:bg-white/5 rounded-2xl border border-border-warm dark:border-white/5 text-center">
                <span className="text-[8px] font-mono font-bold text-muted uppercase block">Publish Rhythm Diff</span>
                <span className={`text-sm font-mono font-extrabold block mt-0.5 ${creatorA.postsPerWeek > creatorB.postsPerWeek ? 'text-teal' : 'text-coral'}`}>
                  {creatorA.postsPerWeek > creatorB.postsPerWeek ? '+' : ''}{calculateDiff(creatorA.postsPerWeek, creatorB.postsPerWeek)}%
                </span>
              </div>
              <div className="p-3.5 bg-warm-beige/30 dark:bg-white/5 rounded-2xl border border-border-warm dark:border-white/5 text-center">
                <span className="text-[8px] font-mono font-bold text-muted uppercase block">Growth Pct Diff</span>
                <span className={`text-sm font-mono font-extrabold block mt-0.5 ${creatorA.growth30dPct > creatorB.growth30dPct ? 'text-teal' : 'text-coral'}`}>
                  {creatorA.growth30dPct > creatorB.growth30dPct ? '+' : ''}{calculateDiff(creatorA.growth30dPct, creatorB.growth30dPct)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: AI INTEL & SEGMENT RANKINGS (cols-span-3) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* AI Benchmark Report */}
          <div className="bg-white dark:bg-deep-navy/20 p-5 rounded-3xl border border-border-warm dark:border-white/10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-border-warm dark:border-white/5 pb-3 justify-between">
              <div className="flex items-center gap-1.5 font-serif text-sm font-bold text-deep-navy dark:text-white">
                <Sparkles size={16} className="text-coral" />
                <span>AI Insights Report</span>
              </div>
              {aiLoading && <Loader2 size={12} className="text-coral animate-spin" />}
            </div>

            <AnimatePresence mode="wait">
              {aiLoading ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
                  <Loader2 size={24} className="text-coral animate-spin" />
                  <span className="text-[10px] font-mono text-muted dark:text-white/40 uppercase">Generating comparative summary...</span>
                </div>
              ) : aiReport ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="space-y-4 text-xs leading-relaxed"
                >
                  <div>
                    <span className="text-[9px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded uppercase block w-max mb-1.5 font-mono">
                      {creatorA.name.split(' ')[0]} Stronghold
                    </span>
                    <p className="text-muted dark:text-white/70 italic">
                      "{aiReport.creatorAStrengths}"
                    </p>
                  </div>
                  
                  <div className="border-t border-border-warm dark:border-white/5 pt-3">
                    <span className="text-[9px] font-bold text-coral bg-coral/10 px-2 py-0.5 rounded uppercase block w-max mb-1.5 font-mono">
                      {creatorB.name.split(' ')[0]} Stronghold
                    </span>
                    <p className="text-muted dark:text-white/70 italic">
                      "{aiReport.creatorBStrengths}"
                    </p>
                  </div>

                  <div className="p-3 bg-teal/[0.03] dark:bg-white/[0.02] border border-teal/10 rounded-2xl mt-2">
                    <span className="text-[9px] font-bold text-teal uppercase tracking-widest block mb-1">Campaign Suitability</span>
                    <p className="text-[11px] font-bold dark:text-white/90">
                      {aiReport.suitabilityAnalysis}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Leadership & Competitive Positions */}
          <div className="bg-white dark:bg-deep-navy/20 p-5 rounded-3xl border border-border-warm dark:border-white/10 shadow-sm space-y-4">
            <h4 className="text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-widest block border-b border-border-warm dark:border-white/5 pb-2">Segment Leader Rank</h4>
            
            <div className="space-y-4">
              {/* Creator A Position */}
              <div className="space-y-2 bg-teal/[0.02] dark:bg-teal/5 p-3 rounded-2xl border border-teal/10 relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-deep-navy dark:text-white">{creatorA.name}</span>
                  <span className="text-[9px] font-mono font-bold text-teal bg-teal/10 px-2 py-0.5 rounded">{aiReport?.marketPositionA || getMarketPosition(creatorA)}</span>
                </div>
                
                {/* Ranks indexes */}
                <div className="grid grid-cols-3 gap-1 pt-1 border-t border-teal/5">
                  <div className="text-center p-1 bg-white/40 dark:bg-white/5 rounded">
                    <span className="text-[8px] text-muted block uppercase">City Rank</span>
                    <span className="text-xs font-mono font-extrabold text-teal">
                      #{getRanking(creatorA, 'city').rank} <span className="text-[8px] text-muted font-normal">/{getRanking(creatorA, 'city').total}</span>
                    </span>
                  </div>
                  <div className="text-center p-1 bg-white/40 dark:bg-white/5 rounded">
                    <span className="text-[8px] text-muted block uppercase">Niche Rank</span>
                    <span className="text-xs font-mono font-extrabold text-teal">
                      #{getRanking(creatorA, 'niche').rank} <span className="text-[8px] text-muted font-normal">/{getRanking(creatorA, 'niche').total}</span>
                    </span>
                  </div>
                  <div className="text-center p-1 bg-white/40 dark:bg-white/5 rounded">
                    <span className="text-[8px] text-muted block uppercase">Language</span>
                    <span className="text-xs font-mono font-extrabold text-teal">
                      #{getRanking(creatorA, 'language').rank} <span className="text-[8px] text-muted font-normal">/{getRanking(creatorA, 'language').total}</span>
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 mt-1 border-t border-teal/5 text-[10px]">
                  <span className="text-muted">Leadership Index:</span>
                  <span className="font-mono font-extrabold text-teal">{aiReport?.categoryLeadershipA || getCategoryLeadershipScore(creatorA)}/100</span>
                </div>
              </div>

              {/* Creator B Position */}
              <div className="space-y-2 bg-coral/[0.02] dark:bg-coral/5 p-3 rounded-2xl border border-coral/10 relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-deep-navy dark:text-white">{creatorB.name}</span>
                  <span className="text-[9px] font-mono font-bold text-coral bg-coral/10 px-2 py-0.5 rounded">{aiReport?.marketPositionB || getMarketPosition(creatorB)}</span>
                </div>
                
                {/* Ranks indexes */}
                <div className="grid grid-cols-3 gap-1 pt-1 border-t border-coral/5">
                  <div className="text-center p-1 bg-white/40 dark:bg-white/5 rounded">
                    <span className="text-[8px] text-muted block uppercase">City Rank</span>
                    <span className="text-xs font-mono font-extrabold text-coral">
                      #{getRanking(creatorB, 'city').rank} <span className="text-[8px] text-muted font-normal">/{getRanking(creatorB, 'city').total}</span>
                    </span>
                  </div>
                  <div className="text-center p-1 bg-white/40 dark:bg-white/5 rounded">
                    <span className="text-[8px] text-muted block uppercase">Niche Rank</span>
                    <span className="text-xs font-mono font-extrabold text-coral">
                      #{getRanking(creatorB, 'niche').rank} <span className="text-[8px] text-muted font-normal">/{getRanking(creatorB, 'niche').total}</span>
                    </span>
                  </div>
                  <div className="text-center p-1 bg-white/40 dark:bg-white/5 rounded">
                    <span className="text-[8px] text-muted block uppercase">Language</span>
                    <span className="text-xs font-mono font-extrabold text-coral">
                      #{getRanking(creatorB, 'language').rank} <span className="text-[8px] text-muted font-normal">/{getRanking(creatorB, 'language').total}</span>
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 mt-1 border-t border-coral/5 text-[10px]">
                  <span className="text-muted">Leadership Index:</span>
                  <span className="font-mono font-extrabold text-coral">{aiReport?.categoryLeadershipB || getCategoryLeadershipScore(creatorB)}/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
