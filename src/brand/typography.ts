/**
 * GBD typography primitives.
 *
 * Two families, two weights total:
 *   - Montserrat 700  (headings, eyebrows, button labels)
 *   - Open Sans 400   (body)
 *
 * Three tracking values:
 *   - display  (0.02em)  — headlines
 *   - eyebrow  (0.18em)  — small uppercase labels
 *   - button   (0.14em)  — CTA labels
 *
 * Use the helper classes below in components. Do not write tracking literals
 * inline; do not introduce additional sizes.
 */
export const typography = {
  display1:
    "font-display font-bold uppercase tracking-display leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
  display2:
    "font-display font-bold uppercase tracking-display leading-[0.95] text-3xl sm:text-4xl md:text-5xl",
  display3:
    "font-display font-bold uppercase tracking-display leading-[1.05] text-xl md:text-2xl",
  eyebrow:
    "font-display font-bold uppercase tracking-eyebrow text-[11px]",
  button:
    "font-display font-bold uppercase tracking-button text-xs",
  body: "font-body text-base leading-relaxed",
  bodySm: "font-body text-sm leading-relaxed",
} as const;

export type TypographyToken = keyof typeof typography;
