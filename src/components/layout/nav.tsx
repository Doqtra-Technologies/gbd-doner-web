"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { CTAButton } from "@/components/ui/cta-button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-canvas border-b border-border-hairline">
      <div className="relative flex h-20 w-full items-center px-5 sm:px-8">
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="group relative z-10 flex h-10 w-10 -ml-2 items-center justify-center text-text-primary"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-7">
            <span
              className={cn(
                "absolute left-0 top-0 block h-[2px] w-7 bg-current transition-transform duration-300 ease-smooth",
                open && "top-1/2 -translate-y-1/2 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 bottom-0 block h-[2px] w-7 bg-current transition-all duration-300 ease-smooth",
                open && "bottom-1/2 translate-y-1/2 -rotate-45",
              )}
            />
          </span>
        </button>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Logo size="md" />
        </div>

        <CTAButton variant="primary" size="md" href="/locations" className="ml-auto">
          Order Now
        </CTAButton>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-20 bottom-0 z-40 origin-top bg-canvas transition-all duration-300 ease-smooth",
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-2",
        )}
      >
        <nav className="mx-auto flex h-full w-full max-w-shell flex-col justify-between px-5 sm:px-8 py-16">
          <ul className="space-y-6">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display font-bold uppercase tracking-display text-5xl md:text-7xl text-text-primary hover:text-accent transition-colors duration-300 ease-smooth"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-10 border-t border-border-hairline flex items-center justify-between">
            <span className="font-display font-bold uppercase tracking-eyebrow text-xs text-text-secondary">
              Est. London
            </span>
            <div className="flex items-center gap-6">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="font-display font-bold uppercase tracking-button text-xs text-text-primary hover:text-accent transition-colors duration-300 ease-smooth"
              >
                Instagram
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noreferrer"
                className="font-display font-bold uppercase tracking-button text-xs text-text-primary hover:text-accent transition-colors duration-300 ease-smooth"
              >
                TikTok
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
