/**
 * GBD radius primitives. Only two radii are allowed.
 */
export const radius = {
  pill: "rounded-full",
  sharp: "rounded-none",
} as const;

export type RadiusToken = keyof typeof radius;
