"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { CTAButton } from "@/components/ui/cta-button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

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

  // Show logo after scrolling past the hero (approximately 100vh)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Background fades in on all pages based on scroll
      setShowBackground(scrollPosition > window.innerHeight * 0.8);
      
      // Logo fades in/out only on homepage based on scroll
      if (isHomepage) {
        setShowLogo(scrollPosition > window.innerHeight * 0.8);
      }
    };

    // On non-homepage pages, always show logo but still apply scroll-based background fade
    if (!isHomepage) {
      setShowLogo(true);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  // Cinematic navbar: white type sits on dark glass (scrolled) or over the
  // dark hero (homepage top). Dark type only over a light page at the top.
  const onDark = showBackground || isHomepage;

  return (
    <>
      <header className={cn(
        "fixed left-0 right-0 top-0 z-[100] border-b transition-[background-color,backdrop-filter,border-color] duration-500 ease-smooth",
        showBackground
          ? "bg-[rgba(15,30,45,0.72)] backdrop-blur-[18px] border-white/[0.06]"
          : "bg-transparent border-transparent"
      )}>
        <div className="relative flex h-20 w-full items-center px-5 sm:px-8">
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "group relative z-10 flex h-10 w-10 -ml-2 items-center justify-center transition-colors duration-700 ease-smooth",
              onDark ? "text-white" : "text-text-primary"
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

          <div className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-smooth",
            showLogo ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            <Logo size="md" variant={onDark ? "inverse" : "default"} />
          </div>

          <CTAButton variant="primary" size="md" href="/order-now" className="ml-auto">
            Order Now
          </CTAButton>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[110] bg-surface-inverse/40 transition-opacity duration-300 ease-smooth",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed inset-0 z-[120] bg-canvas/95 backdrop-blur-xl transition-all duration-300 ease-smooth flex flex-col",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="relative flex h-20 w-full flex-none items-center px-5 sm:px-8">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="group relative z-10 flex h-10 w-10 -ml-2 items-center justify-center text-text-primary"
          >
            <span className="sr-only">Close</span>
            <span className="relative block h-3.5 w-7">
              <span className="absolute left-0 top-1/2 block h-[2px] w-7 -translate-y-1/2 rotate-45 bg-current transition-transform duration-300 ease-smooth" />
              <span className="absolute left-0 top-1/2 block h-[2px] w-7 -translate-y-1/2 -rotate-45 bg-current transition-transform duration-300 ease-smooth" />
            </span>
          </button>
          <div className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ease-smooth",
            showLogo ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
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
                  className="font-display font-bold uppercase tracking-display text-4xl md:text-5xl text-text-primary hover:text-accent transition-colors duration-300 ease-smooth block"
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
    </>
  );
}
