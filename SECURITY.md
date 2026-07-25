# Security

This document describes the security controls actually implemented in this project, and is deliberately explicit about what is **not** implemented, so nothing here is overstated.

## HTTP Security Headers

Configured globally in `next.config.ts` (`headers()`, applied to `/:path*`):

- **Content-Security-Policy** — `default-src 'self'`; `script-src 'self'` (plus `'unsafe-eval'`/`'unsafe-inline'` in development only, required by Turbopack's HMR client — not present in production builds); `style-src 'self' 'unsafe-inline'` (required in both environments because Framer Motion animates via inline `style` attributes on DOM nodes — this is a standard, accepted tradeoff for any Framer Motion app under CSP, not an oversight); `object-src 'none'`; `frame-ancestors 'none'`; `base-uri 'self'`; `form-action 'self'`.
- **Strict-Transport-Security** — `max-age=63072000; includeSubDomains; preload`.
- **X-Frame-Options: DENY** — defense in depth against clickjacking, alongside `frame-ancestors 'none'`.
- **X-Content-Type-Options: nosniff**.
- **Referrer-Policy: strict-origin-when-cross-origin**.
- **Permissions-Policy** — camera, microphone, and geolocation are disabled; this app doesn't use any of them.

## Input Validation & Sanitization

- `lib/schemas.ts` defines Zod schemas (`bookDemoSchema`, `contactSalesSchema`, `freeTrialSchema`) shared between client-side form validation and server-side API validation — the same rules run in both places, so the server never trusts client-side checks alone.
- Every API route parses the request body with `schema.safeParse()`; invalid input is rejected with a 400 and never reaches application logic. String fields are trimmed and length-capped.
- Because submissions are only logged server-side (see below) and never rendered back as HTML or stored in a database, there's no stored-XSS or SQL-injection surface for this data today. `content/*.md` files, by contrast, are authored by the project maintainer, not user input, so rendering them via `dangerouslySetInnerHTML` in `components/shared/markdown-page.tsx` does not take untrusted input.

## Rate Limiting

`lib/rate-limit.ts` implements a fixed-window limiter (default: 5 requests/minute per client IP, derived from `x-forwarded-for`) applied to `/api/book-demo` and `/api/contact` before validation runs. Exceeding the limit returns `429` with a `Retry-After` header.

**Limitation, stated plainly:** this limiter stores state in an in-memory `Map`, scoped to a single running process. It resets on cold start and is **not** shared across multiple serverless instances. It's sufficient for a single dev/demo deployment; a real multi-instance production deployment should replace it with a shared store (e.g. Upstash Redis) — no such service is configured in this project.

## CORS / Same-Origin Policy

`lib/cors.ts` rejects any POST to `/api/book-demo` or `/api/contact` whose `Origin` header doesn't match `NEXT_PUBLIC_SITE_URL` (or the request's own host, as a local-dev fallback), returning `403`. These endpoints have no legitimate cross-origin caller — nothing in this project needs to consume them from another domain.

## Environment Variables

- `.env.example` documents every variable this project reads. There are no real secrets in this repository.
- `.gitignore` excludes `.env*` (verified — this predates this change, from the original `create-next-app` scaffold).
- `NEXT_PUBLIC_SITE_URL` is the only variable actually consumed by application code (by the CORS check above). It is intentionally public (`NEXT_PUBLIC_` prefix) since it's just this site's own canonical URL.

## What Is Not Implemented (and why)

- **No email/CRM delivery.** `/api/book-demo` and `/api/contact` validate, rate-limit, and `console.log` submissions server-side, then return success. No email provider is configured, and no credentials have been fabricated to fake one. If you connect a real provider later, do it from these two route handlers, after the existing validation step.
- **No authentication, sessions, or cookies.** This app has no login system, so there is nothing to apply `HttpOnly` / `Secure` / `SameSite=Strict` cookie flags to. If auth is added later, session cookies must be configured with all three of those flags — noting the requirement here rather than building an unused auth system just to have cookies to harden.
- **No persistent storage.** Form submissions are not written to a database; there is none in this project.
- **No dependency-vulnerability remediation performed automatically.** Run `npm audit` and review before applying `npm audit fix --force`, which can introduce breaking major-version bumps — this hasn't been done as part of this change.

## Reporting

This is a portfolio/demo project with no production deployment or real user data. If you're evaluating it and spot an issue, open a note in the repo rather than a formal disclosure — there's no bug bounty or live system behind it.
