"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatGBP } from "@/lib/utils";
import type { MenuItem } from "@/domain/menu-item";

/**
 * MenuProductCard — the high-density ordering atom.
 *
 * Sits as a cell inside the 4-column matrix. Sharp corners. No card
 * fill. Each cell contributes its right + bottom hairlines to the
 * surrounding grid; the orchestrator cancels the edge borders.
 *
 * Composition:
 *   ┌──────────────────────┐
 *   │   aspect-square      │
 *   │       image          │
 *   │                  (+)│ ← absolute add button bottom-right
 *   ├──────────────────────┤
 *   │ p-4                   │
 *   │ TITLE                 │
 *   │ description (2-line)  │
 *   │                       │
 *   │ (V) (GF)        £11.5│ ← badges + price (auto bottom)
 *   │ Kcal 620 · P 42g ...  │ ← macros eyebrow
 *   └──────────────────────┘
 *
 * The `+` button is the conversion moment — it's a 32×32 circular
 * affordance overlaying the photograph at `bottom-3 right-3`. Hover
 * fills it with brand red. The whole card has no link-on-image — only
 * the title is clickable, so the `+` doesn't fight a wrapping anchor.
 */
export function MenuProductCard({ item }: { item: MenuItem }) {
  return (
    <article className="relative flex h-full flex-col group cursor-pointer border-r border-b border-border-hairline p-2 sm:p-3">
      {/* Image cell */}
      <div className="relative w-full aspect-square md:aspect-[4/5] rounded-none overflow-hidden mb-3 bg-canvas">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="w-full h-full object-cover rounded-none transition-transform duration-700 group-hover:scale-[1.03]"
        />

        {/* NEW badge */}
        <div className="absolute top-3 left-3 bg-canvas border border-border-strong text-text-primary font-display font-bold text-[10px] tracking-eyebrow uppercase px-2 py-0.5 rounded-none z-10">
          NEW!
        </div>

        {/* Quick-add affordance */}
        <button
          type="button"
          aria-label={`Add ${item.title} to order`}
          className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-canvas border border-border-strong text-text-primary transition-colors duration-300 ease-smooth hover:bg-accent hover:border-accent hover:text-text-inverse z-10"
        >
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* Data block */}
      <div className="flex flex-col flex-grow px-1">
        <h3 className="font-display font-bold uppercase tracking-display leading-tight text-base sm:text-lg text-text-primary">
          {item.title} <span className="font-normal opacity-80 text-sm">[NEW]</span>
        </h3>

        <p className="mt-1 font-body text-[13px] leading-snug text-text-primary opacity-80 line-clamp-2">
          {item.description}
        </p>

        {/* Footer — pinned to bottom, inline layout */}
        <div className="mt-auto pt-3 flex items-center flex-wrap gap-x-2 gap-y-1">
          {/* Dietary Flags */}
          <div className="flex gap-1">
            {item.dietaryFlags?.map((flag) => (
              <DietaryBadge key={flag} flag={flag} />
            ))}
          </div>

          {/* Nutrition & Price */}
          {item.nutrition && (
            <div className="flex items-center flex-wrap gap-x-1.5 font-body text-[11px] text-text-primary opacity-90">
              <span>Kcal <span className="font-bold">{item.nutrition.calories}</span></span>
              <span>Protein <span className="font-bold">{item.nutrition.protein}g</span></span>
              <span>Carbs <span className="font-bold">{item.nutrition.carbs}g</span></span>
              <span>Fat <span className="font-bold">{item.nutrition.fat}g</span></span>
            </div>
          )}

          {item.priceGBP !== null && (
            <div className="ml-auto font-display font-bold text-sm text-text-primary">
              {formatGBP(item.priceGBP)}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function DietaryBadge({ flag }: { flag: string }) {
  return (
    <span
      title={dietaryLabel(flag)}
      className={cn(
        "inline-flex h-4 w-4 items-center justify-center rounded-none border border-border-strong",
        "font-display font-bold uppercase text-[8px] tracking-eyebrow text-text-primary",
      )}
    >
      {flag}
    </span>
  );
}

function dietaryLabel(flag: string): string {
  switch (flag) {
    case "V":
      return "Vegetarian";
    case "VG":
      return "Vegan";
    case "GF":
      return "Gluten-free";
    case "DF":
      return "Dairy-free";
    case "N":
      return "Contains nuts";
    default:
      return flag;
  }
}
