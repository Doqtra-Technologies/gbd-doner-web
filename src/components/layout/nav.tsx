"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
    <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#0F1E2D]/10">
      <div className="relative flex h-20 w-full items-center px-5 sm:px-8">
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="group relative z-10 flex h-10 w-10 -ml-2 items-center justify-center text-[#0F1E2D]"
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

        <Link
          href="/"
          aria-label={`${siteConfig.name} — Home`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-baseline gap-2 text-[#0F1E2D]"
        >
          <span className="font-display font-bold uppercase tracking-[0.06em] text-lg md:text-xl">
            GBD
          </span>
          <span className="font-display font-light uppercase tracking-[0.18em] text-[11px] md:text-xs opacity-80">
            • Great British
          </span>
        </Link>

        <Link
          href="/locations"
          className={cn(
            "relative z-10 ml-auto inline-flex h-11 items-center justify-center rounded-full bg-transparent border border-[#0F1E2D] px-6 font-display font-bold uppercase tracking-[0.14em] text-[11px] text-[#0F1E2D] transition-all duration-300 ease-smooth",
            "hover:bg-[#C94035] hover:border-[#C94035] hover:text-[#FFFFFF]",
          )}
        >
          Order Now
        </Link>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-20 bottom-0 z-40 origin-top bg-[#FFFFFF] transition-all duration-500 ease-smooth",
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
                  className="font-display font-bold uppercase tracking-tighter text-5xl md:text-7xl text-[#0F1E2D] hover:text-[#C94035] transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-10 border-t border-[#0F1E2D]/10 flex items-center justify-between">
            <span className="font-display font-bold uppercase tracking-[0.18em] text-xs text-[#0F1E2D]/60">
              Est. London
            </span>
            <div className="flex items-center gap-6">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="font-display font-bold uppercase tracking-[0.14em] text-xs text-[#0F1E2D] hover:text-[#C94035]"
              >
                Instagram
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noreferrer"
                className="font-display font-bold uppercase tracking-[0.14em] text-xs text-[#0F1E2D] hover:text-[#C94035]"
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
