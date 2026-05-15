import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * Canonical section primitive.
 *
 * Two vertical rhythms only:
 *   - "standard"  py-24   — every interior section
 *   - "hero"      py-32   — first section on a page
 *
 * Tone (background) is restricted to two choices:
 *   - "canvas"        white            — default
 *   - "surfaceInverse" navy            — used sparingly, max once per page
 *
 * The accent (red) is never a section background. Red is a signal: dots,
 * underlines, hover fills.
 */
type SectionSize = "standard" | "hero";
type SectionTone = "canvas" | "surfaceInverse";

const sizeClasses: Record<SectionSize, string> = {
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
