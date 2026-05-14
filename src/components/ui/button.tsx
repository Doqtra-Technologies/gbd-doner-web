import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const baseStyles =
  "inline-flex items-center justify-center font-display font-bold uppercase tracking-[0.12em] transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gbd-red focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-gbd-red text-white hover:bg-gbd-red-dark active:scale-[0.98]",
  secondary:
    "bg-gbd-navy text-white hover:bg-gbd-navy-soft active:scale-[0.98]",
  ghost:
    "bg-transparent text-gbd-navy hover:text-gbd-red border border-gbd-navy/15 hover:border-gbd-red",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-xs",
  lg: "h-14 px-8 text-sm",
};

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonBaseProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  external,
  children,
  ...props
}: ButtonBaseProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "className" | "href" | "children">) {
  const classes = cn(baseStyles, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  }
  return (
    <Link className={classes} href={href} {...props}>
      {children}
    </Link>
  );
}
