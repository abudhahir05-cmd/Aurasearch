import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Layers, Target, ShieldCheck, Zap, TrendingUp, HelpCircle,
  BarChart2, Star, CheckCircle, RefreshCw, MapPin, Globe, Search,
  Loader2, Sparkles, AlertTriangle, Compass, ChevronDown, Award, Users,
  ArrowUpRight, ArrowDownRight, Eye, Calendar, BookOpen, AlertCircle, Sparkle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, BarChart, Bar, Legend, RadarChart, PolarGrid, PolarAngleAxis, Radar
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

// Enhanced native list with language injection
const FULL_CREATORS = CREATORS_DATA.map(c => ({
  ...c,
  language: getCreatorLanguage(c.city)
}));

export const ScragCalculatorModule = () => {
  // Filters and Autocomplete Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');

  // Active / Selected creator
  const [selectedCreatorId, setSelectedCreatorId] = useState<number>(FULL_CREATORS[0].id);
  const [activeCreator, setActiveCreator] = useState<any>(FULL_CREATORS[0]);

  // UI generated report state
  const [scragAnalysis, setScragAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Lists for drop-downs
  const citiesList = useMemo(() => ['All', ...Array.from(new Set(FULL_CREATORS.map(c => c.city)))], []);
  const nichesList = useMemo(() => ['All', ...Array.from(new Set(FULL_CREATORS.map(c => c.niche)))], []);
  const languagesList = useMemo(() => ['All', ...Array.from(new Set(FULL_CREATORS.map(c => c.language)))], []);
  const tiersList = ['All', 'Mega (>100K)', 'Macro (50K-100K)', 'Micro (<50K)'];

  // Match followers to tier
  const getCreatorTier = (followersCount: number) => {
    if (followersCount >= 100000) return 'Mega (>100K)';
    if (followersCount >= 50000) return 'Macro (50K-100K)';
    return 'Micro (<50K)';
  };

  // Search autocomplete & filtered dropdown lists
  const filteredList = useMemo(() => {
    return FULL_CREATORS.filter(c => {
      const matchSearch = searchTerm === '' || 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchCity = selectedCity === 'All' || c.city === selectedCity;
      const matchLanguage = selectedLanguage === 'All' || c.language === selectedLanguage;
      const matchNiche = selectedNiche === 'All' || c.niche === selectedNiche;
      const matchTier = selectedTier === 'All' || getCreatorTier(c.followers) === selectedTier;

      return matchSearch && matchCity && matchLanguage && matchNiche && matchTier;
    });
  }, [searchTerm, selectedCity, selectedLanguage, selectedNiche, selectedTier]);

  // Determine active creator when selection triggers
  const handleCreatorChange = (id: number) => {
    const found = FULL_CREATORS.find(c => c.id === id);
    if (found) {
      setSelectedCreatorId(id);
      setActiveCreator(found);
    }
  };

  // Fallback Dynamic AI simulation logic
  const simulateScragAnalysis = (c: any) => {
    const isHighS = c.scragS >= 14;
    const isHighC = c.scragC >= 14;
    const isHighR = c.scragR >= 14;
    
    const strengths = isHighS 
      ? `• Exemplary publishing rhythm (${c.postsPerWeek} posts/week) drives maximum share of voice.\n• Strong contextual relevance (${c.scragC * 5}%) within the local ${c.niche} category.` 
      : `• Deep local regional trust node in ${c.city} with robust sentiment ratios.\n• Highly efficient content authority in ${c.niche}.`;
      
    const weaknesses = c.scragG < 10 
      ? `Velocity expansion has plateaued briefly; recommends optimizing interactive hashtag rallies to revitalize fresh audience growth.`
      : `Regional scope is heavily concentrated in ${c.city}; campaign expansions beyond this base must rely on specific language subtitles.`;

    const suitabilityScore = Math.round((c.scragC * 3) + (c.scragA * 1.5) + (c.scragR * 0.5));

    setScragAnalysis({
      strengths,
      weaknesses,
      audienceQuality: `Audience sentiment sits at ${c.audienceSentiment}. Dialect resonance index exhibits a very strong attachment curve among highly specific native search demographics inside ${c.city}.`,
      campaignSuitability: `Ideal for specialized local consumer programs, particularly activations requiring genuine ${c.niche} authority and hyper-focused local consumer conversion pipelines.`,
      recommendedCampaignType: isHighR ? "Premium Dialect Authenticity Rally" : "Niche Advocacy & Social Proof Wave",
      riskLevel: c.scragA < 10 ? "Medium" : "Low",
      estimatedQualityTier: c.scragTotal >= 80 ? "Elite Leader" : c.scragTotal >= 70 ? "High Potential Anchor" : "Steady Growth Creator",
      campaignSuitabilityScore: Math.min(100, Math.max(45, suitabilityScore))
    });
  };

  // Run SCRAG calculation & fetch intelligence from backend
  const runScragCalculations = async () => {
    if (!activeCreator) return;
    setLoading(true);
    try {
      const resp = await fetch('/api/scrag-calculator-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ creator: activeCreator })
      });
      if (!resp.ok) {
        throw new Error("API call failed");
      }
      const data = await resp.json();
      setScragAnalysis(data);
    } catch (err) {
      console.warn("Falling back to local simulated SCRAG audit.");
      simulateScragAnalysis(activeCreator);
    } finally {
      setLoading(false);
    }
  };

  // Automatically trigger audit on initial mount or creator switch
  useEffect(() => {
    runScragCalculations();
  }, [selectedCreatorId]);

  // Calculate comparative averages dynamically
  const benchmarkStats = useMemo(() => {
    if (!activeCreator) return { cityAvg: 70, nicheAvg: 70, platformAvg: 70, delta: 0 };
    
    // Platform statistics
    const totals = FULL_CREATORS.map(c => c.scragTotal);
    const platformAvg = Math.round(totals.reduce((a, b) => a + b, 0) / totals.length);

    // City statistics
    const cityGroup = FULL_CREATORS.filter(c => c.city === activeCreator.city);
    const cityAvg = Math.round(cityGroup.map(c => c.scragTotal).reduce((a, b) => a + b, 0) / cityGroup.length);

    // Niche statistics
    const nicheGroup = FULL_CREATORS.filter(c => c.niche === activeCreator.niche);
    const nicheAvg = Math.round(nicheGroup.map(c => c.scragTotal).reduce((a, b) => a + b, 0) / nicheGroup.length);

    // Performance Delta
    const delta = activeCreator.scragTotal - platformAvg;

    return { cityAvg, nicheAvg, platformAvg, delta };
  }, [activeCreator]);

  // Generate deterministic 12-month historical data feed
  const historicalData = useMemo(() => {
    if (!activeCreator) return [];
    
    const months = ['Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'May 26', 'Jun 26'];
    const baseFollowers = activeCreator.followers;
    const growthPulse = activeCreator.growth30dPct;
    const baseEngagement = activeCreator.engagementRate;
    const postsPerWeek = activeCreator.postsPerWeek;

    return months.map((m, idx) => {
      const stepFactor = (idx - 11) * -1; // count backwards from Jun 2026
      const calculatedFollowers = Math.round(baseFollowers / (1 + (growthPulse / 100) * (stepFactor / 4)));
      const calculatedEngagement = parseFloat((baseEngagement + Math.sin(activeCreator.id + idx) * 0.5).toFixed(2));
      const calculatedPosts = Math.max(1, Math.round(postsPerWeek + Math.sin(activeCreator.id * 3 + idx) * 2));
      const calculatedTrust = Math.min(100, Math.max(30, Math.round(activeCreator.scragA * 5 + Math.cos(activeCreator.id + idx) * 5)));

      return {
        month: m,
        followers: calculatedFollowers,
        engagement: calculatedEngagement,
        postsCount: calculatedPosts,
        trustScore: calculatedTrust
      };
    });
  }, [activeCreator]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCity('All');
    setSelectedLanguage('All');
    setSelectedNiche('All');
    setSelectedTier('All');
    handleCreatorChange(FULL_CREATORS[0].id);
  };

  return (
    <div id="scrag-calculator" className="bg-transparent text-deep-navy space-y-8 font-sans transition-colors duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-warm-beige border border-border-warm p-6 rounded-2xl shadow-sm">
        <div>
          <span className="text-[10px] font-mono font-bold text-coral bg-coral/10 px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
            Intelligence Console
          </span>
          <h2 className="font-serif text-2xl font-bold text-deep-navy leading-tight">
            SCRAG Calculator
          </h2>
          <p className="text-xs text-muted mt-1">
            Analyze creator quality, audience trust, regional influence, and growth momentum using the proprietary SCRAG Framework.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-coral bg-coral/5 border border-coral/15 px-3 py-1.5 rounded-xl">
          <Award size={14} className="text-coral animate-pulse" />
          <span>SaaS Grade Performance Workstation</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANEL: SELECTOR (cols-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-border-warm shadow-warm space-y-5">
            <div className="flex items-center gap-2 border-b border-border-warm pb-3">
              <span className="p-1.5 rounded bg-coral/10 text-coral">
                <Search size={16} />
              </span>
              <h3 className="font-serif text-sm font-bold text-deep-navy uppercase tracking-wider">Creator Search</h3>
            </div>

            {/* Typeahead Search */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted uppercase tracking-wider block">Search Creator (Name/Niche/City)</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Priyal, Fashion, Kochi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-warm-beige text-deep-navy p-2.5 pl-9 rounded-xl border border-border-warm text-xs font-medium focus:outline-none focus:border-coral placeholder-muted/60"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-muted uppercase tracking-widest block font-sans">City</label>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-warm-beige text-deep-navy p-2 rounded-lg border border-border-warm text-[11px] appearance-none focus:outline-none focus:border-coral"
                  >
                    {citiesList.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-muted uppercase tracking-widest block font-sans">Language</label>
                <div className="relative">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full bg-warm-beige text-deep-navy p-2 rounded-lg border border-border-warm text-[11px] appearance-none focus:outline-none focus:border-coral"
                  >
                    {languagesList.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-muted uppercase tracking-widest block font-sans">Niche</label>
                <div className="relative">
                  <select
                    value={selectedNiche}
                    onChange={(e) => setSelectedNiche(e.target.value)}
                    className="w-full bg-warm-beige text-deep-navy p-2 rounded-lg border border-border-warm text-[11px] appearance-none focus:outline-none focus:border-coral"
                  >
                    {nichesList.map(niche => (
                      <option key={niche} value={niche}>{niche}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-muted uppercase tracking-widest block font-sans">Tier</label>
                <div className="relative">
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full bg-warm-beige text-deep-navy p-2 rounded-lg border border-border-warm text-[11px] appearance-none focus:outline-none focus:border-coral"
                  >
                    {tiersList.map(tier => (
                      <option key={tier} value={tier}>{tier}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Selector Dropdown with Avatar */}
            <div className="border-t border-border-warm pt-4 space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider block">Selected Creator Target</label>
                <div className="relative">
                  <select
                    value={selectedCreatorId}
                    onChange={(e) => handleCreatorChange(parseInt(e.target.value))}
                    className="w-full bg-warm-beige text-deep-navy p-3 rounded-xl border border-border-warm text-xs font-bold appearance-none cursor-pointer pr-10 focus:outline-none focus:border-coral"
                  >
                    {filteredList.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.niche} · {c.city})
                      </option>
                    ))}
                    {filteredList.length === 0 && (
                      <option value="" disabled>No matches</option>
                    )}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                </div>
              </div>

              {/* Creator details card */}
              {activeCreator && (
                <div className="bg-warm-beige/60 p-3.5 rounded-xl border border-border-warm flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-coral to-teal p-0.5 shrink-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-sm text-deep-navy">
                      {activeCreator.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-deep-navy leading-tight">{activeCreator.name}</h4>
                    <p className="text-[10px] text-muted mt-0.5">
                      {activeCreator.platform} · {activeCreator.followers.toLocaleString()} followers
                    </p>
                    <div className="flex gap-1.5 mt-1.5">
                      <span className="text-[8px] font-mono bg-white text-coral px-1.5 py-0.5 rounded leading-none border border-border-warm">
                        {activeCreator.city}
                      </span>
                      <span className="text-[8px] font-mono bg-white text-muted px-1.5 py-0.5 rounded leading-none border border-border-warm">
                        {activeCreator.niche}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Primary triggers block */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={runScragCalculations}
                disabled={loading}
                className="bg-coral hover:bg-coral/90 font-bold text-[11px] text-white py-2.5 px-4 rounded-xl cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1 shrink-0 disabled:opacity-50 shadow-sm"
              >
                {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                <span>Analyze SCRAG</span>
              </button>
              <button
                onClick={resetFilters}
                className="bg-white border border-border-warm font-bold text-[11px] text-muted py-2.5 px-4 rounded-xl hover:bg-warm-beige transition-colors flex items-center justify-center gap-1 shrink-0"
              >
                <RefreshCw size={12} className="text-muted" />
                <span>Reset Filters</span>
              </button>
            </div>

          </div>
        </div>

        {/* CENTER PANEL: SCRAG SCORE ENGINE (cols-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border-warm shadow-warm space-y-6">
            
            <div className="flex justify-between items-center border-b border-border-warm pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-coral/10 text-coral">
                  <Trophy size={16} />
                </span>
                <h3 className="font-serif text-sm font-bold text-deep-navy uppercase tracking-wider">SCRAG Score Engine</h3>
              </div>
              <span className="text-[9px] font-mono font-bold text-muted tracking-widest uppercase bg-warm-beige px-2 py-1 rounded">
                Dynamic Matrix Model
              </span>
            </div>

            {/* Radial SVG visualization */}
            {activeCreator && (
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-around p-4 gap-6">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle 
                      cx="88" cy="88" r="76" 
                      className="fill-none stroke-deep-navy/5" 
                      strokeWidth="10" 
                    />
                    <motion.circle 
                      cx="88" cy="88" r="76" 
                      className="fill-none stroke-coral" 
                      strokeWidth="10" 
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 1000" }}
                      animate={{ strokeDasharray: `${(activeCreator.scragTotal / 100) * 478} 1000` }}
                      transition={{ type: "spring", damping: 25, stiffness: 100 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-black text-deep-navy leading-none tracking-tight">
                      {activeCreator.scragTotal}
                    </span>
                    <span className="text-[9px] font-bold text-muted uppercase tracking-widest mt-1">
                      SCRAG SCORE
                    </span>
                  </div>
                </div>

                {/* Score indicators list */}
                <div className="space-y-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-[#10B981] inline-block shrink-0" />
                    <div>
                      <span className="text-[10px] text-muted block uppercase font-mono">Performance Class</span>
                      <span className="text-xs font-bold text-deep-navy">
                        {activeCreator.scragTotal >= 80 ? 'Grade A: Market Pioneer' : activeCreator.scragTotal >= 65 ? 'Grade B: Solid Advocacy' : 'Grade C: Niche Micro'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-coral inline-block shrink-0" />
                    <div>
                      <span className="text-[10px] text-muted block uppercase font-mono">Engagement Status</span>
                      <span className="text-xs font-bold text-deep-navy">
                        {activeCreator.engagementRate}% (High Resonance)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Breakthrough parameter cards */}
            {activeCreator && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Social Activity */}
                <div className="p-4 bg-warm-beige/50 rounded-xl border border-border-warm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Social Activity (S)</span>
                    <span className="text-xs font-mono font-black text-deep-navy">{activeCreator.scragS * 5}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-deep-navy/5 rounded-full overflow-hidden">
                    <div className="h-full bg-coral" style={{ width: `${activeCreator.scragS * 5}%` }} />
                  </div>
                  <div className="flex justify-between text-[8px] text-muted font-mono">
                    <span>Trend: Consistent</span>
                    <span className="text-teal font-bold">+3% vs platform avg</span>
                  </div>
                </div>

                {/* Contextual Relevance */}
                <div className="p-4 bg-warm-beige/50 rounded-xl border border-border-warm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Contextual Relevance (C)</span>
                    <span className="text-xs font-mono font-black text-deep-navy">{activeCreator.scragC * 5}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-deep-navy/5 rounded-full overflow-hidden">
                    <div className="h-full bg-teal" style={{ width: `${activeCreator.scragC * 5}%` }} />
                  </div>
                  <div className="flex justify-between text-[8px] text-muted font-mono">
                    <span>Niche Authority</span>
                    <span className="text-teal font-bold">+8% vs category</span>
                  </div>
                </div>

                {/* Regional Influence */}
                <div className="p-4 bg-warm-beige/50 rounded-xl border border-border-warm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Regional Influence (R)</span>
                    <span className="text-xs font-mono font-black text-deep-navy">{activeCreator.scragR * 5}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-deep-navy/5 rounded-full overflow-hidden">
                    <div className="h-full bg-teal" style={{ width: `${activeCreator.scragR * 5}%` }} />
                  </div>
                  <div className="flex justify-between text-[8px] text-muted font-mono">
                    <span>Dialect resonance</span>
                    <span className="text-teal font-bold">Native Language</span>
                  </div>
                </div>

                {/* Audience Trust */}
                <div className="p-4 bg-warm-beige/50 rounded-xl border border-border-warm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Audience Trust (A)</span>
                    <span className="text-xs font-mono font-black text-deep-navy">{activeCreator.scragA * 5}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-deep-navy/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: `${activeCreator.scragA * 5}%` }} />
                  </div>
                  <div className="flex justify-between text-[8px] text-muted font-mono">
                    <span>Authenticity Factor</span>
                    <span className="text-teal font-bold">High Sentiment</span>
                  </div>
                </div>

                {/* Growth Momentum */}
                <div className="p-4 bg-warm-beige/50 rounded-xl border border-border-warm space-y-2 col-span-1 md:col-span-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Growth Momentum (G)</span>
                    <span className="text-xs font-mono font-black text-deep-navy">{activeCreator.scragG * 5}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-deep-navy/5 rounded-full overflow-hidden">
                    <div className="h-full bg-coral" style={{ width: `${activeCreator.scragG * 5}%` }} />
                  </div>
                  <div className="flex justify-between text-[8px] text-muted font-mono">
                    <span>Follower Velocity Month-Over-Month</span>
                    <span className="text-teal font-bold">{activeCreator.growth30dPct}% Delta Growth</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT PANEL: AI INTEL & SUITABILITY SUMMARY (cols-span-3) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* AI Intelligence Summary component */}
          <div className="bg-white p-5 rounded-2xl border border-border-warm shadow-warm space-y-4">
            <div className="flex items-center gap-2 border-b border-border-warm pb-3 justify-between">
              <div className="flex items-center gap-1.5 font-serif text-sm font-bold text-deep-navy">
                <Sparkle size={16} className="text-coral animate-pulse" />
                <span>AI Advisory Core</span>
              </div>
              {loading && <Loader2 size={12} className="text-coral animate-spin" />}
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
                  <Loader2 size={24} className="text-coral animate-spin" />
                  <span className="text-[9px] font-mono text-muted uppercase">Compiling AI summaries...</span>
                </div>
              ) : scragAnalysis ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="space-y-4 text-xs leading-relaxed"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-teal bg-teal/10 px-1.5 py-0.5 rounded uppercase block w-max font-mono">
                      Strengths
                    </span>
                    <p className="text-deep-navy font-medium leading-relaxed whitespace-pre-line">
                      {scragAnalysis.strengths}
                    </p>
                  </div>
                  
                  <div className="space-y-1 border-t border-border-warm pt-3">
                    <span className="text-[9px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded uppercase block w-max font-mono">
                      Risks / Weaknesses
                    </span>
                    <p className="text-muted leading-relaxed">
                      {scragAnalysis.weaknesses}
                    </p>
                  </div>

                  <div className="space-y-1 border-t border-border-warm pt-3">
                    <span className="text-[9px] font-bold text-muted uppercase block w-max font-mono">
                      Audience Quality
                    </span>
                    <p className="text-muted leading-relaxed italic">
                      "{scragAnalysis.audienceQuality}"
                    </p>
                  </div>

                  <div className="space-y-1 border-t border-border-warm pt-3">
                    <span className="text-[9px] font-bold text-muted uppercase block w-max font-mono">
                      Campaign Suitability
                    </span>
                    <p className="text-deep-navy font-medium leading-relaxed">
                      {scragAnalysis.campaignSuitability}
                    </p>
                  </div>

                  <div className="p-3 bg-coral/5 border border-coral/10 rounded-xl mt-2">
                    <span className="text-[10px] font-bold text-coral uppercase tracking-widest block mb-1">Recommended Approach</span>
                    <p className="text-xs font-bold text-deep-navy">
                      {scragAnalysis.recommendedCampaignType}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* AI Recommendation Engine Card */}
          {scragAnalysis && (
            <div className="bg-white p-5 rounded-2xl border border-border-warm shadow-warm space-y-4">
              <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest block border-b border-border-warm pb-2">Recommendation Engine</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted">Campaign Suitability Score:</span>
                  <span className="font-mono font-extrabold text-[#10B981]">{scragAnalysis.campaignSuitabilityScore}%</span>
                </div>
                <div className="h-1.5 w-full bg-deep-navy/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981]" style={{ width: `${scragAnalysis.campaignSuitabilityScore}%` }} />
                </div>

                <div className="pt-2 border-t border-border-warm text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted">Quality Tier:</span>
                    <span className="font-bold text-deep-navy">{scragAnalysis.estimatedQualityTier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Risk Profile:</span>
                    <span className={`font-bold uppercase ${scragAnalysis.riskLevel === 'Low' ? 'text-[#10B981]' : scragAnalysis.riskLevel === 'Medium' ? 'text-amber-500' : 'text-rose-500'}`}>{scragAnalysis.riskLevel} Risk</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* HISTORICAL PERFORMANCE SECTION */}
      {activeCreator && (
        <div className="bg-white p-6 rounded-2xl border border-border-warm shadow-warm space-y-6">
          <div className="flex justify-between items-center border-b border-border-warm pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-coral/10 text-coral">
                <Calendar size={16} />
              </span>
              <h3 className="font-serif text-sm font-bold text-deep-navy uppercase tracking-wider">Historical Performance Index (Last 12 Months)</h3>
            </div>
            <span className="text-[9px] font-mono text-muted uppercase">Stable Continuous Metric Streams</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Follower Growth Trend */}
            <div className="bg-warm-beige/30 p-4 rounded-xl border border-border-warm">
              <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Follower Velocity Expansion</h4>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="areaColorFollowers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff5a5f" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#ff5a5f" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2dfd5" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: '#8C857B', fontSize: 8 }} />
                    <YAxis tick={{ fill: '#8C857B', fontSize: 8 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2dfd5', fontSize: '10px', color: '#0A1128' }} />
                    <Area type="monotone" dataKey="followers" stroke="#ff5a5f" fillOpacity={1} fill="url(#areaColorFollowers)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Engagement Trend */}
            <div className="bg-warm-beige/30 p-4 rounded-xl border border-border-warm">
              <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Engagement Stability Ratio (%)</h4>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2dfd5" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: '#8C857B', fontSize: 8 }} />
                    <YAxis tick={{ fill: '#8C857B', fontSize: 8 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2dfd5', fontSize: '10px', color: '#0A1128' }} />
                    <Line type="monotone" dataKey="engagement" stroke="#2EC4B6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Posting Consistency */}
            <div className="bg-warm-beige/30 p-4 rounded-xl border border-border-warm">
              <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 block">Social Content Frequency (Monthly Posts)</h4>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={historicalData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2dfd5" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: '#8C857B', fontSize: 8 }} />
                    <YAxis tick={{ fill: '#8C857B', fontSize: 8 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2dfd5', fontSize: '10px', color: '#0A1128' }} />
                    <Bar dataKey="postsCount" fill="#ff5a5f" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SCRAG COMPONENT COMPREHENSIVE DEFINITIONS */}
      <div className="bg-white p-6 rounded-2xl border border-border-warm shadow-warm space-y-5">
        <h3 className="font-serif text-sm font-bold text-deep-navy uppercase tracking-wider border-b border-border-warm pb-3">SCRAG Architectural Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 bg-warm-beige/40 rounded-lg border border-border-warm text-center space-y-1.5">
            <span className="font-mono text-xs font-bold text-coral uppercase">Social Activity (S)</span>
            <p className="text-[10px] text-muted leading-normal">
              Measures narrative consistency, publication pulse, and comment reply velocities to evaluate audience contact.
            </p>
          </div>

          <div className="p-4 bg-warm-beige/40 rounded-lg border border-border-warm text-center space-y-1.5">
            <span className="font-mono text-xs font-bold text-teal uppercase">Contextual Relevance (C)</span>
            <p className="text-[10px] text-muted leading-normal">
              Indexes focus depth in specific niche topics to align matching campaigns to direct category authorities.
            </p>
          </div>

          <div className="p-4 bg-warm-beige/40 rounded-lg border border-border-warm text-center space-y-1.5">
            <span className="font-mono text-xs font-bold text-teal uppercase">Regional Influence (R)</span>
            <p className="text-[10px] text-muted leading-normal">
              Quantifies local city footprints and native language affinity indices for specialized regional targeting.
            </p>
          </div>

          <div className="p-4 bg-warm-beige/40 rounded-lg border border-border-warm text-center space-y-1.5">
            <span className="font-mono text-xs font-bold text-amber-600 uppercase">Audience Trust (A)</span>
            <p className="text-[10px] text-muted leading-normal">
              Measures audience sentiment quality, authentic attachment, and community-driven brand advocacy rates.
            </p>
          </div>

          <div className="p-4 bg-warm-beige/40 rounded-lg border border-border-warm text-center space-y-1.5">
            <span className="font-mono text-xs font-bold text-coral uppercase">Growth Momentum (G)</span>
            <p className="text-[10px] text-muted leading-normal">
              Calculates follower acquisition speed and active engagement growth velocity over a rolling 30-day window.
            </p>
          </div>
        </div>
      </div>

      {/* BENCHMARK DATA SECTION */}
      {activeCreator && (
        <div className="bg-white p-6 rounded-2xl border border-border-warm shadow-warm space-y-6">
          <div className="flex justify-between items-center border-b border-border-warm pb-3">
            <h3 className="font-serif text-sm font-bold text-deep-navy uppercase tracking-wider">Platform Performance Benchmarking</h3>
            <span className="text-[9px] font-mono text-muted uppercase">Contextual segment normalization</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-warm-beige/40 rounded-xl border border-border-warm text-center">
              <span className="text-[9px] text-muted uppercase font-mono block">Creator Score</span>
              <span className="text-2xl font-mono font-black text-deep-navy block mt-1">{activeCreator.scragTotal}</span>
            </div>
            
            <div className="p-4 bg-warm-beige/40 rounded-xl border border-border-warm text-center">
              <span className="text-[9px] text-muted uppercase font-mono block">City Average ({activeCreator.city})</span>
              <span className="text-2xl font-mono font-black text-muted block mt-1">{benchmarkStats.cityAvg}</span>
            </div>

            <div className="p-4 bg-warm-beige/40 rounded-xl border border-border-warm text-center">
              <span className="text-[9px] text-muted uppercase font-mono block">Niche Average ({activeCreator.niche})</span>
              <span className="text-2xl font-mono font-black text-muted block mt-1">{benchmarkStats.nicheAvg}</span>
            </div>

            <div className="p-4 bg-warm-beige/40 rounded-xl border border-border-warm text-center">
              <span className="text-[9px] text-muted uppercase font-mono block">Global Platform Avg</span>
              <span className="text-2xl font-mono font-black text-muted block mt-1">{benchmarkStats.platformAvg}</span>
            </div>

            <div className="p-4 bg-coral/5 border border-coral/20 rounded-xl text-center col-span-2 lg:col-span-1">
              <span className="text-[9px] text-coral uppercase font-mono block font-black">Performance Delta</span>
              <span className={`text-2xl font-mono font-black block mt-1 ${benchmarkStats.delta >= 0 ? 'text-[#10B981]' : 'text-rose-500'}`}>
                {benchmarkStats.delta >= 0 ? `+${benchmarkStats.delta}%` : `${benchmarkStats.delta}%`}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
