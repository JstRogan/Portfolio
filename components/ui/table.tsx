'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table {...props} className={cn('w-full text-sm', props.className)} />;
}

export function THead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} className={cn('text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400', props.className)} />;
}

export function TBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} className={cn('divide-y divide-zinc-200 dark:divide-white/10', props.className)} />;
}

export function TR(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props} className={cn('hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors', props.className)} />;
}

export function TH(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th {...props} className={cn('text-left py-3 px-3 font-medium', props.className)} />;
}

export function TD(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td {...props} className={cn('py-3 px-3 align-middle', props.className)} />;
}

