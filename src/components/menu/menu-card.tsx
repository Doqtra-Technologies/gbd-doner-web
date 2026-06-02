"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type { MenuItem } from "@/domain/menu-item";

/**
 * Clean White Matrix menu — gapless white grid, RED kinetic hover, with the
 * hover-reveal accordion (description + dual CTAs) restored.
 *
 * Layout: the grid draws only its top + left edge; each card draws its own
 * right + bottom edge, forming one continuous hairline matrix with no gaps.
 * The image floats in a fixed-height canvas; the title + accordion are
 * pushed to the bottom (mt-auto).
 *
 * Hover: white → bg-accent (GBD red). Slashes, title, and description invert
 * to white; the description + CTAs slide in via the grid-rows-[0fr]→[1fr]
 * trick (inner mask MUST keep overflow-hidden for the collapse to hide).
 *
 * GBD token usage (no raw brand hex):
 *   bg-white / bg-accent     — default + red hover backgrounds
 *   text-accent              — red slashes / primary CTA text
 *   text-surface-inverse     — navy title (readable on white) + CTA hover bg
 *   border-border-hairline   — grid lines
 *
 * Spec → theme translation (utility absent from this Tailwind config):
 *   duration-400  → duration-[400ms]  (no `400` step in this theme's
 *                                       transitionDuration scale)
 */

/** PHASE 1 — Gapless white grid. Draws top + left edge only, full-bleed. */
export function MenuWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full border-l border-t border-border-hairline bg-white">
      {children}
    </div>
  );
}

export interface MenuCardProps {
  item: MenuItem;
  onOrder?: (item: MenuItem) => void;
  onMoreInfo?: (item: MenuItem) => void;
}

/** PHASE 2–6 — Red-hover card with restored accordion reveal. */
export function MenuCard({ item, onOrder, onMoreInfo }: MenuCardProps) {
  return (
    <article className="relative flex flex-col items-center w-full h-full border-r border-b border-border-hairline bg-white hover:bg-accent transition-colors duration-[400ms] p-6 md:p-8 group cursor-pointer overflow-hidden z-0 hover:z-10">
      {/* PHASE 3 — Top-left diagonal accent: red → white on hover */}
      <div className="absolute top-6 left-6 text-accent group-hover:text-white transition-colors duration-[400ms] opacity-80 z-20">
        <svg
          width="40"
          height="20"
          viewBox="0 0 40 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 20L15 0H17L7 20H5ZM12 20L22 0H24L14 20H12ZM19 20L29 0H31L21 20H19ZM26 20L36 0H38L28 20H26ZM33 20L43 0H45L35 20H33Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* PHASE 4 — Floating image canvas (fixed proportions) */}
      <div className="relative w-full h-40 md:h-48 flex items-center justify-center mt-6 mb-4">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-[400ms]"
        />
      </div>

      {/* PHASE 5 — Bottom-anchored typography + restored accordion */}
      <div className="flex flex-col items-center text-center w-full mt-auto">
        <h3 className="text-[14px] md:text-[15px] font-extrabold font-display uppercase text-surface-inverse group-hover:text-white transition-colors duration-[400ms] line-clamp-2">
          {item.title}
        </h3>

        {/* Accordion mask — grid-rows-[0fr] → [1fr] drives the slide */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-[400ms] w-full">
          {/* Inner mask — overflow-hidden is required for the collapse */}
          <div className="overflow-hidden flex flex-col items-center w-full">
            <p className="pt-3 text-[12px] font-body text-white/90 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] line-clamp-2">
              {item.description}
            </p>

            {/* PHASE 6 — CTAs styled for the red hover background */}
            <div className="flex flex-row items-center justify-center gap-2 w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] pb-2">
              <button
                type="button"
                onClick={() => onOrder?.(item)}
                className="flex-1 bg-white text-accent text-[10px] font-bold tracking-widest uppercase py-2.5 px-2 hover:bg-surface-inverse hover:text-white transition-colors"
              >
                Order Now
              </button>
              <button
                type="button"
                onClick={() => onMoreInfo?.(item)}
                className="flex-1 bg-transparent border border-white text-white text-[10px] font-bold tracking-widest uppercase py-2.5 px-2 hover:bg-white hover:text-accent transition-colors"
              >
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
