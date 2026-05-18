"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/ui/cta-button";
import { Numeral } from "@/components/ui/numeral";
import { DUR, EASE } from "@/brand/motion";
import { cn } from "@/lib/utils";

const MARQUEE_PHRASE = "From farm to spit, on the record";

/**
 * StoryMarqueeAndBrick — architectural story section.
 *
 * Two zones, stacked, both edge-to-edge with 1px hairlines as the only
 * separators.
 *
 *   Marquee zone (top)
 *     Single-row band with hairlines top and bottom. An infinitely
 *     scrolling banner reads "FROM FARM TO SPIT, ON THE RECORD." The
 *     track is duplicated so the loop seams are invisible. Speed is
 *     calm (28s linear) — the marquee should read as architecture,
 *     not as a stock-ticker.
 *
 *   Interlocking brick zone (below)
 *     12-column grid. Left col-span-8: lifestyle photograph at
 *     aspect-video, full bleed within its cell, hairline divider on
 *     the right. Right col-span-4: title brick. The headline is set
 *     so tightly (leading-[0.85], massive scale) that it fills the
 *     4-column cell like a heavy ink slab — the typographic
 *     equivalent of the photograph next to it.
 */
export function StoryMarqueeAndBrick() {
  return (
    <section className="bg-canvas">
      {/* Marquee band */}
      <div className="border-y border-border-strong overflow-hidden">
        <div
          className="flex whitespace-nowrap will-change-transform [animation:gbd-marquee_28s_linear_infinite]"
          aria-hidden="true"
        >
          <MarqueeTrack />
          <MarqueeTrack />
        </div>
        <span className="sr-only">{MARQUEE_PHRASE}.</span>
      </div>

      {/* Interlocking brick */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-border-strong">
        {/* Photograph cell */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: DUR.drift, ease: EASE.editorial }}
          className="relative lg:col-span-8 lg:border-r lg:border-border-strong aspect-video lg:aspect-auto lg:min-h-[60vh] overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1800&q=85"
            alt="GBD kitchen counter — friends sharing food"
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.99)]"
          />
        </motion.div>

        {/* Title brick — the headline fills the 4-col cell as a heavy
            ink slab. mt-auto pushes body+CTA to bottom of the brick. */}
        <div className="lg:col-span-4 flex flex-col p-6 sm:p-10 lg:p-12 gap-8">
          <Numeral index="03" label="Our Story" />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: DUR.reveal, ease: EASE.editorial }}
            className="font-display font-bold uppercase tracking-display leading-none text-text-primary text-3xl lg:text-4xl"
          >
            <span className="block">A doner</span>
            <span className="block">that earns</span>
            <span className="block">its place</span>
            <span className="block">
              in the city<span className="text-accent">.</span>
            </span>
          </motion.h2>

          <div className="mt-auto flex flex-col gap-6">
            <p className="font-body text-sm leading-relaxed text-text-secondary opacity-70 max-w-md">
              We&apos;re not a chain. We&apos;re a kitchen, a neighbourhood,
              and a way of eating that respects the source and the seat
              at the table.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <CTAButton variant="primary" size="md" href="/our-story">
                Our Story
              </CTAButton>
              <CTAButton variant="tertiary" href="/feed">
                The Feed
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeTrack() {
  // Two copies of the phrase per track, separated by a · — the track
  // itself is rendered twice in the parent, so the page shows four
  // total copies cycling without visible seams.
  const items = [
    MARQUEE_PHRASE,
    MARQUEE_PHRASE,
    MARQUEE_PHRASE,
    MARQUEE_PHRASE,
  ];
  return (
    <div className="flex shrink-0 items-center">
      {items.map((phrase, i) => (
        <Link
          key={i}
          href="/our-story"
          className={cn(
            "group inline-flex items-center gap-6 py-3 lg:py-4 px-8 font-display font-bold uppercase tracking-display text-xl lg:text-2xl text-text-primary",
            "transition-colors duration-300 ease-smooth hover:text-accent",
          )}
        >
          <span>{phrase}</span>
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
        </Link>
      ))}
    </div>
  );
}
