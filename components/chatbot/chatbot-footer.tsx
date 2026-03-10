'use client';

import { Send } from 'lucide-react';

export function ChatbotFooter(props: {
  input: string;
  isLoading: boolean;
  onInput: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="p-4 border-t border-[#222] bg-[#0f0f0f]">
      <form onSubmit={props.onSubmit} className="relative flex items-center mb-3">
        <input
          type="text"
          value={props.input}
          onChange={(e) => props.onInput(e.target.value)}
          placeholder="Ask me anything..."
          className="w-full pl-4 pr-12 py-3 bg-[#151515] border border-[#222] focus:border-[#333] focus:bg-[#1a1a1a] rounded-full text-sm text-zinc-200 placeholder-zinc-500 transition-all outline-none"
          disabled={props.isLoading}
        />
        <button type="submit" disabled={!props.input.trim() || props.isLoading} className="absolute right-2 p-2 bg-[#2a2a2a] text-zinc-400 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:text-zinc-200 hover:bg-[#333] transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </form>
      <div className="flex justify-between items-center px-1 text-[10px] text-zinc-500 font-medium">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          Ready to help
        </div>
      </div>
    </div>
  );
}

