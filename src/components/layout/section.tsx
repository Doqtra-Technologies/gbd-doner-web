import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * Canonical section primitive.
 *
 * Three vertical rhythms:
 *   - "compact"   py-12 md:py-16 lg:py-20 — dense editorial pacing (48/64/80)
 *   - "standard"  py-24   — every interior section
 *   - "hero"      py-32   — first section on a page
 *
 * This file is the single source of truth for section padding and is exempted
 * from the no-restricted-syntax padding rule in .eslintrc.json; consumers must
 * still go through <Section size> rather than hand-rolling py-* utilities.
 *
 * Tone (background) is restricted to two choices:
 *   - "canvas"        white            — default
 *   - "surfaceInverse" navy            — used sparingly, max once per page
 *
 * The accent (red) is never a section background. Red is a signal: dots,
 * underlines, hover fills.
 */
type SectionSize = "compact" | "standard" | "hero";
type SectionTone = "canvas" | "surfaceInverse";

const sizeClasses: Record<SectionSize, string> = {
  compact: "py-12 md:py-16 lg:py-20",
  standard: "py-24",
  hero: "py-32",
};

const toneClasses: Record<SectionTone, string> = {
  canvas: "bg-canvas text-text-primary",
  surfaceInverse: "bg-surface-inverse text-text-inverse",
};

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  size?: SectionSize;
  tone?: SectionTone;
  as?: "section" | "article" | "div";
}

export function Section({
  size = "standard",
  tone = "canvas",
  as: Tag = "section",
  className,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(sizeClasses[size], toneClasses[tone], className)}
      {...props}
    />
  );
}
