'use client';

import { motion } from 'motion/react';
import { Maximize2, X } from 'lucide-react';
import { ChatbotEmpty } from '@/components/chatbot/chatbot-empty';
import { ChatbotMessages, type ChatMessage } from '@/components/chatbot/chatbot-messages';
import { ChatbotFooter } from '@/components/chatbot/chatbot-footer';

export function ChatbotWindow(props: {
  isExpanded: boolean;
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  endRef: (el: HTMLDivElement | null) => void;
  onAsk: (text: string) => void;
  onInput: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleExpanded: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`absolute bottom-16 right-0 bg-[#0f0f0f] rounded-2xl shadow-2xl border border-[#222] flex flex-col overflow-hidden ${props.isExpanded ? 'w-[80vw] h-[80vh] max-w-[800px]' : 'w-[380px] h-[600px] max-h-[80vh]'} transition-all duration-300`}
    >
      <div className="p-4 flex items-center justify-between border-b border-[#222]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <h3 className="font-medium text-zinc-200 text-sm">Chat with Murad</h3>
        </div>
        <div className="flex items-center gap-3 text-zinc-400">
          <button onClick={props.onToggleExpanded} className="hover:text-zinc-200 transition-colors" aria-label="Toggle size">
            <Maximize2 className="w-4 h-4" />
          </button>
          <button onClick={props.onClose} className="hover:text-zinc-200 transition-colors" aria-label="Close chat">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {props.messages.length === 0 ? <ChatbotEmpty onAsk={props.onAsk} /> : <ChatbotMessages messages={props.messages} isLoading={props.isLoading} endRef={props.endRef} />}
      </div>
      <ChatbotFooter input={props.input} isLoading={props.isLoading} onInput={props.onInput} onSubmit={props.onSubmit} />
    </motion.div>
  );
}
