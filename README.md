# Denteex — Collaborate for Million Smiles

**Live demo:** _add your Vercel URL here after deploying_

A 3D-animated, fully responsive landing page for **Denteex**, a cloud-based dental practice management platform. Built as a Module 4 capstone, pushed past the base rubric with an interactive Three.js hero, glassmorphism UI, and full dark-mode support.

## Features

- **Interactive 3D hero** — a stylized glass/pearlescent tooth built from a procedural Three.js lathe geometry, with orbiting accent nodes, cursor-reactive rotation, and a graceful CSS-gradient fallback for reduced-motion/low-power devices
- Sticky glassmorphism navbar with scroll-aware blur and a mobile drawer
- Feature grid, live "product dashboard" mockup with mouse-tilt 3D, animated stat counters, testimonial, and FAQ accordion
- Pricing section with a monthly/annual billing toggle and a highlighted "Most Popular" tier
- **Fully functional CTA modals** — Book a Demo (2-step wizard with a confetti + animated-checkmark success state), Start Free Trial (validated signup + simulated onboarding loader), and Contact Sales (enterprise inquiry form), all Zod-validated; Book a Demo and Contact Sales post to real, rate-limited API routes (`/api/book-demo`, `/api/contact`)
- An interactive, paginated pitch-deck walkthrough at [`/tour`](./app/tour)
- Markdown-driven `/privacy`, `/terms`, `/docs`, and `/faq` pages (see `content/`), styled with Tailwind Typography
- Security headers (CSP, HSTS, and more) and same-origin + rate-limit protection on API routes — see [SECURITY.md](./SECURITY.md)
- Full dark/light theme toggle with persisted preference
- Scroll-reveal and stagger animations throughout (Framer Motion), all respecting `prefers-reduced-motion`
- Fully responsive from 375px phones to large desktop displays

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com) + [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [shadcn/ui](https://ui.shadcn.com) + [Lucide](https://lucide.dev) icons
- [Framer Motion](https://www.framer.com/motion/)
- [React Three Fiber](https://r3f.docs.pmnd.rs) + [drei](https://github.com/pmndrs/drei) + [Three.js](https://threejs.org)
- [Zod](https://zod.dev) — shared client/server validation
- [marked](https://marked.js.org) — markdown rendering for `/privacy`, `/terms`, `/docs`, `/faq`
- [next-themes](https://github.com/pacocoursey/next-themes)

See [REQUIREMENTS.md](./REQUIREMENTS.md) for the full architecture and requirements checklist, and [SECURITY.md](./SECURITY.md) for what's actually implemented security-wise (and what isn't).

## Content Note

Brand messaging, feature set, and the customer testimonial are adapted from the real [denteex.com](https://www.denteex.com). This build is a portfolio/practice recreation, not the production site — footer contact details are placeholders, and the pricing tiers are illustrative (the live site does not publish pricing).

## Getting Started

```bash
npm install
cp .env.example .env.local   # optional locally; see .env.example
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo directly at [vercel.com/new](https://vercel.com/new) — it auto-detects Next.js, no config needed.

## AI Workflow

This build used Claude to scaffold each section independently (hero, features, pricing, 3D scene) from a shared content model (`lib/content.ts`), then iterated on visual details — spacing, hover states, the tooth geometry profile — through targeted refinement prompts rather than one large generation pass.
