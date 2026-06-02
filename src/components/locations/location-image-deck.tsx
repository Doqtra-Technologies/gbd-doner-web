"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { Location } from "@/domain/location";
import { cn } from "@/lib/utils";

/**
 * LocationImageDeck — physical three-photo fan + cinematic hover cycle.
 *
 * Idle:   cards rest in a gentle fan (each slightly offset/rotated behind
 *         the front) so depth is visible before the user interacts.
 * Hover:  after a 260ms intentional pause, the deck begins cycling. Each
 *         card completes its 820ms move before the next starts (2200ms total
 *         interval = 820ms swing + 1380ms hold). The user has time to
 *         appreciate each image rather than watching a rapid shuffle.
 * Exit:   cycling stops immediately; framer-motion's spring eases the deck
 *         back to the resting fan without any snap or jump.
 *
 * Performance: every animated property is transform-composited or
 * opacity/boxShadow (no layout properties). will-change-transform is set
 * on each card. State changes occur at most once per 2.2s.
 *
 * Image paths: lowercase variants (deansgate2.png etc.) exist on disk and
 * are used directly. Piccadilly uses .png (not .webp which was missing).
 */

const OUTLET_DECK_IMAGES: Record<string, [string, string, string]> = {
  deansgate: [
    "/locations/Deansgate.png",
    "/locations/deansgate2.png",
    "/locations/deansgate3.png",
  ],
  liverpool: [
    "/locations/Liverpool.png",
    "/locations/liverpool2.png",
    "/locations/liverpool3.png",
  ],
  piccadilly: [
    "/locations/Piccadilly.png",   // .webp does not exist — use .png
    "/locations/piccadilly2.png",
    "/locations/piccadilly3.png",
  ],
};

// Resting fan — subtle depth cue before the user interacts.
const IDLE: Array<{
  x: number; y: number; rotate: number; scale: number; opacity: number;
  boxShadow: string;
}> = [
  { x:  0, y:  0, rotate:  0,   scale: 1,     opacity: 1,    boxShadow: "0 16px 40px rgba(15,30,45,0.13)" },
  { x: 13, y:  9, rotate:  2,   scale: 0.972, opacity: 0.90, boxShadow: "0 10px 24px rgba(15,30,45,0.09)" },
  { x: 25, y: 17, rotate:  4,   scale: 0.944, opacity: 0.78, boxShadow: "0  6px 14px rgba(15,30,45,0.06)" },
];

// Active loop positions — exaggerated fan for clear perceived depth.
// The front card gets a deeper shadow; back cards recede visibly.
const ACTIVE: Array<{
  x: number; y: number; rotate: number; scale: number; opacity: number;
  zIndex: number; boxShadow: string;
}> = [
  { x: -10, y: -8,  rotate: -1.5, scale: 1,     opacity: 1,    zIndex: 30, boxShadow: "0 28px 60px rgba(15,30,45,0.26)" },
  { x:  22, y: 20,  rotate:  3.5, scale: 0.952, opacity: 0.84, zIndex: 20, boxShadow: "0 14px 32px rgba(15,30,45,0.14)" },
  { x:  44, y: 34,  rotate:  6.5, scale: 0.902, opacity: 0.68, zIndex: 10, boxShadow: "0  7px 16px rgba(15,30,45,0.07)" },
];

/** 820ms swing + 1380ms hold = 2200ms total. */
const FIRST_DELAY_MS = 260;
const LOOP_MS = 2200;

/** Luxury easing — matches brand motion.ts EASE.smooth. */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function LocationImageDeck({
  location,
  fallbackSrc,
  sizes,
  children,
}: {
  location: Location;
  fallbackSrc: string;
  sizes: string;
  children?: ReactNode;
}) {
  const images = resolveImages(location, fallbackSrc);
  const [isLooping, setIsLooping] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isLooping) {
      setActiveIndex(0);
      return;
    }

    // Intentional 260ms pause so the first swap feels considered, not instant.
    const first = window.setTimeout(
      () => setActiveIndex((i) => (i + 1) % images.length),
      FIRST_DELAY_MS,
    );

    const loop = window.setInterval(
      () => setActiveIndex((i) => (i + 1) % images.length),
      LOOP_MS,
    );

    return () => {
      window.clearTimeout(first);
      window.clearInterval(loop);
    };
  }, [images.length, isLooping]);

  return (
    <div
      className="relative aspect-[4/3] overflow-visible"
      onPointerEnter={() => setIsLooping(true)}
      onPointerLeave={() => setIsLooping(false)}
      onFocus={() => setIsLooping(true)}
      onBlur={() => setIsLooping(false)}
    >
      {images.map((src, index) => {
        const frameIndex = (index - activeIndex + images.length) % images.length;
        const active = ACTIVE[frameIndex];
        const idle = IDLE[index] ?? IDLE[IDLE.length - 1];
        const isFront = frameIndex === 0;

        return (
          <motion.div
            key={`${location.id}-${src}`}
            className="absolute inset-0 overflow-hidden rounded-[18px] bg-canvas will-change-transform"
            animate={{
              x:         isLooping ? active.x        : idle.x,
              y:         isLooping ? active.y        : idle.y,
              rotate:    isLooping ? active.rotate   : idle.rotate,
              scale:     isLooping ? active.scale    : idle.scale,
              opacity:   isLooping ? active.opacity  : idle.opacity,
              boxShadow: isLooping ? active.boxShadow: idle.boxShadow,
            }}
            transition={{ duration: 0.82, ease: EASE }}
            style={{ zIndex: isLooping ? active.zIndex : 30 - index * 10 }}
          >
            <Image
              src={src}
              alt={location.name}
              fill
              sizes={sizes}
              className={cn(
                "object-cover transition-[transform,filter] duration-700 ease-smooth",
                // Subtle brightness lift on the front image while hovering — enhances
                // the sense of focus on the active photograph.
                isFront && "group-hover:scale-105 group-hover:[filter:brightness(1.04)]",
              )}
            />

            {/* Gradient + interactive children only on the front card. */}
            {isFront && (
              <>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,30,45,0.02)_0%,rgba(15,30,45,0.38)_100%)] transition-colors duration-500 ease-smooth group-hover:bg-surface-inverse/35" />
                {children}
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function resolveImages(location: Location, fallbackSrc: string): string[] {
  const deck = OUTLET_DECK_IMAGES[location.slug.toLowerCase()];

  // If we have a known deck, use it directly (all three images are verified).
  if (deck) return [...deck];

  // Generic fallback: build a 3-image array from whatever the location provides.
  const primary = location.imageUrl ?? fallbackSrc;
  const extra = (location.images ?? []).filter((s) => s !== primary);
  const images = [primary, ...extra];
  while (images.length < 3) images.push(primary);
  return images.slice(0, 3);
}
