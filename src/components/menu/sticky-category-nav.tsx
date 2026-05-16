"use client";

import { cn } from "@/lib/utils";
import type { MenuCategory } from "@/domain/menu-item";

/**
 * StickyCategoryNav — frictionless ordering's primary affordance.
 *
 * A horizontally-scrollable pill bar pinned beneath the global navbar
 * (`sticky top-20`). As the user scrolls through the categories below,
 * the active pill highlights and the bar stays in reach — no return to
 * the top, no menu jumping.
 *
 * Pills are pure ALL/BOWLS/PLATES… labels. "All" snaps to the top of
 * the catalog; every other pill smooth-scrolls to its category anchor
 * (`#bowls`, `#plates`, …). Active state inverts to navy fill.
 *
 * The bar has a `backdrop-blur-md` over a 90%-opacity canvas so it
 * floats over imagery without erasing the page underneath.
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
  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-20 z-40 w-full bg-canvas/90 backdrop-blur-md border-b border-border-hairline"
    >
      <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-4 px-5 sm:px-8 lg:px-12">
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
