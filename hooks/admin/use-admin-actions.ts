'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { adminLogout } from '@/lib/api/admin';

export function useAdminActions() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const refresh = () => startTransition(() => router.refresh());

  const logout = async () => {
    await adminLogout();
    refresh();
  };

  return { isPending, refresh, logout };
}

