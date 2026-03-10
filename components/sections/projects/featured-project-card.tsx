'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/types';

export function FeaturedProjectCard(props: { project: Project; index: number }) {
  const { project, index } = props;
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      className="group relative block overflow-hidden rounded-[2rem] bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300"
    >
      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center h-full">
        <div className="order-2 md:order-1 flex flex-col h-full justify-center">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-purple-600 dark:text-emerald-500 bg-purple-500/10 dark:bg-emerald-500/10 px-3 py-1 rounded-full transition-colors duration-300">{`0${index + 1}`}</span>
            <div className="flex gap-2 flex-wrap">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="font-mono text-xs text-zinc-500 dark:text-zinc-400 transition-colors duration-300">{t}</span>
              ))}
            </div>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{project.title}</h3>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-md transition-colors duration-300">{project.description}</p>
          <div className="mt-auto">
            {project.external ? (
              <Link href={project.external} target="_blank" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-purple-500 dark:hover:bg-emerald-500 hover:text-white hover:border-purple-500 dark:hover:border-emerald-500 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            ) : null}
          </div>
        </div>
        <div className="order-1 md:order-2 relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-[#111] transition-colors duration-300">
          <div className="absolute inset-0 bg-purple-500/5 dark:bg-emerald-500/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
          <Image src={project.image} alt={project.title} fill className="object-cover scale-105 group-hover:scale-100 grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
        </div>
      </div>
    </motion.div>
  );
}

