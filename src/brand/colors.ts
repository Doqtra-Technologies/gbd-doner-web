/**
 * GBD primitive color tokens. PRIVATE.
 * Consumers must use semantic tokens from `./tokens.ts`, never these.
 */
export const palette = {
  red: "#C94035",
  navy: "#0F1E2D",
  white: "#FFFFFF",
} as const;

export type PaletteToken = keyof typeof palette;
