import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Loader2, Bot } from 'lucide-react';

const STARTER_PROMPTS = [
  "Recommend a food creator in Kochi",
  "How is SCRAG calculated?",
  "Pricing for regional brands",
  "Top niche in Coimbatore"
];

interface MessageBlock {
  type: 'paragraph' | 'bullet-list' | 'numbered-list' | 'header';
  items?: string[];
  text?: string;
}

const parseBlocks = (text: string): MessageBlock[] => {
  const lines = text.split('\n');
  const blocks: MessageBlock[] = [];
  let currentList: MessageBlock | null = null;

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      continue;
    }

    // Header check
    if (trimmed.startsWith('#')) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      const headerText = trimmed.replace(/^#+\s*/, '');
      blocks.push({ type: 'header', text: headerText });
      continue;
    }

    // Bullet list checks (starts with -, *, or •)
    const bulletMatch = trimmed.match(/^[\*\-•]\s+(.*)/);
    if (bulletMatch) {
      if (currentList && currentList.type !== 'bullet-list') {
        blocks.push(currentList);
        currentList = null;
      }
      if (!currentList) {
        currentList = { type: 'bullet-list', items: [] };
      }
      currentList.items?.push(bulletMatch[1]);
      continue;
    }

    // Numbered list checks
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      if (currentList && currentList.type !== 'numbered-list') {
        blocks.push(currentList);
        currentList = null;
      }
      if (!currentList) {
        currentList = { type: 'numbered-list', items: [] };
      }
      currentList.items?.push(numberedMatch[2]);
      continue;
    }

    // If it's standard text but there is a current list in progress, finish it first
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
    blocks.push({ type: 'paragraph', text: trimmed });
  }

  if (currentList) {
    blocks.push(currentList);
  }

  return blocks;
};

const renderFormattedText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-extrabold text-coral font-sans dark:text-amber-400">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const FormattedMessage = ({ content }: { content: string }) => {
  const blocks = parseBlocks(content);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3.5 text-deep-navy/90"
    >
      {blocks.map((block, idx) => {
        if (block.type === 'header') {
          return (
            <motion.h4 
              key={idx}
              variants={blockVariants} 
              className="font-sans font-bold text-sm text-deep-navy border-b border-border-warm pb-1 mt-3 mb-1.5 first:mt-0 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-3.5 bg-coral rounded-full inline-block" />
              {renderFormattedText(block.text || '')}
            </motion.h4>
          );
        }

        if (block.type === 'bullet-list' && block.items) {
          return (
            <ul key={idx} className="space-y-2.5 my-2.5 pl-0">
              {block.items.map((item, itemIdx) => (
                <motion.li 
                  key={itemIdx}
                  variants={blockVariants}
                  className="flex items-start gap-2 bg-warm-beige/30 p-2.5 rounded-xl border border-teal/5 hover:border-coral/20 hover:bg-warm-beige/50 hover:shadow-xs transition-all duration-200 cursor-default"
                >
                  <span className="flex-shrink-0 mt-1 w-3.5 h-3.5 bg-coral/10 text-coral rounded-full flex items-center justify-center text-[9px] font-extrabold select-none">
                     ✓
                  </span>
                  <span className="text-sm leading-relaxed text-deep-navy">{renderFormattedText(item)}</span>
                </motion.li>
              ))}
            </ul>
          );
        }

        if (block.type === 'numbered-list' && block.items) {
          return (
            <ol key={idx} className="space-y-2.5 my-2.5 pl-0">
              {block.items.map((item, itemIdx) => (
                <motion.li 
                  key={itemIdx}
                  variants={blockVariants}
                  className="flex items-start gap-2 bg-teal/5 p-2.5 rounded-xl border border-teal/10 hover:border-teal/20 hover:bg-teal/10 hover:shadow-xs transition-all duration-200 cursor-default"
                >
                  <span className="flex-shrink-0 mt-0.5 w-5 h-5 bg-teal text-white rounded-full flex items-center justify-center text-[10px] font-extrabold shadow-sm select-none">
                     {itemIdx + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-deep-navy">{renderFormattedText(item)}</span>
                </motion.li>
              ))}
            </ol>
          );
        }

        return (
          <motion.p 
            key={idx}
            variants={blockVariants} 
            className="text-sm leading-relaxed text-deep-navy/85"
          >
            {renderFormattedText(block.text || '')}
          </motion.p>
        );
      })}
    </motion.div>
  );
};

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.text }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Try again later!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-coral text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        <div className="relative">
          <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
          <Sparkles size={12} className="absolute -top-2 -right-2 text-white animate-pulse" />
        </div>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[70] w-[380px] h-[550px] bg-white rounded-[32px] shadow-2xl border border-border-warm flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-deep-navy p-6 flex justify-between items-center text-white">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-coral rounded-full flex items-center justify-center">
                     <Bot size={20} />
                  </div>
                  <div>
                     <div className="font-bold text-sm">SCRAG AI Assistant</div>
                     <div className="text-[10px] opacity-60 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse" /> Live Support
                     </div>
                  </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={20} />
               </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
               {messages.length === 0 && (
                  <div className="text-center py-10 space-y-4">
                     <Sparkles size={40} className="mx-auto text-coral/20" />
                     <p className="text-muted text-sm px-10">Hi! I'm your SCRAG intelligence assistant. Ask me anything about regional creators.</p>
                     <div className="flex flex-wrap gap-2 justify-center">
                        {STARTER_PROMPTS.map(p => (
                           <button 
                             key={p} onClick={() => handleSend(p)}
                             className="text-[10px] font-bold text-deep-navy bg-warm-beige hover:bg-border-warm px-3 py-2 rounded-full transition-colors"
                           >
                             {p}
                           </button>
                        ))}
                     </div>
                  </div>
               )}

               {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`${m.role === 'user' ? 'max-w-[80%]' : 'max-w-[90%]'} p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-coral text-white rounded-tr-none shadow-sm' : 'bg-white text-deep-navy rounded-tl-none border border-teal/20 shadow-sm'}`}>
                        {m.role === 'user' ? m.content : <FormattedMessage content={m.content} />}
                     </div>
                  </div>
               ))}

               {isTyping && (
                  <div className="flex justify-start">
                     <div className="bg-warm-beige p-3 rounded-2xl rounded-tl-none border border-border-warm flex gap-1">
                        <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                     </div>
                  </div>
               )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-border-warm bg-white">
               <form 
                 onSubmit={e => { e.preventDefault(); handleSend(input); }}
                 className="flex items-center gap-2"
               >
                  <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-warm-beige p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/20"
                  />
                  <button type="submit" disabled={!input.trim() || isTyping} className="w-10 h-10 bg-coral text-white rounded-xl flex items-center justify-center hover:bg-teal transition-all disabled:opacity-30">
                     {isTyping ? <Loader2 size={18} className="animate-spin"/> : <Send size={18} />}
                  </button>
               </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
