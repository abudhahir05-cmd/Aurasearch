import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, X, Sparkles, Compass, HelpCircle, Activity, Info, 
  MapPin, AlertTriangle, ArrowRight, ArrowUpRight, Copy, CheckSquare,
  Sliders, Palette, Text, Trash, ArrowDown, TrendingUp
} from 'lucide-react';

interface Toast {
  id: string;
  type: 'standard' | 'success' | 'info';
  title: string;
  sub: string;
  icon: string;
}

export const DesignSystemPage = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [brandInput, setBrandInput] = useState('');
  const [emailInput, setEmailInput] = useState('invalidemail');
  const [nameInput, setNameInput] = useState('Karthik Krishnan');

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    addToast({
      id: Math.random().toString(),
      type: 'info',
      title: 'Hex Copied',
      sub: `${hex} copied to clipboard successfully.`,
      icon: '✦'
    });
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const addToast = (toast: Toast) => {
    setToasts(prev => [toast, ...prev].slice(0, 3));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toast.id));
    }, 4000);
  };

  const triggerStandardToast = () => {
    addToast({
      id: Math.random().toString(),
      type: 'standard',
      title: 'SCRAG analysis complete',
      sub: '84/100 — Strong campaign fit for Coimbatore Travel',
      icon: '✦'
    });
  };

  const triggerSuccessToast = () => {
    addToast({
      id: Math.random().toString(),
      type: 'success',
      title: "You're on the waitlist!",
      sub: "We'll be in touch within 24 hours.",
      icon: '✓'
    });
  };

  const triggerInfoToast = () => {
    addToast({
      id: Math.random().toString(),
      type: 'info',
      title: 'AI simulation running',
      sub: 'Generating your Red Taxi campaign brief...',
      icon: 'ℹ'
    });
  };

  return (
    <div className="w-full bg-[#FAF8F4] text-[#0F2345] font-sans pb-24">
      {/* HEADER */}
      <div className="bg-[#0F2345] text-white rounded-[24px] p-10 md:p-12 mb-12 relative overflow-hidden shadow-lg border border-[#E8E4DC]">
        <div className="absolute right-[-60px] top-[-60px] w-72 h-72 rounded-full bg-gradient-to-br from-[#E8614A]/10 to-transparent pointer-events-none" />
        <div className="inline-block bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest mb-4">
          DESIGN SYSTEM V1.0
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
          AURASEARCH Design System
        </h1>
        <p className="text-white/60 text-base max-w-2xl leading-relaxed mb-8">
          The visual language for the AURASEARCH platform — corporate hex codes, premium typography pairings, pill buttons, interactive cards, and strict accessibility-tested guidelines.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
          <div>
            <div className="text-white font-bold font-serif text-lg">Navy + Coral + White</div>
            <div className="text-white/40 text-xs uppercase tracking-wider mt-1">Color System</div>
          </div>
          <div>
            <div className="text-white font-bold font-serif text-lg">DM Serif + Nunito</div>
            <div className="text-white/40 text-xs uppercase tracking-wider mt-1">Typography</div>
          </div>
          <div>
            <div className="text-white font-bold font-serif text-lg">Soft Putty Gray</div>
            <div className="text-white/40 text-xs uppercase tracking-wider mt-1">Depth Outline</div>
          </div>
          <div>
            <div className="text-white font-bold font-serif text-lg">Authoritative Dossier</div>
            <div className="text-white/40 text-xs uppercase tracking-wider mt-1">Brand Persona</div>
          </div>
        </div>
      </div>

      {/* 01 COLORS */}
      <section className="mb-16">
        <span className="text-[#E8614A] text-xs font-extrabold tracking-[0.15em] uppercase block mb-2">01 — COLOR PALETTE</span>
        <h2 className="font-serif text-3xl font-bold mb-3">Enterprise Standard Swatches</h2>
        <p className="text-[#6B6B6B] text-sm mb-8 leading-relaxed max-w-2xl">
          Three primary semantic roots. We rely on crisp, high-contrast values, pure white containers, and a soft clay background to prevent browser fatigue. Click any color card to instantly copy its hex value.
        </p>

        <div className="space-y-8">
          {/* Navy Group */}
          <div>
            <h4 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mb-3">Navy Family — Dominant / Authority</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
              {[
                { hex: '#0A1628', name: 'Navy 900' },
                { hex: '#0F2345', name: 'Navy 800 ★' },
                { hex: '#1a3a5c', name: 'Navy 700' },
                { hex: '#2D5F8A', name: 'Navy 500' },
                { hex: '#7BA3C8', name: 'Navy 300' },
                { hex: '#D6E8F5', name: 'Navy 100' },
                { hex: '#EBF4FB', name: 'Navy 50' }
              ].map(c => (
                <div 
                  key={c.hex} 
                  onClick={() => copyToClipboard(c.hex)}
                  className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="h-16 w-full" style={{ backgroundColor: c.hex }} />
                  <div className="p-3">
                    <div className="text-[#0F2345] font-bold text-xs truncate">{c.name}</div>
                    <div className="text-[#6B6B6B] font-mono text-[10px] uppercase flex items-center justify-between mt-1">
                      <span>{c.hex}</span>
                      <Copy size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coral Group */}
          <div>
            <h4 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mb-3">Coral Family — Accent / Conversion</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {[
                { hex: '#C94A35', name: 'Coral 600' },
                { hex: '#E8614A', name: 'Coral 500 ★' },
                { hex: '#F08070', name: 'Coral 400' },
                { hex: '#F8BDB4', name: 'Coral 200' },
                { hex: '#FDE8E4', name: 'Coral 100' },
                { hex: '#FEF5F3', name: 'Coral 50' }
              ].map(c => (
                <div 
                  key={c.hex} 
                  onClick={() => copyToClipboard(c.hex)}
                  className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="h-16 w-full" style={{ backgroundColor: c.hex }} />
                  <div className="p-3">
                    <div className="text-[#0F2345] font-bold text-xs truncate">{c.name}</div>
                    <div className="text-[#6B6B6B] font-mono text-[10px] uppercase flex items-center justify-between mt-1">
                      <span>{c.hex}</span>
                      <Copy size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teal Group */}
          <div>
            <h4 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mb-3">Teal Family — SCRAG Positive Signals</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { hex: '#0F6E56', name: 'Teal 600' },
                { hex: '#1D9E75', name: 'Teal 500 ★' },
                { hex: '#9FE1CB', name: 'Teal 200' },
                { hex: '#E6F8F2', name: 'Teal 50' }
              ].map(c => (
                <div 
                  key={c.hex} 
                  onClick={() => copyToClipboard(c.hex)}
                  className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="h-16 w-full" style={{ backgroundColor: c.hex }} />
                  <div className="p-3">
                    <div className="text-[#0F2345] font-bold text-xs truncate">{c.name}</div>
                    <div className="text-[#6B6B6B] font-mono text-[10px] uppercase flex items-center justify-between mt-1">
                      <span>{c.hex}</span>
                      <Copy size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Neutrals Group */}
          <div>
            <h4 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mb-3">Neutrals — Structure & Text Base</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {[
                { hex: '#FAF8F4', name: 'BG Cream ★' },
                { hex: '#F5F1EB', name: 'BG Deep Warm' },
                { hex: '#FFFFFF', name: 'Pure White' },
                { hex: '#E8E4DC', name: 'Border Gray' },
                { hex: '#4A5568', name: 'Secondary Text' },
                { hex: '#6B6B6B', name: 'Muted Gray' }
              ].map(c => (
                <div 
                  key={c.hex} 
                  onClick={() => copyToClipboard(c.hex)}
                  className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="h-16 w-full border-b border-[#E8E4DC]" style={{ backgroundColor: c.hex }} />
                  <div className="p-3">
                    <div className="text-[#0F2345] font-bold text-xs truncate">{c.name}</div>
                    <div className="text-[#6B6B6B] font-mono text-[10px] uppercase flex items-center justify-between mt-1">
                      <span>{c.hex}</span>
                      <Copy size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 TYPOGRAPHY */}
      <section className="mb-16">
        <span className="text-[#E8614A] text-xs font-extrabold tracking-[0.15em] uppercase block mb-2">02 — TYPOGRAPHY SYSTEM</span>
        <h2 className="font-serif text-3xl font-bold mb-3">Pairing Serif & Sans-Serif</h2>
        <p className="text-[#6B6B6B] text-sm mb-8 leading-relaxed max-w-2xl">
          We use DM Serif Display for major declarations and hero headers to inject Editorial authenticity. Nunito spans all remaining interfaces for optimal numeric, text, and label layout clarity.
        </p>

        <div className="space-y-4">
          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="shrink-0 md:w-56 font-sans">
              <div className="text-[10px] font-extrabold text-[#6B6B6B] uppercase tracking-widest">Brand Mark / Display</div>
              <div className="text-xs text-[#6B6B6B] font-mono mt-1">DM Serif · 52px · Bold</div>
            </div>
            <div className="flex-1">
              <span className="font-serif text-5xl font-bold text-[#0F2345] tracking-tight">AURASEARCH</span>
            </div>
          </div>

          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="shrink-0 md:w-56 font-sans">
              <div className="text-[10px] font-extrabold text-[#6B6B6B] uppercase tracking-widest">H1 — Hero Copy</div>
              <div className="text-xs text-[#6B6B6B] font-mono mt-1">DM Serif · 40px · Bold</div>
            </div>
            <div className="flex-1">
              <span className="font-serif text-4xl font-bold text-[#0F2345] leading-tight">Predict before you spend a rupee</span>
            </div>
          </div>

          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="shrink-0 md:w-56 font-sans">
              <div className="text-[10px] font-extrabold text-[#6B6B6B] uppercase tracking-widest">H2 — Standard Heading</div>
              <div className="text-xs text-[#6B6B6B] font-mono mt-1">DM Serif · 30px · Bold</div>
            </div>
            <div className="flex-1">
              <span className="font-serif text-3xl font-bold text-[#0F2345]">Why most influencer campaigns fail</span>
            </div>
          </div>

          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="shrink-0 md:w-56 font-sans">
              <div className="text-[10px] font-extrabold text-[#6B6B6B] uppercase tracking-widest">H3 — Card Headings</div>
              <div className="text-xs text-[#6B6B6B] font-mono mt-1">Nunito · 22px · Weight 700</div>
            </div>
            <div className="flex-1">
              <span className="font-sans text-xl font-bold text-[#0F2345]">Regional Intelligence Engine</span>
            </div>
          </div>

          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="shrink-0 md:w-56 font-sans">
              <div className="text-[10px] font-extrabold text-[#6B6B6B] uppercase tracking-widest">H4 — Small Subheading</div>
              <div className="text-xs text-[#6B6B6B] font-mono mt-1">Nunito · 17px · Weight 700</div>
            </div>
            <div className="flex-1">
              <span className="font-sans text-[17px] font-bold text-[#0F2345]">Audience Trust Indicators</span>
            </div>
          </div>

          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="shrink-0 md:w-56 font-sans">
              <div className="text-[10px] font-extrabold text-[#6B6B6B] uppercase tracking-widest">Body text (large)</div>
              <div className="text-xs text-[#6B6B6B] font-mono mt-1">Nunito · 16px · Weight 400</div>
            </div>
            <div className="flex-1">
              <p className="font-sans text-base text-[#6B6B6B] leading-relaxed">
                SCRAG discovers the most trusted, dialect-consistent regional creator, not just the famous ones.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
            <div className="shrink-0 md:w-56 font-sans">
              <div className="text-[10px] font-extrabold text-[#6B6B6B] uppercase tracking-widest">Body text (normal)</div>
              <div className="text-xs text-[#6B6B6B] font-mono mt-1">Nunito · 14px · Weight 400</div>
            </div>
            <div className="flex-1">
              <p className="font-sans text-sm text-[#4A5568] leading-relaxed">
                We monitor hyper-local conversations real-time across tier 2-3 cities to identify key influencers who carry actual purchasing guidance power.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 ELEVATION */}
      <section className="mb-16">
        <span className="text-[#E8614A] text-xs font-extrabold tracking-[0.15em] uppercase block mb-2">03 — ELEVATION & DEPTH</span>
        <h2 className="font-serif text-3xl font-bold mb-3">Soft Authority Shadows</h2>
        <p className="text-[#6B6B6B] text-sm mb-8 leading-relaxed max-w-2xl">
          Quiet, navy-tinted shadow offsets. We avoid dark heavy presets; instead, we rely on soft percentages of corporate deep blue to floatingly isolate cards.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-coral/10 rounded-xl mx-auto mb-4" />
            <div className="text-sm font-bold text-deep-navy">Shadow SM</div>
            <code className="text-[10px] text-muted block mt-2 font-mono">0 2px 8px rgba(15,35,69,0.06)</code>
          </div>
          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 shadow-md text-center">
            <div className="w-12 h-12 bg-coral/20 rounded-xl mx-auto mb-4" />
            <div className="text-sm font-bold text-deep-navy">Shadow MD ★</div>
            <code className="text-[10px] text-muted block mt-2 font-mono">0 4px 16px rgba(15,35,69,0.10)</code>
          </div>
          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-coral/40 rounded-xl mx-auto mb-4" />
            <div className="text-sm font-bold text-deep-navy">Shadow LG</div>
            <code className="text-[10px] text-muted block mt-2 font-mono">0 8px 32px rgba(15,35,69,0.12)</code>
          </div>
          <div className="bg-white border border-[#E8E4DC] rounded-2xl p-6 shadow-xl text-center">
            <div className="w-12 h-12 bg-coral rounded-xl mx-auto mb-4" />
            <div className="text-sm font-bold text-deep-navy">Shadow XL</div>
            <code className="text-[10px] text-muted block mt-2 font-mono">0 16px 48px rgba(15, 35, 69, 0.16)</code>
          </div>
        </div>
      </section>

      {/* 04 BUTTON SYSTEM */}
      <section className="mb-16">
        <span className="text-[#E8614A] text-xs font-extrabold tracking-[0.15em] uppercase block mb-2">04 — INTERACTIVE BUTTONS</span>
        <h2 className="font-serif text-3xl font-bold mb-3">Pill-Shaped Action States</h2>
        <p className="text-[#6B6B6B] text-sm mb-8 leading-relaxed max-w-2xl">
          All buttons utilize `rounded-full` (999px) roundness, lift elegantly on hover, and maintain high typographic weight. One primary coral action per section.
        </p>

        <div className="bg-white border border-[#E8E4DC] p-8 rounded-2xl space-y-8 shadow-sm">
          <div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">Core Types</div>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="bg-[#E8614A] text-white font-bold px-6 py-3 rounded-full shadow-[0_8px_24px_rgba(232,97,74,0.22)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(232,97,74,0.35)] transition-all">
                Get Campaign Insights
              </button>
              <button className="bg-[#0F2345] text-white font-bold px-6 py-3 rounded-full shadow-md hover:-translate-y-0.5 hover:bg-[#0A1628] transition-all">
                Explore Creators
              </button>
              <button className="bg-[#1D9E75] text-white font-bold px-6 py-3 rounded-full hover:bg-[#0F6E56] hover:-translate-y-0.5 transition-all">
                Join as a Creator
              </button>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">Secondary Options</div>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="border-2 border-[#E8614A] text-[#E8614A] font-bold px-6 py-2.5 rounded-full hover:bg-coral/5 transition-all">
                View Outline Demo
              </button>
              <button className="border border-[#E8E4DC] text-deep-navy font-semibold px-6 py-2.5 rounded-full hover:bg-[#FAF8F4] transition-all">
                Learn More
              </button>
              <button className="w-10 h-10 rounded-full bg-coral/10 text-coral flex items-center justify-center font-bold hover:bg-coral/20 hover:-translate-y-0.5 transition-all">
                🔍
              </button>
              <button className="w-10 h-10 rounded-full bg-teal/10 text-teal flex items-center justify-center font-bold hover:bg-teal/20 hover:-translate-y-0.5 transition-all">
                ⚡
              </button>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">Scale Variants</div>
            <div className="flex flex-wrap gap-4 items-end">
              <button className="bg-[#E8614A] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:-translate-y-0.5 transition-all">
                Small Action
              </button>
              <button className="bg-[#E8614A] text-white text-sm font-bold px-6 py-3.5 rounded-full shadow-md hover:-translate-y-0.5 transition-all">
                Default Action
              </button>
              <button className="bg-[#E8614A] text-white text-base font-bold px-10 py-5 rounded-full shadow-lg hover:-translate-y-0.5 transition-all">
                Large CTA — Get Early Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 05 CARDS */}
      <section className="mb-16">
        <span className="text-[#E8614A] text-xs font-extrabold tracking-[0.15em] uppercase block mb-2">05 — CONTENT MODULES</span>
        <h2 className="font-serif text-3xl font-bold mb-3">Structured Dossier Cards</h2>
        <p className="text-[#6B6B6B] text-sm mb-8 leading-relaxed max-w-2xl">
          Content containers utilize pure white backgrounds styled with a neat `#E8E4DC` border. No thick shadows; instead, we lift dynamically upon cursor hover.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E8E4DC] border-l-4 border-l-[#E8614A] p-6 rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center text-lg mb-4">🎯</div>
            <h4 className="font-sans font-bold text-deep-navy mb-2">Hyperlocal Targeting</h4>
            <p className="text-muted text-xs leading-relaxed">
              City-level creator intelligence mapped to Tier-2 and regional dialect depth.
            </p>
          </div>

          <div className="bg-white border border-[#E8E4DC] border-l-4 border-l-[#1D9E75] p-6 rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 bg-[#E6F8F2] rounded-xl flex items-center justify-center text-lg mb-4">🔮</div>
            <h4 className="font-sans font-bold text-deep-navy mb-2">AI Campaign Prediction</h4>
            <p className="text-muted text-xs leading-relaxed">
              Estimate your conversions, CPC, and ad spend return before booking.
            </p>
          </div>

          <div className="bg-white border border-[#E8E4DC] border-l-4 border-l-[#0F2345] p-6 rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 bg-[#EBF4FB] rounded-xl flex items-center justify-center text-lg mb-4">📊</div>
            <h4 className="font-sans font-bold text-deep-navy mb-2">SCRAG Score Engine</h4>
            <p className="text-muted text-xs leading-relaxed">
              Explainable, 5-dimension vetting algorithms that eliminate guesswork.
            </p>
          </div>

          <div className="bg-white border border-[#E8E4DC] p-6 rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="font-sans font-extrabold text-[#E8614A] text-4xl mb-2">84</div>
            <h4 className="font-sans font-bold text-deep-navy mb-1">SCRAG Score</h4>
            <p className="text-muted text-xs leading-relaxed">
              Karthik Krishnan · Coimbatore · Travel
            </p>
          </div>

          <div className="bg-white border border-[#E8E4DC] p-6 rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="font-sans font-extrabold text-teal text-4xl mb-2">₹3,500Cr</div>
            <h4 className="font-sans font-bold text-deep-navy mb-1">Market Size 2026</h4>
            <p className="text-muted text-xs leading-relaxed">
              Growing at an explosive 25% CAGR annually.
            </p>
          </div>

          <div className="bg-white border border-[#E8E4DC] p-6 rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div className="font-sans font-extrabold text-[#0F2345] text-4xl mb-2">70%</div>
            <h4 className="font-sans font-bold text-deep-navy mb-1">Cost Reduction</h4>
            <p className="text-muted text-xs leading-relaxed">
              Lower CPA reported from multi-dialect targeted launches.
            </p>
          </div>
        </div>
      </section>

      {/* 06 BADGES */}
      <section className="mb-16">
        <span className="text-[#E8614A] text-xs font-extrabold tracking-[0.15em] uppercase block mb-2">06 — STATUS CHIPS</span>
        <h2 className="font-serif text-3xl font-bold mb-3">Pill Badges & Transparent Indicators</h2>
        <p className="text-[#6B6B6B] text-sm mb-8 leading-relaxed max-w-2xl">
          Utilize semi-transparent layouts of brand colors paired with bold tracking.
        </p>

        <div className="bg-white border border-[#E8E4DC] p-6 rounded-2xl flex flex-wrap gap-2.5 shadow-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDE8E4] text-[#C94A35] text-xs font-bold leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8614A]" /> Travel
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F8F2] text-[#0F6E56] text-xs font-bold leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" /> Food
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4FB] text-[#0A1628] text-xs font-bold leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F2345]" /> Tech
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Finance
          </span>
          <span className="px-3 py-1 rounded-full border border-[#E8E4DC] text-[#4A5568] text-xs font-bold leading-none">
            Fitness
          </span>
          <span className="px-3 py-1 rounded-full border border-[#E8E4DC] text-[#4A5568] text-xs font-bold leading-none">
            Comedy
          </span>
          <span className="px-3 py-1 rounded-full bg-[#FDE8E4] text-[#E8614A] text-xs font-bold leading-none">
            Top Pick ★
          </span>
          <span className="px-3 py-1 rounded-full bg-[#E6F8F2] text-[#1D9E75] text-xs font-bold leading-none">
            Verified ✓
          </span>
          <span className="px-3 py-1 rounded-full bg-[#EBF4FB] text-[#0F2345] text-xs font-bold leading-none">
            Multi-city
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-[#854D0E] text-xs font-bold leading-none">
            SCRAG 84
          </span>
        </div>
      </section>

      {/* 07 INPUT COMPONENT */}
      <section className="mb-16">
        <span className="text-[#E8614A] text-xs font-extrabold tracking-[0.15em] uppercase block mb-2">07 — USER INPUTS</span>
        <h2 className="font-serif text-3xl font-bold mb-3">Consistent Inputs & Validation Headers</h2>
        <p className="text-[#6B6B6B] text-sm mb-8 leading-relaxed max-w-2xl">
          Clean input layout rest with quiet labeling. Active focus forces an eye-safe coral glowing border offset.
        </p>

        <div className="bg-white border border-[#E8E4DC] p-8 rounded-2xl grid md:grid-cols-2 gap-6 shadow-sm">
          <div className="space-y-2">
            <label className="text-xs font-bold text-deep-navy block">Brand Name</label>
            <input 
              type="text" 
              value={brandInput}
              onChange={e => setBrandInput(e.target.value)}
              placeholder="e.g. Red Taxi, Zomato"
              className="w-full bg-[#FAF8F4] p-3 border border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#E8614A] focus:ring-4 focus:ring-[#E8614A]/10 transition-all font-sans"
            />
            <span className="text-[11px] text-[#6B6B6B] block">This is used to construct predictive campaigns</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-deep-navy block">Target Region</label>
            <select className="w-full bg-[#FAF8F4] p-3 border border-[#E8E4DC] rounded-xl text-sm focus:outline-none focus:border-[#E8614A] transition-all font-sans cursor-pointer">
              <option>Coimbatore</option>
              <option>Chennai</option>
              <option>Bangalore</option>
            </select>
            <span className="text-[11px] text-[#6B6B6B] block">Filters creators based in selected local hub</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-deep-navy block">Corporate Email (ValidationError State)</label>
            <input 
              type="text" 
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              className="w-full bg-[#FAF8F4] p-3 border border-[#E53E3E] rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-red-100 transition-all font-sans"
            />
            <span className="text-[11px] text-[#E53E3E] font-bold block">Please enter a valid email address</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-deep-navy block">Representative Name (ValidationSuccess State)</label>
            <input 
              type="text" 
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              className="w-full bg-[#FAF8F4] p-3 border border-teal rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-teal/10 transition-all font-sans"
            />
            <span className="text-[11px] text-[#1D9E75] font-bold block">看起来很好 Looks great!</span>
          </div>
        </div>
      </section>

      {/* 08 SCRAG GRID DEMO */}
      <section className="mb-16">
        <span className="text-[#E8614A] text-xs font-extrabold tracking-[0.15em] uppercase block mb-2">08 — METHODOLOGY INTERFACE</span>
        <h2 className="font-serif text-3xl font-bold mb-3">SCRAG Interactive Flipping Rows</h2>
        <p className="text-[#6B6B6B] text-sm mb-8 leading-relaxed max-w-2xl">
          Observe hover states: they seamlessly toggle background color to deep Navy while shifting inner text to full contrast White. Hover any card to inspect.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { key: 'S', word: 'Social Activity', desc: 'Consistency and comments density.' },
            { key: 'C', word: 'Context Relevance', desc: 'Match index to industry topics.' },
            { key: 'R', word: 'Regional Influence', desc: 'Penetration into local cities.' },
            { key: 'A', word: 'Audience Trust', desc: 'Sentiment vectors and verified opinions.' },
            { key: 'G', word: 'Growth Momentum', desc: 'Velocity of new followers growth.' },
          ].map(d => (
            <div 
              key={d.key}
              className="bg-white border border-[#E8E4DC] rounded-2xl p-6 text-center shadow-sm flex flex-col items-center justify-between transition-all duration-300 hover:bg-[#0F2345] hover:-translate-y-1.5 hover:shadow-xl group cursor-help h-52"
            >
              <div className="font-serif text-4xl text-[#E8614A] group-hover:text-white transition-colors">{d.key}</div>
              <div>
                <div className="text-xs font-bold text-[#0F2345] group-hover:text-white transition-colors uppercase tracking-wider mb-1 mt-3">
                  {d.word}
                </div>
                <p className="text-[10px] text-[#6B6B6B] group-hover:text-white/60 transition-colors leading-relaxed">
                  {d.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 09 LIVE FEEDBACK ENGINE */}
      <section className="mb-16">
        <span className="text-[#E8614A] text-xs font-extrabold tracking-[0.15em] uppercase block mb-2">09 — TEST FEEDBACK</span>
        <h2 className="font-serif text-3xl font-bold mb-3">Real-time Toast Notification Simulator</h2>
        <p className="text-[#6B6B6B] text-sm mb-8 leading-relaxed max-w-2xl">
          Enterprises demand instant feedback on metric changes. Trigger distinct notification levels in the sidebar wrapper below.
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="bg-white border border-[#E8E4DC] p-6 rounded-2xl md:col-span-1 space-y-3 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-deep-navy mb-2">Simulate Actions</h4>
            <button 
              onClick={triggerStandardToast}
              className="w-full bg-[#0F2345] text-white text-xs font-bold py-2.5 rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              ✦ Analysis Success
            </button>
            <button 
              onClick={triggerSuccessToast}
              className="w-full bg-teal text-white text-xs font-bold py-2.5 rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              ✓ Waitlist Added
            </button>
            <button 
              onClick={triggerInfoToast}
              className="w-full bg-coral text-white text-xs font-bold py-2.5 rounded-full hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              ℹ Run AI Engine
            </button>
          </div>

          <div className="md:col-span-2 relative min-h-[180px] border-2 border-dashed border-[#E8E4DC] rounded-2xl flex flex-col justify-center p-6 bg-[#FAF8F4]/30">
            {toasts.length === 0 ? (
              <div className="text-center text-muted italic text-xs">
                No notifications logged. Click any simulator button to test slide actions.
              </div>
            ) : (
              <div className="space-y-2">
                <AnimatePresence>
                  {toasts.map((toast) => (
                    <motion.div 
                      key={toast.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`bg-white border-l-4 p-4 rounded-xl shadow-lg border border-y-border-warm flex items-start gap-3 ${
                        toast.type === 'success' ? 'border-l-teal' : toast.type === 'info' ? 'border-l-[#E8614A]' : 'border-l-deep-navy'
                      }`}
                    >
                      <span className={`text-sm shrink-0 font-bold ${
                        toast.type === 'success' ? 'text-teal' : toast.type === 'info' ? 'text-coral' : 'text-deep-navy'
                      }`}>
                        {toast.icon}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-deep-navy">{toast.title}</div>
                        <div className="text-[10px] text-muted mt-0.5">{toast.sub}</div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 10 DO & DON'T RULES */}
      <section className="mb-12">
        <span className="text-[#E8614A] text-xs font-extrabold tracking-[0.15em] uppercase block mb-2">10 — PLATFORM STANDARD RULES</span>
        <h2 className="font-serif text-3xl font-bold mb-3">Enterprise Implementation Do's and Don'ts</h2>
        <p className="text-[#6B6B6B] text-sm mb-8 leading-relaxed max-w-2xl">
          Visual constraints deployed to ensure absolute platform alignment, crisp grid structures, and professional high-value presentation.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* DOS */}
          <div className="p-6 md:p-8 rounded-2xl bg-teal/5 border border-teal/20">
            <h4 className="flex items-center gap-2 text-teal font-extrabold text-sm uppercase tracking-wider mb-4">
              <span className="flex items-center justify-center w-5 h-5 bg-teal text-white rounded-full text-[10px]">✓</span> Do
            </h4>
            <ul className="space-y-3.5 text-xs text-[#4A5568]">
              <li className="flex items-start gap-2">
                <span className="text-teal font-bold shrink-0">→</span>
                <span>Use DM Serif Display purely for display headings and section headlines.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal font-bold shrink-0">→</span>
                <span>Limit Coral CTAs to exactly one primary button per screen to maximize intent focus.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal font-bold shrink-0">→</span>
                <span>Always apply a hover translate rise of `translateY(-4px)` with soft easing on all interactive cards.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal font-bold shrink-0">→</span>
                <span>Utilize warm beige background (`#FAF8F4`) to minimize eye strain and establish editorial feel.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal font-bold shrink-0">→</span>
                <span>Group margin, padding, and layout spacing structures strictly in 8px increments.</span>
              </li>
            </ul>
          </div>

          {/* DONTS */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#FEF5F3] border border-coral/20">
            <h4 className="flex items-center gap-2 text-[#C94A35] font-extrabold text-sm uppercase tracking-wider mb-4">
              <span className="flex items-center justify-center w-5 h-5 bg-coral text-white rounded-full text-[10px]">✗</span> Don't
            </h4>
            <ul className="space-y-3.5 text-xs text-[#4A5568]">
              <li className="flex items-start gap-2">
                <span className="text-[#C94A35] font-bold shrink-0">→</span>
                <span>Do not drop pure black `#000` text shadows or heavy solid dark borders.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C94A35] font-bold shrink-0">→</span>
                <span>Do not place two identical vibrant coral button actions side-by-side.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C94A35] font-bold shrink-0">→</span>
                <span>Do not use sharp 0px corners on any card; maintain consistent 12px to 24px scopes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C94A35] font-bold shrink-0">→</span>
                <span>Do not utilize arbitrary spacer dimensions such as 13px, 22px, or 37px.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C94A35] font-bold shrink-0">→</span>
                <span>Do not mix Nunito with Montserrat, Inter, or alternative secondary sans-serif variants.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
