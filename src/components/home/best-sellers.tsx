"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatGBP, cn } from "@/lib/utils";
import { DUR, EASE } from "@/brand/motion";
import type { MenuItem } from "@/domain/menu-item";

/**
 * HomeLineup — architectural-grid menu preview.
 *
 * Edge-to-edge. No Container, no max-w. The section physically spans
 * the viewport. Internal structure is drawn with 1px hairlines, not
 * gaps:
 *
 *   ╔══════════════════════════════════════════════════════════════╗
 *   ║                Header row · border-y                          ║
 *   ║  ┌──────────────────────────────┬─────────────────────────┐ ║
 *   ║  │ 02 — THE LINEUP              │ Real ingredients…       │ ║
 *   ║  │ SALAD BOWLS                  │                         │ ║
 *   ║  │   & POWER PLATES.            │ FULL MENU ─────         │ ║
 *   ║  │  (compressed ink brick)      │                         │ ║
 *   ║  └──────────────────────────────┴─────────────────────────┘ ║
 *   ║  ┌────────────┬────────────┬────────────┐                   ║
 *   ║  │  IMG       │  IMG       │  IMG       │  product grid     ║
 *   ║  │  meta      │  meta      │  meta      │  border-r/b        ║
 *   ║  │  Cal Pro…  │  Cal Pro…  │  Cal Pro…  │  hairlines         ║
 *   ║  └────────────┴────────────┴────────────┘                   ║
 *   ╚══════════════════════════════════════════════════════════════╝
 *
 * Three products max — engineered for `grid-cols-3` so the
 * `[&:nth-child(3n)]:border-r-0` rule cancels the rightmost border
 * cleanly. The grid touches the viewport's right edge directly.
 */
export function BestSellers({ items }: { items: MenuItem[] }) {
  const lineup = items.slice(0, 3);

  return (
    <section className="w-full max-w-none bg-canvas">
      {/* Header row */}
      <div className="grid grid-cols-12 border-y border-border-hairline">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.reveal, ease: EASE.editorial }}
          className="col-span-12 md:col-span-8 md:border-r md:border-border-hairline p-6 sm:p-8 lg:p-12"
        >
          <span className="block font-display font-bold uppercase tracking-eyebrow text-[11px] text-accent">
            02 — The Lineup
          </span>
          <h2 className="mt-6 font-display font-bold uppercase tracking-tight leading-none text-text-primary text-3xl lg:text-4xl">
            <span className="block">Salad Bowls</span>
            <span className="block">
              <span className="text-text-disabled">&amp;</span> Power Plates
              <span className="text-accent">.</span>
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: DUR.reveal,
            delay: 0.1,
            ease: EASE.editorial,
          }}
          className="col-span-12 md:col-span-4 p-6 sm:p-8 lg:p-12 flex flex-col justify-between gap-8"
        >
          <p className="font-body text-sm md:text-base leading-relaxed text-text-secondary opacity-80 max-w-md">
            Real ingredients. Real protein. Built for runners, builders,
            and everyone in between.
          </p>
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 w-max font-display font-bold uppercase tracking-button text-xs text-text-primary border-b border-border-strong pb-1 transition-colors duration-300 ease-smooth hover:text-accent hover:border-accent"
          >
            Full Menu
            <span
              aria-hidden
              className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Product grid — each cell carries its own hairlines.
          The rightmost column's right border is cancelled so the grid
          physically touches the viewport's right edge. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-border-hairline">
        {lineup.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: DUR.reveal,
              delay: i * 0.08,
              ease: EASE.editorial,
            }}
            className="border-r border-b border-border-hairline last:border-b-0 md:[&:nth-child(3n)]:border-r-0 md:[&:nth-last-child(-n+3)]:border-b-0"
          >
            <LineupCell item={item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LineupCell({ item }: { item: MenuItem }) {
  return (
    <article className="group flex h-full flex-col">
      <Link href="/menu" aria-label={item.title} className="block">
        {/* Image flushes the cell's top/left/right edges */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.99)] transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      {/* Metadata block — p-6 inside the cell */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display font-bold uppercase tracking-tight leading-tight text-lg lg:text-xl text-text-primary">
            {item.title}
          </h3>
          <span className="font-display font-bold text-lg lg:text-xl text-text-primary shrink-0">
            {formatGBP(item.priceGBP)}
          </span>
        </div>

        <p className="mt-1 font-body text-sm leading-relaxed text-text-secondary opacity-70 line-clamp-2 flex-1">
          {item.description}
        </p>

        {item.nutrition && (
          <NutritionLedger
            cells={[
              ["Cal", `${item.nutrition.calories}`],
              ["Protein", `${item.nutrition.protein}g`],
              ["Carbs", `${item.nutrition.carbs}g`],
              ["Fat", `${item.nutrition.fat}g`],
            ]}
          />
        )}
      </div>
    </article>
  );
}

function NutritionLedger({ cells }: { cells: ReadonlyArray<readonly [string, string]> }) {
  return (
    <dl className="mt-5 -mx-6 -mb-6 grid grid-cols-4 border-t border-border-hairline">
      {cells.map(([label, value], i) => (
        <div
          key={label}
          className={cn(
            "flex flex-col gap-1 p-3",
            i < cells.length - 1 && "border-r border-border-hairline",
          )}
        >
          <dt className="font-body uppercase tracking-widest text-[10px] text-text-primary opacity-60">
            {label}
          </dt>
          <dd className="font-display font-bold text-xs text-text-primary">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
