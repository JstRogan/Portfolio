'use client';

import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export function ContactSuccess() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-purple-100 dark:bg-emerald-500/20 text-purple-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Message Sent!</h3>
      <p className="text-zinc-500 dark:text-zinc-400">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
    </motion.div>
  );
}

