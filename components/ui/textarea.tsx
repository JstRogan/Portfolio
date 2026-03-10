'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-[#111] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white outline-none transition-colors duration-300 resize-none',
      className,
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

