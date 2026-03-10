import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'admin_auth';

export function middleware(request: NextRequest) {
  const authed = request.cookies.get(COOKIE_NAME)?.value === '1';
  if (authed) return NextResponse.next();
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

