"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/brand/motion";

/**
 * BrushHighlight — an organic GBD-red paint swipe sized to sit *behind* a
 * word (place inside a `relative` parent; put the word in a sibling with a
 * higher z-index).
 *
 * The shape is a hand-drawn-style path roughened by an SVG turbulence +
 * displacement filter (imperfect, semi-organic edges) with a faint grain
 * overlay for paint texture. It is angled slightly and wipes on left→right
 * via an animated clip-path when scrolled into view.
 *
 * Filter/clip ids are derived from useId() so multiple instances on one page
 * (e.g. the hero and the "Made For Every Craving" title) never collide.
 */

const RED = "#C94035";
const BRUSH_PATH =
  "M14,110 C72,84 152,74 252,79 C362,84 482,66 612,84 C630,86 632,150 612,151 C470,156 330,168 210,155 C120,146 60,150 22,141 C6,137 2,120 14,110 Z";

interface BrushHighlightProps {
  /** Seconds to wait after entering view before the swipe wipes in. */
  delay?: number;
  /** Override the default insets (which hug a single line of display type). */
  className?: string;
}

export function BrushHighlight({ delay = 0.5, className }: BrushHighlightProps) {
  const reduceMotion = useReducedMotion();
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const roughId = `brush-rough-${raw}`;
  const grainId = `brush-grain-${raw}`;
  const clipId = `brush-clip-${raw}`;

  return (
    <motion.span
      aria-hidden
      initial={{ clipPath: reduceMotion ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: EASE.editorial,
        delay: reduceMotion ? 0 : delay,
      }}
      className={cn(
        // Extends wider and taller than the word it sits behind, so the
        // swipe reads as a bold paint stroke rather than a tight underline.
        "pointer-events-none absolute left-[-8%] right-[-8%] top-[-2%] bottom-[-6%] z-[1]",
        className,
      )}
      style={{ rotate: -2.5 }}
    >
      <svg viewBox="0 0 640 180" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <filter id={roughId} x="-12%" y="-45%" width="124%" height="190%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.014 0.028"
              numOctaves="2"
              seed="11"
              result="t"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="t"
              scale="26"
              xChannelSelector="R"
              yChannelSelector="G"
              result="d"
            />
            <feGaussianBlur in="d" stdDeviation="0.7" />
          </filter>
          <filter id={grainId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="4" result="n" />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0"
            />
          </filter>
          <clipPath id={clipId}>
            <path d={BRUSH_PATH} />
          </clipPath>
        </defs>
        <g filter={`url(#${roughId})`}>
          <path d={BRUSH_PATH} fill={RED} />
          {/* Paint texture — dark specks clipped to the swipe silhouette.
              Kept light so the red body stays vivid and visible. */}
          <g clipPath={`url(#${clipId})`} style={{ mixBlendMode: "multiply" }}>
            <rect width="640" height="180" filter={`url(#${grainId})`} opacity="0.2" />
          </g>
        </g>
      </svg>
    </motion.span>
  );
}
