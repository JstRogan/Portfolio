'use client';
import { motion } from 'motion/react';
import { RandomLetterReveal } from './random-letter-reveal';
import { useContactForm } from '@/hooks/use-contact-form';
import { ContactSuccess } from '@/components/contact/contact-success';
import { ContactForm } from '@/components/contact/contact-form';

export function Contact() {
  const { name, setName, email, setEmail, message, setMessage, status, handleSubmit } = useContactForm();

  return (
    <section id="contact" className="py-32 px-6 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-purple-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none transition-colors duration-700" />
      
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
      >
        <h2 className="text-[15vw] md:text-[10vw] font-bold tracking-tighter text-zinc-900 dark:text-white leading-none mb-8 mix-blend-multiply dark:mix-blend-plus-lighter transition-colors duration-300 text-center flex flex-nowrap justify-center gap-[3vw] md:gap-[2vw] whitespace-nowrap">
          <RandomLetterReveal text="LET'S" duration={800} />
          <RandomLetterReveal text="TALK" duration={800} delay={200} />
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-xl text-lg md:text-xl mb-12 transition-colors duration-300 text-center">
          Got a project in mind? I&apos;m currently open for new opportunities and collaborations. Let&apos;s build something amazing together.
        </p>
        
	        <div className="w-full max-w-xl mx-auto bg-white/50 dark:bg-[#111]/50 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-3xl p-8 shadow-xl">
	          {status === 'success' ? (
	            <ContactSuccess />
	          ) : (
	            <ContactForm
	              name={name}
	              email={email}
	              message={message}
	              status={status}
	              onName={setName}
	              onEmail={setEmail}
	              onMessage={setMessage}
	              onSubmit={handleSubmit}
	            />
	          )}
	        </div>
	      </motion.div>
    </section>
  );
}
