# GBD Doner — Headless WordPress + Next.js

Frontend for **GBD Doner**, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Content is pulled from a Headless WordPress backend via WPGraphQL.

## Quick start

```powershell
npm install
copy .env.example .env.local
npm run dev
```

The site runs at <http://localhost:3000> with **mock data** by default — no WordPress required to start building UI.

## Wiring up WordPress

1. Follow [SETUP.md](./SETUP.md) (written for non-technical stakeholders/hosts).
2. Once your WP install is live, edit `.env.local`:
   ```env
   NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://api.gbdoner.com/graphql
   NEXT_PUBLIC_USE_MOCK_DATA=false
   ```
3. Restart `npm run dev`. The site now reads from WordPress.

## Wiring up Mapbox

1. Get a public token at <https://account.mapbox.com/>.
2. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ...
   ```

Without a token the Locations page still works — the map area shows a friendly placeholder.

## Architecture (clean architecture, three layers)

```
src/
├── domain/         ← Pure TypeScript entities. No frameworks, no I/O.
│                     MenuItem, Location, Post.
├── data/           ← How we *get* domain entities.
│   ├── graphql/    ← WPGraphQL client + queries + mocks.
│   └── repositories/ ← Functions like getMenuItems(), getLocations().
│                       Switch between WP and mocks based on env.
├── components/     ← Presentation. Pure rendering, takes data via props.
├── app/            ← Next.js routes. Compose pages from repos + components.
└── lib/            ← config, utils.
```

Pages call repositories. Repositories decide whether to hit WordPress or return mocks. Components only know about domain types. **You can swap WordPress for Sanity, Contentful, or a flat file tomorrow by rewriting one folder.**

## Stack

- **Next.js 14** App Router with Incremental Static Regeneration (`revalidate = 60`).
- **TypeScript** strict mode.
- **Tailwind CSS** with the GBD brand palette (`gbd-red #C94035`, `gbd-navy #0F1E2D`).
- **Framer Motion** for premium transitions.
- **graphql-request** as a tiny WPGraphQL client.
- **Mapbox GL JS** for the interactive Locations map.

## Pages

| Route | What it does |
|---|---|
| `/` | Hero, Best Sellers grid (from WP), Newsletter signup (stubbed). |
| `/menu` | Filterable grid of menu items by category. |
| `/locations` | Mapbox map + side list with Click+Collect / delivery buttons. |
| `/our-story` | Ethical Sourcing & Urban Kineticism narrative. |
| `/catering` | Lead-gen form (stubbed). |
| `/feed` | Blog grid from WP `Posts`. |

## SEO

Metadata is configured per page via the App Router Metadata API. Root defaults live in [src/app/layout.tsx](./src/app/layout.tsx); each route can extend or override.

## Stubs to wire up later

- `src/components/home/newsletter.tsx` — `onSubmit` is a fake delay. Point at Mailchimp/Klaviyo/etc.
- `src/app/catering/catering-form.tsx` — same. Easiest path: install Gravity Forms + WPGraphQL Gravity Forms on WP, then submit via GraphQL mutation.

## Deploying

Built for Vercel (zero config). Set the same env vars in your Vercel project settings. ISR cache invalidates every `WORDPRESS_REVALIDATE_SECONDS` (default 60s), so editorial changes in WP appear on the live site within a minute.

## Scripts

```bash
npm run dev        # local dev
npm run build      # production build
npm run start      # serve production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```
