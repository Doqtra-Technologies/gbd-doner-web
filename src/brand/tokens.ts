/**
 * GBD semantic tokens.
 *
 * THIS FILE IS THE SINGLE INTERFACE COMPONENTS USE.
 * Components must NEVER reach for primitive colour values (#C94035 etc.)
 * or raw Tailwind colour utilities (bg-gbd-red, text-gbd-navy/65).
 * They use the semantic Tailwind classes below, which the Tailwind config
 * maps to primitives.
 *
 * Adding new semantic tokens requires updating tailwind.config.ts in lockstep.
 */

export const text = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  disabled: "text-text-disabled",
  inverse: "text-text-inverse",
  accent: "text-accent",
} as const;

export const bg = {
  canvas: "bg-canvas",
  surfaceInverse: "bg-surface-inverse",
  accent: "bg-accent",
} as const;

export const border = {
  hairline: "border-border-hairline",
  strong: "border-border-strong",
  accent: "border-accent",
} as const;

export const ring = {
  accent: "ring-accent",
} as const;

export type TextToken = keyof typeof text;
export type BgToken = keyof typeof bg;
export type BorderToken = keyof typeof border;
