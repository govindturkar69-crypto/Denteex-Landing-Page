import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Turbopack's dev HMR client needs 'unsafe-eval'/'unsafe-inline' for script-src.
// Production builds don't require either. style-src keeps 'unsafe-inline' in
// both modes because Framer Motion animates via inline `style` attributes —
// see SECURITY.md for why that's an accepted, documented tradeoff rather than
// an oversight.
const csp = [
  `default-src 'self'`,
  `script-src 'self' ${isDev ? `'unsafe-eval' 'unsafe-inline'` : ""}`,
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
