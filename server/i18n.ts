import { cookies } from 'next/headers';
import path from 'path';
import fs from 'fs/promises';

export type Locale = 'en' | 'ru';

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const value = jar.get('lang')?.value;
  return value === 'ru' ? 'ru' : 'en';
}

export async function getMessages(locale: Locale) {
  const file = path.join(process.cwd(), 'i18n', 'messages', `${locale}.json`);
  const raw = await fs.readFile(file, 'utf8');
  return JSON.parse(raw) as Record<string, string>;
}

