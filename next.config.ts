import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// script-src and style-src both keep 'unsafe-inline':
// - style-src: Framer Motion animates via inline `style` attributes on every
//   animated element — there's no nonce mechanism for style attributes (only
//   for <style> tags), so this is unavoidable short of dropping Framer Motion.
// - script-src: Next.js's App Router emits its own inline <script> tags for
//   streaming/hydration payloads on every page. A nonce-based CSP is the
//   "correct" way to allow only those, but requires Next.js to consistently
//   stamp the same nonce onto every script it emits, and in practice (Next.js
//   16, tested against a local production build) it did not do so reliably —
//   using 'strict-dynamic' without a correctly-applied nonce blocked even the
//   same-origin chunk scripts entirely, breaking the page.  'unsafe-inline'
//   is the pragmatic, verified-working tradeoff instead. See SECURITY.md.
const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline'${isDev ? ` 'unsafe-eval'` : ""}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data:`,
  `font-src 'self'`,
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  ...(isDev ? [] : [`upgrade-insecure-requests`]),
]
  .join("; ")
  .replace(/\s+/g, " ")
  .trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Standard cross-origin isolation headers. Safe here — this app opens no
  // popups and embeds no third-party content, so same-origin is a strictly
  // additive restriction, not a behavior change.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
