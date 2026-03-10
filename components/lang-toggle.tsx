'use client';

import { useI18n } from '@/hooks/use-i18n';

export function LangToggle() {
  const { locale, setLocale } = useI18n();
  const next = locale === 'en' ? 'ru' : 'en';

  return (
    <button
      onClick={() => setLocale(next)}
      className="font-mono text-xs text-zinc-400 hover:text-purple-600 dark:hover:text-white transition-colors"
      aria-label="Toggle language"
    >
      {locale.toUpperCase()}
    </button>
  );
}

