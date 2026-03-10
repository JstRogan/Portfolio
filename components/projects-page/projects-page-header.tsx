'use client';

import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export function ProjectsPageHeader(props: { title: string; subtitle: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-purple-600 dark:hover:text-emerald-400 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-6 transition-colors duration-300">{props.title}</h1>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg transition-colors duration-300">{props.subtitle}</p>
    </motion.div>
  );
}
