'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function useI18n() {
  const locale = useLocale() as 'en' | 'ru';
  const tr = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const t = (key: string) => {
    try {
      return tr(key as never);
    } catch {
      return key;
    }
  };

  const setLocale = (next: 'en' | 'ru') => {
    router.replace(pathname, { locale: next });
  };

  return { locale, t, setLocale };
}
