"use client";

import { forwardRef } from "react";
import { MenuProductCard } from "@/components/menu/menu-product-card";
import { cn } from "@/lib/utils";
import type { MenuCategory, MenuItem } from "@/domain/menu-item";

/**
 * CategorySection — one chapter of the menu.
 *
 * Inline header (Tier-3 typography) + 4-column dense product grid.
 *
 * Header row:
 *   flex items-baseline gap-4   |   tight pt-16 pb-6 padding
 *   "SHAKES & SMOOTHIES"        |   "Short muted descriptor."
 *
 * Product grid:
 *   grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0
 *   Cells carry right + bottom hairlines. The rightmost column's right
 *   border is cancelled; the last row's bottom border is cancelled. The
 *   grid touches the viewport edges.
 *
 * The section's anchor id matches the category slug so the
 * StickyCategoryNav pills can smooth-scroll to it.
 */
export interface CategorySectionProps {
  category: MenuCategory;
  items: MenuItem[];
}

export const CategorySection = forwardRef<HTMLElement, CategorySectionProps>(
  function CategorySection({ category, items }, ref) {
    return (
      <section
        ref={ref}
        id={category.slug}
        data-category-slug={category.slug}
        // Scroll-margin compensates for the sticky navbar + pill bar so
        // smooth-scroll lands the section header below them, not under them.
        className="scroll-mt-[10rem]"
      >
        {/* Header row */}
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4 mb-6">
          <h2 className="font-display font-bold uppercase tracking-display leading-none text-xl sm:text-2xl md:text-[28px] text-text-primary">
            {category.label}
          </h2>
          {category.description && (
            <p className="font-display font-semibold text-[10px] sm:text-[11px] md:text-xs text-text-primary uppercase tracking-eyebrow opacity-80">
              {category.description}
            </p>
          )}
        </div>

        {/* Spaced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {items.map((item) => (
            <div key={item.id}>
              <MenuProductCard item={item} />
            </div>
          ))}
        </div>
      </section>
    );
  },
);
