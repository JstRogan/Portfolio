import { NextResponse } from 'next/server';
import { adminCookieName } from '@/server/admin-auth';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookieName(), '0', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 0 });
  return res;
}
