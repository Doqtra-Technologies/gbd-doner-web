/**
 * GBD does not use shadows. This file exists to make that contract explicit.
 *
 * Premium minimal aesthetic ("Less, but stronger") forbids drop shadows.
 * Use flat offset borders for layered effects instead — see ImageBlock.
 */
export const shadows = {
  none: "shadow-none",
} as const;
