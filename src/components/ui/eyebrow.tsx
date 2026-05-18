import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * Canonical eyebrow label. The only small uppercase typographic affordance
 * allowed in the product. Sits above headings or beside structural elements.
 *
 * Tone determines colour intent, not background.
 */
type EyebrowTone = "primary" | "secondary" | "accent" | "inverse";

const toneClasses: Record<EyebrowTone, string> = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  accent: "text-accent",
  inverse: "text-text-inverse",
};

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: EyebrowTone;
  as?: "span" | "div" | "p";
}

export function Eyebrow({
  tone = "secondary",
  as: Tag = "span",
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "font-display font-bold uppercase tracking-widest text-[10px]",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
