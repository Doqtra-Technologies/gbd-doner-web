"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { MenuCategory } from "@/domain/menu-item";

/**
 * StickyCategoryNav — frictionless ordering's primary affordance.
 *
 * A horizontally-scrollable pill bar that starts inline with the menu,
 * then becomes fixed to the navbar as you scroll past it.
 *
 * Pills are pure ALL/BOWLS/PLATES… labels. "All" snaps to the top of
 * the catalog; every other pill smooth-scrolls to its category anchor.
 */
export interface StickyCategoryNavProps {
  categories: MenuCategory[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}

export function StickyCategoryNav({
  categories,
  activeSlug,
  onSelect,
}: StickyCategoryNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const originalOffsetRef = useRef<number | null>(null);

  useEffect(() => {
    if (!navRef.current) return;

    // Store the original top offset position once
    if (originalOffsetRef.current === null) {
      originalOffsetRef.current = navRef.current.offsetTop;
    }

    const handleScroll = () => {
      if (!navRef.current || originalOffsetRef.current === null) return;

      const navbarHeight = 80; // Height of navbar (h-20 = 80px)
      const scrollPosition = window.scrollY;
      
      // Calculate when the filter should become fixed
      // It becomes fixed when we scroll past its original position minus navbar height
      const shouldBeFixed = scrollPosition > (originalOffsetRef.current - navbarHeight);
      
      setIsFixed(shouldBeFixed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Call once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Menu categories"
      className={cn(
        "w-full bg-canvas border-b border-border-hairline transition-all duration-300 ease-smooth",
        isFixed && "fixed top-20 left-0 right-0 z-40"
      )}
    >
      <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-4 px-6 lg:px-12">
        <Pill
          active={activeSlug === "all"}
          onClick={() => onSelect("all")}
        >
          All
        </Pill>
        {categories.map((c) => (
          <Pill
            key={c.slug}
            active={activeSlug === c.slug}
            onClick={() => onSelect(c.slug)}
          >
            {c.label}
          </Pill>
        ))}
      </div>
    </nav>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 inline-flex items-center rounded-full border px-4 py-1.5 font-body uppercase tracking-eyebrow text-xs transition-colors duration-300 ease-smooth",
        active
          ? "bg-surface-inverse text-text-inverse border-border-strong"
          : "bg-canvas text-text-primary border-border-hairline hover:border-border-strong",
      )}
    >
      {children}
    </button>
  );
}
