import { NextResponse } from 'next/server';
import { adminCookieName } from '@/server/admin-auth';

export async function POST(request: Request) {
  const { password } = await request.json().catch(() => ({ password: '' }));
  const expected = process.env.ADMIN_PASSWORD || 'admin';

  if (password !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookieName(), '1', { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}
