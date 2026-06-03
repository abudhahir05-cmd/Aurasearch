/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Check, 
  X, 
  ChevronRight, 
  Menu, 
  ArrowRight, 
  Star, 
  Users, 
  Target, 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  MapPin,
  Filter,
  Calculator,
  Play,
  Award,
  Sparkles,
  Layout,
  Clock,
  Activity,
  Zap,
  Bot,
  Brain,
  Database,
  Globe,
  Monitor,
  History,
  Trophy,
  Layers,
  CircleDollarSign,
  GraduationCap,
  Download,
  Upload,
  FileText,
  ExternalLink,
  Search,
  SlidersHorizontal,
  ShoppingCart,
  Coffee,
  Smartphone,
  Dna,
  HelpCircle,
  ChevronDown,
  Moon,
  Sun,
  Pill,
  Briefcase,
  HeartPulse,
  Landmark,
  Shirt,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { NichePerformanceChart } from './components/NichePerformanceChart';
import { AIBriefGenerator } from './components/AIBriefGenerator';
import { OutcomePredictor } from './components/OutcomePredictor';
import { CreatorComparison } from './components/CreatorComparison';
import { ROIEstimator } from './components/ROIEstimator';
import { ChatAssistant } from './components/ChatAssistant';
import { AvailabilityAlerts } from './components/AvailabilityAlerts';
import { CampaignTimelineBuilder } from './components/CampaignTimelineBuilder';
import { DesignSystemPage } from './components/DesignSystemPage';
import { EnterpriseDashboard } from './components/EnterpriseDashboard';
import { CreatorProfile } from './components/CreatorProfile';
const productLogo = '/src/assets/images/product_logo_1779731862866.png';

const LogoIcon = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) => {
  const sizeClasses = {
    sm: 'w-9 h-9 border border-[#D97706]/20 shadow-[0_2px_10px_rgba(232,97,74,0.1)]',
    md: 'w-12 h-12 border-2 border-[#D97706]/20 shadow-[0_4px_20px_rgba(232,97,74,0.15)]',
    lg: 'w-16 h-16 border-2 border-[#D97706]/30 shadow-[0_6px_30px_rgba(232,97,74,0.2)]',
  };

  return (
    <div className={`relative rounded-full overflow-hidden shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-[1.06] group-hover:border-[#E8614A]/40 ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 bg-[#0A0F1E] rounded-full z-0 pointer-events-none" />
      <img
        src={productLogo}
        alt="AuraSearch Logo Icon"
        className="absolute w-[202%] h-[202%] max-w-none top-[-33%] left-[-51%] object-cover pointer-events-none select-none rounded-full z-10 scale-[1.02]"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

// --- Types ---

interface Creator {
  id: number;
  name: string;
  city: string;
  niche: string;
  followers: string;
  score: number;
}

interface WaitlistForm {
  name: string;
  email: string;
  role: string;
  city: string;
}

// --- Mock Data ---

const CREATORS: Creator[] = [
  { id: 1, name: "Karthik Krishnan", city: "Coimbatore", niche: "Travel", followers: "42K", score: 91 },
  { id: 2, name: "Priya Nair", city: "Chennai", niche: "Food", followers: "28K", score: 87 },
  { id: 3, name: "Ananya Reddy", city: "Bangalore", niche: "Fitness", followers: "61K", score: 84 },
  { id: 4, name: "Rahul Menon", city: "Kochi", niche: "Comedy", followers: "19K", score: 79 },
  { id: 5, name: "Deepa Iyer", city: "Mumbai", niche: "Fashion", followers: "35K", score: 73 },
  { id: 6, name: "Vijay Kumar", city: "Hyderabad", niche: "Tech", followers: "22K", score: 68 },
  { id: 7, name: "Suresh Pillai", city: "Kochi", niche: "Food", followers: "110K", score: 95 },
  { id: 8, name: "Sneha Sen", city: "Delhi", niche: "Beauty", followers: "85K", score: 89 },
  { id: 9, name: "Arjun Mehta", city: "Mumbai", niche: "Finance", followers: "55K", score: 82 },
  { id: 10, name: "Aditi Rao", city: "Chennai", niche: "Fashion", followers: "72K", score: 81 },
  { id: 11, name: "Vikram Seth", city: "Bangalore", niche: "Tech", followers: "120K", score: 90 },
  { id: 12, name: "Meera Jasmine", city: "Coimbatore", niche: "Food", followers: "33K", score: 76 },
  { id: 13, name: "Rohan Das", city: "Delhi", niche: "Comedy", followers: "94K", score: 85 },
  { id: 14, name: "Kiran Bedi", city: "Hyderabad", niche: "Education", followers: "41K", score: 72 },
  { id: 15, name: "Siddharth Roy", city: "Pune", niche: "Fitness", followers: "50K", score: 78 },
  { id: 16, name: "Divya Spandana", city: "Bangalore", niche: "Travel", followers: "68K", score: 83 },
  { id: 17, name: "Gautham Vasudev", city: "Chennai", niche: "Comedy", followers: "105K", score: 88 },
  { id: 18, name: "Pooja Hegde", city: "Mumbai", niche: "Beauty", followers: "150K", score: 93 },
  { id: 20, name: "Rajesh Koothrapali", city: "Pune", niche: "Tech", followers: "15K", score: 64 },
];

const PROBLEM_CARDS = [
  {
    icon: <Users className="w-8 h-8 text-coral" />,
    title: "Declining Audience Trust",
    desc: "Followers are becoming blind to generic ads. Authenticity is the only currency that still converts."
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-coral" />,
    title: "Forced, Promotional Content",
    desc: "Rigid scripts destroy the creator's voice, leading to high skip rates and zero impact."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-coral" />,
    title: "High Reach, Low Conversion",
    desc: "Massive follower counts often hide a lack of local relevance. Likes don't always equal sales."
  }
];

const SCRAG_DIMENSIONS = [
  { key: 'S', name: 'Social Activity', desc: 'Real-time responsiveness and content consistency across platforms.', link: 'https://en.wikipedia.org/wiki/Social_network_analysis' },
  { key: 'C', name: 'Context Relevance', desc: 'Alignment between creator content and specific brand categories.', link: 'https://en.wikipedia.org/wiki/Context_analysis' },
  { key: 'R', name: 'Regional Influence', desc: 'Deep penetration into specific tier-2 and tier-3 city dialects.', link: 'https://en.wikipedia.org/wiki/Sociolinguistics' },
  { key: 'A', name: 'Audience Trust', desc: 'Verified sentiment analysis of comment sections and direct mentions.', link: 'https://en.wikipedia.org/wiki/Sentiment_analysis' },
  { key: 'G', name: 'Growth Momentum', desc: 'Velocity of new audience acquisition relative to the niche.', link: 'https://en.wikipedia.org/wiki/Virality' }
];

const STEPS = [
  { num: '01', title: 'Scan Local Conversations', desc: 'We monitor what Indian consumers are saying in the last 24 hours.' },
  { num: '02', title: 'Discover Relevant Creators', desc: 'AI identifies voices driving those specific regional conversations.' },
  { num: '03', title: 'Apply SCRAG Scoring', desc: 'Creators are vetted against our 5-dimension predictive engine.' },
  { num: '04', title: 'Predict Campaign Outcome', desc: 'Get a clear estimate of ROI and reach before you spend a rupee.' }
];

// --- Components ---

const SectionHeader = ({ label, title, center = true, labelColor = "text-coral" }: { label: string, title: string, center?: boolean, labelColor?: string }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <span className={`${labelColor} text-xs font-bold tracking-[0.2em] uppercase mb-4 block`}>{label}</span>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="font-serif text-3xl md:text-5xl text-deep-navy dark:text-white font-bold leading-tight"
    >
      {title}
    </motion.h2>
  </div>
);

// --- Subpage and Routing Layout Helpers ---

const TOOLS_METADATA = [
  { id: 'sandbox', title: 'Virtual Sandbox', description: 'Simulate campaign performance and design timetables using AI.', icon: <Layout className="w-5 h-5" /> },
  { id: 'brief-generator', title: 'AI Brief Generator', description: 'Generate comprehensive regional campaign briefs based on prompt guidelines.', icon: <Zap className="w-5 h-5" /> },
  { id: 'predictor', title: 'Campaign Predictor', description: 'Predict and analyze potential engagement, reach, and sentiment before investing.', icon: <Brain className="w-5 h-5" /> },
  { id: 'calculator', title: 'SCRAG Calculator', description: 'Manually compute a custom SCRAG score for any Indian creator across 5 dimensions.', icon: <Calculator className="w-5 h-5" /> },
  { id: 'leaderboard', title: 'Creator Leaderboard', description: 'View the highest SCRAG-scoring verified local creators this week.', icon: <Trophy className="w-5 h-5" /> },
  { id: 'comparison', title: 'Creator Comparison', description: 'Compare metrics, regional relevance, and dialect focus of two creators side-by-side.', icon: <Layers className="w-5 h-5" /> },
  { id: 'roi-estimator', title: 'ROI Estimator', description: 'Estimate conversions, CPA, and return on ad spend across demographics.', icon: <CircleDollarSign className="w-5 h-5" /> },
  { id: 'niche-chart', title: 'Niche Analytics', description: 'Inspect category performance, dialect depth, and trust indicators.', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'creator-profile', title: 'Creator Profile Insight', description: 'Deep-dive analytical dashboard with regional reach, sentiment maps, content feed, and collab history.', icon: <Users className="w-5 h-5" /> },
];

const PlatformToolsOverview = ({ onLaunchTool }: { onLaunchTool: (id: string) => void }) => {
  return (
    <section id="tools-hub" className="py-24 max-w-7xl mx-auto px-6">
      <FadeInSection>
        <SectionHeader 
          label="INTELLIGENCE SUITE" 
          title="Analytical Tools Built for High-Trust Campaigns" 
          labelColor="text-teal"
        />
        <p className="text-center text-muted dark:text-white/60 mb-16 max-w-2xl mx-auto text-sm leading-relaxed">
          Explore our suite of predictive modeling engines, region trackers, and strategic campaign builders. Launch any tool directly to model your local strategy.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS_METADATA.filter(t => t.id !== 'creator-profile').map((tool) => (
            <div 
              key={tool.id} 
              onClick={() => onLaunchTool(tool.id)}
              className="group relative bg-white dark:bg-deep-navy/30 p-8 rounded-[24px] border border-border-warm dark:border-white/10 hover:border-coral dark:hover:border-coral transition-all duration-300 shadow-sm flex flex-col justify-between h-[270px] cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-coral/5 dark:bg-coral/10 flex items-center justify-center shrink-0 mb-5 text-coral group-hover:scale-110 transition-transform">
                  {React.cloneElement(tool.icon, { size: 22 })}
                </div>
                <h3 className="font-serif text-lg font-bold text-deep-navy dark:text-white mb-2 group-hover:text-coral transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-muted dark:text-white/60 leading-relaxed font-sans line-clamp-3">
                  {tool.description}
                </p>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLaunchTool(tool.id);
                }}
                className="flex items-center gap-2 text-xs font-bold text-coral group-hover:text-deep-navy dark:group-hover:text-white transition-colors mt-4 w-fit group-hover:translate-x-1 duration-200"
              >
                Launch Tool <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
};

const FeatureSectionWrapper = ({ id, label, title, children, labelColor = "text-coral" }: { id: string, label: string, title: string, children: React.ReactNode, labelColor?: string }) => {
  return (
    <div className="relative group/wrapper border border-transparent hover:border-border-warm/30 dark:hover:border-white/5 p-6 md:p-8 rounded-[32px] transition-all duration-300 bg-white/20 dark:bg-white/[0.01]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className={`${labelColor} text-xs font-bold tracking-[0.2em] uppercase mb-3 block`}>{label}</span>
          <h2 className="font-serif text-3xl md:text-5xl text-deep-navy dark:text-white font-bold leading-tight">
            {title}
          </h2>
        </div>
        
        <a 
          href={`#${id}`}
          className="flex items-center gap-2 border border-coral text-coral bg-coral/5 hover:bg-coral hover:text-white hover:shadow-warm px-5 py-2.5 rounded-xl text-xs font-bold transition-all w-fit pointer-events-auto z-10 hover:-translate-y-0.5 active:translate-y-0"
        >
          Open as Dedicated Page <ArrowUpRight size={14} />
        </a>
      </div>
      
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

const SubPageLayout = ({ pageId, children, onBack }: { pageId: string, children: React.ReactNode, onBack: () => void }) => {
  const pageMeta = TOOLS_METADATA.find(t => t.id === pageId) || { title: 'Intelligence Tool', description: 'AI-Powered Influencer Intelligence' };
  
  return (
    <div className="min-h-screen bg-surface dark:bg-[#060a13] pt-28 pb-10 px-6">
      {/* Page Header Area */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-border-warm dark:border-white/5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-muted dark:text-white/40 uppercase tracking-widest">
              <span>Platform</span>
              <ChevronRight size={12} className="text-muted/50" />
              <span className="text-coral">{pageMeta.title}</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-deep-navy dark:text-white mt-2">
              {pageMeta.title}
            </h1>
            <p className="text-muted dark:text-white/60 text-sm max-w-2xl mt-1.5 leading-relaxed">
              {pageMeta.description}
            </p>
          </div>
          
          <button 
            onClick={onBack}
            className="flex items-center gap-2 bg-white dark:bg-white/5 border border-border-warm dark:border-white/10 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-deep-navy dark:text-white hover:bg-warm-beige/30 transition-all shadow-sm w-fit hover:-translate-y-0.5 active:translate-y-0"
          >
            ← Back to Home
          </button>
        </div>
      </div>
      
      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
        {/* Left Side: Major Active Interactive Feature */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-deep-navy/20 p-6 md:p-8 rounded-[24px] border border-border-warm dark:border-white/10 shadow-warm relative"
          >
            {children}
          </motion.div>
        </div>
        
        {/* Right Side: Quick Pivoters / Sidebar controls */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          {/* Quick Pivot Panel */}
          <div className="bg-white dark:bg-deep-navy/20 p-6 rounded-[24px] border border-border-warm dark:border-white/10 shadow-sm">
            <h3 className="text-xs font-black text-deep-navy dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2 pb-3 border-b border-border-warm dark:border-white/5">
              <Sparkles size={14} className="text-coral" /> Other Active Tools
            </h3>
            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {TOOLS_METADATA.filter(t => t.id !== pageId).map(t => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-warm-beige dark:hover:bg-white/5 border border-transparent hover:border-border-warm/50 dark:hover:border-white/5 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-coral/5 flex items-center justify-center shrink-0 group-hover:bg-coral/10">
                    {React.cloneElement(t.icon, { size: 16, className: 'text-coral' })}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-deep-navy dark:text-white group-hover:text-coral transition-colors truncate">
                      {t.title}
                    </div>
                    <div className="text-[10px] text-muted dark:text-white/40 truncate">
                      Go to tool
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Pro Tips Feature Panel */}
          <div className="bg-teal/5 dark:bg-teal/5 p-6 rounded-[24px] border border-teal/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal/10 blur-xl rounded-full" />
            <span className="text-teal font-serif font-bold text-xs bg-teal/10 px-2 py-0.5 rounded border border-teal/20 uppercase tracking-widest mb-3 inline-block">Pro Tip</span>
            <h4 className="text-sm font-bold text-deep-navy dark:text-white mb-2">Regional Dialect Alignment</h4>
            <p className="text-xs text-muted dark:text-white/60 leading-relaxed">
              When launching hyper-local campaigns, ensure the creator's Regional Influence (R dimension of SCRAG) is above 75. Dialect alignment beats standard follower counts in Tier-2/3 conversions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ onOpenModal, onNavClick, currentPage }: { onOpenModal: () => void, onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void, currentPage: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    'hero', 'how-it-works', 'sandbox', 'predictor', 
    'brief-generator', 'calculator', 'leaderboard', 'comparison', 
    'roi-estimator', 'niche-chart', 'creators', 
    'notify-me'
  ];

  useEffect(() => {
    if (currentPage !== 'home') {
      setActiveSection(currentPage);
      const handleScroll = () => setIsScrolled(window.scrollY > 20);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [currentPage]);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdown(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const downloadCSV = () => {
    const headers = ['id', 'name', 'city', 'niche', 'followers', 'score'];
    const rows = CREATORS.map(c => [c.id, c.name, c.city, c.niche, c.followers, c.score].join(','));
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'aurasearch_creators_dataset.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const PLATFORM_LINKS = [
    {
      group: 'Core Engine',
      items: [
        { icon: <Activity size={18} />, title: 'How It Works', desc: '4-step process from scan to prediction', href: '#how-it-works' },
        { icon: <BarChart3 size={18} />, title: 'Niche Analytics', desc: 'Compare performance across categories', href: '#niche-chart' },
      ]
    },
    {
      group: 'Intelligence Tools',
      items: [
        { icon: <Monitor size={18} />, title: 'Virtual Sandbox', desc: 'Simulate a full campaign before you spend', href: '#sandbox' },
        { icon: <Brain size={18} />, title: 'Outcome Predictor', desc: 'AI predicts your campaign\'s success rate', href: '#predictor' },
        { icon: <Calculator size={18} />, title: 'SCRAG Calculator', desc: 'Manually score any creator in seconds', href: '#calculator' },
      ]
    }
  ];

  const FEATURES_LINKS = [
    {
      group: 'AI Tools',
      items: [
        { icon: <Zap size={18} />, title: 'AI Brief Generator', desc: 'Type a brand + city → get a full brief', href: '#brief-generator' },
        { icon: <Bot size={18} />, title: 'SCRAG Chatbot', desc: 'Ask anything about creators or campaigns', href: 'chat' },
        { icon: <Clock size={18} />, title: 'Timeline Builder', desc: 'AI builds your daily campaign schedule', href: '#timeline-builder' },
      ]
    },
    {
      group: 'Analytics',
      items: [
        { icon: <Trophy size={18} />, title: 'Creator Leaderboard', desc: 'Top SCRAG-ranked creators this week', href: '#leaderboard' },
        { icon: <Layers size={18} />, title: 'Creator Comparison', desc: 'Compare 2 creators side by side', href: '#comparison' },
        { icon: <CircleDollarSign size={18} />, title: 'ROI Estimator', desc: 'Estimate reach and returns', href: '#roi-estimator' },
      ]
    }
  ];

  const SOLUTIONS_LINKS = [
    { icon: <Compass size={18} />, title: 'Transport Brands', desc: 'Geo-targeted creator campaigns for mobility', href: '#use-case' },
    { icon: <Coffee size={18} />, title: 'Food & Beverage', desc: 'Local food influencers with high trust', href: '#use-case' },
    { icon: <Shirt size={18} />, title: 'Fashion & Lifestyle', desc: 'Niche creators for lifestyle conversions', href: '#use-case' },
    { icon: <Landmark size={18} />, title: 'Finance & Fintech', desc: 'High-trust creators for sensitive brands', href: '#use-case' },
    { icon: <HeartPulse size={18} />, title: 'Health & Wellness', desc: 'Authentic voices for health campaigns', href: '#use-case' },
    { icon: <GraduationCap size={18} />, title: 'Education', desc: 'EdTech brands reaching student communities', href: '#use-case' },
    { divider: true },
    { icon: <Users size={18} />, title: 'Join as a Creator', desc: 'Get visibility for your local influence', href: '#creators', color: 'text-teal' },
    { icon: <Pill size={18} />, title: 'Set Availability Alert', desc: 'Let brands find you when you\'re ready', href: '#notify-me', color: 'text-teal' },
  ];

  const RESOURCES_LINKS = [
    {
      group: 'Learn',
      items: [
        { icon: <FileText size={18} />, title: 'How SCRAG Works', desc: 'Complete guide to the scoring system', href: 'https://docs.aurasearch.ai', external: true },
        { icon: <Dna size={18} />, title: 'Research Behind SCRAG', desc: 'The data science powering our engine', href: 'https://research.aurasearch.ai', external: true },
        { icon: <History size={18} />, title: 'Case Studies', desc: 'Real campaign simulations & results', href: '#use-case' },
        { icon: <Trophy size={18} />, title: 'Creator Academy', desc: 'Tips for improving your SCRAG score', href: 'https://academy.aurasearch.ai', external: true },
      ]
    },
    {
      group: 'Tools',
      items: [
        { icon: <Download size={18} />, title: 'Download Dataset', desc: '300-row regional influencer CSV', href: 'download', action: downloadCSV },
        { icon: <Upload size={18} />, title: 'Export Campaign Report', desc: 'Save your campaign brief as a PDF', href: 'export', action: () => window.print() },
        { icon: <Search size={18} />, title: 'API Documentation', desc: 'Integrate SCRAG scores anywhere', href: 'https://api.aurasearch.ai', external: true },
        { icon: <MessageSquare size={18} />, title: 'Join Community', desc: 'Connect with brands and creators', href: 'https://discord.gg/aurasearch', external: true },
      ]
    }
  ];

  const NavItem = ({ label, children, active, hasDropdown = true, onClick }: { label: string, children?: React.ReactNode, active: boolean, hasDropdown?: boolean, onClick?: (e: any) => void }) => {
    const isDropdownOpen = activeDropdown === label;

    const handleButtonClick = (e: React.MouseEvent) => {
      if (hasDropdown) {
        e.stopPropagation();
        if (isDropdownOpen) {
          setActiveDropdown(null);
        } else {
          setActiveDropdown(label);
        }
      } else if (onClick) {
        onClick(e);
      }
    };

    return (
      <div className="relative h-full flex items-center">
        <button 
          onClick={handleButtonClick}
          className={`flex items-center gap-1.5 text-sm font-medium transition-colors h-16 ${active ? 'text-coral' : 'text-deep-navy dark:text-white/80 hover:text-coral'}`}
        >
          {label} {hasDropdown && <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />}
        </button>
        
        {active && (
          <motion.div 
            layoutId="nav-underline"
            className="absolute bottom-3 left-0 right-0 h-0.5 bg-coral rounded-full"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}

        {hasDropdown && (
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute top-16 left-1/2 -translate-x-1/2 z-[1000]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white dark:bg-deep-navy border border-border-warm dark:border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(15,35,69,0.12)] overflow-hidden min-w-[320px]">
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  const DropdownItem = ({ icon, title, desc, href, external, action, color }: any) => {
    const handleClick = (e: React.MouseEvent) => {
      if (action) {
        e.preventDefault();
        action();
      } else if (href === 'chat') {
        e.preventDefault();
        // Assuming a global event or something to open chat
        window.dispatchEvent(new CustomEvent('open-chat'));
      } else if (!external && href.startsWith('#')) {
        onNavClick(e as any, href);
      }
      setActiveDropdown(null);
    };

    return (
      <a 
        href={href} 
        onClick={handleClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`flex items-start gap-4 p-4 hover:bg-warm-beige dark:hover:bg-white/5 transition-all group rounded-xl`}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-border-warm dark:border-white/10 transition-colors group-hover:bg-coral/10 group-hover:border-coral/20 ${color || 'text-coral'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-deep-navy dark:text-white group-hover:text-coral transition-colors flex items-center gap-1">
            {title} {external && <ArrowUpRight size={12} className="opacity-40" />}
          </div>
          <div className="text-xs text-muted dark:text-white/40 leading-relaxed mt-0.5">{desc}</div>
        </div>
      </a>
    );
  };

  const isSectionActive = (sectionIds: string[]) => {
    if (currentPage !== 'home') {
      return sectionIds.includes(currentPage);
    }
    return sectionIds.includes(activeSection);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${isScrolled ? 'glass py-1' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => {
              window.location.hash = '#home';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <LogoIcon size="md" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-serif text-2xl font-black tracking-tighter text-deep-navy dark:text-white uppercase group-hover:text-coral transition-colors italic">AURASEARCH</span>
                <span className="bg-teal/10 text-teal text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal/20">by SCRAG</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 h-full">
            <NavItem 
              label="Platform" 
              active={isSectionActive(['how-it-works', 'niche-chart', 'sandbox', 'predictor', 'calculator'])}
            >
              <div className="p-2 grid grid-cols-2 gap-2 w-[640px]">
                {PLATFORM_LINKS.map((col, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="px-4 pt-4 pb-2 text-[10px] font-black text-muted dark:text-white/30 uppercase tracking-[0.15em]">{col.group}</div>
                    {col.items.map((item, i) => <DropdownItem key={i} {...item} />)}
                  </div>
                ))}
              </div>
            </NavItem>

            <NavItem 
              label="Features" 
              active={isSectionActive(['brief-generator', 'leaderboard', 'comparison', 'roi-estimator'])}
            >
              <div className="p-2 flex w-[820px]">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  {FEATURES_LINKS.map((col, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="px-4 pt-4 pb-2 text-[10px] font-black text-muted dark:text-white/30 uppercase tracking-[0.15em]">{col.group}</div>
                      {col.items.map((item, i) => <DropdownItem key={i} {...item} />)}
                    </div>
                  ))}
                </div>
                <div className="w-[280px] p-4 m-2 bg-coral rounded-2xl text-white flex flex-col justify-between">
                  <div>
                    <div className="bg-white/20 w-fit px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest mb-4">✦ NEW</div>
                    <h4 className="font-serif text-xl font-bold mb-2">Virtual Sandbox</h4>
                    <p className="text-white/70 text-xs leading-relaxed">Now with AI-powered campaign simulation and real-time outcomes.</p>
                  </div>
                  <button 
                    onClick={() => {
                       const el = document.getElementById('sandbox');
                       if (el) el.scrollIntoView({ behavior: 'smooth' });
                       setActiveDropdown(null);
                    }}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mt-8 group"
                  >
                    Try it now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </NavItem>

            <NavItem 
              label="Resources" 
              active={false}
            >
              <div className="p-2 grid grid-cols-2 gap-2 w-[600px]">
                {RESOURCES_LINKS.map((col, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="px-4 pt-4 pb-2 text-[10px] font-black text-muted dark:text-white/30 uppercase tracking-[0.15em]">{col.group}</div>
                    {col.items.map((item, i) => <DropdownItem key={i} {...item} />)}
                  </div>
                ))}
              </div>
            </NavItem>


          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={onOpenModal}
              className="hidden sm:block bg-coral text-white text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-[12px] shadow-warm hover:-translate-y-0.5 hover:shadow-warm-hover active:translate-y-0 transition-all"
            >
              Get Early Access
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-deep-navy dark:text-white rounded-lg bg-warm-beige dark:bg-white/5 border border-border-warm dark:border-white/10"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[2000] bg-deep-navy text-white flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2">
                <LogoIcon size="sm" />
                <span className="font-serif text-2xl font-black tracking-tighter italic">AURASEARCH</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-2 flex-grow">
              {[
                { label: 'Platform', links: PLATFORM_LINKS.flatMap(g => g.items) },
                { label: 'Features', links: FEATURES_LINKS.flatMap(g => g.items) },
                { label: 'Resources', links: RESOURCES_LINKS.flatMap(g => g.items) },
              ].map((group) => (
                <div key={group.label} className="border-b border-white/5">
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === group.label ? null : group.label)}
                    className="w-full flex items-center justify-between py-6 text-xl font-bold"
                  >
                    {group.label}
                    <ChevronDown size={20} className={`transition-transform duration-300 ${activeAccordion === group.label ? 'rotate-180 text-coral' : 'opacity-40'}`} />
                  </button>
                  <AnimatePresence>
                    {activeAccordion === group.label && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 grid gap-4 pl-4 border-l-2 border-coral/30">
                          {group.links.map((link: any, i) => (
                            <a 
                              key={i} 
                              href={link.href}
                              onClick={(e) => {
                                setIsMobileMenuOpen(false);
                                if (link.action) {
                                  e.preventDefault();
                                  link.action();
                                } else if (!link.external && link.href.startsWith('#')) {
                                  onNavClick(e as any, link.href);
                                }
                              }}
                              className="group"
                            >
                              <div className="text-sm font-bold group-hover:text-coral transition-colors">{link.title}</div>
                              <div className="text-xs text-white/40 mt-1">{link.desc}</div>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

            </div>

            <div className="mt-12 space-y-6 pt-12 border-t border-white/5">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onOpenModal(); }}
                className="w-full bg-coral text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-xl hover:-translate-y-1 transition-all"
              >
                Get Early Access
              </button>
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden">
      {/* Radial Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-coral/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-white px-4 py-1.5 rounded-full border border-border-warm shadow-sm mb-6">
            <span className="text-coral text-xs font-bold tracking-wider">AI-POWERED INFLUENCER INTELLIGENCE</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-deep-navy leading-tight mb-4">
            Predict the Right Influencer Before You <span className="text-coral">Spend a Rupee</span>
          </h1>
          <p className="text-muted text-lg mb-10 max-w-lg">
            AuraSearch analyzes real-time conversations to find the most trusted local creator for your campaign — not just the most famous one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={onOpenModal}
              className="bg-coral text-white font-bold px-8 py-4 rounded-[10px] shadow-warm hover:-translate-y-1 hover:shadow-warm-hover transition-all flex items-center justify-center gap-2"
            >
              Get Campaign Insights <ArrowRight size={18} />
            </button>
            <button className="border border-deep-navy text-deep-navy font-bold px-8 py-4 rounded-[10px] hover:bg-deep-navy hover:text-white transition-all flex items-center justify-center">
              Explore Creators
            </button>
          </div>
        </motion.div>

        <div className="relative h-[400px] flex items-center justify-center">
          <motion.div 
            className="absolute top-0 left-0 z-20 animate-float"
            style={{ animationDelay: '0s' }}
          >
            <div className="bg-white p-4 rounded-[16px] shadow-warm border border-border-warm w-56">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-muted">Karthik K.</span>
                <span className="bg-teal/10 text-teal text-[10px] font-bold px-2 py-0.5 rounded">91 SCRAG</span>
              </div>
              <div className="text-xl font-bold text-deep-navy">84 / 100 Score</div>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 right-0 z-20 animate-float"
            style={{ animationDelay: '1s' }}
          >
            <div className="bg-white p-4 rounded-[16px] shadow-warm border border-border-warm w-48">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-coral" />
                <span className="text-[10px] font-bold text-muted">Growth Pulse</span>
              </div>
              <div className="text-xl font-bold text-coral">↑ 18% in 30 days</div>
            </div>
          </motion.div>

          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-float"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="bg-white p-5 rounded-[16px] shadow-warm border border-border-warm w-64">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                  <Star className="text-teal" size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-deep-navy">Audience Sentiment</div>
                  <div className="text-[10px] text-muted">Real-time Analysis</div>
                </div>
              </div>
              <div className="text-lg font-bold text-teal">Ultra-Positive (94%)</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { target: 300, label: "Creators Indexed", suffix: "+" },
    { target: 8, label: "Cities Covered", suffix: "" },
    { target: 70, label: "Cost Reduction", suffix: "%" },
    { target: 84, label: "Average Top Score", suffix: "" },
  ];

  return (
    <section className="bg-deep-navy py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <StatCounter key={idx} target={stat.target} label={stat.label} suffix={stat.suffix} />
        ))}
      </div>
    </section>
  );
};

const StatCounter: React.FC<{ target: number, label: string, suffix: string }> = ({ target, label, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-6xl font-extrabold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-white/60 text-sm font-medium tracking-wide">{label}</div>
    </div>
  );
};

const Sandbox = ({ isSubpage = false }: { isSubpage?: boolean }) => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'timeline'>('simulation');

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#timeline-builder') {
        setActiveTab('timeline');
      } else if (window.location.hash === '#sandbox') {
        setActiveTab('simulation');
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const content = (
    <>
      {/* Tab Switcher */}
      <div className="flex justify-center mb-10">
         <div className="bg-warm-beige dark:bg-white/5 p-1.5 rounded-2xl flex gap-1 border border-border-warm dark:border-white/10">
            <button 
              onClick={() => setActiveTab('simulation')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'simulation' ? 'bg-white dark:bg-white/10 text-deep-navy dark:text-white shadow-sm border border-border-warm dark:border-white/5' : 'text-muted hover:text-deep-navy dark:hover:text-white'}`}
            >
               <Layout size={16} /> Campaign Simulation
            </button>
            <button 
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'timeline' ? 'bg-white dark:bg-white/10 text-deep-navy dark:text-white shadow-sm border border-border-warm dark:border-white/5' : 'text-muted hover:text-deep-navy dark:hover:text-white'}`}
            >
               <Clock size={16} /> AI Timeline Builder
            </button>
         </div>
      </div>

      <AnimatePresence mode="wait">
         {activeTab === 'simulation' ? (
            <motion.div key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
               <SimulationCardContent />
            </motion.div>
         ) : (
            <motion.div key="timeline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
               <CampaignTimelineBuilder />
            </motion.div>
         )}
      </AnimatePresence>
    </>
  );

  if (isSubpage) {
    return <div className="relative">{content}</div>;
  }

  return (
    <section id="sandbox" className="py-24 bg-surface relative overflow-hidden">
      <div id="timeline-builder" className="absolute top-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          label="VIRTUAL SANDBOX" 
          title="Experiment Before Execution" 
        />
        {content}
      </div>
    </section>
  );
};

const SimulationCardContent = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);

  const startSimulation = () => {
    setIsRunning(true);
    setStep(0);
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= 4) {
          clearInterval(interval);
          return 4;
        }
        return prev + 1;
      });
    }, 800);
  };

  const findings = [
    "Local creators discussing travel frustrations",
    "Audience frustrated with high auto fares",
    "Peak conversation window: 7–9 AM",
    "Top creator SCRAG score: 84 / 100"
  ];

  const outputs = [
    { label: "Creator", value: "Local commuter influencer" },
    { label: "Content hook", value: '\"Auto ₹250 😑 → Try Red Taxi 🚖\"' },
    { label: "Format", value: "Short video + Instagram story" },
    { label: "Timing", value: "Peak travel hours (7–9 AM)" }
  ];

  return (
    <div className="bg-white dark:bg-deep-navy/30 rounded-[20px] shadow-warm border border-border-warm overflow-hidden">
      <div className="bg-teal px-8 py-4 flex flex-col md:flex-row md:justify-between md:items-center text-white">
        <h3 className="font-serif text-xl font-bold">Red Taxi · Coimbatore · Transport & Commute</h3>
        <button 
          onClick={startSimulation}
          disabled={isRunning && step < 4}
          className="mt-4 md:mt-0 bg-white text-teal text-xs font-bold px-5 py-2.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {isRunning && step < 4 ? 'Simulating...' : 'Run Simulation'}
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-8 border-r border-border-warm">
          <h4 className="text-deep-navy dark:text-white font-bold text-sm uppercase tracking-widest mb-6">What SCRAG Found</h4>
          <ul className="space-y-4">
            {findings.map((item, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isRunning && step > 0 ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-start gap-3"
              >
                <Check size={16} className="text-teal mt-1 shrink-0" />
                <span className="text-muted dark:text-white/60 text-sm leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className="p-8 bg-warm-beige/30 dark:bg-white/5">
          <h4 className="text-deep-navy dark:text-white font-bold text-sm uppercase tracking-widest mb-6">Campaign Output</h4>
          <div className="space-y-6">
            {outputs.map((out, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isRunning && step > 0 ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ delay: 0.8 + (i * 0.2) }}
              >
                <div className="text-[10px] font-bold text-muted dark:text-white/40 uppercase mb-1">{out.label}</div>
                <div className="text-deep-navy dark:text-white font-bold">{out.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {step === 4 && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            className="bg-teal/10 border-t border-border-warm overflow-hidden"
          >
            <div className="p-6 text-center text-teal font-serif text-lg font-bold flex items-center justify-center gap-3">
              <span>Higher Trust</span>
              <ArrowRight size={20} />
              <span>Better Engagement</span>
              <ArrowRight size={20} />
              <span>Increased Bookings</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ScragCalculator = ({ isSubpage = false }: { isSubpage?: boolean }) => {
  const [scores, setScores] = useState({ S: 15, C: 15, R: 15, A: 15, G: 15 });
  
  const total = scores.S + scores.C + scores.R + scores.A + scores.G;
  
  const getVerdict = (score: number) => {
    if (score >= 70) return { text: "Strong campaign fit — recommended", color: "text-teal" };
    if (score >= 50) return { text: "Moderate fit — use with targeting", color: "text-coral" };
    return { text: "Low fit — refine your search", color: "text-red-500" };
  };
  
  const verdict = getVerdict(total);

  const innerContent = (
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        {SCRAG_DIMENSIONS.map(dim => (
          <div key={dim.key} className="space-y-3">
            <div className="flex justify-between items-center text-sm font-bold text-deep-navy dark:text-white">
              <span>{dim.key} – {dim.name}</span>
              <span className="text-coral bg-coral/5 px-2 py-0.5 rounded">{scores[dim.key as keyof typeof scores]}/20</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="20" 
              value={scores[dim.key as keyof typeof scores]} 
              onChange={(e) => setScores({ ...scores, [dim.key]: parseInt(e.target.value) })}
              className="w-full accent-coral"
            />
            <p className="text-[11px] text-muted dark:text-white/40 leading-tight">{dim.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-deep-navy/40 rounded-[40px] shadow-warm border border-border-warm dark:border-white/10 relative">
         {/* Score Ring */}
         <div className="relative w-64 h-64 flex items-center justify-center">
           <svg className="w-full h-full -rotate-90">
             <circle 
               cx="128" cy="128" r="110" 
               className="fill-none stroke-deep-navy/5 dark:stroke-white/5" 
               strokeWidth="12" 
             />
             <motion.circle 
                cx="128" cy="128" r="110" 
                className="fill-none stroke-coral" 
                strokeWidth="12" 
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 1000" }}
                animate={{ strokeDasharray: `${(total / 100) * 690} 1000` }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
             />
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center">
             <span className="text-6xl font-extrabold text-deep-navy dark:text-white">{total}</span>
             <span className="text-xs font-bold text-muted dark:text-white/40 uppercase tracking-widest">Total SCRAG</span>
           </div>
         </div>
         
         <div className={`mt-10 font-serif text-xl font-bold text-center ${verdict.color}`}>
           {verdict.text}
         </div>
      </div>
    </div>
  );

  if (isSubpage) {
    return <div className="relative">{innerContent}</div>;
  }

  return (
    <section className="py-24 bg-warm-beige/50 dark:bg-white/5 border-y border-border-warm dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader 
          label="TRY IT YOURSELF" 
          title="Calculate a Creator's SCRAG Score" 
        />
        {innerContent}
      </div>
    </section>
  );
};

const Leaderboard = ({ isSubpage = false }: { isSubpage?: boolean }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [minScore, setMinScore] = useState(60);

  // Dynamically extract unique cities and niches from dataset
  const cities = useMemo(() => {
    const allCities = CREATORS.map(c => c.city);
    return ['All', ...Array.from(new Set(allCities))].sort();
  }, []);

  const niches = useMemo(() => {
    const allNiches = CREATORS.map(c => c.niche);
    return ['All', ...Array.from(new Set(allNiches))].sort();
  }, []);

  const filtered = useMemo(() => {
    return CREATORS.filter(c => {
      const matchesSearch = searchQuery === '' || 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.niche.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCity = selectedCity === 'All' || c.city === selectedCity;
      const matchesNiche = selectedNiche === 'All' || c.niche === selectedNiche;
      const matchesScore = c.score >= minScore;
      
      return matchesSearch && matchesCity && matchesNiche && matchesScore;
    }).sort((a, b) => b.score - a.score);
  }, [searchQuery, selectedCity, selectedNiche, minScore]);

  // Export search records as standard fully compliant CSV format
  const exportToCSV = () => {
    const headers = ['Rank', 'Name', 'City', 'Niche', 'Followers', 'SCRAG Score'];
    const rows = filtered.map((c, idx) => [
      idx + 1,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.city.replace(/"/g, '""')}"`,
      `"${c.niche.replace(/"/g, '""')}"`,
      `"${c.followers}"`,
      c.score
    ]);

    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `aurasearch_leaderboard_report_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export printed/saved premium layout document completely safety bypassing standard popup blocker
  const exportToPDF = () => {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.zIndex = '-1000';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (!doc) return;

    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });

    const activeFiltersText = [
      selectedCity !== 'All' ? `City: ${selectedCity}` : null,
      selectedNiche !== 'All' ? `Niche: ${selectedNiche}` : null,
      minScore > 60 ? `Min Score: ${minScore}` : null,
      searchQuery ? `Search Query: "${searchQuery}"` : null
    ].filter(Boolean).join(', ') || 'None';

    const rowsHTML = filtered.map((c, i) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 12px 16px; font-weight: bold; color: #475569;">${i + 1}</td>
        <td style="padding: 12px 16px; font-weight: bold; color: #0f172a;">${c.name}</td>
        <td style="padding: 12px 16px; color: #334155;">${c.city}</td>
        <td style="padding: 12px 16px;"><span style="background-color: rgba(13, 148, 136, 0.1); color: #0d9488; padding: 4px 8px; border-radius: 9999px; font-size: 11px; font-weight: 500;">${c.niche}</span></td>
        <td style="padding: 12px 16px; color: #475569; font-family: monospace;">${c.followers.toLocaleString()}</td>
        <td style="padding: 12px 16px; text-align: right; font-family: Georgia, serif; font-size: 18px; font-weight: bold; color: ${c.score >= 80 ? '#0d9488' : c.score >= 70 ? '#ea580c' : '#d97706'}">${c.score}</td>
      </tr>
    `).join('');

    doc.write(`
      <html>
        <head>
          <title>AuraSearch Audited Leaderboard Report</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            body { font-family: 'Inter', system-ui, sans-serif; background-color: #ffffff; color: #0f172a; padding: 40px; margin: 0; }
            .header-container { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #ea580c; padding-bottom: 20px; margin-bottom: 30px; }
            .title { font-family: Georgia, serif; font-size: 28px; font-weight: bold; color: #0b1528; margin: 0; }
            .subtitle { font-size: 11px; font-weight: bold; color: #ea580c; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 4px; }
            .brand-logo { font-family: Georgia, serif; font-weight: bold; font-size: 18px; color: #0b1528; }
            .brand-logo span { color: #ea580c; }
            .meta-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 20px; font-size: 13px; color: #475569; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 18px; border-radius: 12px; margin-bottom: 30px; }
            .meta-item { margin-bottom: 6px; }
            .meta-label { font-weight: 600; color: #0f172a; }
            table { width: 100%; border-collapse: collapse; background-color: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 30px; font-size: 13px; }
            th { background-color: #f1f5f9; border-bottom: 2px solid #e2e8f0; padding: 14px 16px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; }
            .footer { border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 11px; color: #64748b; text-align: center; margin-top: 50px; }
          </style>
        </head>
        <body>
          <div class="header-container">
            <div>
              <h1 class="title">AuraSearch Leaderboard Export</h1>
              <div class="subtitle">Audited Creator Performance Insights</div>
            </div>
            <div class="brand-logo">Aura<span>Search</span></div>
          </div>
          
          <div class="meta-grid">
            <div>
              <div class="meta-item"><span class="meta-label">Generated on:</span> \${formattedDate}</div>
              <div class="meta-item"><span class="meta-label">Auditing Standard:</span> SCRAG Framework v1.4</div>
            </div>
            <div>
              <div class="meta-item"><span class="meta-label">Active Filters:</span> \${activeFiltersText}</div>
              <div class="meta-item"><span class="meta-label">Database Records Found:</span> \${filtered.length} creators</div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th style="width: 80px;">Rank</th>
                <th>Name</th>
                <th>City</th>
                <th>Niche</th>
                <th>Followers</th>
                <th style="text-align: right; width: 120px;">SCRAG Score</th>
              </tr>
            </thead>
            <tbody>
              \${rowsHTML}
            </tbody>
          </table>
          
          <div class="footer">
            CONFIDENTIAL AUDIT REPORT &bull; Verified via AuraSearch Professional Platform &bull; Powered by Antigravity Agent Verification
          </div>
        </body>
      </html>
    `);
    doc.close();

    // Trigger printing once content is ready
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      // Remove iframe from document after print dialog closes
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 500);
  };

  const innerContent = (
    <>
      {/* Advanced Discovery Controls */}
      <div className="mb-10 bg-white/70 dark:bg-deep-navy/40 backdrop-blur-md border border-border-warm dark:border-white/10 p-6 rounded-[24px] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Global Search Bar */}
          <div className="md:col-span-5 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted dark:text-white/40">
              <Search size={18} />
            </span>
            <input
              type="text"
              id="leaderboard-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creators by name, city, or niche..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-warm-beige/50 dark:bg-deep-navy/70 border border-border-warm/65 dark:border-white/10 text-deep-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all placeholder:text-muted/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                id="clear-search-btn"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted hover:text-coral transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* City Filter Dropdown */}
          <div className="md:col-span-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted/60 dark:text-white/40 text-xs font-semibold uppercase tracking-wider">City:</span>
              <select
                id="city-filter"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-16 pr-10 py-3 rounded-2xl bg-warm-beige/50 dark:bg-deep-navy/70 border border-border-warm/65 dark:border-white/10 text-deep-navy dark:text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all font-medium"
              >
                {cities.map(city => (
                  <option key={city} value={city} className="bg-white dark:bg-deep-navy text-deep-navy dark:text-white">
                    {city}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-muted dark:text-white/40">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Niche Filter Dropdown */}
          <div className="md:col-span-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted/60 dark:text-white/40 text-xs font-semibold uppercase tracking-wider">Niche:</span>
              <select
                id="niche-filter"
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full pl-[4.2rem] pr-10 py-3 rounded-2xl bg-warm-beige/50 dark:bg-deep-navy/70 border border-border-warm/65 dark:border-white/10 text-deep-navy dark:text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all font-medium"
              >
                {niches.map(niche => (
                  <option key={niche} value={niche} className="bg-white dark:bg-deep-navy text-deep-navy dark:text-white">
                    {niche}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-muted dark:text-white/40">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Reset Filters / Matching Stats */}
          <div className="md:col-span-2 flex items-center justify-end gap-3 w-full">
            {(searchQuery || selectedCity !== 'All' || selectedNiche !== 'All' || minScore > 60) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCity('All');
                  setSelectedNiche('All');
                  setMinScore(60);
                }}
                id="reset-leaderboard-filters"
                className="text-xs font-bold text-coral hover:text-coral/80 flex items-center gap-1 py-2 px-3 bg-coral/5 hover:bg-coral/10 rounded-xl transition-all"
              >
                Reset
              </button>
            )}
            <span className="text-[11px] font-bold font-mono text-muted/65 dark:text-white/50 text-right">
              {filtered.length} found
            </span>
          </div>

        </div>

        {/* Min SCRAG Score Slider */}
        <div className="mt-5 pt-5 border-t border-border-warm/65 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-widest min-w-[125px]">
              Min SCRAG Score:
            </span>
            <input
              type="range"
              min="60"
              max="95"
              step="1"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              id="scrag-score-range-slider"
              className="flex-1 accent-coral h-1.5 bg-warm-beige dark:bg-white/10 rounded-lg cursor-pointer"
            />
            <span className="px-3 py-1 rounded-xl bg-teal/10 border border-teal/20 text-teal dark:text-teal font-mono font-bold text-xs shadow-sm">
              &ge; {minScore} Rating
            </span>
          </div>
          <div className="hidden md:flex gap-1.5 text-[10px] items-center text-muted/70 dark:text-white/30 font-semibold uppercase tracking-wider">
            <SlidersHorizontal size={10} /> Active Filters: {[
              selectedCity !== 'All' && `City: ${selectedCity}`,
              selectedNiche !== 'All' && `Niche: ${selectedNiche}`,
              minScore > 60 && `Score >= ${minScore}`,
              searchQuery && 'Search'
            ].filter(Boolean).join(', ') || 'None'}
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-deep-navy/10 rounded-[24px] shadow-warm border border-border-warm dark:border-white/10 overflow-hidden">
        {/* Table Branded Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-8 py-5 bg-warm-beige/10 dark:bg-white/5 border-b border-border-warm dark:border-white/10 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal" />
            <h4 className="font-serif text-base font-bold text-deep-navy dark:text-white">Audited Leaderboard Records</h4>
          </div>
          
          <div className="flex items-center gap-2.5">
            <button
              onClick={exportToCSV}
              id="export-csv-btn"
              title="Download results as a spreadsheet CSV file"
              className="text-xs font-bold text-deep-navy dark:text-white hover:text-coral hover:border-coral transition-all px-3 py-1.5 border border-border-warm dark:border-white/15 rounded-xl bg-white dark:bg-transparent flex items-center gap-1.5 shadow-sm cursor-pointer hover:shadow"
            >
              <Download size={13} className="text-muted" /> Export CSV
            </button>
            <button
              onClick={exportToPDF}
              id="export-pdf-btn"
              title="Save a beautifully formatted document PDF file"
              className="text-xs font-bold text-white bg-coral hover:bg-coral/90 transition-all px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer hover:shadow-lg"
            >
              <FileText size={13} /> Export PDF Report
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-warm dark:border-white/10 bg-warm-beige/30 dark:bg-white/5">
                <th className="px-8 py-5 text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-widest">Rank</th>
                <th className="px-8 py-5 text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-widest">Name</th>
                <th className="px-8 py-5 text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-widest">City</th>
                <th className="px-8 py-5 text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-widest">Niche</th>
                <th className="px-8 py-5 text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-widest">Followers</th>
                <th className="px-8 py-5 text-[10px] font-bold text-muted dark:text-white/40 uppercase tracking-widest text-right">SCRAG Score</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout text-left">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-20 text-muted dark:text-white/40 text-sm">
                      <div className="flex flex-col items-center gap-3 justify-center max-w-sm mx-auto">
                        <SlidersHorizontal size={28} className="text-coral opacity-50 animate-pulse" />
                        <span className="font-serif text-lg font-bold text-deep-navy dark:text-white">No results found</span>
                        <span className="text-xs leading-relaxed text-muted/80">
                          Try relaxing your filtering parameters, adjusting the minimum SCRAG rating score slider, or typing a different keyword.
                        </span>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCity('All');
                            setSelectedNiche('All');
                            setMinScore(60);
                          }}
                          className="mt-2 text-xs font-bold text-white bg-coral hover:bg-coral/95 px-4 py-2 rounded-xl transition-all"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((creator, idx) => (
                    <motion.tr 
                      key={creator.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => { window.location.hash = `#creator-profile?id=${creator.id}`; }}
                      className="border-b border-border-warm dark:border-white/10 hover:bg-warm-beige/40 dark:hover:bg-white/5 transition-all cursor-pointer group/row"
                    >
                      <td className="px-8 py-5 text-sm font-bold text-muted dark:text-white/60">
                        {idx === 0 && selectedCity === 'All' && selectedNiche === 'All' && searchQuery === '' && (
                          <span className="bg-coral text-white text-[10px] px-2 py-0.5 rounded mr-2">Top Pick</span>
                        )}
                        {idx + 1}
                      </td>
                      <td className="px-8 py-5 font-bold text-deep-navy dark:text-white group-hover/row:text-coral transition-colors flex items-center gap-1.5">
                        <span>{creator.name}</span>
                        <ArrowUpRight size={14} className="opacity-0 group-hover/row:opacity-100 transition-opacity text-coral shrink-0" />
                      </td>
                      <td className="px-8 py-5 text-sm text-deep-navy dark:text-white/80">{creator.city}</td>
                      <td className="px-8 py-5 text-sm">
                        <span className="text-teal bg-teal/5 px-3 py-1 rounded-full font-medium text-xs border border-teal/10">{creator.niche}</span>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-muted dark:text-white/60">{creator.followers}</td>
                      <td className="px-8 py-5 text-right font-serif text-xl font-bold italic">
                        <span className={creator.score >= 80 ? 'text-teal' : creator.score >= 70 ? 'text-coral' : 'text-amber-600'}>
                          {creator.score}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  if (isSubpage) {
    return <div className="relative">{innerContent}</div>;
  }

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          label="TOP CREATORS" 
          title="Highest SCRAG Scores This Week" 
        />
        {innerContent}
      </div>
    </section>
  );
};

const WaitlistModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<WaitlistForm>({ name: '', email: '', role: 'Brand', city: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      onClose();
      setSuccess(false);
      setForm({ name: '', email: '', role: 'Brand', city: '' });
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-deep-navy/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            className="bg-white rounded-[24px] shadow-2xl relative z-10 w-full max-w-md overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-deep-navy">
              <X size={24} />
            </button>
            
            <div className="p-8">
              {!success ? (
                <>
                  <div className="mb-8">
                    <h2 className="font-serif text-3xl font-bold text-deep-navy mb-2">Join the AuraSearch Waitlist</h2>
                    <p className="text-muted text-sm">Be the first to know when we launch regional intelligence in your city.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted uppercase">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        className="w-full bg-warm-beige p-3 rounded-[10px] text-deep-navy focus:outline-none focus:ring-2 focus:ring-coral/20" 
                        placeholder="Arjun Sharma"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted uppercase">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full bg-warm-beige p-3 rounded-[10px] text-deep-navy focus:outline-none focus:ring-2 focus:ring-coral/20" 
                        placeholder="arjun@brand.com"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted uppercase">I am a</label>
                        <select 
                          value={form.role}
                          onChange={e => setForm({...form, role: e.target.value})}
                          className="w-full bg-warm-beige p-3 rounded-[10px] text-deep-navy focus:outline-none"
                        >
                          <option>Brand</option>
                          <option>Agency</option>
                          <option>Creator</option>
                          <option>Investor</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-muted uppercase">City</label>
                        <input 
                          required
                          type="text" 
                          value={form.city}
                          onChange={e => setForm({...form, city: e.target.value})}
                          className="w-full bg-warm-beige p-3 rounded-[10px] text-deep-navy focus:outline-none" 
                          placeholder="Coimbatore"
                        />
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-coral text-white font-bold py-4 rounded-[10px] shadow-warm mt-4 hover:shadow-warm-hover active:scale-95 transition-all">
                      Secure My Spot
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-deep-navy mb-2">You're on the list!</h3>
                  <p className="text-muted mb-8">We've added you to the inner circle. We'll be in touch very soon.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | string>('home');

  const openWaitlist = () => setIsWaitlistOpen(true);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const pathPart = hash.includes('?') ? hash.split('?')[0] : hash;
      const cleanHash = pathPart.replace('#', '');
      const validSubpages = ['sandbox', 'brief-generator', 'predictor', 'calculator', 'leaderboard', 'comparison', 'roi-estimator', 'niche-chart', 'creator-profile'];
      if (validSubpages.includes(cleanHash)) {
        setCurrentPage(cleanHash);
        window.scrollTo(0, 0); // Reset page scroll on load
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const baseHref = href.includes('?') ? href.split('?')[0] : href;
    const targetId = baseHref.replace('#', '');
    const validSubpages = ['sandbox', 'brief-generator', 'predictor', 'calculator', 'leaderboard', 'comparison', 'roi-estimator', 'niche-chart', 'creator-profile'];
    
    if (validSubpages.includes(targetId)) {
      window.location.hash = href;
    } else {
      // Return back to Home before scrolling
      if (currentPage !== 'home') {
        window.location.hash = '#home';
        setTimeout(() => {
          const elem = document.getElementById(targetId);
          if (elem) {
            const rect = elem.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo({
              top: rect.top + scrollTop - 80,
              behavior: 'smooth'
            });
          }
        }, 120);
      } else {
        const elem = document.getElementById(targetId);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({
            top: rect.top + scrollTop - 80,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen selection:bg-coral/20 selection:text-coral transition-colors duration-300 bg-warm-beige">
      <Navbar onOpenModal={openWaitlist} onNavClick={handleNavClick} currentPage={currentPage} />
      
      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.main
            key="home"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
          >
            {/* 1. Hero */}
            <Hero onOpenModal={openWaitlist} />

            {/* 2. Stats */}
            <StatsSection />

            {/* 2b. Enterprise Corporate Workspace */}
            <section className="py-12 max-w-7xl mx-auto px-6 w-full" id="institutional-workspace">
              <FadeInSection>
                <div className="mb-8 text-center">
                  <span className="text-coral text-xs font-bold tracking-[0.25em] uppercase mb-2 block">EXECUTIVE RETRIEVAL WORKSPACE</span>
                  <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-deep-navy leading-tight">
                    Dialect Context Discovery Node
                  </h2>
                </div>
                <EnterpriseDashboard />
              </FadeInSection>
            </section>

            {/* 3. Problem */}
            <section id="problem" className="py-24 max-w-7xl mx-auto px-6">
              <FadeInSection>
                <SectionHeader label="THE PROBLEM" title="Why Most Influencer Campaigns Fail" />
                <div className="grid md:grid-cols-3 gap-8 mt-16">
                  {PROBLEM_CARDS.map((card, i) => (
                    <div key={i} className="bg-white p-10 rounded-2xl border border-border-warm transition-all">
                      <div className="mb-6">{card.icon}</div>
                      <h3 className="font-serif text-xl font-bold mb-4">{card.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-center mt-12 font-serif text-xl italic text-deep-navy">"High reach doesn't guarantee real impact."</p>
              </FadeInSection>
            </section>

            {/* 5. How It Works Flow */}
            <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-6 font-sans">
              <FadeInSection>
                <SectionHeader label="HOW IT WORKS" title="Four Steps to a Predictable Campaign" />
                <div className="relative mt-16 font-sans">
                  {/* Connector Line */}
                  <div className="absolute top-1/4 left-0 w-full h-px bg-border-warm dark:bg-white/10 hidden lg:block" />
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 font-sans">
                    {STEPS.map((step, i) => (
                      <div key={i} className="text-center">
                        <div className="w-16 h-16 bg-white dark:bg-deep-navy border border-border-warm dark:border-white/10 text-coral text-2xl font-serif font-bold rounded-full flex items-center justify-center mx-auto mb-8 shadow-warm relative z-20">
                          {step.num}
                        </div>
                        <h4 className="font-serif text-xl font-bold mb-4 text-deep-navy dark:text-white">{step.title}</h4>
                        <p className="text-muted dark:text-white/60 text-sm px-4 leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            </section>

            {/* 6. Advanced Platform Tools Suite */}
            <PlatformToolsOverview 
              onLaunchTool={(toolId) => {
                window.location.hash = `#${toolId}`;
              }} 
            />



            {/* 17. For Creators */}
            <section id="creators" className="py-24 bg-[#F2F8F6] dark:bg-teal/5 px-6 border-b border-border-warm dark:border-teal/10">
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <SectionHeader label="FOR CREATORS" title="Your Local Influence Has Real Value" center={false} labelColor="text-teal" />
                  <div className="flex flex-wrap gap-3 mb-8">
                    {['Strong Engagement', 'Niche Content', 'Local Community'].map(chip => (
                      <span key={chip} className="bg-white dark:bg-white/5 px-5 py-2 rounded-full text-xs font-bold text-teal shadow-sm border border-teal/10">{chip}</span>
                    ))}
                  </div>
                  <p className="text-muted dark:text-white/60 text-lg leading-relaxed mb-10 font-sans">
                    No need for millions of followers to get brand deals. We find high-trust creators who actually move needles in their own cities.
                  </p>
                  <button 
                    onClick={openWaitlist}
                    className="bg-teal text-white font-bold px-10 py-4 rounded-[10px] shadow-md hover:-translate-y-1 transition-all"
                  >
                    Join as a Creator
                  </button>
                </div>
                <div className="relative rounded-[32px] overflow-hidden shadow-2xl">
                  <img 
                    referrerPolicy="no-referrer"
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200" 
                    alt="Creator" 
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-teal/20 mix-blend-overlay"></div>
                </div>
              </div>
            </section>

            {/* 18. Creator Alerts */}
            <section id="notify-me" className="py-24 max-w-7xl mx-auto px-6">
              <FadeInSection>
                <AvailabilityAlerts />
              </FadeInSection>
            </section>

            {/* 19. Final CTA */}
            <section className="py-24 bg-deep-navy relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal/10 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
              
              <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="font-serif text-5xl md:text-6xl text-white font-bold mb-6">Stop Guessing. <br/>Start Predicting.</h2>
                <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
                  Make smarter marketing decisions with real-time creator intelligence built for local impact. Join the future of regional influence.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button 
                    onClick={openWaitlist}
                    className="bg-coral text-white font-bold px-10 py-5 rounded-[12px] shadow-xl hover:-translate-y-1 transition-all"
                  >
                     Start Your First Campaign
                  </button>
                  <button className="border border-white/20 text-white font-bold px-10 py-5 rounded-[12px] hover:bg-white/5 transition-all">
                    Join as a Creator
                  </button>
                </div>
              </div>
            </section>
          </motion.main>
        ) : (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <SubPageLayout pageId={currentPage} onBack={() => { window.location.hash = '#home'; }}>
              {currentPage === 'sandbox' && <Sandbox isSubpage={true} />}
              {currentPage === 'brief-generator' && <AIBriefGenerator />}
              {currentPage === 'predictor' && <OutcomePredictor />}
              {currentPage === 'calculator' && <ScragCalculator isSubpage={true} />}
              {currentPage === 'leaderboard' && <Leaderboard isSubpage={true} />}
              {currentPage === 'comparison' && <CreatorComparison />}
              {currentPage === 'roi-estimator' && <ROIEstimator />}
              {currentPage === 'niche-chart' && <NichePerformanceChart />}
              {currentPage === 'design-system' && <DesignSystemPage />}
              {currentPage === 'creator-profile' && <CreatorProfile />}
            </SubPageLayout>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 20. Footer */}
      <footer className="bg-warm-beige dark:bg-deep-navy/30 pt-20 pb-10 border-t border-border-warm dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <LogoIcon size="md" />
                <span className="font-serif text-2xl font-black tracking-tighter text-deep-navy dark:text-white uppercase leading-none italic">AuraSearch</span>
              </div>
              <p className="text-muted text-sm leading-relaxed max-w-sm">
                Turning Influence into Predictable Outcomes. The definitive metric for regional influencer trust in India.
              </p>
            </div>
            
            <div className="md:col-span-2">
              <h5 className="font-bold text-deep-navy dark:text-white mb-6">Company</h5>
              <ul className="space-y-4 text-sm text-muted">
                <li><a href="#how-it-works" onClick={(e) => handleNavClick(e, '#how-it-works')} className="hover:text-coral transition-colors">How it Works</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h5 className="font-bold text-deep-navy dark:text-white mb-6">Resource</h5>
              <ul className="space-y-4 text-sm text-muted">
                {TOOLS_METADATA.slice(0, 3).map(meta => (
                  <li key={meta.id}><a href={`#${meta.id}`} onClick={(e) => handleNavClick(e, `#${meta.id}`)} className="hover:text-coral transition-colors">{meta.title}</a></li>
                ))}
                <li><a href="#design-system" onClick={(e) => handleNavClick(e, '#design-system')} className="hover:text-coral transition-colors font-bold text-teal">Design System v1.0</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-3">
              <h5 className="font-bold text-deep-navy dark:text-white mb-6">Contact</h5>
              <p className="text-sm text-muted leading-relaxed">
                Built for regional India.<br/> Powered by real data.
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border-warm dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-muted uppercase tracking-widest gap-4">
            <div>© 2025 AuraSearch. All rights reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-coral transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-coral transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 21. Chat Assistant */}
      <ChatAssistant />

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
}
