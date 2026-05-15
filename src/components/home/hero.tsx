"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/ui/cta-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { EASE } from "@/brand/motion";

export function Hero() {
  return (
    <section className="relative bg-canvas">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 flex items-center px-6 sm:px-10 lg:pl-16 xl:pl-24 py-24 lg:py-32">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE.out }}
              className="mb-10"
            >
              <Eyebrow>Est. London · 2026</Eyebrow>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE.out }}
            >
              <Heading level={1}>
                British
                <br />
                Doner
                <br />
                Redefined.
              </Heading>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE.out }}
              className="mt-10 max-w-md font-body text-base md:text-lg leading-relaxed text-text-secondary"
            >
              Ethically sourced. Spit-fired. Built for the 90-second lunch and
              the 1AM craving. Honest food, raised to a higher bar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE.out }}
              className="mt-12 flex flex-wrap items-center gap-8"
            >
              <CTAButton variant="primary" size="lg" href="/locations">
                Order Now
              </CTAButton>
              <CTAButton variant="tertiary" href="/menu">
                See the Menu
              </CTAButton>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE.out }}
          className="lg:col-span-7 relative min-h-[60vh] lg:min-h-[88vh] bg-canvas"
        >
          <Image
            src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=2000&q=85"
            alt="Spit-fired British doner plate"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />

          <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <Eyebrow tone="inverse">Spit-Fired · Served Fast</Eyebrow>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
