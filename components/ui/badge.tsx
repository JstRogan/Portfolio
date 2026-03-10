'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function Badge(props: React.HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} className={cn('inline-flex items-center rounded-full border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-2.5 py-1 text-xs font-mono text-zinc-600 dark:text-zinc-300', props.className)} />;
}

