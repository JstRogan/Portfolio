'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/navbar';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch projects', err);
        setLoading(false);
      });
  }, []);

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.tech.forEach((t: string) => techs.add(t)));
    return ['All', ...Array.from(techs)].sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter(p => p.tech.includes(filter));
  }, [filter, projects]);

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded col-span-2"></div>
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-purple-600 dark:hover:text-emerald-400 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-6 transition-colors duration-300">
            All Projects
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg transition-colors duration-300">
            A complete list of things I&apos;ve worked on, from personal experiments to full-stack applications.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {allTechs.map(tech => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                filter === tech 
                  ? 'bg-purple-500 dark:bg-emerald-500 text-white border-purple-500 dark:border-emerald-500' 
                  : 'bg-white dark:bg-[#111] text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/10 hover:border-purple-400 dark:hover:border-emerald-400 hover:text-purple-600 dark:hover:text-emerald-400'
              }`}
            >
              {tech}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="flex flex-col bg-white dark:bg-[#0a0a0a] rounded-2xl border border-zinc-200 dark:border-white/5 overflow-hidden hover:border-purple-300 dark:hover:border-emerald-500/50 hover:shadow-md dark:hover:shadow-none transition-all group"
              >
                <div className="relative aspect-video bg-zinc-100 dark:bg-[#111] border-b border-zinc-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
                  <div className="absolute inset-0 bg-purple-500/5 dark:bg-emerald-500/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                    <div className="flex items-center gap-3">
                      <Link href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-purple-600 dark:hover:text-emerald-400 transition-colors">
                        <Github className="w-5 h-5" />
                      </Link>
                      <Link href={project.external} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-purple-600 dark:hover:text-emerald-400 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 flex-1 leading-relaxed transition-colors duration-300">
                    {project.description}
                  </p>
                  <ul className="flex flex-wrap gap-2 font-mono text-xs text-zinc-500 mt-auto">
                    {project.tech.map((tech: string) => (
                      <li key={tech} className="bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 px-2 py-1 rounded-md transition-colors duration-300">{tech}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
