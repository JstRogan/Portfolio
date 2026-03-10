'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function Switch(props: { checked: boolean; onCheckedChange: (v: boolean) => void; disabled?: boolean; className?: string }) {
  return (
    <button
      type="button"
      disabled={props.disabled}
      onClick={() => props.onCheckedChange(!props.checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full border border-zinc-200 dark:border-white/10 transition-colors disabled:opacity-60',
        props.checked ? 'bg-zinc-900 dark:bg-white' : 'bg-white/60 dark:bg-white/5',
        props.className,
      )}
      aria-checked={props.checked}
      role="switch"
    >
      <span className={cn('inline-block h-5 w-5 transform rounded-full bg-white dark:bg-black transition-transform', props.checked ? 'translate-x-5' : 'translate-x-1')} />
    </button>
  );
}

