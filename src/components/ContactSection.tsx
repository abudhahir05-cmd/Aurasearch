import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, ArrowRight, Check, Send, Loader2, Sparkles, Building2 } from 'lucide-react';

type InquiryType = 'campaign' | 'partnership' | 'demo' | 'press' | 'support';

interface FormState {
  name: string;
  email: string;
  company: string;
  inquiryType: InquiryType;
  message: string;
}

export const ContactSection = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    inquiryType: 'campaign',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.company.trim()) newErrors.company = 'Company or brand name is required';
    if (!formData.message.trim()) newErrors.message = 'Please type your custom requirements';
    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Launch progressive submission sequence
    setIsSubmitting(true);
    setSubmitStep(1);

    setTimeout(() => {
      setSubmitStep(2);
      setTimeout(() => {
        setSubmitStep(3);
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSubmitted(true);
        }, 800);
      }, 800);
    }, 700);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      inquiryType: 'campaign',
      message: '',
    });
    setIsSubmitted(false);
    setSubmitStep(0);
  };

  const getProgressMessage = () => {
    switch (submitStep) {
      case 1:
        return 'Verifying connection nodes...';
      case 2:
        return 'Routing to Regional Account Queue...';
      case 3:
        return 'Generating Aura Inquiry Ticket...';
      default:
        return 'Transmitting data securely...';
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF7F2] dark:bg-deep-navy/20 border-b border-border-warm dark:border-white/5 font-sans relative">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-teal/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/2 right-10 w-[300px] h-[300px] bg-coral/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[12px] md:text-[13px] font-mono font-bold tracking-[0.2em] text-coral uppercase block mb-4">
            LET'S CONVERGE
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-navy dark:text-white mb-6">
            Partner with India's Regional Influencer Authorities
          </h2>
          <p className="text-sm md:text-base text-muted dark:text-white/60 leading-relaxed font-sans max-w-xl mx-auto">
            Ready to drive local validation at scale? Speak directly with our strategists to secure optimal hyper-local networks.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Contact Form Card */}
          <div className="lg:col-span-7 bg-white dark:bg-deep-navy/40 p-8 md:p-10 rounded-[32px] border border-border-warm dark:border-white/10 shadow-sm relative overflow-hidden transition-all">
            <span className="absolute top-0 right-0 w-32 h-32 bg-coral/5 rounded-full blur-2xl pointer-events-none"></span>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-deep-navy dark:text-white uppercase tracking-wider mb-2">
                        Your Full Name <span className="text-coral">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        placeholder="e.g., Harish Kumar"
                        className={`w-full px-4 py-3 text-sm bg-[#FAF8F5] dark:bg-white/5 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                          errors.name 
                            ? 'border-coral focus:ring-coral' 
                            : 'border-border-warm/80 dark:border-white/10 focus:border-teal focus:ring-teal'
                        } text-deep-navy dark:text-white`}
                      />
                      {errors.name && (
                        <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-deep-navy dark:text-white uppercase tracking-wider mb-2">
                        Work Email Address <span className="text-coral">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        placeholder="e.g., harish@brand.com"
                        className={`w-full px-4 py-3 text-sm bg-[#FAF8F5] dark:bg-white/5 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                          errors.email 
                            ? 'border-coral focus:ring-coral' 
                            : 'border-border-warm/80 dark:border-white/10 focus:border-teal focus:ring-teal'
                        } text-deep-navy dark:text-white`}
                      />
                      {errors.email && (
                        <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Brand/Company */}
                    <div>
                      <label htmlFor="company" className="block text-xs font-bold text-deep-navy dark:text-white uppercase tracking-wider mb-2">
                        Brand or Company Name <span className="text-coral">*</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        placeholder="e.g., Kovai Agritech"
                        className={`w-full px-4 py-3 text-sm bg-[#FAF8F5] dark:bg-white/5 border rounded-xl focus:outline-none focus:ring-1 transition-all ${
                          errors.company 
                            ? 'border-coral focus:ring-coral' 
                            : 'border-border-warm/80 dark:border-white/10 focus:border-teal focus:ring-teal'
                        } text-deep-navy dark:text-white`}
                      />
                      {errors.company && (
                        <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.company}</p>
                      )}
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label htmlFor="inquiryType" className="block text-xs font-bold text-deep-navy dark:text-white uppercase tracking-wider mb-2">
                        I Want To Discuss <span className="text-coral">*</span>
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 text-sm bg-[#FAF8F5] dark:bg-white/5 border border-border-warm/80 dark:border-white/10 rounded-xl focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal text-deep-navy dark:text-white transition-all"
                      >
                        <option value="campaign" className="text-deep-navy dark:text-neutral-800">Launch Brand Campaign</option>
                        <option value="partnership" className="text-deep-navy dark:text-neutral-800">Regional Agency Partnership</option>
                        <option value="demo" className="text-deep-navy dark:text-neutral-800">Request Platform Enterprise Demo</option>
                        <option value="press" className="text-deep-navy dark:text-neutral-800">PR / Press Inquiry</option>
                        <option value="support" className="text-deep-navy dark:text-neutral-800">Technical SDK Support</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-deep-navy dark:text-white uppercase tracking-wider mb-2">
                      Brief Campaign Requirements or Goals <span className="text-coral">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      placeholder="List target consumer categories, selected South Indian cities, approximate timeline or budget context..."
                      className={`w-full px-4 py-3 text-sm bg-[#FAF8F5] dark:bg-white/5 border rounded-xl focus:outline-none focus:ring-1 transition-all resize-none ${
                        errors.message 
                          ? 'border-coral focus:ring-coral' 
                          : 'border-border-warm/80 dark:border-white/10 focus:border-teal focus:ring-teal'
                      } text-deep-navy dark:text-white`}
                    />
                    {errors.message && (
                      <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal text-white hover:bg-teal-dark active:scale-[0.98] py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md group relative overflow-hidden disabled:opacity-90 disabled:hover:bg-teal disabled:active:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex flex-col items-center gap-1.5 py-1">
                        <div className="flex items-center gap-2">
                          <Loader2 size={16} className="animate-spin text-white" />
                          <span className="text-sm">Transmitting Data...</span>
                        </div>
                        <span className="text-[10px] font-mono font-normal text-teal-light/80 block animate-pulse">
                          {getProgressMessage()}
                        </span>
                      </div>
                    ) : (
                      <>
                        <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        <span>Securely Transmit Requirements</span>
                        <span className="absolute right-4 text-[10px] tracking-wider font-mono bg-white/10 px-2 py-0.5 rounded uppercase hidden sm:inline">
                          Node Secure
                        </span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="text-center py-8 px-4 flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center text-teal mb-6 animate-bounce">
                    <Check size={32} />
                  </div>
                  
                  <h3 className="font-serif text-2xl font-black text-deep-navy dark:text-white mb-2">
                    Requirement File Compiled!
                  </h3>
                  <p className="text-sm text-muted dark:text-white/60 mb-8 max-w-sm">
                    Thank you, <span className="font-bold text-deep-navy dark:text-white">{formData.name}</span>. Your ticket has been assigned to our local queue strategist.
                  </p>

                  {/* Smart Virtual Confirmation Ticket */}
                  <div className="w-full max-w-md bg-[#FAF8F5] dark:bg-white/5 border border-dashed border-border-warm/80 dark:border-white/10 rounded-2xl p-6 text-left font-mono relative mb-8">
                    {/* Corner circles like a movie ticket */}
                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white dark:bg-[#121c2d] border-r border-[#e2e8f0]/40 rounded-full -translate-y-1/2"></div>
                    <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white dark:bg-[#121c2d] border-l border-[#e2e8f0]/40 rounded-full -translate-y-1/2"></div>

                    <div className="flex justify-between items-center border-b border-border-warm dark:border-white/10 pb-4 mb-4">
                      <span className="text-[11px] font-extrabold text-coral uppercase tracking-wider">AuraSearch Ticket</span>
                      <span className="text-[11px] text-muted dark:text-white/40">Inquiry ID: #AS-{(9000 + Math.floor(Math.random() * 1000))}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 text-xs mb-3">
                      <div>
                        <span className="text-muted dark:text-white/40 block text-[9px] uppercase">Corporate Brand</span>
                        <span className="font-bold text-deep-navy dark:text-white truncate block">{formData.company}</span>
                      </div>
                      <div>
                        <span className="text-muted dark:text-white/40 block text-[9px] uppercase">Service Intent</span>
                        <span className="font-bold text-deep-navy dark:text-white capitalize block">{formData.inquiryType} Discussion</span>
                      </div>
                      <div>
                        <span className="text-muted dark:text-white/40 block text-[9px] uppercase">Queue Priority</span>
                        <span className="font-bold text-emerald-500 block">High Priority</span>
                      </div>
                      <div>
                        <span className="text-muted dark:text-white/40 block text-[9px] uppercase">Guaranteed SLA</span>
                        <span className="font-bold text-teal block">&lt; 3 Business Hours</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetForm}
                    className="text-xs font-bold text-teal hover:text-teal-dark flex items-center gap-1 bg-teal/5 dark:bg-white/5 px-4 py-2.5 rounded-full border border-teal/10 hover:border-teal/30 transition-all"
                  >
                    Send Another Requirement File <ArrowRight size={12} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Address, Service SLA Details */}
          <div className="lg:col-span-5 space-y-8">
            {/* Office Hubs */}
            <div className="bg-[#FAF8F5] dark:bg-white/5 p-8 rounded-[32px] border border-border-warm dark:border-white/10">
              <h3 className="font-serif text-xl font-bold text-deep-navy dark:text-white mb-6 flex items-center gap-2">
                <Building2 size={20} className="text-coral" />
                <span>Our Regional Hubs</span>
              </h3>

              <div className="space-y-6">
                {/* Hub 1: Chennai */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-coral/5 dark:bg-coral/15 flex items-center justify-center shrink-0 mt-0.5 text-coral">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-deep-navy dark:text-white">Namma Chennai HQ</h4>
                    <p className="text-xs text-muted dark:text-white/50 mb-1">Regional Audit & Core Dev Center</p>
                    <p className="text-xs text-muted dark:text-white/60 leading-relaxed max-w-xs">
                      45, Khader Nawaz Khan Road, Nungambakkam, Chennai, Tamil Nadu – 600006
                    </p>
                  </div>
                </div>

                {/* Hub 2: Bengaluru */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-teal/5 dark:bg-teal/15 flex items-center justify-center shrink-0 mt-0.5 text-teal">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-deep-navy dark:text-white">Silicon Bengaluru Workspace</h4>
                    <p className="text-xs text-muted dark:text-white/50 mb-1">Account Management & Partnerships</p>
                    <p className="text-xs text-muted dark:text-white/60 leading-relaxed max-w-xs">
                      102, 100 Feet Road, Indiranagar, Bengaluru, Karnataka – 560038
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Commitments & Direct Support */}
            <div className="bg-[#FAF8F5] dark:bg-white/5 p-8 rounded-[32px] border border-border-warm dark:border-white/10 space-y-6">
              <h3 className="font-serif text-xl font-bold text-deep-navy dark:text-white flex items-center gap-2">
                <Clock size={20} className="text-teal" />
                <span>Service Commitments</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#319795] shrink-0 mt-2"></span>
                  <p className="text-xs text-muted dark:text-white/70 leading-relaxed">
                    <strong className="text-deep-navy dark:text-white">Regional Dialect Onboarding:</strong> Campaign briefs translated / customized for regional slang dialects inside 24 hours.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#319795] shrink-0 mt-2"></span>
                  <p className="text-xs text-muted dark:text-white/70 leading-relaxed">
                    <strong className="text-deep-navy dark:text-white">2-Hour Inquiry Turnaround:</strong> Business-tier inquiries receive verified strategist outreach with custom simulations under 2 hours.
                  </p>
                </div>
              </div>

              {/* Quick Communication Accesses */}
              <div className="pt-6 border-t border-border-warm dark:border-white/5 grid sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-border-warm/60 dark:border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] text-muted dark:text-white/30 uppercase block mb-1">Direct Support</span>
                  <a href="mailto:support@aurasearch.in" className="text-xs font-bold text-teal flex items-center gap-1.5 hover:underline truncate">
                    <Mail size={13} /> support@aurasearch.in
                  </a>
                </div>

                <div className="bg-white dark:bg-white/5 p-4 rounded-2xl border border-border-warm/60 dark:border-white/10 flex flex-col justify-between">
                  <span className="text-[10px] text-muted dark:text-white/30 uppercase block mb-1">Corporate Press</span>
                  <a href="mailto:media@aurasearch.in" className="text-xs font-bold text-coral flex items-center gap-1.5 hover:underline truncate">
                    <Mail size={13} /> media@aurasearch.in
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
