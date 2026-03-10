import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/server/auth';

const COOKIE_NAME = 'admin_auth';

export async function isAdminAuthed() {
  const session = await getServerSession(authOptions);
  if (session?.user) return true;
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value === '1';
}

export function adminCookieName() {
  return COOKIE_NAME;
}
