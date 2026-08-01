# Security

This document describes the security controls actually implemented in this project, and is deliberately explicit about what is **not** implemented, so nothing here is overstated.

## HTTP Security Headers

Configured globally in `next.config.ts` (`headers()`, applied to `/:path*`):

- **Content-Security-Policy** — `default-src 'self'`; `script-src 'self' 'unsafe-inline'` (plus `'unsafe-eval'` in development only, required by Turbopack's HMR client); `style-src 'self' 'unsafe-inline'`; `object-src 'none'`; `frame-ancestors 'none'`; `base-uri 'self'`; `form-action 'self'`.

  `'unsafe-inline'` on `script-src` is a **deliberate, verified tradeoff, not an oversight** — the first version of this policy omitted it in production, which broke the live site: Next.js's App Router emits its own inline `<script>` tags for streaming/hydration payloads on every page, and blocking them left the page unable to hydrate. A stricter nonce-based CSP (Next's officially documented pattern for this) was attempted via middleware, but Next.js 16 did not consistently stamp the same nonce onto its own emitted scripts in local production testing, and pairing `'strict-dynamic'` with an inconsistently-applied nonce made things worse (it also blocked the same-origin chunk scripts). `'unsafe-inline'` for `script-src` was adopted instead once nonce-based CSP was confirmed unreliable here — it's the same category of tradeoff already accepted for `style-src` (needed there because Framer Motion animates via inline `style` attributes, which have no nonce mechanism at all).
- **Strict-Transport-Security** — `max-age=63072000; includeSubDomains; preload`.
- **X-Frame-Options: DENY** — defense in depth against clickjacking, alongside `frame-ancestors 'none'`.
- **X-Content-Type-Options: nosniff**.
- **Referrer-Policy: strict-origin-when-cross-origin**.
- **Permissions-Policy** — camera, microphone, and geolocation are disabled; this app doesn't use any of them.
- **Cross-Origin-Opener-Policy: same-origin** and **Cross-Origin-Resource-Policy: same-origin** — standard cross-origin isolation headers. Safe to add unconditionally here since this app opens no popups and embeds no third-party content, so they're a strictly additive restriction.

## Input Validation & Sanitization

- `lib/schemas.ts` defines Zod schemas (`bookDemoSchema`, `contactSalesSchema`, `freeTrialSchema`, `newsletterSchema`) shared between client-side form validation and server-side API validation — the same rules run in both places, so the server never trusts client-side checks alone.
- Every free-text field (name, clinic name, integration needs) runs through a `.transform()` that strips anything matching `<[^>]*>` before it's accepted. This is defense-in-depth on top of Zod's shape/format checks — nothing resembling HTML markup survives into logs or any future downstream rendering.
- Every API route parses the request body with `schema.safeParse()`; invalid input is rejected with a 400 and never reaches application logic. String fields are trimmed and length-capped.
- Because submissions are only logged server-side (see below) and never rendered back as HTML or stored in a database, there's no stored-XSS or SQL-injection surface for this data today. `content/*.md` files, by contrast, are authored by the project maintainer, not user input, so rendering them via `dangerouslySetInnerHTML` in `components/shared/markdown-page.tsx` does not take untrusted input.

## Rate Limiting

`lib/rate-limit.ts` implements a sliding-window limiter (default: 5 requests/minute per client IP, derived from `x-forwarded-for`) applied to `/api/book-demo`, `/api/contact`, and `/api/newsletter` before validation runs. Exceeding the limit returns `429` with a `Retry-After` header. Sliding-window (a rolling timestamp log per key, filtered to the current window on each check) was chosen over a fixed-window bucket because fixed windows allow a burst of up to 2x the limit right at the window boundary; sliding-window doesn't have that gap.

**In-memory limitation, stated plainly:** by default this limiter stores state in an in-memory `Map`, scoped to a single running process. It resets on cold start and is **not** shared across multiple serverless instances.

**Optional distributed backend:** if `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set, the limiter uses `@upstash/ratelimit` + `@upstash/redis` instead, giving a real shared limit across serverless instances. This project ships with neither variable set and no Upstash account configured — no credentials have been fabricated — so by default it still runs on the in-memory fallback above. Note the Upstash-backed path's window size is fixed to the module's defaults (5/min) at initialization rather than reconfigurable per call; that's a real constraint of wiring `Ratelimit.slidingWindow()` once at module scope, not a bug.

## CORS / CSRF (Same-Origin Enforcement)

`lib/cors.ts`'s `isSameOrigin()` guards every state-changing API route (`/api/book-demo`, `/api/contact`, `/api/newsletter`) and doubles as this app's CSRF defense, since there are no session cookies for a forged cross-site request to ride on regardless. It checks the `Origin` header first (sent by browsers on same-site fetch/form POSTs) against `NEXT_PUBLIC_SITE_URL` (or the request's own host, as a local-dev fallback); if `Origin` is absent it falls back to `Referer`; if **neither** header is present, the request is rejected with `403`. A real request from this app's own pages always sends at least one of the two — treating "neither header present" as suspicious (rather than silently allowing it, which is what earlier versions of this check did) closes a real gap rather than adding a header nobody was missing.

## Environment Variables

- `.env.example` documents every variable this project reads. There are no real secrets in this repository.
- `.gitignore` excludes `.env*` (verified — this predates this change, from the original `create-next-app` scaffold).
- `NEXT_PUBLIC_SITE_URL` is the only variable actually consumed by application code (by the CORS check above). It is intentionally public (`NEXT_PUBLIC_` prefix) since it's just this site's own canonical URL.

## What Is Not Implemented (and why)

- **No email/CRM/ESP delivery.** `/api/book-demo`, `/api/contact`, and `/api/newsletter` validate, rate-limit, and `console.log` submissions server-side, then return success. No email provider or ESP is configured, and no credentials have been fabricated to fake one. If you connect a real provider later, do it from these route handlers, after the existing validation step.
- **No authentication, sessions, or cookies.** This app has no login system, so there is nothing to apply `HttpOnly` / `Secure` / `SameSite=Strict` cookie flags to. If auth is added later, session cookies must be configured with all three of those flags — noting the requirement here rather than building an unused auth system just to have cookies to harden.
- **No persistent storage.** Form submissions are not written to a database; there is none in this project.
- **No dependency-vulnerability remediation performed automatically.** Run `npm audit` and review before applying `npm audit fix --force`, which can introduce breaking major-version bumps — this hasn't been done as part of this change.

## Reporting

This is a portfolio/demo project with no production deployment or real user data. If you're evaluating it and spot an issue, open a note in the repo rather than a formal disclosure — there's no bug bounty or live system behind it.
