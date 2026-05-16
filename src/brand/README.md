# GBD Brand System

**Single source of truth for the Great British Doner visual identity.**

This directory defines every token the product is allowed to consume.
If a value isn't here, it doesn't ship.

---

## Brand emotional contract

The product should feel like **a handcrafted premium British doner brand
designed by editorial creatives.** Not Tailwind-template. Not SaaS. Not
corporate. A reader should pick up *appetite, warmth, craftsmanship, and
restraint* within three seconds.

The system is deliberately small so that the emotion comes from
**composition, photography, and rhythm** — not from token sprawl.

### Visual ratio (approximate)

- **70% White** — canvas, breathing space, premium cleanliness
- **20% Navy** — typography, structure, hairline borders, grounding
- **10% Red** — emotional signal. Heat, appetite, action. Used in
  hover fills, terminal punctuation in headlines (e.g. the period at
  the end of "Redefined."), accent rules under chips, signature marks
  in photography corners. **Red is never a section background.**

### Composition philosophy

- **Asymmetric, not centred.** Type columns indent at 6–10% in editorial
  sections (`pl-[6%]`, `pl-[8%]`). Photo columns are 7/12, type columns
  5/12. Two columns of 6/6 is forbidden in editorial contexts.
- **Numeric rhythm.** Sections may open with a `<Numeral index="01"
  label="Britain" />` marker — borrowed from print monographs, fashion
  lookbooks, and restaurant cookbooks. Use sparingly; one per section.
- **Terminal accents.** The full stop at the end of a hero headline
  ("Redefined**.**") may be set in `text-accent` — a small typographic
  signature that reads as a stamp, not as decoration.
- **Hairline architecture.** Long horizontal rules at `h-px bg-text-secondary
  opacity-60` or `bg-accent` accompany eyebrows and stat columns. They
  carry the editorial-print feeling without introducing new tokens.

### Photography contract

Every photograph passes through `<ImageBlock>` which applies a uniform
cinematic filter: `contrast(1.04) saturate(1.06) brightness(0.99)`. This
is the single grading register for the entire product — Unsplash
placeholders and future commissioned shoots all read from the same
emotional palette. See `/brand/photography.md` for the shoot brief.

---

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
6. **Motion** — two registers:
   - *Functional* — `EASE.out` / `DUR.fast..slow` (300–900ms) for buttons, hovers, filters.
   - *Editorial* — `EASE.editorial` / `DUR.reveal..drift` (1.1–1.4s) for section entrances and atmospheric image drift.

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

## The component primitives

| Component | Purpose |
|---|---|
| `<Logo />` | The only logo lockup. Renders `/logo.png`. |
| `<Section size="standard"\|"hero">` | Canonical vertical rhythm. |
| `<Container />` | Canonical horizontal rhythm. |
| `<CTAButton variant="primary"\|"tertiary">` | The only button system. Primary has a tactile press feel; transition is editorial 420ms. |
| `<Eyebrow tone>` | The only small uppercase label. |
| `<Heading level>` | The display ladder. Children may include inline `text-accent` spans for terminal accents. |
| `<Numeral index label tone>` | Editorial rhythm marker — chapter opener. |
| `<ImageBlock ratio offset hoverZoom raw>` | Canonical image surface with uniform cinematic warmth filter. Set `raw` to disable the filter. |
| `<ProductCard variant>` / `<LocationCard size>` | Card families. |

## Forbidden patterns (will fail lint)

- Bracketed hex utilities: `text-[#0F1E2D]`, `bg-[#C94035]`, `border-[#0F1E2D]/10`
- Inline `style={{ color: "..." }}` with brand colours
- Raw `<img>` for the logo
- Tailwind tracking literals: `tracking-tighter`, `tracking-tight`, arbitrary `tracking-[Xem]` outside the three approved values
- Section-level arbitrary padding: `py-20`, `py-28`, `py-40`
- The deleted tokens: `gbd-red-dark`, `gbd-navy-soft`, `gbd-cream`
- `framer-motion` rotation, scale > 1.04, or stagger transforms
- Centred 6/6 split-column composition in editorial sections (use 5/7, 7/5, or indented type columns instead)
- Red as a section background (red is a signal, never a surface)
- Drop shadows (use offset hairline borders for layered effects)
