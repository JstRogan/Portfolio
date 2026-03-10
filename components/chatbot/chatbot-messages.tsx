'use client';

import { Loader2 } from 'lucide-react';

export type ChatMessage = { role: 'user' | 'model'; content: string };

export function ChatbotMessages(props: { messages: ChatMessage[]; isLoading: boolean; endRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div className="space-y-4">
      {props.messages.map((msg, i) => (
        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-[#222] text-zinc-200 rounded-tr-sm' : 'bg-[#151515] border border-[#222] text-zinc-300 rounded-tl-sm'}`}>{msg.content}</div>
        </div>
      ))}
      {props.isLoading ? (
        <div className="flex justify-start">
          <div className="bg-[#151515] border border-[#222] p-3 rounded-2xl rounded-tl-sm">
            <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
          </div>
        </div>
      ) : null}
      <div ref={props.endRef} />
    </div>
  );
}
