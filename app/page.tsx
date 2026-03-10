import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Projects } from '@/components/projects';
import { Contact } from '@/components/contact';

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      
      <footer className="py-8 text-center text-zinc-400 font-mono text-xs border-t border-zinc-200 dark:border-white/5 transition-colors duration-300">
        <p>Designed & Built by Murad Karimov &copy; {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
}
