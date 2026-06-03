import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Heart, 
  MessageSquare, 
  Award, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Building2, 
  ArrowUpRight, 
  ThumbsUp, 
  Share2, 
  Compass, 
  ShieldCheck, 
  Check,
  TrendingDown
} from 'lucide-react';
import { CREATORS_DATA, Creator } from '../creatorsData';

interface CreatorProfileProps {
  creatorId?: number;
}

// Tailored generation of mock pieces of content depending on Creator's niche
const generateNicheContent = (niche: string, name: string) => {
  const contentMap: Record<string, Array<{ title: string; views: string; likes: string; comments: string; date: string; type: 'Video' | 'Post'; urlHash: string }>> = {
    'Food': [
      { title: `Ultimate Kochi Sadya Feast - 15 Traditional Curries Tried & Tested! 🍲`, views: '145K', likes: '12K', comments: '542', date: '3 days ago', type: 'Video', urlHash: '#food-1' },
      { title: `Street Food Coimbatore Style: Secrets to the perfect spiced mushroom fry 🍄`, views: '89K', likes: '7.2K', comments: '390', date: '1 week ago', type: 'Video', urlHash: '#food-2' },
      { title: `Chettinad Kitchen Secrets: Finding authentic ground spice markets in Madurai 🥘`, views: '45K', likes: '3.8K', comments: '185', date: '2 weeks ago', type: 'Post', urlHash: '#food-3' },
    ],
    'Travel': [
      { title: `Unexplored Peaks of Western Ghats: 3 hidden trekking trails you must visit ⛰️`, views: '220K', likes: '19K', comments: '840', date: '4 days ago', type: 'Video', urlHash: '#travel-1' },
      { title: `Coimbatore to Ooty: The complete budget-friendly backpacking itinerary 🚂`, views: '110K', likes: '8.9K', comments: '412', date: '1 week ago', type: 'Video', urlHash: '#travel-2' },
      { title: `Reviewing the top 5 secluded eco-homestays in Munnar for weekend stays 🌳`, views: '67K', likes: '5.1K', comments: '224', date: '3 weeks ago', type: 'Post', urlHash: '#travel-3' },
    ],
    'Fitness': [
      { title: `Full Body Calisthenics: Progressive workout using local outdoor park bars 🏋️‍♂️`, views: '95K', likes: '8.1K', comments: '298', date: '2 days ago', type: 'Video', urlHash: '#fit-1' },
      { title: `How I maintain under 12% body fat while enjoying traditional South Indian food 🍲`, views: '140K', likes: '11.5K', comments: '488', date: '1 week ago', type: 'Video', urlHash: '#fit-2' },
      { title: `15-minute desk mobility exercises for software professionals working in Bangalore 🧘‍♂️`, views: '52K', likes: '4.2K', comments: '170', date: '2 weeks ago', type: 'Post', urlHash: '#fit-3' },
    ],
    'Tech': [
      { title: `Do Not Overpay! Testing the cheapest local smartwatches in Coimbatore market ⌚`, views: '310K', likes: '26K', comments: '1,205', date: '5 days ago', type: 'Video', urlHash: '#tech-1' },
      { title: `Inside Bangalore Tech Expo: Hands-on with homegrown robotic startups 🤖`, views: '180K', likes: '14.2K', comments: '640', date: '1 week ago', type: 'Video', urlHash: '#tech-2' },
      { title: `Best entry-level smartphones under ₹15,000 for high performance & gaming 📱`, views: '95K', likes: '6.9K', comments: '331', date: '3 weeks ago', type: 'Post', urlHash: '#tech-3' },
    ],
    'Beauty': [
      { title: `Traditional South Indian Silk Saree Styling Tutorial - Custom Draping 🥻`, views: '160K', likes: '13.5K', comments: '512', date: '2 days ago', type: 'Video', urlHash: '#beauty-1' },
      { title: `Coimbatore Local Street Bazaar: Building a full festive outfit under ₹1,000 👗`, views: '115K', likes: '9.4K', comments: '403', date: '1 week ago', type: 'Video', urlHash: '#beauty-2' },
      { title: `Ancient ayurvedic remedies for flawless skin: Real science behind local herbs 🌿`, views: '73K', likes: '6.1K', comments: '290', date: '2 weeks ago', type: 'Post', urlHash: '#beauty-3' },
    ],
    'Fashion': [
      { title: `Traditional South Indian Silk Saree Styling Tutorial - Custom Draping 🥻`, views: '160K', likes: '13.5K', comments: '512', date: '2 days ago', type: 'Video', urlHash: '#fashion-1' },
      { title: `Coimbatore Local Street Bazaar: Building a full festive outfit under ₹1,000 👗`, views: '115K', likes: '9.4K', comments: '403', date: '1 week ago', type: 'Video', urlHash: '#fashion-2' },
      { title: `Minimalist cotton wear guide: Beat the regional humidity with sustainable local fabrics 🌿`, views: '62K', likes: '4.8K', comments: '194', date: '2 weeks ago', type: 'Post', urlHash: '#fashion-3' },
    ],
    'Finance': [
      { title: `Micro-Retail Finance: How small local business owners can合法 save on tax GST 💹`, views: '125K', likes: '9.9K', comments: '512', date: '4 days ago', type: 'Video', urlHash: '#fin-1' },
      { title: `Direct Mutual Funds vs Regular Mutual Funds: Comparative breakdown in local dialect 📈`, views: '85K', likes: '7.1K', comments: '392', date: '1 week ago', type: 'Video', urlHash: '#fin-2' },
      { title: `Analyzing real estate land price trends in Indian Tier-2 cities this year 🏠`, views: '48K', likes: '3.6K', comments: '158', date: '3 weeks ago', type: 'Post', urlHash: '#fin-3' },
    ],
    'Education': [
      { title: `Regional State Exams Strategy: How I cracked the test with a full-time job 📚`, views: '175K', likes: '14.8K', comments: '690', date: '3 days ago', type: 'Video', urlHash: '#edu-1' },
      { title: `5 high-income digital tech skills you can learn completely online in 3 months 💻`, views: '130K', likes: '11.0K', comments: '480', date: '1 week ago', type: 'Video', urlHash: '#edu-2' },
      { title: `Why complex macroeconomics models make sense when applied to local Indian bazaars 🪙`, views: '59K', likes: '4.5K', comments: '210', date: '2 weeks ago', type: 'Post', urlHash: '#edu-3' },
    ],
    'Comedy': [
      { title: `Every Indian Uncle at a traditional regional wedding reception 😂`, views: '280K', likes: '24.5K', comments: '984', date: '2 days ago', type: 'Video', urlHash: '#comedy-1' },
      { title: `Bargaining with local auto-rickshaw drivers: expectations vs brutal reality 🛺`, views: '195K', likes: '16.1K', comments: '710', date: '6 days ago', type: 'Video', urlHash: '#comedy-2' },
      { title: `When your parents discover your secret dual online life 🎙️`, views: '142K', likes: '12.0K', comments: '544', date: '2 weeks ago', type: 'Post', urlHash: '#comedy-3' },
    ],
  };

  return contentMap[niche] || [
    { title: `Creating local content with ${name}: behind the scenes on my production set 🎙️`, views: '42K', likes: '3.1K', comments: '110', date: '3 days ago', type: 'Video', urlHash: '#gen-1' },
    { title: `Why authentic community connections matter more than high follower counts in our city 🤝`, views: '29K', likes: '2.5K', comments: '95', date: '1 week ago', type: 'Video', urlHash: '#gen-2' },
    { title: `My honest thoughts on local business growth and finding authentic partners 📈`, views: '18K', likes: '1.4K', comments: '54', date: '2 weeks ago', type: 'Post', urlHash: '#gen-3' },
  ];
};

// Custom tailored collaboration history depending on Creator's niche
const generateCollabHistory = (niche: string) => {
  const collabsMap: Record<string, Array<{ brand: string; industry: string; campaign: string; duration: string; resultText: string; growthMetric: string; isVerified: boolean }>> = {
    'Food': [
      { brand: 'Amul India', industry: 'F&B', campaign: 'Regional Fusion Recipes', duration: '1 month', resultText: '+34% sales uptick in regional retail booths across Coimbatore & Madurai.', growthMetric: '4.2x ROAS', isVerified: true },
      { brand: 'Aachi Masala', industry: 'Spice/F&B', campaign: 'Kitchen Heritage Series', duration: '3 weeks', resultText: '1.2M collective impressions with an engagement rate of 8.9% in regional tier-2 towns.', growthMetric: '+18% Trust', isVerified: true },
    ],
    'Travel': [
      { brand: 'Tata Motors EV', industry: 'Automotive', campaign: 'Silent Hills Range Drive', duration: '2 weeks', resultText: 'Drove 2,400+ clicks to EV dealership test-drive booking portals from high-intent local audience.', growthMetric: '240 Leads', isVerified: true },
      { brand: 'Airbnb India', industry: 'Hospitality', campaign: 'Alternative Weekend Escapes', duration: '1 month', resultText: 'Featured local regional homestays, leading to 100% occupancy for host partners across the state.', growthMetric: '5.1x ROI', isVerified: true },
    ],
    'Fitness': [
      { brand: 'Cult.fit', industry: 'Health & Fitness', campaign: 'Pass India Regional Push', duration: '1 month', resultText: 'Generated 420+ local gym passes sold via target regional coupon code tracking.', growthMetric: '4.8% Conv', isVerified: true },
      { brand: 'MuscleBlaze', industry: 'Nutrition', campaign: 'Regional Strength Challenge', duration: '3 weeks', resultText: 'High direct attachment from local high school & college fitness enthusiasts; 15% discount code voucher claimed 800+ times.', growthMetric: '₹320K Rev', isVerified: true },
    ],
    'Tech': [
      { brand: 'Noise India', industry: 'Smart wearables', campaign: 'Local Dialect Smartwatch Guide', duration: '3 weeks', resultText: 'Product comparison resulted in top conversion rates across regional Amazon retail partners.', growthMetric: '3.8x ROAS', isVerified: true },
      { brand: 'OnePlus India', industry: 'Electronics', campaign: 'Regional Launch Coverage', duration: '1 week', resultText: 'High trust review addressing direct heating concerns in tropical Indian weather.', growthMetric: '+15% Recall', isVerified: true },
    ],
    'Beauty': [
      { brand: 'Nykaa', industry: 'Cosmetics', campaign: 'Festive regional glow guides', duration: '1 month', resultText: 'Tutorial-driven engagement resulted in direct product sales on the app platform.', growthMetric: '4.9x ROI', isVerified: true },
      { brand: 'Mamaearth', industry: 'Skincare', campaign: 'Traditional Herbs Advocacy', duration: '3 weeks', resultText: 'Authentic regional focus boosted Mamaearth product credibility among tier-2 audience pools.', growthMetric: '6.2% ER', isVerified: true },
    ],
    'Fashion': [
      { brand: 'Myntra', industry: 'E-commerce', campaign: 'Traditional Festive Curations', duration: '3 weeks', resultText: 'Influencer curation banner on Myntra app; coupon code usage smashed pre-campaign targets by 140%.', growthMetric: '4.5x ROAS', isVerified: true },
      { brand: 'Fabindia', industry: 'Apparel', campaign: 'Pure Cotton Regional Comfort', duration: '2 weeks', resultText: 'Drove massive footfall to local physical stores in Bangalore and Coimbatore.', growthMetric: '+22% Footfall', isVerified: true },
    ],
    'Finance': [
      { brand: 'Zerodha', industry: 'Fintech', campaign: 'Vernacular Smart Investing', duration: '1 month', resultText: 'Educated regional audiences on direct mutual funds; drove 1,200+ demat account signups.', growthMetric: '1.2K Signups', isVerified: true },
      { brand: 'Groww', industry: 'Fintech', campaign: 'Tier-2 Micro Wealth Systems', duration: '1 month', resultText: 'Tutorial series explaining compound interest in regional dialect; high baseline organic share rate.', growthMetric: '+12% Signups', isVerified: true },
    ],
    'Education': [
      { brand: 'Unacademy', industry: 'EdTech', campaign: 'Regional Aspirant Mental Prep', duration: '1 month', resultText: 'Empathetic guidance session on stress management led to high organic click conversions to the trial product.', growthMetric: '550 Trials', isVerified: true },
      { brand: 'Coursera', industry: 'Adult education', campaign: 'Local language Upskilling Push', duration: '3 weeks', resultText: 'Promoted digital certifications to high local graduates resulting in increased regional registrations.', growthMetric: '3.2x ROI', isVerified: true },
    ],
    'Comedy': [
      { brand: 'Sprite India', industry: 'F&B', campaign: 'Beat the regional heat sketches', duration: '2 weeks', resultText: 'Hilarious local-focused sketch went ultra-viral organically with heavy whatsapp forwards.', growthMetric: '1.8M Reach', isVerified: true },
      { brand: 'Airtel India', industry: 'Telecom', campaign: 'Broadband regional family drama', duration: '3 weeks', resultText: 'Visual integration of high speed home internet in comedic household sketches.', growthMetric: '+25% Sentiment', isVerified: true },
    ],
  };

  return collabsMap[niche] || [
    { brand: 'HDFC Bank', industry: 'Banking', campaign: 'Rural digitized payment systems', duration: '3 weeks', resultText: 'High localized trust boosted digital payment confidence in remote towns.', growthMetric: '2.5x ROAS', isVerified: true },
    { brand: 'Flipkart', industry: 'E-commerce', campaign: 'Regional Creator Hub partner', duration: '2 weeks', resultText: 'Localized product reviews drive direct traffic with exceptional retention parameters.', growthMetric: '+10% Conv', isVerified: true },
  ];
};

const LOCAL_CREATORS = [
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

export const CreatorProfile: React.FC<CreatorProfileProps> = ({ creatorId }) => {
  // Extract ID from prop OR parse directly from URL hash (e.g. #creator-profile?id=5)
  const activeId = useMemo(() => {
    if (creatorId) return creatorId;
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hash.includes('?')) {
      const search = hash.split('?')[1];
      const params = new URLSearchParams(search);
      const parsedId = parseInt(params.get('id') || '1', 10);
      return isNaN(parsedId) ? 1 : parsedId;
    }
    return 1;
  }, [creatorId, typeof window !== 'undefined' ? window.location.hash : '']);

  // Match the active creator from the comprehensive dataset with a localized fallback generator
  const creator = useMemo((): Creator => {
    const foundData = CREATORS_DATA.find(c => c.id === activeId);
    if (foundData) return foundData;

    const foundLocal = LOCAL_CREATORS.find(c => c.id === activeId);
    if (foundLocal) {
      const folStr = foundLocal.followers.replace('K', '');
      const followersNum = parseFloat(folStr) * 1000;
      
      const scoreVal = foundLocal.score;
      const baseVal = Math.floor(scoreVal / 5);
      const remainder = scoreVal % 5;

      return {
        id: foundLocal.id,
        name: foundLocal.name,
        city: foundLocal.city,
        state: foundLocal.city === "Coimbatore" || foundLocal.city === "Chennai" ? "Tamil Nadu" :
               foundLocal.city === "Bangalore" ? "Karnataka" :
               foundLocal.city === "Kochi" ? "Kerala" :
               foundLocal.city === "Mumbai" || foundLocal.city === "Pune" ? "Maharashtra" :
               foundLocal.city === "Hyderabad" ? "Telangana" : "Delhi",
        platform: "Instagram",
        niche: foundLocal.niche,
        followers: followersNum,
        postsPerWeek: foundLocal.score > 80 ? 6 : 4,
        engagementRate: parseFloat((5.5 + (scoreVal - 80) * 0.15).toFixed(2)),
        avgLikes: Math.round(followersNum * 0.05),
        avgComments: Math.round(followersNum * 0.003),
        audienceSentiment: foundLocal.score > 80 ? "Positive" : "Neutral",
        growth30dPct: foundLocal.score > 80 ? 14 : 8,
        scragS: baseVal + (remainder > 0 ? 1 : 0),
        scragC: baseVal + (remainder > 1 ? 1 : 0),
        scragR: baseVal + (remainder > 2 ? 1 : 0),
        scragA: baseVal + (remainder > 3 ? 1 : 0),
        scragG: baseVal,
        scragTotal: scoreVal
      };
    }

    return CREATORS_DATA[0];
  }, [activeId]);

  // Generate dynamic, niche-specific parameters
  const recentContent = useMemo(() => {
    return generateNicheContent(creator.niche, creator.name);
  }, [creator]);

  const collaborations = useMemo(() => {
    return generateCollabHistory(creator.niche);
  }, [creator]);

  // Normalize followers count string display
  const followersDisplay = useMemo(() => {
    if (creator.followers >= 100000) {
      return `${(creator.followers / 1000).toFixed(0)}K`;
    }
    return `${(creator.followers / 1000).toFixed(1)}K`;
  }, [creator.followers]);

  // Split SCRAG parameters to show visually
  const scragBreakdowns = [
    { key: 'S', name: 'Sentiment Audit', value: creator.scragS, max: 20, color: 'text-teal bg-teal/10', barColor: 'bg-teal', desc: 'Verdict on audience sentiment purity' },
    { key: 'C', name: 'Contextual Relevance', value: creator.scragC, max: 20, color: 'text-coral bg-coral/10', barColor: 'bg-coral', desc: 'Niche topic alignment mapping' },
    { key: 'R', name: 'Regional Reach', value: creator.scragR, max: 20, color: 'text-amber-500 bg-amber-500/10', barColor: 'bg-amber-500', desc: 'Spatially centered density metric' },
    { key: 'A', name: 'Audience Trust', value: creator.scragA, max: 20, color: 'text-blue-500 bg-blue-500/10', barColor: 'bg-blue-500', desc: 'True engagement-to-reach fraction' },
    { key: 'G', name: 'Growth Momentum', value: creator.scragG, max: 20, color: 'text-purple-500 bg-purple-500/10', barColor: 'bg-purple-500', desc: 'Velocity of new regional followers' },
  ];

  return (
    <div className="space-y-10 text-left font-sans">
      
      {/* 1. Header Overview Card */}
      <div className="bg-gradient-to-r from-deep-navy to-[#0F1E36] text-white p-8 md:p-10 rounded-[32px] border border-white/5 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-coral/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div className="flex gap-6 items-center">
            
            {/* Visual Avatar with initials */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-coral/10 border border-coral/30 rounded-[20px] flex items-center justify-center font-serif text-3xl font-extrabold text-coral uppercase shrink-0">
              {creator.name.split(' ').map(part => part[0]).join('')}
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight text-white">{creator.name}</h2>
                <span className="flex items-center gap-1 bg-teal/20 text-teal text-[10px] px-2.5 py-1 rounded-full border border-teal/30 font-black tracking-wider uppercase">
                  <ShieldCheck size={12} /> Verified Audit
                </span>
                <span className="bg-white/10 text-white/80 text-[10px] px-2.5 py-1 rounded-full border border-white/10 font-bold uppercase">
                  {creator.platform} Partner
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70 mt-3 font-medium">
                <div>City: <span className="text-white font-bold">{creator.city}, {creator.state}</span></div>
                <div className="hidden sm:block text-white/30">•</div>
                <div>Primary Niche: <span className="text-teal font-bold">{creator.niche}</span></div>
                <div className="hidden sm:block text-white/30">•</div>
                <div className="font-mono text-white/80">ID: #{creator.id}</div>
              </div>
            </div>
          </div>

          {/* Absolute SCRAG Final Score Panel */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[24px] p-6 text-center shadow-lg min-w-[200px] flex flex-col justify-center items-center">
            <span className="text-[10px] font-bold text-white/50 tracking-[0.25em] uppercase block mb-1">SCRAG SCORE</span>
            <div className="font-serif text-5xl md:text-6xl font-extrabold italic text-teal leading-none my-1 flex items-baseline justify-center">
              {creator.scragTotal}
              <span className="text-xs font-sans text-white/40 not-italic font-bold ml-1">/100</span>
            </div>
            <div className="text-[11px] font-bold text-white/80 mt-2 px-3 py-1 bg-teal/10 rounded-full border border-teal/20 inline-flex items-center gap-1.5 justify-center">
              <Sparkles size={11} className="text-teal" /> Tier-1 Regional Voice
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Statistical Insights Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Followers */}
        <div className="bg-white dark:bg-deep-navy/40 p-6 rounded-[24px] border border-border-warm dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between text-muted mb-4">
            <span className="text-xs font-bold uppercase tracking-wider">True Reach</span>
            <div className="p-2 rounded-xl bg-coral/5 text-coral"><Users size={16} /></div>
          </div>
          <div className="font-serif text-2xl md:text-3xl font-extrabold text-deep-navy dark:text-white">
            {followersDisplay}
          </div>
          <p className="text-xs text-muted/80 mt-2 leading-relaxed">
            Verified localized geographic followers.
          </p>
        </div>

        {/* Engagement Rate */}
        <div className="bg-white dark:bg-deep-navy/40 p-6 rounded-[24px] border border-border-warm dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between text-muted mb-4">
            <span className="text-xs font-bold uppercase tracking-wider">Engagement Rate</span>
            <div className="p-2 rounded-xl bg-teal/5 text-teal"><Heart size={16} /></div>
          </div>
          <div className="font-serif text-2xl md:text-3xl font-extrabold text-deep-navy dark:text-white">
            {creator.engagementRate}%
          </div>
          <p className="text-xs text-muted/80 mt-2 leading-relaxed">
            Local industry benchmark is ~4.5%.
          </p>
        </div>

        {/* Audience Sentiment */}
        <div className="bg-white dark:bg-deep-navy/40 p-6 rounded-[24px] border border-border-warm dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between text-muted mb-4">
            <span className="text-xs font-bold uppercase tracking-wider">Aura Sentiment</span>
            <div className="p-2 rounded-xl bg-amber-500/5 text-amber-500"><MessageSquare size={16} /></div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${creator.audienceSentiment === 'Positive' ? 'bg-teal animate-pulse' : creator.audienceSentiment === 'Neutral' ? 'bg-amber-500' : 'bg-coral'}`} />
            <div className="font-serif text-2xl font-extrabold text-deep-navy dark:text-white">
              {creator.audienceSentiment}
            </div>
          </div>
          <p className="text-xs text-muted/80 mt-2 leading-relaxed">
            Audit of past 1,000 comment strings.
          </p>
        </div>

        {/* 30d Growth */}
        <div className="bg-white dark:bg-deep-navy/40 p-6 rounded-[24px] border border-border-warm dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between text-muted mb-4">
            <span className="text-xs font-bold uppercase tracking-wider">30-Day Velocity</span>
            <div className={`p-2 rounded-xl ${creator.growth30dPct >= 0 ? 'bg-teal/5 text-teal' : 'bg-coral/5 text-coral'}`}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <div className={`font-serif text-2xl md:text-3xl font-extrabold ${creator.growth30dPct >= 0 ? 'text-teal' : 'text-coral'}`}>
              {creator.growth30dPct >= 0 ? '+' : ''}{creator.growth30dPct}%
            </div>
            {creator.growth30dPct >= 0 ? (
              <span className="text-[10px] font-bold text-teal flex items-center mb-1"><Check size={8} /> Growing</span>
            ) : (
              <span className="text-[10px] font-bold text-coral flex items-center mb-1"><TrendingDown size={8} /> Cooling</span>
            )}
          </div>
          <p className="text-xs text-muted/80 mt-2 leading-relaxed">
            New localized subscribers in active run.
          </p>
        </div>

      </div>

      {/* 3. Detailed SCRAG Score Dimensions Matrix */}
      <div className="bg-white dark:bg-deep-navy/20 p-8 rounded-[28px] border border-border-warm dark:border-white/10 shadow-sm">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-coral text-xs font-bold tracking-[0.2em] uppercase mb-1 block">METRIC INSIGHT ENGINE</span>
            <h3 className="font-serif text-2xl font-bold text-deep-navy dark:text-white">
              SCRAG Score Breakdown Matrix
            </h3>
          </div>
          <div className="text-xs text-muted dark:text-white/40 leading-relaxed max-w-sm">
            Each crucial dimension of regional relevance is parsed server-side and scored out of 20 maximum points.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-8">
          {scragBreakdowns.map((dim) => {
            const pct = (dim.value / dim.max) * 100;
            return (
              <div key={dim.key} className="bg-warm-beige/30 dark:bg-white/5 p-6 rounded-2xl border border-border-warm/60 dark:border-white/5 flex flex-col justify-between h-48">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`w-8 h-8 rounded-xl font-serif text-base font-extrabold flex items-center justify-center ${dim.color}`}>
                      {dim.key}
                    </span>
                    <span className="font-mono text-sm font-black text-deep-navy dark:text-white">
                      {dim.value}<span className="text-muted/65 text-xs font-normal">/{dim.max}</span>
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-deep-navy dark:text-white leading-tight mb-1">{dim.name}</h4>
                  <p className="text-[11px] text-muted leading-relaxed line-clamp-2">{dim.desc}</p>
                </div>

                <div className="mt-4 w-full">
                  <div className="flex justify-between items-center text-[10px] text-muted mb-1.5 font-bold">
                    <span>Performance</span>
                    <span>{pct.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2 bg-warm-beige dark:bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${dim.barColor} transition-all duration-1000`} 
                      style={{ width: `${pct}%` }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Grid: Content Feed & Collab History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Recent Content Feed */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-border-warm dark:border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-coral animate-ping" />
              <h3 className="font-serif text-xl font-bold text-deep-navy dark:text-white">Recent content feed</h3>
            </div>
            <span className="text-xs font-bold text-muted capitalize">Avg: {creator.postsPerWeek} posts/week</span>
          </div>

          <div className="space-y-4">
            {recentContent.map((post, idx) => (
              <div 
                key={idx}
                className="group bg-white dark:bg-deep-navy/30 border border-border-warm dark:border-white/5 rounded-2xl p-5 hover:border-coral transition-all flex gap-4 hover:shadow-sm"
              >
                {/* Simulated Thumbnail Box with initial indicator */}
                <div className="w-24 h-24 rounded-xl bg-warm-beige dark:bg-white/5 border border-border-warm dark:border-white/10 flex flex-col justify-center items-center shrink-0 text-center p-2 relative overflow-hidden group-hover:bg-coral/5 transition-colors">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest text-coral py-0.5 px-2 bg-coral/10 rounded mb-1">
                    {post.type}
                  </span>
                  <FileText size={16} className="text-muted/60 mb-1" />
                  <span className="text-[9px] font-mono font-bold text-muted/70">{post.date}</span>
                </div>

                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h4 className="font-serif text-sm md:text-base font-bold text-deep-navy dark:text-white leading-snug group-hover:text-coral transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs font-bold text-muted dark:text-white/40 font-mono mt-3">
                    <span className="flex items-center gap-1"><ThumbsUp size={12} className="text-teal" /> {post.likes} Likes</span>
                    <span className="flex items-center gap-1"><MessageSquare size={12} /> {post.comments} Comments</span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-deep-navy dark:text-white/80 ml-auto bg-warm-beige dark:bg-white/10 px-2 py-0.5 rounded-lg">{post.views} Views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Collaboration History & Campaign Results */}
        <div className="lg:col-span-5 space-y-6">
          <div className="pb-3 border-b border-border-warm dark:border-white/5">
            <h3 className="font-serif text-xl font-bold text-deep-navy dark:text-white">Campaign Collaboration History</h3>
          </div>

          <div className="space-y-4">
            {collaborations.map((collab, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-deep-navy/30 border border-border-warm dark:border-white/5 rounded-2xl p-5"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="inline-block text-[10px] font-black uppercase tracking-widest text-teal bg-teal/10 px-2.5 py-1 rounded-lg border border-teal/15 mb-2">
                      {collab.category ? collab.category : 'CAMPAIGN'}
                    </span>
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-muted/70" />
                      <h4 className="font-serif text-base font-bold text-deep-navy dark:text-white leading-none">
                        {collab.brand}
                      </h4>
                      <span className="text-[10px] font-mono text-muted/65">({collab.industry})</span>
                    </div>
                    <p className="text-xs font-semibold text-coral mt-1.5">{collab.campaign} • {collab.duration}</p>
                  </div>

                  {/* ROI Highlight Badge */}
                  <div className="bg-teal/10 border border-teal/20 text-teal dark:text-teal px-3 py-1.5 rounded-xl text-center shadow-sm">
                    <span className="text-[9px] font-bold text-teal/70 uppercase block leading-none mb-0.5">Verified</span>
                    <span className="font-mono text-xs font-black">{collab.growthMetric}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border-warm/50 dark:border-white/5 text-xs text-muted leading-relaxed">
                  {collab.resultText}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal mt-3">
                  <CheckCircle2 size={12} className="text-teal" /> Direct Regional API Audited Outcome
                </div>
              </div>
            ))}

            <div className="bg-warm-beige/30 dark:bg-white/5 border border-dashed border-border-warm dark:border-white/10 rounded-2xl p-5 flex flex-col justify-center items-center text-center py-8">
              <Award size={24} className="text-coral opacity-60 mb-2" />
              <span className="font-serif text-sm font-bold text-deep-navy dark:text-white">Active in 3 Pending Audits</span>
              <p className="text-[11px] text-muted max-w-xs mt-1 leading-relaxed">
                AuraSearch API is validating conversion datasets from 3 ongoing campaigns in the state.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CreatorProfile;
