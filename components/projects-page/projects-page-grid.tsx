'use client';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/lib/types';

function ProjectCard(props: { project: Project }) {
  const { project } = props;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col bg-white dark:bg-[#0a0a0a] rounded-2xl border border-zinc-200 dark:border-white/5 overflow-hidden hover:border-purple-300 dark:hover:border-emerald-500/50 hover:shadow-md dark:hover:shadow-none transition-all group"
    >
      <div className="relative aspect-video bg-zinc-100 dark:bg-[#111] border-b border-zinc-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-purple-500/5 dark:bg-emerald-500/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" referrerPolicy="no-referrer" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-emerald-400 transition-colors">{project.title}</h3>
          <div className="flex items-center gap-3">
            {project.github ? (
              <Link href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-purple-600 dark:hover:text-emerald-400 transition-colors">
                <Github className="w-5 h-5" />
              </Link>
            ) : null}
            {project.external ? (
              <Link href={project.external} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-purple-600 dark:hover:text-emerald-400 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </Link>
            ) : null}
          </div>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 flex-1 leading-relaxed transition-colors duration-300">{project.description}</p>
        <ul className="flex flex-wrap gap-2 font-mono text-xs text-zinc-500 mt-auto">
          {project.tech.map((tech) => (
            <li key={tech} className="bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 px-2 py-1 rounded-md transition-colors duration-300">{tech}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function ProjectsPageGrid(props: { projects: Project[] }) {
  return (
    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {props.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

