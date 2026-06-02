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
  const textShadow = "0 2px 10px rgba(0,0,0,.15)";
  const EASE = [0.22, 1, 0.36, 1];
  
  return (
    <section className="relative flex min-h-[60vh] lg:min-h-[70vh] xl:max-h-[760px] w-full items-center overflow-hidden bg-[#06182F]">
      {/* Background Image with Zoom Out effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Primary Linear Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(6,24,47,.72) 0%, rgba(6,24,47,.48) 35%, rgba(6,24,47,.18) 70%, rgba(6,24,47,.05) 100%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:ml-[8%] lg:max-w-[650px] lg:px-0 mt-20 lg:mt-0">
        <div className="flex flex-col">
          {/* Eyebrow: 0ms delay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0 }}
            className="mb-5 font-display text-[11px] font-bold uppercase tracking-[0.35em] text-[#D64536]"
            style={{ textShadow }}
          >
            {eyebrow}
          </motion.div>

          {/* Headline: 80ms delay */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}
            className="font-display font-bold text-[#ffffff] tracking-[-0.03em] leading-[0.98] mb-6"
            style={{ 
              fontSize: "clamp(3rem, 5vw, 5rem)",
              textShadow 
            }}
          >
            {headline}
          </motion.h1>

          {/* Description: 160ms delay */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.16 }}
            className="font-body leading-[1.6] max-w-[40ch] text-[16px] md:text-[18px] lg:text-[22px]"
            style={{ 
              color: "rgba(255,255,255,.9)",
              textShadow 
            }}
          >
            {subheading}
          </motion.p>

          {/* Optional CTA: 240ms delay */}
          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.24 }}
              className="mt-8"
            >
              {cta}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
