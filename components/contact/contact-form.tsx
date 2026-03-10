'use client';

import { ArrowUpRight, Loader2 } from 'lucide-react';
import type { ContactStatus } from '@/hooks/use-contact-form';

export function ContactForm(props: {
  name: string;
  email: string;
  message: string;
  status: ContactStatus;
  onName: (v: string) => void;
  onEmail: (v: string) => void;
  onMessage: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={props.onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Name</label>
          <input id="name" required type="text" value={props.name} onChange={(e) => props.onName(e.target.value)} className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-emerald-500/50 transition-all" placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Email</label>
          <input id="email" required type="email" value={props.email} onChange={(e) => props.onEmail(e.target.value)} className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-emerald-500/50 transition-all" placeholder="john@example.com" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Message</label>
        <textarea id="message" required value={props.message} onChange={(e) => props.onMessage(e.target.value)} rows={4} className="w-full px-4 py-3 bg-zinc-50 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-emerald-500/50 transition-all resize-none" placeholder="Tell me about your project..." />
      </div>
      <button type="submit" disabled={props.status === 'submitting'} className="w-full group relative inline-flex items-center justify-center gap-4 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-medium text-lg overflow-hidden transition-colors duration-300 disabled:opacity-70">
        <span className="relative z-10 flex items-center gap-2">
          {props.status === 'submitting' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Sending...
            </>
          ) : (
            <>
              Send Message <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </>
          )}
        </span>
        {props.status !== 'submitting' ? <div className="absolute inset-0 bg-purple-500 dark:bg-emerald-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" /> : null}
      </button>
      {props.status === 'error' ? <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p> : null}
    </form>
  );
}

