import type {Metadata} from 'next';
import { CustomCursor } from '@/components/custom-cursor';
import { Chatbot } from '@/components/chatbot';
import { ThemeProvider } from '@/components/theme-provider';
import { ThreeCdn } from '@/components/three/three-cdn';
import { I18nProvider } from '@/components/i18n-provider';
import { getLocale, getMessages } from '@/server/i18n';
import './globals.css';

export const metadata: Metadata = {
  title: 'Personal Portfolio',
  description: 'A showcase of my work and skills',
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#fafafa] dark:bg-[#050505] text-zinc-900 dark:text-zinc-200 selection:bg-purple-500/30 dark:selection:bg-emerald-500/30 selection:text-purple-900 dark:selection:text-emerald-200 transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <I18nProvider locale={locale} messages={messages}>
            <ThreeCdn />
            <CustomCursor />
            {children}
            <Chatbot />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
