"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { DUR, EASE } from "@/brand/motion";

/**
 * BestSellers — "The Lineup".
 *
 * The product-attraction beat that follows the craving section. Designed as
 * curated editorial storytelling, not an ecommerce grid: one dominant
 * featured tile beside a stack of two secondary tiles — deliberate hierarchy
 * imbalance for editorial rhythm — on the same dark cinematic stage as the
 * craving section (navy depth, ambient red glow, grain, vignette). Each tile
 * carries a display numeral rather than a faked product name and reveals/
 * zooms with restrained luxury motion.
 *
 * Colour discipline matches the dark act: navy dominant, white type, red only
 * as accents (numeral marker, hairline, ring, ambient glow).
 */

// Fine film grain, generated inline so it ships without an asset request.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const FEATURED = { src: "/best-sellers/1.png", alt: "GBD best seller — spit-fired plate", n: "01" };
const SECONDARY = [
  { src: "/best-sellers/2.png", alt: "GBD best seller — loaded box", n: "02" },
  { src: "/best-sellers/3.png", alt: "GBD best seller — signature wrap", n: "03" },
];

export function BestSellers() {
  const reduceMotion = useReducedMotion();

  const rise: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 26 },
    show: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: DUR.reveal, ease: EASE.editorial, delay: reduceMotion ? 0 : delay },
    }),
  };

  return (
    <section
      aria-labelledby="lineup-title"
      className="relative overflow-hidden bg-surface-inverse pt-20 pb-24 text-text-inverse"
    >
      {/* ── Atmospheric background (navy depth, never flat black) ────── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{ background: "linear-gradient(180deg, #0A121C 0%, #0F1E2D 50%, #0A121C 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 45% at 82% 14%, rgba(201,64,53,0.10), transparent 60%), radial-gradient(45% 40% at 10% 90%, rgba(201,64,53,0.06), transparent 65%), radial-gradient(75% 60% at 50% 45%, rgba(20,38,56,0.5), transparent 78%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
      />

      <Container>
        {/* ── Split editorial header ─────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <motion.div
            variants={rise}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-accent">
              <span>03</span>
              <span aria-hidden className="h-px w-12 bg-current opacity-60" />
              <span className="text-white/55">The Lineup</span>
            </div>
            <h2
              id="lineup-title"
              className="mt-5 font-campaign uppercase text-white text-[clamp(2.25rem,6vw,4.5rem)]"
              style={{ lineHeight: 0.9, letterSpacing: "-0.03em" }}
            >
              <span className="block">Our Best</span>
              <span className="block">
                Sellers<span className="text-accent">.</span>
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={rise}
            custom={0.12}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-7 lg:col-span-4 lg:items-end lg:text-right"
          >
            <p className="max-w-sm font-body text-sm leading-relaxed text-white/65 sm:text-base">
              Real ingredients. Real protein. Built for runners, builders, and
              everyone in between.
            </p>
            <Link
              href="/menu"
              className="group inline-flex w-max items-center gap-2 border-b border-white/30 pb-1 font-display text-xs font-bold uppercase tracking-button text-white transition-colors duration-300 ease-smooth hover:border-accent hover:text-accent"
            >
              Full Menu
              <span aria-hidden className="transition-transform duration-300 ease-smooth group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        {/* ── Featured + secondary (deliberate hierarchy imbalance) ──── */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:mt-12 lg:grid-cols-12 lg:items-stretch lg:gap-6">
          {/* Dominant featured tile */}
          <motion.div
            variants={rise}
            custom={0.15}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7"
          >
            <Tile
              item={FEATURED}
              featured
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[34rem]"
            />
          </motion.div>

          {/* Two secondary tiles, stacked */}
          <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
            {SECONDARY.map((item, i) => (
              <motion.div
                key={item.n}
                variants={rise}
                custom={0.27 + i * 0.1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="lg:flex-1"
              >
                <Tile
                  item={item}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[15.5rem]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

interface TileProps {
  item: { src: string; alt: string; n: string };
  featured?: boolean;
  priority?: boolean;
  sizes: string;
  className?: string;
}

function Tile({ item, featured = false, priority = false, sizes, className }: TileProps) {
  return (
    <Link
      href="/menu"
      aria-label={item.alt}
      className={cn(
        "group relative block overflow-hidden rounded-[24px] bg-gbd-navy shadow-[0_36px_100px_-32px_rgba(201,64,53,0.2),0_22px_60px_-30px_rgba(10,18,28,0.9)]",
        className,
      )}
    >
      {/* Ambient red glow behind the food */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 blur-2xl transition-opacity duration-700 ease-smooth group-hover:opacity-90"
        style={{ background: "radial-gradient(50% 45% at 50% 60%, rgba(201,64,53,0.32), transparent 72%)" }}
      />
      <Image
        src={item.src}
        alt={item.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover [filter:contrast(1.08)_saturate(1.06)_brightness(0.84)] transition-transform duration-[1300ms] ease-smooth group-hover:scale-[1.06]"
      />
      {/* Legibility gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,18,28,0.92) 0%, rgba(15,30,45,0.4) 44%, transparent 70%)",
        }}
      />
      {/* Hover deepen */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gbd-navy/0 transition-colors duration-700 ease-smooth group-hover:bg-gbd-navy/20"
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 120% at 50% 42%, transparent 54%, rgba(10,18,28,0.55) 100%)" }}
      />
      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
      />
      {/* Glass top hairline + red accent border */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div
        aria-hidden
        className="absolute inset-0 rounded-[24px] ring-1 ring-gbd-red/15 transition-[box-shadow] duration-700 ease-smooth group-hover:ring-gbd-red/45"
      />
      {/* Content */}
      <div className={cn("absolute inset-x-0 bottom-0", featured ? "p-7 sm:p-9 lg:p-10" : "p-6 sm:p-7")}>
        <div className="transition-transform duration-700 ease-smooth group-hover:-translate-y-1.5">
          <span
            className={cn(
              "block font-campaign leading-none text-white/90",
              featured ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl",
            )}
            style={{ letterSpacing: "-0.02em" }}
          >
            {item.n}
          </span>
          <span className="mt-3 flex items-center gap-2.5">
            <span aria-hidden className="h-px w-6 bg-gbd-red" />
            <Eyebrow tone="inverse" className="text-white/70">
              View Dish
            </Eyebrow>
            <span
              aria-hidden
              className="text-sm text-accent opacity-0 transition-all duration-300 ease-smooth group-hover:translate-x-1 group-hover:opacity-100"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
