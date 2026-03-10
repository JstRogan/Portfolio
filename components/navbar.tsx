'use client';
import Link from 'next/link';
import { Github, Linkedin, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl"
    >
      <nav className="bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl border border-zinc-200 dark:border-white/10 px-6 py-4 rounded-full flex items-center justify-between shadow-lg dark:shadow-2xl transition-colors duration-300">
        <Link href="/" className="font-mono font-bold text-zinc-900 dark:text-white tracking-tighter flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 dark:bg-emerald-500 rounded-full animate-pulse" />
          MURAD.
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/#about" className="hover:text-purple-600 dark:hover:text-white transition-colors">About</Link>
          <Link href="/projects" className="hover:text-purple-600 dark:hover:text-white transition-colors">Work</Link>
          <Link href="/#contact" className="hover:text-purple-600 dark:hover:text-white transition-colors">Contact</Link>
          <Link href="/admin" className="text-purple-500 dark:text-emerald-500 hover:text-purple-600 dark:hover:text-emerald-400 transition-colors">Admin</Link>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-zinc-400 hover:text-purple-600 dark:hover:text-white transition-colors"
          >
            <Sun className="w-4 h-4 hidden dark:block" />
            <Moon className="w-4 h-4 block dark:hidden" />
          </button>
          <Link href="https://github.com" target="_blank" className="text-zinc-400 hover:text-purple-600 dark:hover:text-white transition-colors">
            <Github className="w-4 h-4" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="text-zinc-400 hover:text-purple-600 dark:hover:text-white transition-colors">
            <Linkedin className="w-4 h-4" />
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
