'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Loader2, CheckCircle2 } from 'lucide-react';
import { RandomLetterReveal } from './random-letter-reveal';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 px-6 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-purple-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none transition-colors duration-700" />
      
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
      >
        <h2 className="text-[15vw] md:text-[10vw] font-bold tracking-tighter text-zinc-900 dark:text-white leading-none mb-8 mix-blend-multiply dark:mix-blend-plus-lighter transition-colors duration-300 text-center flex flex-nowrap justify-center gap-[3vw] md:gap-[2vw] whitespace-nowrap">
          <RandomLetterReveal text="LET'S" duration={800} />
          <RandomLetterReveal text="TALK" duration={800} delay={200} />
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-xl text-lg md:text-xl mb-12 transition-colors duration-300 text-center">
          Got a project in mind? I&apos;m currently open for new opportunities and collaborations. Let&apos;s build something amazing together.
        </p>
        
        <div className="w-full max-w-xl mx-auto bg-white/50 dark:bg-[#111]/50 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-3xl p-8 shadow-xl">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 bg-purple-100 dark:bg-emerald-500/20 text-purple-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Message Sent!</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Name</label>
                  <input
                    id="name"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-emerald-500/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email</label>
                  <input
                    id="email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-emerald-500/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Message</label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-emerald-500/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full group relative inline-flex items-center justify-center gap-4 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-medium text-lg overflow-hidden transition-colors duration-300 disabled:opacity-70"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'submitting' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                  ) : (
                    <>Send Message <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" /></>
                  )}
                </span>
                {!status && <div className="absolute inset-0 bg-purple-500 dark:bg-emerald-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />}
              </button>
              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
