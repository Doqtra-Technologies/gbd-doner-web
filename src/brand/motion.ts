/**
 * GBD motion primitives. Subtle. Premium. Controlled.
 *
 * Forbidden: rotation, parallax, stagger transforms, scale > 1.04, full-section
 * choreographed entrances. Hero may use one fade+rise. Cards may use one
 * gentle hover zoom. Links may use an underline slide. Nothing else.
 */
export const EASE = {
  out: [0.22, 1, 0.36, 1] as const,
} as const;

export const DUR = {
  fast: 0.3,
  standard: 0.6,
  slow: 0.9,
} as const;

/** Tailwind transition utilities mirroring the JS tokens. */
export const transition = {
  colors: "transition-colors duration-300 ease-smooth",
  all: "transition-all duration-300 ease-smooth",
  transform: "transition-transform duration-600 ease-smooth",
} as const;
