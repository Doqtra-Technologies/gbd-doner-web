/**
 * GBD motion primitives. Subtle. Premium. Cinematic.
 *
 * Two timing registers:
 *
 *   Functional (`out` / DUR.fast..slow)
 *     For affordance feedback — buttons, hovers, filter toggles, menu
 *     transitions. Curve: ease-out. Duration: 300–600ms.
 *
 *   Editorial (`editorial` / DUR.reveal..drift)
 *     For composition entrances and atmospheric image drift. Curve:
 *     long-tail ease-out. Duration: 900–1400ms. Used sparingly on hero
 *     and section entrances to give the page a "page turn" rather than
 *     a "screen pop".
 *
 * Forbidden: rotation, parallax, stagger transforms, scale > 1.04,
 * full-section choreographed entrances with bouncing or overshoot. Hero
 * may use one fade+rise. Cards may use one gentle hover zoom. Links may
 * use an underline slide. Nothing else.
 */
export const EASE = {
  /** Brisk ease-out for functional UI feedback. */
  out: [0.22, 1, 0.36, 1] as const,
  /** Long-tail ease-out — atmospheric entrances, photographic reveals. */
  editorial: [0.16, 1, 0.3, 1] as const,
} as const;

export const DUR = {
  fast: 0.3,
  standard: 0.6,
  slow: 0.9,
  /** Editorial reveal — section-level entrance fades. */
  reveal: 1.1,
  /** Atmospheric image drift over the duration of a viewport. */
  drift: 1.4,
} as const;

/** Tailwind transition utilities mirroring the functional JS tokens. */
export const transition = {
  colors: "transition-colors duration-300 ease-smooth",
  all: "transition-all duration-300 ease-smooth",
  transform: "transition-transform duration-600 ease-smooth",
} as const;
