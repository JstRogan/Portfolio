'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RandomLetterReveal } from './random-letter-reveal';
import { useI18n } from '@/hooks/use-i18n';

export function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

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

  const featuredProjects = projects.filter(p => p.featured);

  if (loading) {
    return (
      <section id="projects" className="py-32 px-6 max-w-6xl mx-auto overflow-hidden">
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
      </section>
    );
  }

  return (
    <section id="projects" className="py-32 px-6 max-w-6xl mx-auto overflow-hidden">
      <div className="flex items-end justify-between mb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4 transition-colors duration-300">
            <RandomLetterReveal text={t('projects.title')} duration={800} />
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl text-lg transition-colors duration-300">{t('projects.subtitle')}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden md:block"
        >
          <Link href="/projects" className="group flex items-center gap-2 text-zinc-900 dark:text-white font-mono text-sm hover:text-purple-600 dark:hover:text-emerald-400 transition-colors duration-300">
            {t('projects.viewAll')}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <div className="flex flex-col gap-8">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="group relative block overflow-hidden rounded-[2rem] bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-300"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center h-full">
              <div className="order-2 md:order-1 flex flex-col h-full justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-xs text-purple-600 dark:text-emerald-500 bg-purple-500/10 dark:bg-emerald-500/10 px-3 py-1 rounded-full transition-colors duration-300">
                    0{i + 1}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {project.tech.slice(0, 3).map((t: string) => (
                      <span key={t} className="font-mono text-xs text-zinc-500 dark:text-zinc-400 transition-colors duration-300">{t}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-md transition-colors duration-300">
                  {project.description}
                </p>
                <div className="mt-auto">
                  <Link href={project.external} target="_blank" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-purple-500 dark:hover:bg-emerald-500 hover:text-white hover:border-purple-500 dark:hover:border-emerald-500 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              
              <div className="order-1 md:order-2 relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-[#111] transition-colors duration-300">
                <div className="absolute inset-0 bg-purple-500/5 dark:bg-emerald-500/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover scale-105 group-hover:scale-100 grayscale group-hover:grayscale-0 transition-all duration-700" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 md:hidden flex justify-center">
        <Link href="/projects" className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium transition-colors duration-300">
          {t('projects.viewAll')}
        </Link>
      </div>
    </section>
  );
}
