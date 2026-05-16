"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/ui/cta-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Numeral } from "@/components/ui/numeral";
import { DUR, EASE } from "@/brand/motion";

/**
 * Hero — editorial 7/5 split.
 *
 * Left column (col-span-7 lg+): type column. A 1px navy hairline runs
 * down its right edge, drawing the physical division between word and
 * image like the gutter of a print magazine. Massive padding (p-12 lg+
 * p-24). Internal layout is a tall flex column with `justify-between`:
 * the headline anchors to the top-left, the body + CTA anchors to the
 * bottom-left, creating a tension of empty middle space.
 *
 * Right column (col-span-5 lg+): photograph. No padding, no rounded
 * corners. The image is `absolute inset-0 object-cover` so it fills the
 * column edge-to-edge. On mobile the columns stack — image first, type
 * second — so the user lands on the food before the wordmark.
 *
 * Min-height 85vh on lg+ so the hero owns the first screen without
 * forcing it to be exactly viewport-sized.
 */
export function Hero() {
  return (
    <section className="bg-canvas">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[85vh]">
        {/* Type column */}
        <div className="relative col-span-12 lg:col-span-7 order-2 lg:order-1 lg:border-r lg:border-border-strong">
          <div className="flex flex-col justify-between min-h-[60vh] lg:min-h-[85vh] p-10 sm:p-12 lg:p-20 xl:p-24 gap-16">
            {/* Top — chapter mark + headline */}
            <div>
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
                transition={{
                  duration: DUR.reveal,
                  delay: 0.1,
                  ease: EASE.editorial,
                }}
              >
                <Heading level={1}>
                  <span className="block">British</span>
                  <span className="block pl-[10%]">Doner</span>
                  <span className="block">
                    Redefined<span className="text-accent">.</span>
                  </span>
                </Heading>
              </motion.div>
            </div>

            {/* Bottom — body copy + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DUR.reveal,
                delay: 0.3,
                ease: EASE.editorial,
              }}
              className="max-w-md"
            >
              <p className="font-body text-base md:text-lg leading-relaxed text-text-secondary">
                Ethically sourced. Spit-fired. Built for the 90-second lunch
                and the 1AM craving. Honest food, raised to a higher bar.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
                <CTAButton variant="primary" size="lg" href="/locations">
                  Order Now
                </CTAButton>
                <CTAButton variant="tertiary" href="/menu">
                  See the Menu
                </CTAButton>
              </div>

              <div className="mt-12 flex items-center gap-3 text-text-secondary">
                <span className="h-px w-10 bg-text-secondary opacity-60" />
                <Eyebrow tone="secondary">Est. London · 2026</Eyebrow>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Image column — full-bleed, no padding, no radius */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.drift, ease: EASE.editorial }}
          className="relative col-span-12 lg:col-span-5 order-1 lg:order-2 min-h-[55vh] lg:min-h-[85vh] overflow-hidden"
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
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.98)]"
            />
          </motion.div>

          {/* Signature mark — accent dot + 16px rule at the photo's bottom-left */}
          <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 flex flex-col gap-3 z-10">
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
