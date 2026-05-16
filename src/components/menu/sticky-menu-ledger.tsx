"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Numeral } from "@/components/ui/numeral";
import { CTAButton } from "@/components/ui/cta-button";
import { formatGBP, cn } from "@/lib/utils";
import { DUR, EASE } from "@/brand/motion";
import type {
  MenuItem,
  MenuCategory,
  MenuCategorySlug,
} from "@/domain/menu-item";

type Filter = MenuCategorySlug | "all";

/**
 * StickyMenuLedger — editorial menu spread.
 *
 * 12-column section, top-bordered. The left column (`col-span-5`) is a
 * tall sticky anchor that holds a chapter numeral + a massive headline
 * + filter pills + a count. As the user scrolls through the menu items
 * on the right, the left ledger stays fixed against the navbar (top-20)
 * and reads as the title page of a chapter.
 *
 * The right column (`col-span-7`) is the asymmetrical scroll. Items
 * render in a 2-column grid where every second item carries `mt-20`,
 * dropping the right column's baseline below the left. This creates
 * the offset masonry rhythm without abandoning the grid.
 *
 * Cards: flat. No fill. Image (4/5, cinematic filter, hover drift) →
 * 1px hairline → title/price meta → description → CTA pill.
 */
export function StickyMenuLedger({
  items,
  categories,
  heading,
}: {
  items: MenuItem[];
  categories: MenuCategory[];
  heading?: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? items
        : items.filter((i) => i.category === filter),
    [filter, items],
  );

  return (
    <section className="border-t border-border-strong bg-canvas">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Sticky ledger — chapter title */}
        <aside className="lg:col-span-5 lg:border-r lg:border-border-strong">
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] flex flex-col justify-between p-10 sm:p-12 lg:p-16 xl:p-24 gap-12">
            <div>
              <Numeral index="02" label="The Menu" className="mb-10" />
              <h2 className="font-display font-bold uppercase tracking-display leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-[8vw] xl:text-8xl text-text-primary">
                <span className="block">Salad Bowls</span>
                <span className="block pl-[6%]">
                  <span className="text-text-disabled">&amp;</span> Power Plates
                  <span className="text-accent">.</span>
                </span>
              </h2>
            </div>

            {/* Filters + count anchor to the bottom of the ledger */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <FilterChip
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                >
                  All
                </FilterChip>
                {categories.map((c) => (
                  <FilterChip
                    key={c.slug}
                    active={filter === c.slug}
                    onClick={() => setFilter(c.slug)}
                  >
                    {c.label}
                  </FilterChip>
                ))}
              </div>
              <div className="flex items-center gap-3 text-text-secondary">
                <span aria-hidden className="h-px w-10 bg-text-secondary opacity-60" />
                <span className="font-display font-bold uppercase tracking-eyebrow text-[10px]">
                  {filtered.length}
                  {filtered.length === 1 ? " item" : " items"}
                  {heading && ` · ${heading}`}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Asymmetrical scroll */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16 p-10 sm:p-12 lg:p-16 xl:p-24">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: DUR.reveal,
                  delay: (i % 4) * 0.06,
                  ease: EASE.editorial,
                }}
                className={cn(
                  // Every second item (the right column on lg) drops by mt-20
                  // for the offset masonry baseline.
                  i % 2 === 1 && "sm:mt-20",
                )}
              >
                <LedgerCard item={item} />
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <p className="col-span-full font-body text-sm text-text-secondary py-12 text-center">
                Nothing in this category yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterChip({
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
        "inline-flex h-8 items-center rounded-full px-3 font-display font-bold uppercase tracking-button text-[10px] transition-colors duration-300 ease-smooth",
        active
          ? "bg-surface-inverse text-text-inverse border border-border-strong"
          : "bg-canvas text-text-primary border border-border-hairline hover:border-border-strong",
      )}
    >
      {children}
    </button>
  );
}

function LedgerCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex w-full flex-col">
      <Link href="/menu" aria-label={item.title} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.99)] transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      {/* 1px hairline separates the photograph from the meta */}
      <div className="mt-5 border-t border-border-hairline pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display font-bold uppercase tracking-display text-base md:text-lg text-text-primary">
            {item.title}
          </h3>
          <span className="font-display font-bold text-base text-text-primary shrink-0">
            {formatGBP(item.priceGBP)}
          </span>
        </div>

        <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary line-clamp-2">
          {item.description}
        </p>

        <CTAButton
          variant="primary"
          size="md"
          href="/menu"
          className="mt-6 w-full"
        >
          Add to Order
        </CTAButton>
      </div>
    </article>
  );
}
