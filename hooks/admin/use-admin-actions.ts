'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { signOut } from 'next-auth/react';

export function useAdminActions() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const refresh = () => startTransition(() => router.refresh());

  const logout = async () => {
    await signOut({ redirect: false });
    refresh();
  };

  return { isPending, refresh, logout };
}
