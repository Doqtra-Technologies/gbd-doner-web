import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The only logo lockup. Renders /logo.png exclusively.
 *
 * Sizes are tokenised; consumers do not pick width/height. Clear-space is
 * enforced by an outer padding equal to the cap-height of the wordmark.
 *
 * Variants:
 *   - "default"  — for light backgrounds (canvas)
 *   - "inverse"  — for dark surfaces. Reserved for future asset; currently
 *                  renders the same PNG. Track in brand backlog.
 */
type LogoSize = "sm" | "md" | "lg";
type LogoVariant = "default" | "inverse";

const sizeMap: Record<LogoSize, { width: number; height: number; className: string }> = {
  sm: { width: 132, height: 24, className: "h-6 w-auto" },
  md: { width: 176, height: 32, className: "h-8 w-auto" },
  lg: { width: 220, height: 40, className: "h-10 w-auto" },
};

export interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  href?: string | null;
  className?: string;
}

export function Logo({
  size = "md",
  variant: _variant = "default",
  href = "/",
  className,
}: LogoProps) {
  const spec = sizeMap[size];

  const image = (
    <Image
      src="/logo.png"
      alt="Great British Doner"
      width={spec.width}
      height={spec.height}
      priority
      className={cn(spec.className, "select-none")}
    />
  );

  if (!href) {
    return <span className={cn("inline-flex items-center", className)}>{image}</span>;
  }

  return (
    <Link
      href={href}
      aria-label="Great British Doner — Home"
      className={cn("inline-flex items-center", className)}
    >
      {image}
    </Link>
  );
}
