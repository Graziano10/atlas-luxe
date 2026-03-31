/**
 * /middleware.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Next.js Edge Middleware — runs before every matched request.
 *
 * Responsibilities:
 *   1. Generate a cryptographically-random nonce per request.
 *   2. Forward the nonce to the layout via the `x-nonce` request header so
 *      Next.js <Script> tags and inline scripts can include it.
 *   3. Set a strict Content-Security-Policy response header built around the
 *      nonce (replaces the static CSP previously in next.config.ts).
 *   4. Set all remaining security response headers in one place.
 *
 * The static headers in next.config.ts are kept as a fallback for routes
 * that skip middleware (e.g. /_next/static), but the CSP is removed from
 * there to avoid the weaker 'unsafe-eval' / 'unsafe-inline' script-src.
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateNonce, buildCsp } from '@/lib/security';

export function middleware(request: NextRequest): NextResponse {
  const nonce = generateNonce();
  const csp   = buildCsp(nonce);

  // Clone the request headers and inject the nonce so layout.tsx can read it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // ── Security response headers ──────────────────────────────────────────────
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  );

  // HSTS — production only (avoid breaking http:// in local dev)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload',
    );
  }

  return response;
}

// ── Route matcher ──────────────────────────────────────────────────────────────
// Skip static assets and Next.js internals — they don't need a per-request nonce.
export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     *   - _next/static  (static files)
     *   - _next/image   (image optimisation endpoint)
     *   - favicon.ico   (browser default request)
     *   - Files with a dot extension (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?|ttf|otf)).*)',
  ],
};
