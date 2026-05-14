"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-500 ease-smooth",
        scrolled || open
          ? "bg-white border-b border-gbd-navy/10"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-shell items-center justify-between px-5 sm:px-8">
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="group flex h-10 w-10 -ml-2 items-center justify-center"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3 w-7">
            <span
              className={cn(
                "absolute left-0 top-0 block h-[1.5px] w-7 bg-gbd-navy transition-transform duration-300 ease-smooth",
                open && "top-1/2 -translate-y-1/2 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 bottom-0 block h-[1.5px] w-5 bg-gbd-navy transition-all duration-300 ease-smooth group-hover:w-7",
                open && "bottom-1/2 w-7 translate-y-1/2 -rotate-45",
              )}
            />
          </span>
        </button>

        <Link
          href="/"
          aria-label={`${siteConfig.name} — Home`}
          className="flex items-center"
        >
          <img
            src="/logo.svg"
            alt="Great British Doner"
            className="h-9 w-auto md:h-10"
            style={{ objectFit: "contain" }}
          />
          <span className="sr-only">{siteConfig.name}</span>
        </Link>

        <Link
          href="/locations"
          className={cn(
            "group inline-flex h-11 items-center justify-center rounded-full border border-gbd-navy bg-white px-6 font-display font-bold uppercase tracking-[0.14em] text-[11px] text-gbd-navy transition-all duration-300 ease-smooth",
            "hover:border-transparent hover:bg-gbd-red hover:text-white",
          )}
        >
          Order Now
        </Link>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-20 bottom-0 z-40 origin-top bg-white transition-all duration-500 ease-smooth",
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
                  className="font-display font-bold uppercase tracking-tighter text-5xl md:text-7xl text-gbd-navy hover:text-gbd-red transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-10 border-t border-gbd-navy/10 flex items-center justify-between">
            <span className="font-display font-bold uppercase tracking-[0.18em] text-xs text-gbd-navy/60">
              Est. London
            </span>
            <div className="flex items-center gap-6">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="font-display font-bold uppercase tracking-[0.14em] text-xs text-gbd-navy hover:text-gbd-red"
              >
                Instagram
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noreferrer"
                className="font-display font-bold uppercase tracking-[0.14em] text-xs text-gbd-navy hover:text-gbd-red"
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
