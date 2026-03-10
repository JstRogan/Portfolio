import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Personal Portfolio',
  description: 'A showcase of my work and skills',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en';
  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-200 selection:bg-purple-500/30 dark:selection:bg-emerald-500/30 selection:text-purple-900 dark:selection:text-emerald-200 transition-colors duration-300" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
