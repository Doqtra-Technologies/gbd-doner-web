"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CTAButton } from "@/components/ui/cta-button";
import { Heading } from "@/components/ui/heading";
import { Numeral } from "@/components/ui/numeral";
import { formatGBP } from "@/lib/utils";
import { DUR, EASE } from "@/brand/motion";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/domain/menu-item";

/**
 * The Lineup — editorial menu intro.
 *
 * Two-zone section:
 *
 *  1. Header zone — `02 ── THE LINEUP` numeral + oversized split-line
 *     headline indented at column 2 of the 12-col grid (`col-start-2`).
 *     The header lives inside the standard Container so the type column
 *     respects the page rhythm.
 *
 *  2. Lineup zone — escapes the Container to a full-viewport 12-col grid
 *     so the third card can bleed to the right edge of the screen
 *     (visual signal that the menu continues beyond the frame). Cards
 *     have asymmetric column spans and one offset baseline:
 *
 *       Item 1  col-span-4  baseline
 *       Item 2  col-span-3  baseline + mt-24 (drops below the others)
 *       Item 3  col-span-5  ends at the screen's right edge
 *       Item 4  col-span-4  optional — falls in if items.length >= 4
 *
 * Each item is a flat editorial card: no fill, no shadow, hairline
 * separating the nutrition row from the meta row. Title left, price
 * right. Hover: tertiary-style underline slide under the title; image
 * gets a slow 1.02 drift.
 *
 * Top of the section is sealed with a `border-t border-border-hairline`
 * so it reads as a new spread.
 */
export function BestSellers({ items }: { items: MenuItem[] }) {
  const lineup = items.slice(0, 4);

  // Editorial column spans + offset rhythm. The third card extends to
  // span 5 so it visually reaches the right edge of the viewport grid.
  const cardSpans: { col: string; offset: string }[] = [
    { col: "lg:col-span-4 lg:col-start-2", offset: "" },
    { col: "lg:col-span-3 lg:col-start-7", offset: "lg:mt-24" },
    { col: "lg:col-span-5 lg:col-start-8", offset: "" }, // bleeds to right edge
    { col: "lg:col-span-4 lg:col-start-2", offset: "lg:mt-16" },
  ];

  return (
    <section className="border-t border-border-hairline bg-canvas py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10">
          <div className="lg:col-span-6 lg:col-start-2">
            <Numeral index="02" label="The Lineup" className="mb-10" />
            <Heading level={2}>
              <span className="block">Salad Bowls</span>
              <span className="block pl-[8%]">
                <span className="text-text-disabled">&amp;</span> Power Plates
                <span className="text-accent">.</span>
              </span>
            </Heading>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 self-end">
            <p className="font-body text-base md:text-lg leading-relaxed text-text-secondary max-w-md">
              Real ingredients. Real protein. Built for runners, builders,
              and everyone in between.
            </p>
            <CTAButton variant="tertiary" href="/menu" className="mt-10">
              Full Menu
            </CTAButton>
          </div>
        </div>
      </Container>

      {/* Full-viewport grid so the third card can bleed to the right edge.
          Padding-left aligns with the Container's shell; padding-right is 0
          so the rightmost card reaches the viewport edge. */}
      <div className="mt-20 pl-5 sm:pl-8 lg:pl-12 xl:pl-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16">
          {lineup.map((item, i) => {
            const span = cardSpans[i] ?? cardSpans[cardSpans.length - 1];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: DUR.reveal,
                  delay: i * 0.08,
                  ease: EASE.editorial,
                }}
                className={cn(span.col, span.offset)}
              >
                <LineupCard item={item} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LineupCard({ item }: { item: MenuItem }) {
  return (
    <Link
      href="/menu"
      aria-label={item.title}
      className="group block w-full"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-canvas">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.99)] transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="relative font-display font-bold uppercase tracking-display text-lg md:text-xl text-text-primary">
          <span className="relative">
            {item.title}
            <span
              aria-hidden
              className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 ease-smooth group-hover:origin-left group-hover:scale-x-100"
            />
          </span>
        </h3>
        <span className="font-display font-bold text-base text-text-primary shrink-0">
          {formatGBP(item.priceGBP)}
        </span>
      </div>

      <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary line-clamp-2 max-w-md">
        {item.description}
      </p>

      {item.nutrition && (
        <dl className="mt-5 grid grid-cols-4 border-t border-border-hairline">
          {(
            [
              ["Cal", `${item.nutrition.calories}`],
              ["Protein", `${item.nutrition.protein}g`],
              ["Carbs", `${item.nutrition.carbs}g`],
              ["Fat", `${item.nutrition.fat}g`],
            ] as const
          ).map(([label, value], i) => (
            <div
              key={label}
              className={cn(
                "flex flex-col items-start py-3",
                i > 0 && "border-l border-border-hairline pl-3",
              )}
            >
              <dt className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-disabled">
                {label}
              </dt>
              <dd className="mt-1 font-display font-bold text-xs text-text-primary">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Link>
  );
}
