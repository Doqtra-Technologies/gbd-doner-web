"use client";

import Image from "next/image";
import { formatGBP } from "@/lib/utils";
import type { MenuItem } from "@/domain/menu-item";

/**
 * MenuProductCard — Atis-style architectural card with strict flex-grow.
 *
 *   ┌────────────────────────┐
 *   │   aspect-square        │ ← locked 1:1, never stretches
 *   │       image            │
 *   ├────────────────────────┤
 *   │ p-6 lg:p-8 flex-grow   │ ← content block fills remaining height
 *   │ TITLE                   │
 *   │ description (line-3)    │
 *   │                         │ ← empty space absorbed here
 *   │ £11.50      CAL  PROT  │ ← mt-auto pinned to bottom
 *   └────────────────────────┘
 *
 * The flex-grow on the content block is mandatory — when the grid row
 * is taller than this card's natural content (because a sibling card
 * has a longer description), flex-grow absorbs the extra height and
 * mt-auto pushes the footer to the absolute bottom. Without flex-grow,
 * the empty space sits between description and footer.
 */
export function MenuProductCard({ item }: { item: MenuItem }) {
  return (
    <article className="flex flex-col h-full w-full bg-canvas border-b md:border-b-0 md:border-r border-border-hairline md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 group">
      <div className="w-full aspect-square overflow-hidden border-b border-border-hairline bg-text-primary/[0.03] p-6 lg:p-8">
        <div className="relative w-full h-full">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-contain drop-shadow-sm transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
          />
        </div>
      </div>

      <div className="p-6 lg:p-8 flex flex-col flex-grow">
        <h3 className="text-base lg:text-lg font-display font-bold uppercase text-text-primary mb-2 transition-all duration-300 ease-out group-hover:text-accent group-hover:translate-x-1">
          {item.title}
        </h3>
        <p className="text-sm font-body text-text-secondary leading-relaxed line-clamp-3">
          {item.description}
        </p>

        <div className="mt-auto pt-6 w-full flex justify-between items-end">
          {item.priceGBP !== null ? (
            <span className="text-lg font-bold text-text-primary">
              {formatGBP(item.priceGBP)}
            </span>
          ) : (
            <span />
          )}

          {item.nutrition ? (
            <div className="flex items-end gap-4">
              <MacroPair label="Cal" value={`${item.nutrition.calories}`} />
              <MacroPair label="Protein" value={`${item.nutrition.protein}g`} />
            </div>
          ) : (
            <button
              type="button"
              aria-label={`Add ${item.title}`}
              className="text-[10px] font-bold uppercase tracking-widest text-text-primary hover:text-accent transition-colors"
            >
              Add →
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function MacroPair({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-[9px] uppercase tracking-widest text-text-secondary">
        {label}
      </span>
      <span className="block text-[10px] font-bold text-text-primary">
        {value}
      </span>
    </div>
  );
}
