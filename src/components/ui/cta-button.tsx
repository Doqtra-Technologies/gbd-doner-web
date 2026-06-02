"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

/**
 * The only button system in the product.
 *
 * Two variants:
 *
 *   primary    — pill, transparent, 1px navy border, navy text.
 *                Hover fills the accent (GBD Red) with white text.
 *                Used for: Order Now, Submit, View All, primary CTAs.
 *
 *   tertiary   — inline link with a 1px navy underline that animates from
 *                left to right under the cursor on hover. Text shifts
 *                navy → red.
 *                Used for: "See the Menu", "Read article", inline links.
 *
 * Sizes:
 *   md — h-11 (default, used in nav / inline / cards)
 *   lg — h-14 (used in hero / page-level primary CTAs)
 *
 * Hover semantics are unified: every primary button moves *toward* the
 * accent on hover. No exceptions.
 */
type Variant = "primary" | "tertiary";
type Size = "md" | "lg";

const primaryBase =
  "group/cta-primary relative inline-flex items-center justify-center select-none rounded-full border border-transparent bg-accent font-display font-bold uppercase tracking-button text-text-inverse transition-colors duration-300 ease-smooth hover:bg-accent/90 active:translate-y-px disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const primarySizes: Record<Size, string> = {
  md: "h-11 px-7 text-[11px]",
  lg: "h-14 px-12 text-sm",
};

const tertiaryBase =
  "group/cta inline-flex items-center gap-2 font-display font-bold uppercase tracking-button text-xs text-text-primary transition-opacity duration-300 ease-out opacity-100 hover:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface AsButton
  extends BaseProps,
    Omit<ComponentProps<"button">, "className" | "children"> {
  href?: undefined;
  external?: undefined;
}

interface AsLink
  extends BaseProps,
    Omit<ComponentProps<typeof Link>, "className" | "href" | "children"> {
  href: string;
  external?: boolean;
}

type CTAButtonProps = AsButton | AsLink;

export function CTAButton(props: CTAButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;

  const classes =
    variant === "primary"
      ? cn(primaryBase, primarySizes[size], className)
      : cn(tertiaryBase, className);

  const content =
    variant === "tertiary" ? (
      <>
        <span className="relative">
          {children}
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-300 ease-smooth group-hover/cta:origin-left group-hover/cta:scale-x-100"
          />
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full origin-left bg-border-strong transition-transform duration-300 ease-smooth group-hover/cta:origin-right group-hover/cta:scale-x-0"
          />
        </span>
      </>
    ) : (
      children
    );

  if ("href" in rest && rest.href !== undefined) {
    const { href, external, ...linkRest } = rest as AsLink;
    if (external) {
      return (
        <a
          className={classes}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
        >
          {content}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} {...linkRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentProps<"button">)}>
      {content}
    </button>
  );
}
