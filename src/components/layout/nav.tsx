"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { CTAButton } from "@/components/ui/cta-button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { GlobalSettings } from "@/domain/site-settings";

function isPathnameDarkBgByDefault(path: string): boolean {
  return (
    path === "/" ||
    path === "/our-story" ||
    path === "/menu" ||
    path === "/catering" ||
    path === "/locations" ||
    path.startsWith("/locations/") ||
    path === "/feed"
  );
}

export function Nav({ settings }: { settings?: GlobalSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isOverDarkBg, setIsOverDarkBg] = useState(() =>
    isPathnameDarkBgByDefault(pathname)
  );
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
    setIsOverDarkBg(isPathnameDarkBgByDefault(pathname));
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const intersectionStates = new Map<Element, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersectionStates.set(entry.target, entry.isIntersecting);
        });
        const isDark = Array.from(intersectionStates.values()).some(Boolean);
        setIsOverDarkBg(isDark);
      },
      {
        rootMargin: "0px 0px -90% 0px",
      },
    );

    const observedElements = new Set<Element>();

    const updateObservedElements = () => {
      const darkSections = document.querySelectorAll('[data-theme="dark"]');
      let initialDark = false;

      darkSections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom > 0) {
          initialDark = true;
        }

        if (!observedElements.has(sec)) {
          observer.observe(sec);
          observedElements.add(sec);
        }
      });

      if (initialDark) {
        setIsOverDarkBg(true);
      }
    };

    updateObservedElements();

    const mutationObserver = new MutationObserver(() => {
      updateObservedElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      mutationObserver.disconnect();
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
              "group relative z-10 flex h-11 w-11 -ml-2 items-center justify-center transition-colors duration-500 ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
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

          <div className="hidden lg:flex ml-auto">
            <CTAButton
              variant="primary"
              size="md"
              href="/order-now"
              className={cn(
                "transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
                orderButtonClass,
              )}
            >
              Order Now
            </CTAButton>
          </div>
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
          "fixed inset-0 z-[10020] bg-white/90 backdrop-blur-2xl transition-all duration-300 ease-smooth flex flex-col",
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
            className="group relative z-10 flex h-11 w-11 -ml-2 items-center justify-center text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
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
            {siteConfig.nav.map((item) => {
              const isDownload = "download" in item && (item as any).download;
              return (
                <li key={item.href}>
                  {isDownload ? (
                    <a
                      href={item.href}
                      download
                      onClick={() => setOpen(false)}
                      className="font-display font-bold uppercase tracking-display text-4xl md:text-5xl text-text-primary transition-opacity duration-300 ease-out opacity-100 hover:opacity-50 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-display font-bold uppercase tracking-display text-4xl md:text-5xl text-text-primary transition-opacity duration-300 ease-out opacity-100 hover:opacity-50 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="pt-10 border-t border-border-hairline flex items-center justify-between mt-8 flex-none">
            <span className="font-display font-bold uppercase tracking-eyebrow text-xs text-text-secondary">
              Est. London
            </span>
            <div className="flex items-center gap-6">
              <a
                href={settings?.socialInstagram || siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="font-display font-bold uppercase tracking-button text-xs text-text-primary transition-opacity duration-300 ease-out opacity-100 hover:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Instagram
              </a>
              <a
                href={settings?.socialTiktok || siteConfig.social.tiktok}
                target="_blank"
                rel="noreferrer"
                className="font-display font-bold uppercase tracking-button text-xs text-text-primary transition-opacity duration-300 ease-out opacity-100 hover:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                TikTok
              </a>
              <a
                href={settings?.socialFacebook || siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="font-display font-bold uppercase tracking-button text-xs text-text-primary transition-opacity duration-300 ease-out opacity-100 hover:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Facebook
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Floating Action Button (FAB) */}
      <div
        className={cn(
          "fixed bottom-6 left-1/2 z-[9990] -translate-x-1/2 transition-all duration-500 md:hidden",
          isScrolled && !open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        )}
      >
        <Link
          href="/order-now"
          className="flex h-14 items-center justify-center rounded-full bg-surface-inverse/85 px-10 font-display text-sm font-bold uppercase tracking-button text-white shadow-[0_16px_40px_-12px_rgba(10,18,28,0.8)] backdrop-blur-xl transition-[transform,background-color] active:scale-95 hover:bg-surface-inverse"
        >
          Order Now
        </Link>
      </div>
    </>
  );
}
