"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PageBannerProps {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  headline: React.ReactNode;
  subheading: string;
  cta?: React.ReactNode;
}

export function PageBanner({
  imageSrc,
  imageAlt,
  eyebrow,
  headline,
  subheading,
  cta,
}: PageBannerProps) {
  // Common animation config for text elements
  const textAnimation = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  const TEXT_DURATION = 0.9;
  const EASE = [0.22, 1, 0.36, 1];

  return (
    <section className="relative flex min-h-[45vh] md:min-h-[50vh] lg:min-h-[60vh] w-full items-end overflow-hidden bg-[#06182F]">
      {/* Background Image with Zoom Out effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: EASE }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Premium Dark Overlay - Left aligned gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(6,24,47,.92) 0%, rgba(6,24,47,.80) 30%, rgba(6,24,47,.45) 60%, transparent 100%)",
        }}
      />

      {/* Content Container */}
      <div 
        className="relative z-10 mx-auto w-full max-w-[1600px] pb-16 pt-32"
        style={{ paddingInline: 'clamp(32px, 5vw, 96px)' }}
      >
        <div className="flex max-w-3xl flex-col">
          {/* Eyebrow: 0ms delay */}
          <motion.div 
            className="flex items-center gap-3.5 mb-4"
            variants={textAnimation}
            initial="initial"
            animate="animate"
            transition={{ duration: TEXT_DURATION, ease: EASE, delay: 0 }}
          >
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
              {eyebrow}
            </span>
          </motion.div>

          {/* Headline: 200ms delay */}
          <motion.h1 
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase tracking-display leading-[0.95] text-white text-balance mb-6"
            variants={textAnimation}
            initial="initial"
            animate="animate"
            transition={{ duration: TEXT_DURATION, ease: EASE, delay: 0.2 }}
          >
            {headline}
          </motion.h1>

          {/* Description: 400ms delay */}
          <motion.p 
            className="font-body text-base md:text-lg leading-[1.75] text-white/90 max-w-[60ch]"
            variants={textAnimation}
            initial="initial"
            animate="animate"
            transition={{ duration: TEXT_DURATION, ease: EASE, delay: 0.4 }}
          >
            {subheading}
          </motion.p>

          {/* Optional CTA: 600ms delay */}
          {cta && (
            <motion.div
              className="mt-8"
              variants={textAnimation}
              initial="initial"
              animate="animate"
              transition={{ duration: TEXT_DURATION, ease: EASE, delay: 0.6 }}
            >
              {cta}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
