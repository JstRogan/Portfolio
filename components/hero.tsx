'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { HeroOrb } from '@/components/three/hero-orb';
import { useI18n } from '@/hooks/use-i18n';

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const name = "MURAD KARIMOV"; 
  const { t } = useI18n();
  const title = t('hero.title');

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <HeroOrb />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-purple-400/20 dark:bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none transition-colors duration-700" />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center w-full"
      >
        <div className="w-full overflow-hidden flex whitespace-nowrap mix-blend-multiply dark:mix-blend-plus-lighter">
          <div className="flex animate-marquee-left items-center">
            {[...Array(4)].map((_, i) => (
              <h1 key={i} className="text-[15vw] md:text-[12vw] font-bold leading-[0.85] tracking-tighter text-zinc-900 dark:text-white px-4 md:px-8 transition-colors duration-300">
                {name} <span className="text-purple-500/50 dark:text-emerald-500/50 text-[10vw] md:text-[8vw] align-middle px-2 md:px-4 transition-colors duration-300">✦</span>
              </h1>
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden flex whitespace-nowrap mt-4 md:mt-8 opacity-80 dark:opacity-60">
          <div className="flex animate-marquee-right items-center">
            {[...Array(8)].map((_, i) => (
              <p key={i} className="font-mono text-lg md:text-2xl uppercase tracking-widest text-zinc-500 dark:text-zinc-400 px-4 md:px-8 transition-colors duration-300">
                {title} <span className="text-zinc-300 dark:text-zinc-600 px-2 md:px-4 transition-colors duration-300">•</span>
              </p>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <div className="h-24 w-px bg-gradient-to-b from-purple-500/50 dark:from-emerald-500/50 to-transparent transition-colors duration-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
