'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { I18nContext } from '@/components/i18n-provider';

export function useI18n() {
  const router = useRouter();
  const { locale, messages } = useContext(I18nContext);

  const t = (key: string) => messages[key] || key;

  const setLocale = (next: 'en' | 'ru') => {
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  return { locale, t, setLocale };
}

