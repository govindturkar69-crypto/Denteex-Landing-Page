<div align="center">

# 🦷 Denteex 3D — Next-Gen Dental Practice OS

### *Where clinical workflows meet cinematic web design.*

An ultra-modern, 3D-animated landing page & lightweight application shell for **Denteex** — a fictional cloud-based dental practice management platform — built to demonstrate what a portfolio-grade, production-shaped Next.js app looks like: real API routes, real validation, real security headers, and a genuinely interactive 3D odontogram, not just pretty scroll animations.

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF008F?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Security](https://img.shields.io/badge/Security-Hardened-2EA043?style=for-the-badge&logo=shieldcheck&logoColor=white)](./SECURITY.md)
[![License](https://img.shields.io/badge/License-Portfolio_Project-lightgrey?style=for-the-badge)](#-license--author)

<br/>

**[🚀 Live Demo](https://denteex-landing-page.vercel.app/)** &nbsp;•&nbsp;
**[📖 Documentation](./REQUIREMENTS.md)** &nbsp;•&nbsp;
**[🔒 Security](./SECURITY.md)** &nbsp;•&nbsp;
**[🐛 Report Bug](https://github.com/govindturkar69-crypto/Denteex-Landing-Page/issues)** &nbsp;•&nbsp;
**[✨ Request Feature](https://github.com/govindturkar69-crypto/Denteex-Landing-Page/issues)**

</div>

---

## 📍 Live Demo

### 🔗 **[denteex-landing-page.vercel.app](https://denteex-landing-page.vercel.app/)**

Deployed on Vercel, straight from the [GitHub repo](https://github.com/govindturkar69-crypto/Denteex-Landing-Page) — see the [🚀 Deployment Guide](#-deployment-guide-vercel--github) below for how to deploy your own copy.

---

## 🌟 Key Features & Highlights

<table>
<tr>
<td width="50%" valign="top">

### 🦷 Interactive 3D Odontogram
Two real, clickable 3D charting experiences — not screenshots. A homepage playground widget (8 teeth, click to cycle Healthy → Cavity → Crown → Extracted, R3F raycasting, live legend) and a full 32-tooth clinical demo inside the [`/tour`](./app/tour) pitch deck.

### 🧭 Full Page-by-Page Pitch Integration
[`/tour`](./app/tour) turns a 5-page client pitch deck into a paginated, wizard-style walkthrough — floating step navigator, keyboard + swipe navigation, hash deep-linking, all content mapped 1:1 from source.

### 🧮 Interactive ROI & Comparison Widgets
A live ROI calculator (drag sliders, watch spring-animated numbers recompute), and a draggable before/after slider contrasting paper-chart chaos with the Denteex workflow.

</td>
<td width="50%" valign="top">

### 🧙 Smart Booking & Modals
Three fully wired, Zod-validated flows: **Book a Demo** (2-step wizard, date/time picker, confetti + animated-checkmark success), **Start Free Trial** (validated signup + simulated onboarding loader), and **Contact Sales** (enterprise inquiry form) — the first two POST to real, rate-limited API routes.

### 🩺 AI-Assisted Diagnostics & Automated Care Workflows
A glowing AI X-ray feature highlight (animated scan-line, live-feeling annotation badges) and reminder workflows across Email, SMS, and WhatsApp — all showcased throughout the product copy and UI.

### 🎨 Responsive, Animated, Dark-First UI
Framer Motion scroll reveals and stagger animations (all respecting `prefers-reduced-motion`), glassmorphism cards, a persisted dark/light theme, and verified layouts from 375px phones to large desktops.

</td>
</tr>
</table>

<details>
<summary><b>See the full feature list</b></summary>
<br/>

- Procedural glass/pearlescent 3D tooth hero (Three.js lathe geometry), cursor-reactive, with a graceful gradient fallback for reduced-motion/low-power devices
- Sticky glassmorphism navbar with scroll-aware blur + mobile drawer
- Feature grid, mouse-tilt "product dashboard" mockup, animated stat counters, testimonial, on-page FAQ accordion
- Monthly/annual pricing toggle with a highlighted "Most Popular" tier
- Markdown-driven `/privacy`, `/terms`, `/docs`, `/faq` pages via Tailwind Typography, all linked from the footer
- Security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) on every route
- Same-origin enforcement + in-memory rate limiting on `/api/book-demo` and `/api/contact`
- Shared Zod schemas driving both client-side form validation and server-side API validation

</details>

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, TypeScript, Turbopack) |
| **3D Graphics** | [Three.js](https://threejs.org) via [React Three Fiber](https://r3f.docs.pmnd.rs) + [drei](https://github.com/pmndrs/drei) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) — scroll reveals, stagger, spring-animated numbers, gesture drag |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config) + [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com) on [Base UI](https://base-ui.com) + [Lucide](https://lucide.dev) icons |
| **State & Forms** | React state (`useState`) + [Zod](https://zod.dev) shared client/server validation schemas |
| **Content** | [marked](https://marked.js.org) — renders `content/*.md` server-side for the docs/legal pages |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) — class-based dark mode, persisted |
| **Security** | Custom middleware-free headers config, in-memory rate limiter, same-origin CORS guard — see [SECURITY.md](./SECURITY.md) |

📄 Full architecture breakdown and requirements checklist: **[REQUIREMENTS.md](./REQUIREMENTS.md)**

---

## 📸 Screenshots & Interactive Demo

<details open>
<summary><b>Hero Section — Interactive 3D Tooth</b></summary>
<br/>

![Hero section — interactive 3D tooth](./docs/screenshots/hero.png)

</details>

<details>
<summary><b>3D Odontogram Playground</b></summary>
<br/>

![3D odontogram playground](./docs/screenshots/odontogram-playground.png)

</details>

<details>
<summary><b>ROI Calculator</b></summary>
<br/>

![ROI calculator](./docs/screenshots/roi-calculator.png)

</details>

<details>
<summary><b>Mobile Responsiveness (full page, 375px wide)</b></summary>
<br/>

<img src="./docs/screenshots/mobile-responsive.png" width="375" alt="Mobile responsiveness — full page at 375px width" />

</details>

> 📸 Captured directly from the running app with a headless Playwright script (`scripts/capture-screenshots.mjs`) — not hand-picked marketing shots.

---

## ⚡ Quick Start & Local Development

### Prerequisites

- **Node.js** `20.9+` (LTS recommended)
- **npm** `10+` (bundled with Node) — `pnpm`/`yarn` work too, just adjust commands accordingly

### 1. Clone the repository

```bash
git clone https://github.com/govindturkar69-crypto/Denteex-Landing-Page.git
cd Denteex-Landing-Page
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Optional for local dev — see [`.env.example`](./.env.example) for what each variable does (only `NEXT_PUBLIC_SITE_URL` is actually consumed by the app, for the API routes' same-origin check).

### 4. Run the local dev server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**.

<details>
<summary><b>Other useful commands</b></summary>
<br/>

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # eslint
```

</details>

---

## 🔒 Security & Compliance Summary

Denteex is built with a **real, honest security baseline** — not security theater. Full detail in **[SECURITY.md](./SECURITY.md)**, summarized here:

| Control | Implementation |
|---|---|
| **Rate Limiting** | In-memory fixed-window limiter (5 req/min/IP) on `/api/book-demo` & `/api/contact`, returns `429` + `Retry-After` |
| **Input Validation** | [Zod](https://zod.dev) schemas (`lib/schemas.ts`) shared between client forms and server routes — nothing reaches app logic unvalidated |
| **Security Headers** | `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` on every route |
| **CORS / Same-Origin** | POSTs to API routes are rejected unless the `Origin` matches `NEXT_PUBLIC_SITE_URL` |
| **HIPAA / GDPR Posture** | `content/privacy-policy.md` is written to a HIPAA/GDPR-conscious standard (Business Associate framing, data subject rights, breach notification timelines) — this is a **portfolio project**, not an audited, certified, or legally reviewed compliance program |
| **Secrets** | No real secrets in this repo; `.env.example` documents every variable; `.gitignore` excludes `.env*` |

<details>
<summary><b>What's explicitly <i>not</i> implemented (stated plainly, not hidden)</b></summary>
<br/>

- No real email/CRM delivery — API routes validate, rate-limit, and log server-side instead
- No authentication, sessions, or cookies — nothing to apply `HttpOnly`/`Secure`/`SameSite` to yet
- No persistent database — there is none in this project
- Rate limiting is per-process, not shared across multiple serverless instances

</details>

---

## 🚀 Deployment Guide (Vercel + GitHub)

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgovindturkar69-crypto%2FDenteex-Landing-Page)

> Click to spin up your own copy from this repo.

### Manual: Vercel CLI (no GitHub required)

```bash
npm install -g vercel
vercel login
vercel          # preview deploy
vercel --prod   # promote to production
```

### Manual: GitHub → Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected, no build config needed.
3. If this lives inside a monorepo, set **Root Directory** to the project folder in Vercel's project settings.
4. Every push to your default branch auto-deploys; PRs get preview URLs.

### Required environment variable

In **Vercel → Project → Settings → Environment Variables**:

```
NEXT_PUBLIC_SITE_URL=https://denteex-landing-page.vercel.app
```

Used by [`lib/cors.ts`](./lib/cors.ts) to enforce the same-origin policy on API routes.

---

## 📁 Project Structure

<details open>
<summary><b>Folder tree</b></summary>

```text
Denteex/
├── app/
│   ├── page.tsx                  # Landing page — composes all sections
│   ├── layout.tsx                # Root layout: fonts, theme, CtaProvider
│   ├── globals.css               # Tailwind v4 CSS-first config + design tokens
│   ├── tour/page.tsx             # /tour — paginated pitch-deck experience
│   ├── privacy/page.tsx          # /privacy — renders content/privacy-policy.md
│   ├── terms/page.tsx            # /terms  — renders content/terms-of-service.md
│   ├── docs/page.tsx             # /docs   — renders content/docs.md
│   ├── faq/page.tsx              # /faq    — renders content/faq.md
│   └── api/
│       ├── book-demo/route.ts    # POST — rate-limited, Zod-validated
│       └── contact/route.ts      # POST — rate-limited, Zod-validated
│
├── components/
│   ├── sections/                 # hero, features, pricing, roi-calculator,
│   │                              # before-after, ai-xray-highlight, odontogram-
│   │                              # playground, testimonials, faq, cta-banner...
│   ├── cta/                      # Book a Demo / Free Trial / Contact Sales
│   │                              # dialogs + shared CtaProvider context
│   ├── three/                    # R3F scenes: hero tooth, playground odontogram,
│   │                              # shared tooth geometry, error boundary
│   ├── tour/                     # /tour experience: pages, step navigator,
│   │                              # 32-tooth odontogram, demo-request dialog
│   ├── layout/                   # navbar, footer, mobile drawer, theme toggle
│   ├── shared/                   # section heading, reveal-on-scroll, animated
│   │                              # counters/numbers, markdown page shell
│   └── ui/                       # shadcn/ui primitives (button, dialog, slider...)
│
├── lib/
│   ├── content.ts                # Landing page copy — single source of truth
│   ├── tour-content.ts           # /tour copy (verbatim from pitch deck)
│   ├── cta-content.ts            # Clinic sizes, time slots, budget ranges
│   ├── schemas.ts                # Zod schemas — shared client + API validation
│   ├── rate-limit.ts             # In-memory rate limiter
│   ├── cors.ts                   # Same-origin enforcement for API routes
│   ├── markdown.ts               # content/*.md → HTML rendering
│   ├── roi.ts                    # ROI calculator formula
│   └── odontogram-conditions.ts  # Shared tooth-condition config (3D + fallback)
│
├── content/
│   ├── privacy-policy.md
│   ├── terms-of-service.md
│   ├── faq.md
│   └── docs.md
│
├── REQUIREMENTS.md               # Architecture + requirements checklist
├── SECURITY.md                   # What's implemented, and what isn't
├── .env.example
└── README.md                     # You are here
```

</details>

---

## 📜 License & Author

[![License](https://img.shields.io/badge/License-Portfolio_Project-lightgrey?style=flat-square)](#)

This is a **portfolio / demonstration project** — no LICENSE file has been added yet, so standard copyright applies (all rights reserved by default) unless you add one. If you intend to open-source this, an [MIT license](https://choosealicense.com/licenses/mit/) is a common, permissive choice — happy to add a `LICENSE` file if you'd like.

**Content note:** brand messaging, feature set, and the customer testimonial are adapted from the real [denteex.com](https://www.denteex.com). This build is a portfolio/practice recreation, not the production site — contact details throughout are placeholders, and pricing tiers are illustrative.

### Contributing

Found a bug or have a feature idea? Open an issue on the [GitHub repo](https://github.com/govindturkar69-crypto/Denteex-Landing-Page/issues).

- 📧 Contact: `hello@example.com` *(placeholder — not a live inbox)*
- 🤖 **AI workflow note:** this build used Claude to scaffold each section independently from a shared content model (`lib/content.ts`), then iterated on visual and architectural details through targeted, reviewed prompts rather than one large unreviewed generation pass.

<div align="center">
<br/>

**Built with 🦷 for dental practices that deserve better software.**

</div>
