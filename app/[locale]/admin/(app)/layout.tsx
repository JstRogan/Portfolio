import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/server/auth';
import { AdminShell } from '@/components/admin-app/admin-shell';
import type { Locale } from '@/i18n/routing';

export default async function AdminAppLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  if (!session) redirect(`/${locale}/admin/login`);
  return <AdminShell>{children}</AdminShell>;
}

