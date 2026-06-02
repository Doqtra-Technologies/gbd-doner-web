"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Location } from "@/domain/location";

/**
 * OutletFlipCard — "Infinite Hover Flipbook" + red "Spring-Glide" reveal.
 *
 * Flicker-free crossfade: instead of swapping a single <Image src> on a
 * timer (which forces an on-the-fly fetch/decode → white flash), every
 * frame is rendered once, stacked absolutely (`fill`), and only the active
 * index is opaque. The browser decodes all frames up front, so the shuffle
 * is a pure GPU opacity transition — zero layout shift, zero flicker.
 *
 * Motion split: the slow 1000ms hover ZOOM lives on a wrapper around the
 * whole stack, while the 700ms flipbook CROSSFADE lives on each image. They
 * must be decoupled — a single shared transition can't run a 1000ms scale
 * and a 700ms opacity dissolve at once without one fighting the other.
 *
 * Brand: overlay is GBD Red (bg-accent/90) with white content; the card
 * base is surface-inverse (navy). All real GBD tokens — no raw/off-brand
 * hex (the prior white/cream overlay has been pivoted to red per spec).
 */
const FALLBACK_IMAGE = "/logo/gbd-logo.png";

export function OutletFlipCard({ location }: { location: Location }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Guarantee a non-empty, *stable* array so the stacked map and the
  // interval never touch `undefined` (domain `images` is optional). useMemo
  // keeps the reference stable across renders → the effect below doesn't
  // re-arm its interval on every render.
  const images = useMemo(
    () =>
      location.images && location.images.length > 0
        ? location.images
        : [location.imageUrl ?? FALLBACK_IMAGE],
    [location.images, location.imageUrl],
  );

  // PHASE 2 — Flicker-free shuffle engine: cycle every 700ms while hovered.
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setActiveImageIdx((prev) => (prev + 1) % images.length);
      }, 700);
    } else {
      setActiveImageIdx(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images]);

  const orderHref = location.clickAndCollectUrl ?? "/order-now";
  const deliveryHref =
    location.deliveryLinks?.[0]?.url ?? `/locations/${location.slug}`;

  function navigate(href: string) {
    if (/^https?:\/\//.test(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  }

  return (
    // PHASE 3 — Root wrapper + hover listeners.
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-none w-[85vw] sm:w-[350px] md:w-[400px] aspect-square snap-center group overflow-hidden cursor-pointer bg-surface-inverse"
    >
      {/* PHASE 1 — Slow zoom layer: the 1000ms scale wraps the whole flipbook
          stack, decoupled from the 700ms crossfade so the shuffle stays crisp
          while the image gains depth on hover. */}
      <div className="absolute inset-0 transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110">
        {/* PHASE 4 (retained) — Stacked crossfading images, decoded up front. */}
        {images.map((imgSrc, idx) => (
          <Image
            key={idx}
            src={imgSrc}
            alt={`${location.name} view ${idx + 1}`}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 768px) 350px, 400px"
            className={`object-cover transition-opacity duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
              activeImageIdx === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* PHASE 2 — Red spring-glide overlay + staggered reveal. */}
      <div className="absolute inset-0 bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex flex-col items-center justify-center p-6 text-center z-10">
        <h3 className="text-2xl md:text-3xl font-black font-display uppercase text-white mb-6 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
          {location.name}
        </h3>

        <div className="flex flex-col gap-3 w-full max-w-[200px] transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[700ms] delay-[75ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
          <button
            type="button"
            onClick={() => navigate(orderHref)}
            className="w-full bg-white text-accent text-xs font-bold tracking-widest uppercase py-3.5 px-4 hover:bg-surface-inverse hover:text-white transition-colors"
          >
            Order Now
          </button>
          <button
            type="button"
            onClick={() => navigate(deliveryHref)}
            className="w-full bg-transparent border border-white text-white text-xs font-bold tracking-widest uppercase py-3.5 px-4 hover:bg-white hover:text-accent transition-colors"
          >
            Delivery
          </button>
        </div>
      </div>
    </article>
  );
}
