"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { Location } from "@/domain/location";
import { cn } from "@/lib/utils";

const OUTLET_DECK_IMAGES: Record<string, string[]> = {
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
    "/locations/Piccadilly.webp",
    "/locations/piccadilly2.png",
    "/locations/piccadilly3.png",
  ],
};

const DECK_FRAMES = [
  {
    x: -16,
    y: -4,
    rotate: -2,
    scale: 1,
    opacity: 1,
    zIndex: 30,
  },
  {
    x: 18,
    y: 11,
    rotate: 2.5,
    scale: 0.98,
    opacity: 0.92,
    zIndex: 20,
  },
  {
    x: 36,
    y: 21,
    rotate: 4.5,
    scale: 0.95,
    opacity: 0.82,
    zIndex: 10,
  },
] as const;

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
  const images = getOutletDeckImages(location, fallbackSrc);
  const [isLooping, setIsLooping] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isLooping) {
      setActiveIndex(0);
      return;
    }

    const firstShuffle = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 180);

    const shuffleLoop = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 1100);

    return () => {
      window.clearTimeout(firstShuffle);
      window.clearInterval(shuffleLoop);
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
      {images.map((image, index) => {
        const frameIndex = (index - activeIndex + images.length) % images.length;
        const frame = DECK_FRAMES[frameIndex];
        const isFront = frameIndex === 0;

        return (
          <motion.div
            key={`${location.id}-${image}`}
            className="absolute inset-0 overflow-hidden rounded-[18px] bg-canvas shadow-[0_16px_40px_rgba(15,30,45,0.10)] will-change-transform"
            animate={{
              x: isLooping ? frame.x : index === 0 ? 0 : index * 12,
              y: isLooping ? frame.y : index === 0 ? 0 : index * 8,
              rotate: isLooping ? frame.rotate : index === 0 ? 0 : index * 1.5,
              scale: isLooping ? frame.scale : 1 - index * 0.025,
              opacity: isLooping ? frame.opacity : 1 - index * 0.08,
            }}
            transition={{
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ zIndex: isLooping ? frame.zIndex : 30 - index * 10 }}
          >
            <Image
              src={image}
              alt={location.name}
              fill
              sizes={sizes}
              className={cn(
                "object-cover transition-transform duration-700 ease-smooth",
                isFront && "group-hover:scale-105",
              )}
            />
            {isFront && (
              <>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,30,45,0.02)_0%,rgba(15,30,45,0.36)_100%)] transition-colors duration-500 ease-smooth group-hover:bg-surface-inverse/35" />
                {children}
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function getOutletDeckImages(location: Location, fallbackSrc: string): string[] {
  const configured = OUTLET_DECK_IMAGES[location.slug.toLowerCase()] ?? [];
  const primary = location.imageUrl ?? configured[0] ?? fallbackSrc;
  const images = [primary, ...configured.filter((src) => src !== primary)];

  while (images.length < 3) {
    images.push(primary);
  }

  return images.slice(0, 3);
}
