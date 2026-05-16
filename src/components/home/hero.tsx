"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/ui/cta-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Numeral } from "@/components/ui/numeral";
import { DUR, EASE } from "@/brand/motion";

/**
 * Hero — editorial split.
 *
 * Composition is intentionally asymmetric:
 *   – Type column 5/12, photo column 7/12 (no symmetric 6/6 — the type
 *     column carries narrative weight while the photograph carries
 *     atmospheric weight).
 *   – Headline indents the second and third lines, so the wordmark
 *     "BRITISH / DONER / REDEFINED." reads with the rhythm of a poster.
 *   – A small "01 ── BRITAIN" marker stamps the top of the type column.
 *   – The photograph carries a slow drift on first view (1.1s editorial
 *     ease) — no zoom, no parallax, no scale-down-from-1.04.
 *   – A red accent rule sits below the chip at the photo's bottom-left,
 *     reading as a signature mark.
 */
export function Hero() {
  return (
    <section className="relative bg-canvas">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 flex items-center px-6 sm:px-10 lg:pl-16 xl:pl-24 py-24 lg:py-32">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.reveal, ease: EASE.editorial }}
              className="mb-10"
            >
              <Numeral index="01" label="Britain" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.reveal, delay: 0.1, ease: EASE.editorial }}
            >
              <Heading level={1}>
                <span className="block">British</span>
                <span className="block pl-[10%]">Doner</span>
                <span className="block">
                  Redefined<span className="text-accent">.</span>
                </span>
              </Heading>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.reveal, delay: 0.3, ease: EASE.editorial }}
              className="mt-10 max-w-md font-body text-base md:text-lg leading-relaxed text-text-secondary"
            >
              Ethically sourced. Spit-fired. Built for the 90-second lunch
              and the 1AM craving. Honest food, raised to a higher bar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.reveal, delay: 0.45, ease: EASE.editorial }}
              className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6"
            >
              <CTAButton variant="primary" size="lg" href="/locations">
                Order Now
              </CTAButton>
              <CTAButton variant="tertiary" href="/menu">
                See the Menu
              </CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DUR.drift, delay: 0.7, ease: EASE.editorial }}
              className="mt-16 flex items-center gap-3 text-text-secondary"
            >
              <span className="h-px w-10 bg-text-secondary opacity-60" />
              <span className="font-display font-bold uppercase tracking-eyebrow text-[10px]">
                Est. London · 2026
              </span>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.drift, ease: EASE.editorial }}
          className="lg:col-span-7 relative min-h-[60vh] lg:min-h-[88vh] bg-canvas overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.03 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3.2, ease: EASE.editorial }}
            className="relative h-full w-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=2000&q=85"
              alt="Spit-fired British doner plate"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.98)]"
            />
          </motion.div>

          <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 flex flex-col gap-3">
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
