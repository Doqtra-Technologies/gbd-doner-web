import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * Canonical display heading. Three levels, one tracking, one weight, one
 * casing. Every heading in the product uses this.
 *
 * Level 1 — page hero
 * Level 2 — section heading
 * Level 3 — card / sub-section heading
 */
type HeadingLevel = 1 | 2 | 3;
type HeadingTone = "primary" | "inverse" | "accent";

const sizeClasses: Record<HeadingLevel, string> = {
  1: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9]",
  2: "text-3xl sm:text-4xl md:text-5xl leading-[0.95]",
  3: "text-xl md:text-2xl leading-[1.05]",
};

const toneClasses: Record<HeadingTone, string> = {
  primary: "text-text-primary",
  inverse: "text-text-inverse",
  accent: "text-accent",
};

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  tone?: HeadingTone;
  as?: "h1" | "h2" | "h3";
}

export function Heading({
  level = 2,
  tone = "primary",
  as,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = (as ?? (`h${level}` as "h1" | "h2" | "h3")) as "h1" | "h2" | "h3";
  const classes = cn(
    "font-display font-bold uppercase tracking-display",
    sizeClasses[level],
    toneClasses[tone],
    className,
  );
  if (Tag === "h1") return <h1 className={classes} {...props}>{children}</h1>;
  if (Tag === "h2") return <h2 className={classes} {...props}>{children}</h2>;
  return <h3 className={classes} {...props}>{children}</h3>;
}
