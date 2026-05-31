"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Container } from "@/components/ui/container";
import { BrushHighlight } from "@/components/ui/brush-highlight";
import { DUR, EASE } from "@/brand/motion";

/**
 * MadeForEveryCraving — cinematic editorial showcase that bridges the hero
 * and the menu.
 *
 * Not a product grid: an asymmetric two-card composition (≈70/30) on a deep,
 * layered navy stage. Each card treats its food like a campaign photograph —
 * navy gradients, an edge vignette, a restrained red ambient glow and a fine
 * grain — and reveals/parallaxes on scroll with luxury-only hover motion.
 *
 * Colour discipline: navy dominates, white carries type, red appears only as
 * accents (label, hairline, brush, ambient glow, hover). Palette is strictly
 * brand: white #FFFFFF, navy #0F1E2D, red #C94035.
 */

// Fine film grain, generated inline so it ships without an asset request.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function MadeForEveryCraving() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Gentle scroll parallax — the two food images drift at different rates for
  // depth. The image wrappers are over-sized so the drift never reveals edges.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yLeft = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-5%", "5%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-8%", "8%"]);

  const rise: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    show: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: DUR.reveal, ease: EASE.editorial, delay: reduceMotion ? 0 : delay },
    }),
  };

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      aria-labelledby="craving-title"
      className="relative overflow-hidden bg-surface-inverse pt-20 pb-24 text-text-inverse"
    >
      {/* ── Atmospheric background (navy depth, never flat black) ────── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(180deg, #0A121C 0%, #0F1E2D 46%, #0A121C 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 12% 18%, rgba(201,64,53,0.10), transparent 60%), radial-gradient(50% 50% at 88% 85%, rgba(201,64,53,0.07), transparent 65%), radial-gradient(70% 60% at 50% 50%, rgba(20,38,56,0.55), transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
      />

      <Container>
        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div
          variants={rise}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3.5">
            <span aria-hidden className="h-px w-9 bg-gbd-red" />
            <span className="font-display text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              02 — Cravings
            </span>
          </div>
          <h2
            id="craving-title"
            className="mt-6 font-campaign uppercase text-white text-[clamp(2.75rem,8vw,6.5rem)]"
            style={{ lineHeight: 0.9, letterSpacing: "-0.03em" }}
          >
            <span className="block">Made For Every</span>
            <span className="relative inline-block">
              <BrushHighlight delay={0.35} />
              <span className="relative z-10 block">Craving</span>
            </span>
          </h2>
        </motion.div>

        {/* ── Asymmetric cards ───────────────────────────────────────── */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 lg:mt-12 lg:grid-cols-[7fr_3fr] lg:gap-6">
          {/* LEFT — Signature Wraps (wide cinematic feature) */}
          <motion.div
            variants={rise}
            custom={0.1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <Link
              href="/menu"
              aria-label="Signature Wraps — view the menu"
              className="group relative block h-[440px] overflow-hidden rounded-[28px] bg-gbd-navy shadow-[0_40px_120px_-30px_rgba(201,64,53,0.22),0_24px_70px_-30px_rgba(10,18,28,0.9)] sm:h-[520px] lg:h-[620px]"
            >
              {/* Ambient red glow behind the food */}
              <div
                aria-hidden
                className="absolute inset-0 -z-0 opacity-60 blur-2xl transition-opacity duration-700 ease-smooth group-hover:opacity-90"
                style={{
                  background:
                    "radial-gradient(45% 45% at 32% 62%, rgba(201,64,53,0.38), transparent 70%)",
                }}
              />
              {/* Image (parallax wrapper, hover zoom) */}
              <motion.div style={{ y: yLeft }} className="absolute inset-0 -top-[8%] h-[116%]">
                <Image
                  src="/craving/roll.png"
                  alt="GBD signature wrap, spit-fired"
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover [filter:contrast(1.08)_saturate(1.06)_brightness(0.82)] transition-transform duration-[1300ms] ease-smooth group-hover:scale-[1.06]"
                />
              </motion.div>
              {/* Legibility gradient — anchors content bottom-left */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top right, rgba(10,18,28,0.92) 0%, rgba(15,30,45,0.5) 42%, transparent 72%)",
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
                style={{
                  background:
                    "radial-gradient(120% 120% at 50% 45%, transparent 55%, rgba(10,18,28,0.55) 100%)",
                }}
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
                className="absolute inset-0 rounded-[28px] ring-1 ring-gbd-red/15 transition-[box-shadow] duration-700 ease-smooth group-hover:ring-gbd-red/45"
              />
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9 lg:p-11">
                <div className="transition-transform duration-700 ease-smooth group-hover:-translate-y-1.5">
                  <Eyebrow tone="accent" className="tracking-eyebrow">
                    GBD Favorites
                  </Eyebrow>
                  <h3
                    className="mt-3 font-campaign uppercase text-white text-3xl sm:text-4xl lg:text-5xl"
                    style={{ letterSpacing: "-0.02em", lineHeight: 0.95 }}
                  >
                    Signature Wraps
                  </h3>
                  <span
                    aria-hidden
                    className="mt-4 block h-[2px] w-12 origin-left bg-gbd-red transition-transform duration-500 ease-smooth group-hover:scale-x-[2.2]"
                  />
                  <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-white/70 sm:text-base">
                    Stacked with bold flavor and spit-fired perfection.
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* RIGHT — Fuel in Every Sip (tall atmospheric accent) */}
          <motion.div
            variants={rise}
            custom={0.22}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <Link
              href="/menu"
              aria-label="Fuel in Every Sip — view the menu"
              className="group relative block h-[440px] overflow-hidden rounded-[28px] bg-gbd-navy shadow-[0_40px_120px_-30px_rgba(201,64,53,0.18),0_24px_70px_-30px_rgba(10,18,28,0.9)] transition-transform duration-700 ease-smooth hover:-translate-y-2 sm:h-[520px] lg:h-[620px]"
            >
              {/* Spotlight + red ambient reflection */}
              <div
                aria-hidden
                className="absolute inset-0 -z-0 transition-opacity duration-700 ease-smooth"
                style={{
                  background:
                    "radial-gradient(50% 38% at 50% 30%, rgba(255,255,255,0.10), transparent 70%), radial-gradient(60% 45% at 50% 88%, rgba(201,64,53,0.22), transparent 72%)",
                }}
              />
              {/* Drink (parallax wrapper, gentle hover motion) */}
              <motion.div style={{ y: yRight }} className="absolute inset-0 -top-[8%] h-[116%]">
                <Image
                  src="/craving/juice.png"
                  alt="GBD cold drink, studio-lit"
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-cover object-center [filter:contrast(1.06)_saturate(1.08)_brightness(0.9)] transition-transform duration-[1400ms] ease-smooth group-hover:scale-[1.04]"
                />
              </motion.div>
              {/* Legibility gradient */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,18,28,0.94) 0%, rgba(15,30,45,0.35) 45%, transparent 70%)",
                }}
              />
              {/* Vignette */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 110% at 50% 40%, transparent 52%, rgba(10,18,28,0.6) 100%)",
                }}
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
                className="absolute inset-0 rounded-[28px] ring-1 ring-gbd-red/15 transition-[box-shadow] duration-700 ease-smooth group-hover:ring-gbd-red/40"
              />
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9 lg:p-10">
                <div className="transition-transform duration-700 ease-smooth group-hover:-translate-y-1">
                  <Eyebrow tone="accent" className="tracking-eyebrow">
                    Refresh
                  </Eyebrow>
                  <h3
                    className="mt-3 font-campaign uppercase text-white text-3xl sm:text-4xl"
                    style={{ letterSpacing: "-0.02em", lineHeight: 0.95 }}
                  >
                    Fuel in Every Sip
                  </h3>
                  <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-white/70 sm:text-base">
                    Crafted to cool the heat.
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
