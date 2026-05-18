# ATHLETIX

> **Play Beyond Limits.** A premium sports booking platform for the Greater Toronto Area —
> built with React 19, Next.js 15, Tailwind v4, Framer Motion and a custom motion-rich UI system.

A luxury, dark, cinematic UI you can demo end-to-end:

- Cinematic landing page with parallax hero, animated counters, glassmorphism cards,
  magnetic FX, scroll progress, cursor glow, marquee, sparkles, aurora gradients.
- 11 sports · 24 hand-crafted GTA demo venues across Toronto, Brampton, Mississauga,
  Vaughan, Markham & Scarborough.
- Filterable venue catalog (price, surface, indoor/outdoor, amenities, rating, sort).
- Premium venue detail page (Airbnb-style gallery, sticky booking panel, reviews, rules).
- Full booking flow (review → details → confirm) producing a **printable / PDF
  reservation receipt with QR code**.
- Personal dashboard with stats, animated chart, upcoming/past bookings, favorites.
- Stylised live GTA map with venue pins, hover previews and Google Maps directions.
- Events / news section with category filters.
- AI features section (stub — designed to plug into your model).
- Prisma schema + seed script ready for Supabase / Postgres.

---

## Tech stack

| Layer        | Choice                                  |
| ------------ | --------------------------------------- |
| Framework    | **Next.js 15** (App Router, RSC)        |
| Language     | **TypeScript 5**                        |
| UI runtime   | **React 19**                            |
| Styling      | **Tailwind CSS v4** (token-driven `@theme`) |
| Motion       | **Framer Motion 12**                    |
| Icons        | **Lucide React**                        |
| State        | **Zustand 5** (persisted)               |
| Data fetch   | **TanStack Query 5** (installed; swap in when wiring API) |
| Forms        | **React Hook Form 7** + **Zod 3**       |
| QR codes     | **qrcode.react**                        |
| DB / ORM     | **Prisma 5 + PostgreSQL** (schema included) |
| Backend      | **Supabase** (wiring ready via `.env.example`) |
| Auth         | **Clerk** (wiring ready via `.env.example`) |
| Maps         | Stylised SVG (Mapbox/Leaflet drop-in seam) |

---

## Quick start

```bash
# 1. install
npm install

# 2. dev server
npm run dev
# → http://localhost:3000

# 3. production build
npm run build && npm run start
```

That's it — **the entire demo runs without any backend, environment variables,
or external services.** Bookings persist in `localStorage` via Zustand.

---

## What's wired vs. what's plug-in-ready

### Wired and working today

- Every page renders with realistic data (`src/lib/data/*`).
- Booking flow → receipt → dashboard works end-to-end against Zustand.
- Search, filtering, favorites, QR receipts, print-to-PDF all functional.

### Plug-in-ready (designed for, not wired)

| Feature           | Plug it in at                                 |
| ----------------- | --------------------------------------------- |
| Supabase / Prisma | `prisma/schema.prisma` + `prisma/seed.ts`     |
| Clerk auth        | Wrap `src/app/layout.tsx` in `<ClerkProvider>` |
| Mapbox / Leaflet  | Swap `src/components/map/gta-map.tsx`         |
| AI assistant      | `src/components/home/ai-features.tsx`         |
| Stripe payments   | After `ConfirmFlow.submit` in booking page    |
| Cron / webhooks   | `src/app/api/*` (folder ready to add)         |

---

## Folder structure

```
athletix/
├─ prisma/
│  ├─ schema.prisma          ← Users, Venues, Slots, Bookings, Reviews, …
│  └─ seed.ts                ← Mirrors src/lib/data/* into Postgres
├─ public/
│  ├─ favicon.svg
│  └─ manifest.webmanifest   ← PWA manifest
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx          ← Navbar, footer, cursor glow, scroll progress, fonts, metadata
│  │  ├─ page.tsx            ← Landing page
│  │  ├─ globals.css         ← Design tokens (@theme), keyframes, utilities, print CSS
│  │  ├─ loading.tsx · not-found.tsx
│  │  ├─ sports/
│  │  │  ├─ page.tsx                ← All sports
│  │  │  └─ [slug]/page.tsx         ← Sport category w/ filterable venue list
│  │  ├─ venues/
│  │  │  ├─ page.tsx                ← All venues
│  │  │  ├─ [slug]/page.tsx         ← Venue detail
│  │  │  └─ [slug]/book/page.tsx    ← Booking confirm flow
│  │  ├─ bookings/[id]/page.tsx     ← Receipt + QR + print/PDF
│  │  ├─ dashboard/page.tsx
│  │  ├─ map/page.tsx
│  │  └─ events/page.tsx
│  ├─ components/
│  │  ├─ fx/                 ← Magnetic, reveal, sparkles, aurora, glass-card, marquee, counter, grid
│  │  ├─ ui/                 ← Button, badge, input, select, logo
│  │  ├─ layout/             ← Navbar, footer, scroll progress, cursor glow
│  │  ├─ home/               ← Hero, search, stats, sports grid, featured, AI, testimonials, events, CTA
│  │  ├─ venues/             ← Card, filters, list, gallery, booking panel
│  │  ├─ booking/            ← Confirm flow, receipt
│  │  ├─ map/                ← GTA stylised map
│  │  └─ dashboard/          ← Booking row, stats chart
│  ├─ lib/
│  │  ├─ data/               ← sports / venues / events / testimonials
│  │  ├─ types.ts · utils.ts
│  ├─ store/booking-store.ts ← Zustand (persisted)
│  └─ hooks/use-mounted.ts
├─ .env.example
├─ next.config.ts · tsconfig.json · postcss.config.mjs · tailwind via Tailwind v4 in globals.css
└─ package.json
```

---

## Supabase / Postgres setup (optional)

```bash
# 1. create a Supabase project, grab the connection string
cp .env.example .env
# fill in DATABASE_URL

# 2. generate the schema
npx prisma generate
npx prisma migrate dev --name init

# 3. seed with the same demo data the front-end uses today
npx tsx prisma/seed.ts
```

Then swap the in-memory data lookups (`VENUES`, `EVENTS`, …) for `prisma.venue.findMany()` etc.
The types in `src/lib/types.ts` are a 1:1 match with the Prisma schema fields, so no
component changes are required.

---

## Clerk auth setup (optional)

```bash
npm install @clerk/nextjs
```

```tsx
// src/app/layout.tsx
import { ClerkProvider, SignInButton, UserButton } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

Drop `<UserButton />` into `src/components/layout/navbar.tsx` and add a `middleware.ts` to protect
`/dashboard` and `/bookings/*`.

---

## Real maps (optional)

The stylised SVG map in `src/components/map/gta-map.tsx` accepts `venues` and renders
projected lat/lng pins onto a styled canvas — perfect for demos. To ship real tiles:

- `npm install mapbox-gl react-map-gl` and replace the SVG body with `<Map>` + `<Marker>` from
  `react-map-gl/mapbox`.
- Or `npm install leaflet react-leaflet` and use `<MapContainer>` + `<Marker>`. Wrap in
  `"use client"` and tile from `https://{s}.tile.openstreetmap.org/...`.

All venue pins, hover-cards and active-state animations carry over — only the
projection / tile layer changes.

---

## Design system

All colors, fonts, radii, animations live as Tailwind v4 tokens in
`src/app/globals.css` (`@theme`). Add a new accent? Add `--color-foo-500: #...` and use
`text-foo-500` / `bg-foo-500/20` everywhere.

Custom utilities:

- `.glass` / `.glass-strong` — backdrop-blurred surfaces
- `.text-gradient` / `.text-gradient-cool` — premium headlines
- `.ring-glow` — soft electric-blue ring shadow
- `.bg-grid` / `.bg-dot` / `.bg-aurora` — instant backgrounds
- `.mask-fade-b` / `.mask-edges-x` — feather any element

Custom keyframes: `aurora`, `marquee`, `shimmer`, `pulse-glow`, `float`, `grid`.

---

## Deployment

This project deploys cleanly to **Vercel** with zero config:

```bash
npx vercel
```

Add your `.env` values in the Vercel dashboard once you've wired Supabase / Clerk / Mapbox.

For self-hosted / Docker, `npm run build && npm run start` produces a standalone server on port 3000.

---

## What was *not* built (and why)

This repo is a deeply polished slice — not the entire 20-engineer roadmap. Intentionally skipped:

- **Real Stripe payments.** Booking flow stops at receipt; receipt is the natural ship point.
- **Full admin CMS.** Would need a parallel routing tree, RBAC, and an upload pipeline (S3).
- **Real-time chat / AI calls.** AI features section is presentational; plug your model into
  `/api/chat` and wire it to a sheet.
- **Tournaments engine.** Brackets, team management, leaderboards — each a serious sub-product.

Every one of these has a clear seam to plug into. The point of v0 is to **prove the brand,
the feel, and the booking flow** — and ship it.

---

## License

MIT — go play.
