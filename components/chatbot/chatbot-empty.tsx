'use client';

import { Code, Briefcase, Lightbulb } from 'lucide-react';
import { QuickAction } from '@/components/chatbot/quick-action';

export function ChatbotEmpty(props: { onAsk: (text: string) => void }) {
  return (
    <div className="space-y-3">
      <QuickAction icon={Code} title="Tech Stack" subtitle="Technologies and tools I work with" onClick={() => props.onAsk('What is your tech stack?')} />
      <QuickAction icon={Briefcase} title="Notable Projects" subtitle="Explore my project portfolio" onClick={() => props.onAsk('Tell me about your notable projects.')} />
      <QuickAction icon={Code} title="Experience" subtitle="My fullstack development journey" onClick={() => props.onAsk('What is your experience as a developer?')} />
      <div className="bg-[#151515] border border-[#222] rounded-xl p-4 flex gap-4 text-left mt-4">
        <div className="text-zinc-400 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-zinc-200 font-medium text-sm mb-1.5">Tip</h4>
          <p className="text-zinc-500 text-xs leading-relaxed">Be specific: try &quot;What&apos;s your experience with Next.js?&quot;.</p>
        </div>
      </div>
    </div>
  );
}

