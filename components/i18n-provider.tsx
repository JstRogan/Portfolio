'use client';

import { createContext, useMemo } from 'react';

type I18nContextValue = {
  locale: 'en' | 'ru';
  messages: Record<string, string>;
};

export const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  messages: {},
});

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: 'en' | 'ru';
  messages: Record<string, string>;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

