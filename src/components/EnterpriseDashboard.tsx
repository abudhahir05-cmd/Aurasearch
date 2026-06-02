import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Activity, 
  CheckCircle, 
  TrendingUp, 
  ArrowUpRight, 
  Download, 
  Layers, 
  Globe, 
  Check, 
  ChevronRight,
  Filter,
  BarChart2,
  RefreshCw
} from 'lucide-react';

interface CreatorProfile {
  rank: number;
  name: string;
  dialect: string;
  region: string;
  followers: string;
  sentiment: string;
  scrag: number;
  status: 'VERIFIED' | 'UNDER AUDIT';
  focusMetric: string;
  scragBreakdown: {
    S: number; // Social Activity
    C: number; // Context Relevance
    R: number; // Regional Influence
    A: number; // Audience Trust
    G: number; // Growth Momentum
  }
}

const INSTITUTIONAL_CREATORS: CreatorProfile[] = [
  {
    rank: 1,
    name: "Karthik Krishnan",
    dialect: "Kongu Tamil",
    region: "Coimbatore, TN",
    followers: "42,400",
    sentiment: "94.2% Positive",
    scrag: 91,
    status: "VERIFIED",
    focusMetric: "Kongu dialect density: 14.2 words/min",
    scragBreakdown: { S: 94, C: 88, R: 95, A: 92, G: 86 }
  },
  {
    rank: 2,
    name: "Priya Nair",
    dialect: "Madras Tamil",
    region: "Chennai, TN",
    followers: "28,100",
    sentiment: "89.8% Positive",
    scrag: 87,
    status: "VERIFIED",
    focusMetric: "Chennai urban colloquial weight: 0.84",
    scragBreakdown: { S: 86, C: 91, R: 85, A: 89, G: 84 }
  },
  {
    rank: 3,
    name: "Ananya Reddy",
    dialect: "Deccan Telugu",
    region: "Hyderabad, TS",
    followers: "61,800",
    sentiment: "91.5% Positive",
    scrag: 84,
    status: "VERIFIED",
    focusMetric: "Deccan phrase matching: 92.1% accuracy",
    scragBreakdown: { S: 79, C: 85, R: 91, A: 88, G: 77 }
  },
  {
    rank: 4,
    name: "Rahul Menon",
    dialect: "Malabar Malayalam",
    region: "Kochi, KL",
    followers: "19,200",
    sentiment: "95.1% Positive",
    scrag: 82,
    status: "VERIFIED",
    focusMetric: "Northern Kerala accent fidelity: High",
    scragBreakdown: { S: 80, C: 81, R: 88, A: 93, G: 68 }
  },
  {
    rank: 5,
    name: "Suresh Hegde",
    dialect: "Hubli-Kannada",
    region: "Bangalore Hub, KA",
    followers: "35,600",
    sentiment: "86.4% Positive",
    scrag: 79,
    status: "UNDER AUDIT",
    focusMetric: "Old Mysore dialect consistency: 0.72",
    scragBreakdown: { S: 72, C: 78, R: 84, A: 76, G: 87 }
  },
  {
    rank: 6,
    name: "Amit Deshmukh",
    dialect: "Bambaiya Hindi",
    region: "Mumbai, MH",
    followers: "73,000",
    sentiment: "88.2% Positive",
    scrag: 76,
    status: "VERIFIED",
    focusMetric: "Street idiom correlation coefficient: 0.91",
    scragBreakdown: { S: 81, C: 72, R: 74, A: 78, G: 75 }
  },
  {
    rank: 7,
    name: "Neha Sharma",
    dialect: "Dilli Khadi Boli",
    region: "Delhi NCR",
    followers: "94,500",
    sentiment: "82.1% Positive",
    scrag: 73,
    status: "VERIFIED",
    focusMetric: "Dilli regional slang weight: 0.87",
    scragBreakdown: { S: 89, C: 68, R: 65, A: 74, G: 69 }
  }
];

const PRESET_VIBES = [
  {
    label: "Kongu Agriculture & Tech",
    query: "Find Tamil agricultural mechanical influencers in Coimbatore speaking colloquial patterns.",
    targetCity: "Coimbatore, TN"
  },
  {
    label: "Malabar Gourmet Heritage",
    query: "Need recipe curators from Kochi speaking authentic northern Malabar regional Malayalam.",
    targetCity: "Kochi, KL"
  },
  {
    label: "Deccan Student Lifestyle",
    query: "Search for Deccan-slang comedy creators in Hyderabad with extreme consumer trust margins.",
    targetCity: "Hyderabad, TS"
  },
  {
    label: "Coastal Karnataka Commerce",
    query: "Isolate small-town Kannada tech-reviewers with a validated Regional Influence metric.",
    targetCity: "Bangalore Hub, KA"
  }
];

export const EnterpriseDashboard = () => {
  const [selectedCity, setSelectedCity] = useState<string>("Coimbatore, TN");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'audit'>('all');
  const [customReportLogs, setCustomReportLogs] = useState<string[]>([
    "Initialized AuraSearch Vector database index.",
    "Grayscale geographic node maps synchronized.",
    "SCRAG 5-dimension weights validated with Indian dialect data trackers.",
    "Ready for executive portfolio execution."
  ]);

  // Handle Preset Click
  const handleVibeClick = (preset: typeof PRESET_VIBES[0]) => {
    setSearchQuery(preset.query);
    triggerAnalysis(preset.targetCity);
  };

  // Run Simulated Search Analysis
  const triggerAnalysis = (targetCityValue?: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    const logEntries = [
      `Parsing semantic vibe prompt query context...`,
      `Retrieving high-density target dialect vectors...`,
      `Filtering out artificial bot activity in comments...`,
      `Compiling multi-dimensional SCRAG indices for ${targetCityValue || 'active filters'}...`,
      `Audit completed. Dashboard report refreshed successfully.`
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setAnalysisProgress(currentProgress);
      
      const logIndex = Math.floor(currentProgress / 20) - 1;
      if (logIndex >= 0 && logIndex < logEntries.length) {
        setCustomReportLogs(prev => [logEntries[logIndex], ...prev.slice(0, 5)]);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsAnalyzing(false);
        if (targetCityValue) {
          setSelectedCity(targetCityValue);
        } else {
          // If custom query, pick a city based on text
          if (searchQuery.toLowerCase().includes("tamil") || searchQuery.toLowerCase().includes("coimbatore")) {
            setSelectedCity("Coimbatore, TN");
          } else if (searchQuery.toLowerCase().includes("kochi") || searchQuery.toLowerCase().includes("malayalam")) {
            setSelectedCity("Kochi, KL");
          } else if (searchQuery.toLowerCase().includes("hyderabad") || searchQuery.toLowerCase().includes("telugu")) {
            setSelectedCity("Hyderabad, TS");
          } else if (searchQuery.toLowerCase().includes("mumbai") || searchQuery.toLowerCase().includes("hindi")) {
            setSelectedCity("Mumbai, MH");
          } else {
            setSelectedCity("Delhi NCR");
          }
        }
      }
    }, 120);
  };

  // Filter creator rankings list
  const filteredCreators = INSTITUTIONAL_CREATORS.filter(c => {
    // Tab filter
    if (activeTab === 'verified' && c.status !== 'VERIFIED') return false;
    if (activeTab === 'audit' && c.status !== 'UNDER AUDIT') return false;
    return true;
  });

  // Current selected creator details for the SCORECARD
  const activeCreator = INSTITUTIONAL_CREATORS.find(c => c.region === selectedCity) || INSTITUTIONAL_CREATORS[0];

  // Helper download function for full-finance look
  const exportExecutiveExcel = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["RANK,CREATOR,DIALECT,REGION_HUB,FOLLOWERS,SENTIMENT_TRUST,SCRAG_INDEX,STATUS,FOCUS_AUDIT"].join(",") + "\n"
      + INSTITUTIONAL_CREATORS.map(c => [
          c.rank, c.name, c.dialect, c.region, c.followers, c.sentiment, c.scrag, c.status, c.focusMetric
        ].join(",")).join("\n");
        
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AURASEARCH_EXECUTIVE_AUDIT_${selectedCity.replace(/ /g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCustomReportLogs(prev => ["Report spreadsheet generated and downloaded recursively.", ...prev]);
  };

  return (
    <div className="w-full bg-warm-beige text-deep-navy font-sans antialiased border border-border-warm rounded-[24px] overflow-hidden" id="enterprise-workspace">
      {/* Editorial Header bar */}
      <div className="border-b border-border-warm bg-white px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold tracking-[0.25em] text-coral uppercase block mb-1">
            Institutional Market Intelligence Dashboard
          </span>
          <h2 className="font-serif text-3xl font-extrabold text-deep-navy">
            AURASEARCH <span className="font-normal italic text-muted">Enterprise Suite</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] uppercase font-black tracking-widest text-muted block">SYSTEM STATUS</span>
            <span className="text-xs font-bold text-teal flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" /> Verified Node Active
            </span>
          </div>
          <button 
            onClick={exportExecutiveExcel}
            className="border border-border-warm bg-white text-deep-navy hover:bg-warm-beige transition-all px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <Download size={14} /> Export Dataset
          </button>
        </div>
      </div>

      {/* Interactive SLEEK search block */}
      <div className="bg-white border-b border-border-warm p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <label className="text-xs font-bold uppercase tracking-wider text-muted block mb-2">
              Conversational Vibe Prompt (Retrieve dialect indices & purchase intents)
            </label>
            <div className="relative flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g., Identify Tamil foodies in Coimbatore speaking deep colloquial phrases driving high local trust..."
                  className="w-full pl-12 pr-4 py-4 bg-warm-beige border border-border-warm focus:border-coral focus:outline-none text-deep-navy placeholder-muted/60 text-sm font-medium"
                />
              </div>
              <button 
                onClick={() => triggerAnalysis()}
                disabled={isAnalyzing || !searchQuery.trim()}
                className="bg-coral hover:bg-coral/90 text-white font-serif font-black px-8 py-4 transition-all disabled:bg-gray-300 disabled:text-gray-400 uppercase tracking-widest text-xs flex items-center justify-center gap-3 shrink-0 rounded"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" /> MATCHING CONTEXT ({analysisProgress}%)
                  </>
                ) : (
                  <>Find Context Match <ArrowUpRight size={14} /> </>
                )}
              </button>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Preset Curated Contexts:</span>
            <div className="flex flex-wrap gap-2">
              {PRESET_VIBES.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleVibeClick(preset)}
                  className="bg-warm-beige hover:bg-coral/10 hover:text-coral border border-border-warm text-muted px-3 py-1.5 text-[11px] font-semibold transition-all"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left is grayscale vector map, Right is scorecard */}
      <div className="grid lg:grid-cols-12 border-b border-border-warm bg-white">
        
        {/* Left column: Grayscale Vector Map (7 cols) */}
        <div className="lg:col-span-7 p-8 border-r border-border-warm relative">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted block mb-1">
              GEOGRAPHIC NODE RETRIEVAL
            </span>
            <h3 className="font-serif text-xl font-bold text-deep-navy mb-1">
              Territorial Conversation Mapping (India Node Index)
            </h3>
            <p className="text-xs text-muted">
              Click on any registered regional hub marker to fetch localized dialect sentiment and examine its institutional Scorecard.
            </p>
          </div>

          {/* Grayscale Map Canvas */}
          <div className="bg-warm-beige border border-border-warm rounded-2xl p-6 relative flex items-center justify-center h-[460px] overflow-hidden">
            {/* Fine digital grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border-warm)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border-warm)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-40" />
            
            {/* Legend */}
            <div className="absolute top-4 left-4 bg-white/90 border border-border-warm p-3 text-[10px] space-y-2 z-10 font-bold uppercase tracking-wider">
              <div className="text-muted border-b border-border-warm pb-1 mb-1">DATA NODES LEGEND</div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-coral/20 border border-coral inline-block" /> Selected Query Node
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-dashed border-muted/40 rounded-full inline-block" /> High Dialect Ingestion Zone
              </div>
            </div>

            {/* Minimal SVG Path map of India */}
            <svg viewBox="0 0 400 450" className="w-[360px] h-full object-contain select-none opacity-50">
              <path 
                d="M 180,40 L 200,45 L 210,55 L 220,70 L 215,90 L 210,105 L 230,120 L 245,130 L 255,135 L 250,150 L 240,160 L 243,175 L 252,185 L 260,195 L 270,190 L 280,200 L 295,195 L 305,210 L 310,230 L 295,245 L 285,240 L 270,245 L 260,250 L 250,260 L 255,275 L 250,285 L 235,280 L 225,290 L 215,310 L 200,325 L 190,340 L 180,360 L 175,380 L 172,395 L 168,410 L 165,420 L 160,400 L 155,380 L 148,360 L 144,340 L 140,320 L 135,300 L 138,285 L 125,280 L 115,275 L 105,270 L 95,265 L 85,255 L 80,240 L 75,220 L 60,215 L 50,200 L 45,185 L 40,170 L 55,160 L 70,165 L 80,155 L 90,140 L 100,135 L 110,130 L 120,135 L 130,140 L 140,130 L 145,115 L 150,95 L 152,70 L 160,55 L 170,45 Z" 
                fill="#DDE2DF" 
                stroke="#4A5A54" 
                strokeWidth="1.2" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Hub Overlay Layer */}
            <div className="absolute inset-0">
              
              {/* DELHI */}
              <div 
                className="absolute cursor-pointer group"
                style={{ top: '23%', left: '44%' }}
                onClick={() => setSelectedCity("Delhi NCR")}
              >
                <div className={`relative flex items-center justify-center transition-all ${selectedCity === 'Delhi NCR' ? 'scale-110' : 'scale-100'}`}>
                  <span className="absolute flex h-6 w-6 rounded-full bg-slate-400/20 animate-ping pointer-events-none" />
                  <span className={`h-3 w-3 rounded-full border-2 border-white transition-all ${selectedCity === 'Delhi NCR' ? 'bg-coral' : 'bg-muted'}`} />
                </div>
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold px-1 rounded transition-all ${selectedCity === 'Delhi NCR' ? 'text-deep-navy font-bold bg-white/90 border border-border-warm' : 'text-muted bg-transparent'}`}>
                  Delhi Hub
                </span>
              </div>

              {/* MUMBAI */}
              <div 
                className="absolute cursor-pointer group"
                style={{ top: '56%', left: '31%' }}
                onClick={() => setSelectedCity("Mumbai, MH")}
              >
                <div className={`relative flex items-center justify-center transition-all ${selectedCity === 'Mumbai, MH' ? 'scale-110' : 'scale-100'}`}>
                  <span className="absolute flex h-6 w-6 rounded-full bg-slate-400/20 animate-ping pointer-events-none" />
                  <span className={`h-3 w-3 rounded-full border-2 border-white transition-all ${selectedCity === 'Mumbai, MH' ? 'bg-coral' : 'bg-muted'}`} />
                </div>
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold px-1 rounded transition-all ${selectedCity === 'Mumbai, MH' ? 'text-deep-navy font-bold bg-white/90 border border-border-warm' : 'text-muted bg-transparent'}`}>
                  Mumbai Hub
                </span>
              </div>

              {/* HYDERABAD */}
              <div 
                className="absolute cursor-pointer group"
                style={{ top: '65%', left: '48%' }}
                onClick={() => setSelectedCity("Hyderabad, TS")}
              >
                <div className={`relative flex items-center justify-center transition-all ${selectedCity === 'Hyderabad, TS' ? 'scale-110' : 'scale-100'}`}>
                  <span className="absolute flex h-6 w-6 rounded-full bg-slate-400/20 animate-ping pointer-events-none" />
                  <span className={`h-3 w-3 rounded-full border-2 border-white transition-all ${selectedCity === 'Hyderabad, TS' ? 'bg-coral' : 'bg-muted'}`} />
                </div>
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold px-1 rounded transition-all ${selectedCity === 'Hyderabad, TS' ? 'text-deep-navy font-bold bg-white/90 border border-border-warm' : 'text-muted bg-transparent'}`}>
                  Hyderabad
                </span>
              </div>

              {/* BANGALORE */}
              <div 
                className="absolute cursor-pointer group"
                style={{ top: '74%', left: '43%' }}
                onClick={() => setSelectedCity("Bangalore Hub, KA")}
              >
                <div className={`relative flex items-center justify-center transition-all ${selectedCity === 'Bangalore Hub, KA' ? 'scale-110' : 'scale-100'}`}>
                  <span className="absolute flex h-6 w-6 rounded-full bg-slate-400/20 animate-ping pointer-events-none" />
                  <span className={`h-3 w-3 rounded-full border-2 border-white transition-all ${selectedCity === 'Bangalore Hub, KA' ? 'bg-coral' : 'bg-muted'}`} />
                </div>
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold px-1 rounded transition-all ${selectedCity === 'Bangalore Hub, KA' ? 'text-deep-navy font-bold bg-white/90 border border-border-warm' : 'text-muted bg-transparent'}`}>
                  Bangalore
                </span>
              </div>

              {/* CHENNAI */}
              <div 
                className="absolute cursor-pointer group"
                style={{ top: '78%', left: '50%' }}
                onClick={() => setSelectedCity("Chennai, TN")}
              >
                <div className={`relative flex items-center justify-center transition-all ${selectedCity === 'Chennai, TN' ? 'scale-110' : 'scale-100'}`}>
                  <span className="absolute flex h-6 w-6 rounded-full bg-slate-400/20 animate-ping pointer-events-none" />
                  <span className={`h-3 w-3 rounded-full border-2 border-white transition-all ${selectedCity === 'Chennai, TN' ? 'bg-coral' : 'bg-muted'}`} />
                </div>
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold px-1 rounded transition-all ${selectedCity === 'Chennai, TN' ? 'text-deep-navy font-bold bg-white/90 border border-border-warm' : 'text-muted bg-transparent'}`}>
                  Chennai Hub
                </span>
              </div>

              {/* COIMBATORE */}
              <div 
                className="absolute cursor-pointer group"
                style={{ top: '82%', left: '44%' }}
                onClick={() => setSelectedCity("Coimbatore, TN")}
              >
                <div className={`relative flex items-center justify-center transition-all ${selectedCity === 'Coimbatore, TN' ? 'scale-110' : 'scale-100'}`}>
                  <span className="absolute flex h-8 w-8 rounded-full bg-coral/25 animate-ping pointer-events-none" />
                  <span className={`h-4 w-4 rounded-full border-2 border-white shadow-sm transition-all ${selectedCity === 'Coimbatore, TN' ? 'bg-coral scale-125' : 'bg-muted'}`} />
                </div>
                <span className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-black px-2 py-0.5 rounded transition-all ${selectedCity === 'Coimbatore, TN' ? 'text-deep-navy bg-white border border-coral' : 'text-muted bg-transparent'}`}>
                  Coimbatore Node
                </span>
              </div>

              {/* KOCHI */}
              <div 
                className="absolute cursor-pointer group"
                style={{ top: '86%', left: '41%' }}
                onClick={() => setSelectedCity("Kochi, KL")}
              >
                <div className={`relative flex items-center justify-center transition-all ${selectedCity === 'Kochi, KL' ? 'scale-110' : 'scale-100'}`}>
                  <span className="absolute flex h-6 w-6 rounded-full bg-slate-400/20 animate-ping pointer-events-none" />
                  <span className={`h-3 w-3 rounded-full border-2 border-white transition-all ${selectedCity === 'Kochi, KL' ? 'bg-coral' : 'bg-muted'}`} />
                </div>
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold px-1 rounded transition-all ${selectedCity === 'Kochi, KL' ? 'text-deep-navy font-bold bg-white/90 border border-border-warm' : 'text-muted bg-transparent'}`}>
                  Kochi Hub
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Right column: SCRAG Scorecard Scorecard (5 cols) */}
        <div className="lg:col-span-5 p-8 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <span className="text-coral text-[10px] font-bold tracking-[0.2em] uppercase block mb-1">
                INSTITUTIONAL METRIC SCORECARD
              </span>
              <h3 className="font-serif text-2xl font-bold text-deep-navy">
                SCRAG Index Vector
              </h3>
              <p className="text-xs text-muted mt-1">
                Displaying multidimensional correlation dataset for: <strong className="text-deep-navy">{activeCreator.name}</strong> ({activeCreator.region})
              </p>
            </div>

            {/* Core Score Display */}
            <div className="bg-warm-beige border border-border-warm p-6 mb-7 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted block">AGGREGATED INTEGRITY SCORE</span>
                <span className="font-serif text-4xl font-extrabold text-deep-navy block mt-1">{activeCreator.scrag} <span className="text-xs text-muted font-sans font-normal">/ 100</span></span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted block">RESIDENCY STATS</span>
                <span className="text-xs font-bold text-teal block mt-1 uppercase flex items-center gap-1 justify-end">
                  <Check size={12} /> {activeCreator.status}
                </span>
              </div>
            </div>

            {/* scorecard 5 dimensions using MINIMAL horizontal lines instead of thick colorful progress sliders/bars */}
            <div className="space-y-6">
              {[
                { key: 'S', name: 'Social Activity Density', value: activeCreator.scragBreakdown.S, desc: 'Cross-channel publication frequency vectors' },
                { key: 'C', name: 'Context Relevance Match', value: activeCreator.scragBreakdown.C, desc: 'Alignment velocity to brand industry' },
                { key: 'R', name: 'Regional Influence Accent', value: activeCreator.scragBreakdown.R, desc: 'Dialect penetration in tier-2 city corridors' },
                { key: 'A', name: 'Audience Trust Correlation', value: activeCreator.scragBreakdown.A, desc: 'Verified comment sentiment and positive trust index' },
                { key: 'G', name: 'Growth Rate Momentum', value: activeCreator.scragBreakdown.G, desc: 'Follower growth stability metric output' }
              ].map((dim) => (
                <div key={dim.key} className="space-y-1.5">
                  <div className="flex justify-between items-end text-xs">
                    <span className="font-bold text-deep-navy flex items-center gap-2">
                      <span className="w-5 h-5 bg-deep-navy text-white flex items-center justify-center text-[10px] font-black">{dim.key}</span>
                      {dim.name}
                    </span>
                    <span className="font-bold text-deep-navy">{dim.value}%</span>
                  </div>
                  
                  {/* Minimal 1px solid clean line scorecard representing values */}
                  <div className="relative w-full h-[3px] bg-border-warm">
                    <div 
                      className="absolute top-0 left-0 h-full bg-coral transition-all duration-700"
                      style={{ width: `${dim.value}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted">
                    <span>{dim.desc}</span>
                    <span>Confidence: 96.2%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-border-warm space-y-3">
            <div className="text-[11px] font-bold uppercase text-muted flex items-center gap-1.5">
              <Activity size={12} className="text-coral" /> Focus Vetting Track:
            </div>
            <div className="bg-warm-beige text-deep-navy text-xs font-mono p-3 border border-border-warm rounded font-semibold">
              {activeCreator.focusMetric}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Audit Dataset table with high density */}
      <div className="bg-white p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <span className="text-coral text-[10px] font-bold tracking-[0.2em] uppercase block mb-1">
              DATASET RE-RANKING INDEX
            </span>
            <h3 className="font-serif text-xl font-bold text-deep-navy">
              Executive Creator Audit Record
            </h3>
          </div>
          
          {/* Table Tab buttons */}
          <div className="flex bg-warm-beige p-1 border border-border-warm text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 font-bold uppercase transition-all ${activeTab === 'all' ? 'bg-white text-deep-navy shadow-sm' : 'text-muted hover:text-deep-navy'}`}
            >
              All Records
            </button>
            <button
              onClick={() => setActiveTab('verified')}
              className={`px-4 py-1.5 font-bold uppercase transition-all ${activeTab === 'verified' ? 'bg-white text-deep-navy shadow-sm' : 'text-muted hover:text-deep-navy'}`}
            >
              Verified Only
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-1.5 font-bold uppercase transition-all ${activeTab === 'audit' ? 'bg-white text-deep-navy shadow-sm' : 'text-muted hover:text-deep-navy'}`}
            >
              Audits Pending
            </button>
          </div>
        </div>

        {/* High Density Corporate Data Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-border-warm">
            <thead>
              <tr className="bg-warm-beige text-[10px] uppercase font-black tracking-widest text-muted border-b border-border-warm">
                <th className="p-4 border-r border-border-warm text-center w-16">Rank</th>
                <th className="p-4 border-r border-border-warm">Creator Identity</th>
                <th className="p-4 border-r border-border-warm">DIALECT TRACK</th>
                <th className="p-4 border-r border-border-warm">GEOGRAPHIC AREA</th>
                <th className="p-4 border-r border-border-warm">FOLLOWER DENSITY</th>
                <th className="p-4 border-r border-border-warm">RESIDENCY TRUST</th>
                <th className="p-4 border-r border-border-warm text-center">SCRAG INDEX</th>
                <th className="p-4 text-center">DECISION STATUS</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold text-deep-navy">
              {filteredCreators.map((creator) => (
                <tr 
                  key={creator.rank}
                  onClick={() => setSelectedCity(creator.region)}
                  className={`border-b border-border-warm cursor-pointer hover:bg-warm-beige/30 transition-all ${selectedCity === creator.region ? 'bg-warm-beige border-l-[4px] border-l-coral' : ''}`}
                >
                  <td className="p-4 border-r border-border-warm text-center font-bold font-mono text-muted">{creator.rank}</td>
                  <td className="p-4 border-r border-border-warm">
                    <div className="font-serif font-bold text-sm">{creator.name}</div>
                    <div className="text-[10px] text-muted font-sans font-normal mt-0.5">{creator.focusMetric}</div>
                  </td>
                  <td className="p-4 border-r border-border-warm font-serif italic text-sm">{creator.dialect}</td>
                  <td className="p-4 border-r border-border-warm flex items-center gap-1.5 py-5">
                    <MapPin size={12} className="text-coral shrink-0" /> {creator.region}
                  </td>
                  <td className="p-4 border-r border-border-warm font-mono text-muted">{creator.followers}</td>
                  <td className="p-4 border-r border-border-warm text-teal">{creator.sentiment}</td>
                  <td className="p-4 border-r border-border-warm text-center font-mono font-bold text-sm">{creator.scrag}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 text-[9px] font-black tracking-wider uppercase inline-block ${creator.status === 'VERIFIED' ? 'bg-teal/15 text-teal' : 'bg-amber-600/15 text-amber-800'}`}>
                      {creator.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity Log / Terminal Footnote to show system precision */}
        <div className="mt-6 pt-6 border-t border-border-warm grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted block mb-2">Live System Verification Feed Pipeline</span>
            <div className="bg-warm-beige border border-border-warm rounded-lg p-4 h-24 overflow-y-auto font-mono text-[10px] text-muted space-y-1.5">
              {customReportLogs.map((log, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-coral">[{new Date().toLocaleTimeString()} UTC]</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-4 flex justify-end">
            <button
              onClick={() => {
                setCustomReportLogs(prev => ["Initiating live search vector simulation match on geographic endpoints...", ...prev]);
                triggerAnalysis();
              }}
              className="bg-coral hover:bg-coral/90 text-white w-full md:w-auto font-serif px-6 py-3 uppercase tracking-wider text-[11px] font-bold flex items-center justify-center gap-2 rounded transition-all"
            >
              <RefreshCw size={12} className={isAnalyzing ? "animate-spin" : ""} /> Demo Match Simulation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
