# Requirements & Architecture

## Overview

Denteex is a marketing site + lightweight application shell for a fictional dental practice-management SaaS. It's a Next.js App Router project combining a 3D-animated landing page, an interactive pitch-deck tour, three fully functional lead-gen modals backed by real API routes, and a set of markdown-driven documentation pages.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript, Turbopack) |
| Styling | Tailwind CSS v4 (CSS-first config, no `tailwind.config.ts`) + `@tailwindcss/typography` |
| UI primitives | shadcn/ui on Base UI (`@base-ui/react`) |
| Animation | Framer Motion |
| 3D | Three.js via `@react-three/fiber` / `@react-three/drei` |
| Validation | Zod (shared client + server schemas, `lib/schemas.ts`) |
| Markdown | `marked`, rendered server-side in React Server Components |
| Theming | `next-themes` (class-based dark mode) |

No database, ORM, or auth provider is present — this is intentional for the project's current scope (see [SECURITY.md](./SECURITY.md) for what that does and doesn't mean for security posture).

## Routes

- `/` — landing page (hero, features, product showcase, stats, testimonials, pricing, FAQ accordion, CTA banner)
- `/tour` — interactive, paginated walkthrough of the Denteex pitch deck
- `/privacy`, `/terms`, `/docs`, `/faq` — markdown-driven pages rendered via `lib/markdown.ts` + `components/shared/markdown-page.tsx`
- `/api/book-demo`, `/api/contact` — POST-only API routes: same-origin check → rate limit → Zod validation → server-side log → JSON response

## Functional Requirements Checklist

- [x] Fully responsive 3D landing page (375 / 768 / 1280 verified)
- [x] "Book a Demo" — 2-step modal wizard (clinic size + date/time, then contact form), confetti + animated checkmark success state, backed by `/api/book-demo`
- [x] "Start Free Trial" — validated signup form, simulated onboarding loader, dashboard-preview success state (frontend-only by design — no API route was requested for this flow)
- [x] "Contact Sales" — enterprise inquiry form (chairs, budget, integration needs), backed by `/api/contact`
- [x] Shared Zod schemas driving both client-side field validation and server-side API validation
- [x] Rate limiting and same-origin enforcement on both API routes
- [x] Security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) via `next.config.ts`
- [x] `content/*.md` → `/privacy`, `/terms`, `/docs`, `/faq`, styled with Tailwind Typography and linked from the footer
- [x] `.env.example` + `.gitignore` covering `.env*`

## What's Explicitly Out of Scope

- Persistent storage of submissions (there's no database — see SECURITY.md)
- Real email/CRM delivery for Book a Demo / Contact Sales submissions
- Authentication / user accounts / sessions
- A production-grade, cross-instance rate limiter (current one is in-memory per process)

## Local Development

```bash
npm install
cp .env.example .env.local   # optional for local dev, see .env.example
npm run dev
```

```bash
npm run build   # production build
npm run lint    # eslint
```
