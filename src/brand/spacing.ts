/**
 * GBD spacing primitives. Section-level rhythm is locked to two values.
 */
export const sectionPadding = {
  standard: "py-24",
  hero: "py-32",
} as const;

export const containerMaxWidth = "max-w-shell";

export type SectionSize = keyof typeof sectionPadding;
