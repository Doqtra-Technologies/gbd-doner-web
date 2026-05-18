"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/ui/cta-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Numeral } from "@/components/ui/numeral";
import { DUR, EASE } from "@/brand/motion";

/**
 * HeroBlueprint — architectural-grid hero.
 *
 * Exact 50/50 split, edge-to-edge. The left box is white; the right box
 * is a full-bleed photograph. A single 1px navy hairline acts as the
 * centerline of the blueprint.
 *
 * The left box uses `flex flex-col` with `mt-auto` on the headline
 * cluster so the title is **pushed to the absolute bottom-left** of
 * the container. The chapter marker (01 — BRITAIN) anchors the top.
 * The middle is empty by design — the blueprint convention is that
 * empty white *is* a structural element, not unused space.
 *
 * The headline uses leading-[0.85] for the "brick of ink" compression
 * that the editorial-grid system asks for, while remaining brand-
 * compliant on tracking (`tracking-display` — slightly positive).
 */
export function Hero() {
  return (
    <section className="bg-canvas">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[85vh]">
        {/* Left box — type column. Centerline border on its right edge. */}
        <div className="relative order-2 lg:order-1 lg:border-r lg:border-border-hairline">
          <div className="flex flex-col min-h-[60vh] lg:min-h-[85vh] p-6 sm:p-10 lg:p-12 xl:p-16 gap-6">
            {/* Top anchor — chapter mark */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.reveal, ease: EASE.editorial }}
            >
              <Numeral index="01" label="Britain" />
            </motion.div>

            {/* Empty structural void */}
            <div className="flex-1" />

            {/* Bottom-left anchor — headline + body + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DUR.reveal,
                delay: 0.1,
                ease: EASE.editorial,
              }}
              className="mt-auto"
            >
              <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.85] text-text-primary text-5xl lg:text-6xl max-w-[90%]">
                <span className="block">British</span>
                <span className="block">Doner</span>
                <span className="block">
                  Redefined<span className="text-accent">.</span>
                </span>
              </h1>

              <p className="mt-8 max-w-md font-body text-sm leading-relaxed text-text-secondary opacity-70">
                Ethically sourced. Spit-fired. Built for the 90-second
                lunch and the 1AM craving.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <CTAButton variant="primary" size="lg" href="/locations">
                  Order Now
                </CTAButton>
                <CTAButton variant="tertiary" href="/menu">
                  See the Menu
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right box — full-bleed photograph. Zero padding, no radius,
            physically touches the centerline and the viewport's right edge. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.drift, ease: EASE.editorial }}
          className="relative order-1 lg:order-2 min-h-[55vh] lg:min-h-[85vh] overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.03 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3.2, ease: EASE.editorial }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=2000&q=85"
              alt="Spit-fired British doner plate"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.98)]"
            />
          </motion.div>

          {/* Signature mark on the photograph */}
          <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 flex flex-col gap-3 z-10">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <Eyebrow tone="inverse">Spit-Fired · Served Fast</Eyebrow>
            </div>
            <span aria-hidden className="block h-px w-16 bg-accent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
