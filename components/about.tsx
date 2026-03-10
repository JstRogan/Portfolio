'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Code2, Plus } from 'lucide-react';
import { RandomLetterReveal } from './random-letter-reveal';

export function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-start gap-4 mb-16"
      >
        <Plus className="w-8 h-8 text-zinc-900 dark:text-white shrink-0 mt-2 transition-colors duration-300" strokeWidth={1} />
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4 transition-colors duration-300">
            <RandomLetterReveal text="Behind the Code." duration={800} />
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl text-lg transition-colors duration-300">I blend design and engineering to create digital experiences that are both beautiful and functional.</p>
	        </div>
	      </motion.div>
	      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
	        <motion.div 
	          initial={{ opacity: 0, x: -200 }}
	          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 bg-white dark:bg-[#0a0a0a] rounded-3xl border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none p-8 md:p-10 relative overflow-hidden group min-h-[320px] flex flex-col justify-center transition-colors duration-300"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 dark:bg-emerald-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none transition-all duration-700 opacity-50 group-hover:opacity-100" />
          
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 dark:text-emerald-500 mb-6 transition-colors duration-300">
            <path d="M9.5 2.5L11 8.5L17 10L11 11.5L9.5 17.5L8 11.5L2 10L8 8.5L9.5 2.5Z" />
            <path d="M19 4v4m-2-2h4" />
          </svg>

          <h3 className="text-2xl font-medium text-zinc-900 dark:text-white mb-4 transition-colors duration-300">My Journey</h3>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg text-sm md:text-base transition-colors duration-300">
            I started my journey hacking together custom Tumblr themes in 2012. Today, I build enterprise-grade applications and immersive web experiences. I believe the best products sit at the intersection of robust engineering and thoughtful design.
	          </p>
	        </motion.div>
	        <motion.div 
	          initial={{ opacity: 0, x: 200 }}
	          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none relative overflow-hidden min-h-[320px] transition-colors duration-300"
        >
          <Image src="https://picsum.photos/seed/murad/600/600" alt="Murad" fill className="object-cover opacity-90 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-[#050505] via-transparent to-transparent transition-colors duration-300" />
          <div className="absolute bottom-6 left-6">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-mono text-xs font-medium bg-white/80 dark:bg-transparent backdrop-blur-sm dark:backdrop-blur-none px-3 py-1.5 dark:p-0 rounded-full transition-colors duration-300">
              <div className="w-2 h-2 bg-purple-500 dark:bg-emerald-500 rounded-full transition-colors duration-300" />
              Available for work
            </div>
	          </div>
	        </motion.div>
	        <motion.div 
	          initial={{ opacity: 0, x: -200 }}
	          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none p-8 md:p-10 flex flex-col justify-between min-h-[320px] transition-colors duration-300"
        >
          <Code2 className="w-6 h-6 text-zinc-400 dark:text-zinc-500 mb-6 transition-colors duration-300" />
	          <div className="mt-auto">
	            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-4 transition-colors duration-300">Core Stack</h3>
	            <div className="flex flex-wrap gap-2">
	              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'WebGL'].map((tech) => (
	                <span key={tech} className="px-3 py-1.5 bg-zinc-50 dark:bg-[#151515] border border-zinc-200 dark:border-white/5 rounded-full text-xs font-mono text-zinc-600 dark:text-zinc-400 transition-colors duration-300">{tech}</span>
	              ))}
	            </div>
	          </div>
	        </motion.div>
	        <motion.div 
	          initial={{ opacity: 0, x: 200 }}
	          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="md:col-span-2 bg-white dark:bg-[#0a0a0a] rounded-3xl border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none p-8 md:p-10 relative overflow-hidden flex items-center min-h-[320px] transition-colors duration-300"
        >
	          <svg className="absolute -right-10 -bottom-10 w-72 h-72 text-zinc-100 dark:text-white/5 stroke-[1.5] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
	            <circle cx="12" cy="12" r="10" />
	            <line x1="2" y1="12" x2="22" y2="12" />
	            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
	          </svg>
	          <div className="relative z-10">
	            <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors duration-300">Based in San Francisco</h3>
	            <p className="text-zinc-500 font-mono text-sm transition-colors duration-300">Working globally.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
