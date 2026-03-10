import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const COOKIE_NAME = 'admin_auth';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const authed = Boolean(token) || request.cookies.get(COOKIE_NAME)?.value === '1';
  if (authed) return NextResponse.next();

  if (request.nextUrl.pathname === '/admin') return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = '/admin';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/:path*'],
};
