"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { CTAButton } from "@/components/ui/cta-button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isOverDarkBg, setIsOverDarkBg] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Collision radar: observe dark-themed sections intersecting the nav zone.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const darkSections = document.querySelectorAll('[data-theme="dark"]');
    const observer = new IntersectionObserver(
      (entries) => {
        const isDark = entries.some((entry) => entry.isIntersecting);
        setIsOverDarkBg(isDark);
      },
      {
        rootMargin: "0px 0px -90% 0px",
      },
    );

    darkSections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const navSurfaceClass = !isScrolled
    ? "bg-transparent border-transparent"
    : isOverDarkBg
      ? "bg-surface-inverse/80 backdrop-blur-md border-b border-white/5"
      : "bg-white/80 backdrop-blur-md border-b border-border-hairline shadow-sm";
  const navInkClass = isOverDarkBg
    ? "text-white fill-white"
    : "text-surface-inverse fill-surface-inverse";
  const logoVariant = isOverDarkBg ? "inverse" : "default";
  const orderButtonClass = isOverDarkBg
    ? "bg-transparent border-white text-white hover:bg-white hover:text-surface-inverse hover:border-white"
    : "bg-surface-inverse border-transparent text-white hover:bg-accent hover:border-transparent";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[9999] h-16 lg:h-20 flex items-center justify-between px-6 lg:px-12 transition-all duration-500",
          navSurfaceClass,
        )}
      >
        <div className="relative flex h-full w-full items-center justify-between">
          <button
            type="button"
            aria-label="Toggle Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "group relative z-10 flex h-10 w-10 -ml-2 items-center justify-center transition-colors duration-500 ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
              navInkClass,
            )}
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
            <Logo size="md" variant={logoVariant} />
          </div>

          <CTAButton
            variant="primary"
            size="md"
            href="/order-now"
            className={cn(
              "ml-auto transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
              orderButtonClass,
            )}
          >
            Order Now
          </CTAButton>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[10010] bg-surface-inverse/40 transition-opacity duration-300 ease-smooth",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed inset-0 z-[10020] bg-white backdrop-blur-xl transition-all duration-300 ease-smooth flex flex-col",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="relative flex h-20 w-full flex-none items-center px-5 sm:px-8">
          <button
            type="button"
            aria-label="Close Menu"
            onClick={() => setOpen(false)}
            className="group relative z-10 flex h-10 w-10 -ml-2 items-center justify-center text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span className="sr-only">Close</span>
            <span className="relative block h-3.5 w-7">
              <span className="absolute left-0 top-1/2 block h-[2px] w-7 -translate-y-1/2 rotate-45 bg-current transition-transform duration-300 ease-smooth" />
              <span className="absolute left-0 top-1/2 block h-[2px] w-7 -translate-y-1/2 -rotate-45 bg-current transition-transform duration-300 ease-smooth" />
            </span>
          </button>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo size="md" />
          </div>
        </div>

        <nav className="mx-auto flex flex-1 w-full max-w-shell flex-col justify-between px-5 py-12 sm:px-8 overflow-y-auto">
          <ul className="space-y-6">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display font-bold uppercase tracking-display text-4xl md:text-5xl text-text-primary transition-opacity duration-300 ease-out opacity-100 hover:opacity-50 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-10 border-t border-border-hairline flex items-center justify-between mt-8 flex-none">
            <span className="font-display font-bold uppercase tracking-eyebrow text-xs text-text-secondary">
              Est. London
            </span>
            <div className="flex items-center gap-6">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="font-display font-bold uppercase tracking-button text-xs text-text-primary transition-opacity duration-300 ease-out opacity-100 hover:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Instagram
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noreferrer"
                className="font-display font-bold uppercase tracking-button text-xs text-text-primary transition-opacity duration-300 ease-out opacity-100 hover:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                TikTok
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
