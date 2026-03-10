'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-opacity disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90',
        subtle: 'bg-white/60 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10',
        danger:
          'border border-zinc-200 dark:border-white/10 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10',
      },
      shape: {
        pill: 'rounded-full',
        soft: 'rounded-2xl',
      },
      size: {
        sm: 'px-3 h-9 text-sm',
        md: 'px-4 h-10 text-sm',
        lg: 'px-4 py-3 text-base',
        icon: 'w-10 h-10',
      },
    },
    defaultVariants: { variant: 'primary', shape: 'soft', size: 'md' },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, shape, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, shape, size }), className)} {...props} />
  ),
);
Button.displayName = 'Button';

