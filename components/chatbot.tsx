'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2, Maximize2, Code, Briefcase, Lightbulb } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { projects } from '@/lib/data';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const QuickAction = ({ icon: Icon, title, subtitle, onClick }: any) => (
  <button 
    onClick={onClick}
    className="w-full bg-[#151515] border border-[#222] hover:border-[#333] hover:bg-[#1a1a1a] transition-all rounded-xl p-4 flex items-center gap-4 text-left group"
  >
    <div className="bg-[#222] p-2.5 rounded-lg text-zinc-400 group-hover:text-zinc-300 transition-colors">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h4 className="text-zinc-200 font-medium text-sm mb-0.5">{title}</h4>
      <p className="text-zinc-500 text-xs">{subtitle}</p>
    </div>
  </button>
);

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      
      const systemInstruction = `You are an AI assistant for Murad Karimov's portfolio website. 
      Answer questions based on the following projects she has worked on:
      ${JSON.stringify(projects, null, 2)}
      
      Keep your answers concise, friendly, and professional. If asked something unrelated to her work or projects, politely steer the conversation back to her portfolio.`;

      const contents = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));
      contents.push({ role: 'user', parts: [{ text: userText }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: contents,
        config: {
          systemInstruction,
        }
      });

      setMessages(prev => [...prev, { role: 'model', content: response.text || 'Sorry, I could not generate a response.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: 'Oops! Something went wrong. Please check if the API key is configured.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`absolute bottom-16 right-0 bg-[#0f0f0f] rounded-2xl shadow-2xl border border-[#222] flex flex-col overflow-hidden ${
              isExpanded ? 'w-[80vw] h-[80vh] max-w-[800px]' : 'w-[380px] h-[600px] max-h-[80vh]'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-[#222]">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <h3 className="font-medium text-zinc-200 text-sm">Chat with Murad</h3>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <button onClick={() => setIsExpanded(!isExpanded)} className="hover:text-zinc-200 transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:text-zinc-200 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {messages.length === 0 ? (
                <div className="space-y-3">
                  <QuickAction 
                    icon={Code} 
                    title="Tech Stack" 
                    subtitle="Technologies and tools I work with"
                    onClick={() => sendMessage("What is your tech stack?")}
                  />
                  <QuickAction 
                    icon={Briefcase} 
                    title="Notable Projects" 
                    subtitle="Explore my project portfolio"
                    onClick={() => sendMessage("Tell me about your notable projects.")}
                  />
                  <QuickAction 
                    icon={Code} 
                    title="Experience" 
                    subtitle="My fullstack development journey"
                    onClick={() => sendMessage("What is your experience as a developer?")}
                  />
                  <div className="bg-[#151515] border border-[#222] rounded-xl p-4 flex gap-4 text-left mt-4">
                    <div className="text-zinc-400 mt-0.5">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-zinc-200 font-medium text-sm mb-1.5">Pro Tip</h4>
                      <p className="text-zinc-500 text-xs leading-relaxed">
                        Be specific in your questions! Try &quot;What&apos;s your experience with Next.js?&quot; instead of just &quot;Next.js&quot;.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                          ? 'bg-[#222] text-zinc-200 rounded-tr-sm' 
                          : 'bg-[#151515] border border-[#222] text-zinc-300 rounded-tl-sm'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-[#151515] border border-[#222] p-3 rounded-2xl rounded-tl-sm">
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#222] bg-[#0f0f0f]">
              <form onSubmit={handleSubmit} className="relative flex items-center mb-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full pl-4 pr-12 py-3 bg-[#151515] border border-[#222] focus:border-[#333] focus:bg-[#1a1a1a] rounded-full text-sm text-zinc-200 placeholder-zinc-500 transition-all outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 bg-[#2a2a2a] text-zinc-400 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:text-zinc-200 hover:bg-[#333] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex justify-between items-center px-1 text-[10px] text-zinc-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  Ready to help
                </div>
                <div>Powered by AI</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-zinc-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-zinc-800 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
