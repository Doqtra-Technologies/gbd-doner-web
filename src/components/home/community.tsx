"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Numeral } from "@/components/ui/numeral";
import { CTAButton } from "@/components/ui/cta-button";
import { DUR, EASE } from "@/brand/motion";

/**
 * Our Story collage — editorial photograph stack.
 *
 * 12-col grid with `py-32` for breathing room.
 *
 * Left zone (col-span-5 of 12): photograph collage.
 *   - Image A: primary, w-full aspect-[3/4]. Anchors the composition.
 *   - Image B: secondary, absolute `-bottom-16 -right-16` overlapping A.
 *     Two-thirds width, square. Wears a 4px white frame for figure/
 *     ground separation against Image A — the polaroid effect. No drop
 *     shadow (brand forbids); depth instead comes from a 1px navy
 *     offset hairline behind it (the brutalist offset pattern).
 *
 * Right zone (col-span-5 col-start-7): typeset story panel.
 *   - Numeral 03 chapter mark.
 *   - Oversized headline with indented second line and a red full-stop.
 *   - Single body paragraph in a book-column width.
 *   - One primary CTA + one tertiary, separated by editorial gap.
 *
 * On `< lg` the grid collapses to a single column with the type panel
 * appearing below the collage. On mobile the collage caps at ~80% width
 * so the offset secondary image doesn't escape the viewport.
 */
export function Community() {
  return (
    <section className="bg-canvas border-t border-border-hairline py-24 md:py-32 overflow-x-clip">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* Photograph collage */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DUR.reveal, ease: EASE.editorial }}
              className="relative mx-auto w-[88%] sm:w-[80%] lg:w-full"
            >
              {/* Image A — primary anchor */}
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1200&q=85"
                  alt="Friends sharing food at a GBD counter"
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.99)]"
                />
              </div>

              {/* Image B — overlapping secondary with white polaroid frame.
                  Offset hairline behind reads as depth without a shadow. */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: DUR.reveal,
                  delay: 0.18,
                  ease: EASE.editorial,
                }}
                className="absolute -bottom-12 -right-8 sm:-bottom-16 sm:-right-12 lg:-bottom-16 lg:-right-16 w-2/3 aspect-square"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 border border-border-strong"
                />
                <div className="relative h-full w-full border-4 border-canvas">
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1000&q=85"
                      alt="Doner being carved off the spit"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.99)]"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Story panel */}
          <div className="lg:col-span-5 lg:col-start-7 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: DUR.reveal, ease: EASE.editorial }}
            >
              <Numeral index="03" label="Our Story" className="mb-10" />
              <Heading level={1}>
                <span className="block">A doner</span>
                <span className="block pl-[10%]">that earns</span>
                <span className="block">its place</span>
                <span className="block">
                  in the city<span className="text-accent">.</span>
                </span>
              </Heading>

              <p className="font-body text-base md:text-lg leading-relaxed mt-12 max-w-md text-text-secondary">
                We&apos;re not a chain. We&apos;re a kitchen, a neighbourhood,
                and a way of eating that respects the source and the seat at
                the table. Pull up.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
                <CTAButton variant="primary" size="md" href="/our-story">
                  Our Story
                </CTAButton>
                <CTAButton variant="tertiary" href="/feed">
                  The Feed
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
