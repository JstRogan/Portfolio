import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { ThreeCdn } from '@/components/three/three-cdn';
import { CustomCursor } from '@/components/custom-cursor';
import { Chatbot } from '@/components/chatbot';
import type { Locale } from '@/i18n/routing';

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <ThemeProvider>
      <NextIntlClientProvider messages={messages}>
        <ThreeCdn />
        <CustomCursor />
        {children}
        <Chatbot />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}

