# GBD Brand System

**Single source of truth for the Great British Doner visual identity.**

This directory defines every token the product is allowed to consume.
If a value isn't here, it doesn't ship.

## Hard rules

1. **Logo** — `public/logo.png`, rendered only via `<Logo />`. No SVG, no text wordmark, no raw `<img>`.
2. **Colour palette** — three values total:
   - `#C94035` GBD Red
   - `#FFFFFF` White
   - `#0F1E2D` Deep Navy
3. **Typography** — two families, two weights:
   - Montserrat 700 (headings, eyebrows, button labels)
   - Open Sans 400 (body)
4. **Section padding** — two values: `py-24` (standard), `py-32` (hero).
5. **Radius** — two values: `rounded-full` (pills), `rounded-none` (cards/images).
6. **Motion** — subtle. Fade + rise, link underline slide, gentle image hover zoom. Nothing else.

## Architecture: three token layers

```
Layer 1  Primitive  (private)      — colors.ts, motion.ts, spacing.ts, radius.ts
Layer 2  Semantic   (public)       — tokens.ts (text.*, bg.*, border.*, ring.*)
Layer 3  Component  (composed)     — components/ui, components/layout, components/brand
```

**Pages consume Layer 3 components.**
**Components consume Layer 2 tokens.**
**Layer 1 stays private to the brand directory.**

A semantic Tailwind layer in `tailwind.config.ts` translates Layer 2 names
(`text-text-primary`, `bg-canvas`, `border-border-strong`) into Layer 1 hex.

## The eight primitives

| Component | Purpose |
|---|---|
| `<Logo />` | The only logo lockup. Renders `/logo.png`. |
| `<Section size="standard"\|"hero">` | Canonical vertical rhythm. |
| `<Container />` | Canonical horizontal rhythm. |
| `<CTAButton variant="primary"\|"tertiary">` | The only button system. |
| `<Eyebrow />` | The only small uppercase label. |
| `<Heading level={1\|2\|3}>` | The display ladder. |
| `<ImageBlock ratio offset>` | Canonical image + optional offset border. |
| `<ProductCard variant>` / `<LocationCard size>` | Card families. |

## Forbidden patterns (will fail lint)

- Bracketed hex utilities: `text-[#0F1E2D]`, `bg-[#C94035]`, `border-[#0F1E2D]/10`
- Inline `style={{ color: "..." }}` with brand colours
- Raw `<img>` for the logo
- Tailwind tracking literals: `tracking-tighter`, `tracking-tight`, arbitrary `tracking-[Xem]` outside the three approved values
- Section-level arbitrary padding: `py-20`, `py-28`, `py-40`
- The deleted tokens: `gbd-red-dark`, `gbd-navy-soft`, `gbd-cream`
- `framer-motion` rotation, scale > 1.04, or stagger transforms
