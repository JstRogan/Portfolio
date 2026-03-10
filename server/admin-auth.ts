import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_auth';

export async function isAdminAuthed() {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value === '1';
}

export function adminCookieName() {
  return COOKIE_NAME;
}
