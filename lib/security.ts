/**
 * /lib/security.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Server-side security utilities.
 *
 *  - generateNonce()  — cryptographically random base64 nonce for CSP
 *  - buildCsp()       — assembles the Content-Security-Policy header value
 *
 * Both are called exclusively from middleware.ts (edge runtime) and are safe
 * to tree-shake out of client bundles because they import nothing client-side.
 */

/**
 * Generates a cryptographically random 16-byte base64 nonce.
 * Uses the Web Crypto API which is available in both Node.js ≥ 19 and the
 * Next.js Edge Runtime.
 */
export function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  // btoa produces URL-unsafe chars (+/=) but nonces in CSP headers are fine
  return btoa(String.fromCharCode(...bytes));
}

/**
 * Builds a strict Content-Security-Policy header value.
 *
 * Script-src:
 *   - 'self'            — same-origin scripts
 *   - 'nonce-{nonce}'   — inline scripts/styles injected by Next.js with the nonce
 *   - 'unsafe-eval'     — added in development only (required by Next.js HMR / React DevTools)
 *
 * Style-src:
 *   - 'unsafe-inline'   — required: Framer Motion injects inline styles at runtime;
 *                         there is no nonce-based workaround for inline style attributes.
 *
 * img-src:
 *   - data: blob:       — Next.js Image uses data URIs for blur placeholders
 *   - images.unsplash.com — all demo photography
 *
 * @param nonce - Base64 nonce generated per-request by generateNonce()
 */
export function buildCsp(nonce: string): string {
  const isDev = process.env.NODE_ENV === 'development';

  const directives = [
    `default-src 'self'`,
    // 'unsafe-eval' removed in production; keep in dev for Next.js HMR
    `script-src 'self' 'nonce-${nonce}'${isDev ? " 'unsafe-eval'" : ''}`,
    // Framer Motion requires unsafe-inline for its runtime style injection
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https://images.unsplash.com`,
    `font-src 'self'`,
    `connect-src 'self'`,
    `media-src 'none'`,
    `object-src 'none'`,
    `frame-src 'none'`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `upgrade-insecure-requests`,
  ];

  return directives.join('; ');
}
