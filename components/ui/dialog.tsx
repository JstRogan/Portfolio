'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Ctx = { open: boolean; onOpenChange: (open: boolean) => void };
const DialogContext = React.createContext<Ctx | null>(null);

export function Dialog(props: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) {
  return <DialogContext.Provider value={{ open: props.open, onOpenChange: props.onOpenChange }}>{props.children}</DialogContext.Provider>;
}

export function DialogContent(props: React.HTMLAttributes<HTMLDivElement> & { title?: string }) {
  const ctx = React.useContext(DialogContext);
  if (!ctx?.open) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => ctx.onOpenChange(false)} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className={cn('w-full max-w-xl rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl shadow-2xl', props.className)}>
          <div className="flex items-center justify-between p-6 pb-0">
            {props.title ? <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{props.title}</h2> : <div />}
            <button type="button" onClick={() => ctx.onOpenChange(false)} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 inline-flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6">{props.children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

