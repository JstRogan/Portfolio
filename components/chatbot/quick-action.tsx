'use client';

import type { ComponentType } from 'react';

export function QuickAction(props: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  const Icon = props.icon;
  return (
    <button onClick={props.onClick} className="w-full bg-[#151515] border border-[#222] hover:border-[#333] hover:bg-[#1a1a1a] transition-all rounded-xl p-4 flex items-center gap-4 text-left group">
      <div className="bg-[#222] p-2.5 rounded-lg text-zinc-400 group-hover:text-zinc-300 transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-zinc-200 font-medium text-sm mb-0.5">{props.title}</h4>
        <p className="text-zinc-500 text-xs">{props.subtitle}</p>
      </div>
    </button>
  );
}

