import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withMiddlewareAuthRequired(async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (session?.user) {
    res.headers.set('X-User-Id', session.user.sub);
    res.headers.set('X-User-Email', session.user.email);
  }

  return res;
});

export const config = {
  matcher: ['/api/development-hub/:path*'],
};
