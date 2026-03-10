'use client';

import { motion } from 'motion/react';

export function ProjectsPageFilter(props: { items: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap gap-2 mb-12">
      {props.items.map((tech) => (
        <button
          key={tech}
          onClick={() => props.onChange(tech)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
            props.value === tech
              ? 'bg-purple-500 dark:bg-emerald-500 text-white border-purple-500 dark:border-emerald-500'
              : 'bg-white dark:bg-[#111] text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/10 hover:border-purple-400 dark:hover:border-emerald-400 hover:text-purple-600 dark:hover:text-emerald-400'
          }`}
        >
          {tech}
        </button>
      ))}
    </motion.div>
  );
}

