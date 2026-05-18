"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { DUR, EASE } from "@/brand/motion";

/**
 * HeroBlueprint — full-bleed banner with centered overlay title.
 *
 * Full-width banner with video background and centered "GDB" title overlay.
 * Navigation is transparent and overlays the banner.
 * Similar to premium food/beverage brand hero patterns.
 */
export function Hero() {
  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden -mt-20">
      {/* Full-bleed banner video background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.drift, ease: EASE.editorial }}
        className="absolute inset-0"
      >
        <motion.div
          initial={{ scale: 1.03 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.2, ease: EASE.editorial }}
          className="absolute inset-0"
        >
          <video
            src="/banner/0515(3).mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.65)]"
          />
        </motion.div>
      </motion.div>

      {/* Centered overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100vh] px-6">
        {/* Centered title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: DUR.reveal,
            delay: 0.2,
            ease: EASE.editorial,
          }}
          className="text-center"
        >
          <h1 className="font-display font-bold uppercase tracking-display text-8xl lg:text-[150px] text-accent" style={{ WebkitTextStroke: "2px #000000", paintOrder: "stroke fill" }}>
            GBD
          </h1>
        </motion.div>
      </div>

      {/* Signature mark — bottom left */}
      <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 flex flex-col gap-3 z-20">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <Eyebrow tone="inverse">Spit-Fired · Served Fast</Eyebrow>
        </div>
        <span aria-hidden className="block h-px w-16 bg-accent" />
      </div>
    </section>
  );
}
