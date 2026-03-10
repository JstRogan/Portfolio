import type {Metadata} from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { CustomCursor } from '@/components/custom-cursor';
import { Chatbot } from '@/components/chatbot';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Personal Portfolio',
  description: 'A showcase of my work and skills',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-200 selection:bg-purple-500/30 dark:selection:bg-emerald-500/30 selection:text-purple-900 dark:selection:text-emerald-200 transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <CustomCursor />
          {children}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
