'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { RandomLetterReveal } from '@/components/random-letter-reveal';
import { Link } from '@/i18n/navigation';

export function ProjectsSectionHeader(props: { title: string; subtitle: string; viewAllLabel: string }) {
  return (
    <div className="flex items-end justify-between mb-16">
      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4 transition-colors duration-300">
          <RandomLetterReveal text={props.title} duration={800} />
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-xl text-lg transition-colors duration-300">{props.subtitle}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="hidden md:block">
        <Link href="/projects" className="group flex items-center gap-2 text-zinc-900 dark:text-white font-mono text-sm hover:text-purple-600 dark:hover:text-emerald-400 transition-colors duration-300">
          {props.viewAllLabel}
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
