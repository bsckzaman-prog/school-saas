import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  const allowedDomains = ['localhost:3000', 'prangon.com', 'schoolsaas.com'];
  
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/static') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  let currentSubdomain = '';
  const isMainDomain = allowedDomains.some(domain => hostname === domain);

  if (!isMainDomain) {
    const parts = hostname.split('.');
    if (parts.length > 1) {
      currentSubdomain = parts[0];
    }
  }

  if (currentSubdomain && currentSubdomain !== 'www') {
    url.pathname = `/${currentSubdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
