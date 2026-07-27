"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Location } from "@/domain/location";
import { siteConfig } from "@/lib/config";

/**
 * OutletFlipCard — physical 3D "photograph stack" + red spring-glide reveal.
 *
 * Image system (NOT a slideshow/crossfade): each outlet's two photos are real
 * 3D planes inside a perspective stage. The front photo sits flat
 * (rotateX(0) translateZ(0)); the second sits deep behind it, hinged back
 * (rotateX(-75deg) translateZ(-120px)). On hover the two planes physically
 * swap front/back roles over a luxurious 900ms transform, looping every
 * 1900ms (900ms swap + 1000ms hold) while the cursor stays. On exit the loop
 * stops and the stack eases back to its default (photo 1 in front). The depth
 * comes entirely from real 3D transforms — opacity is never the effect.
 *
 * Depth / perf: perspective on the card, preserve-3d on the stage, backface-
 * visibility + will-change on each plane → GPU-composited. No per-frame React
 * work: state changes only on swap/hover (~once / 1.9s), and the flip lives in
 * an isolated <PhotoStack> so swaps never re-render the overlay/CTAs. Honours
 * prefers-reduced-motion (static front photo, no auto-swap).
 *
 * Brand: red overlay (bg-accent/90) + white content over a navy base — all
 * real GBD tokens, no raw/off-brand hex.
 */
const FALLBACK_IMAGE = "/logo/gbd-logo.png";
/** 900ms swap animation + 1000ms hold between swaps. */
const SWAP_INTERVAL_MS = 1900;

export function OutletFlipCard({ location }: { location: Location }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  // Stable, non-empty pair: the two paired photos, falling back to the single
  // imageUrl, then the brand logo, so the stack never renders `undefined`.
  const images = useMemo(
    () =>
      location.images && location.images.length > 0
        ? location.images
        : [location.imageUrl ?? FALLBACK_IMAGE],
    [location.images, location.imageUrl],
  );

  const orderHref = location.clickAndCollectUrl ?? siteConfig.orderUrl;

  function navigate(href: string) {
    if (/^https?:\/\//.test(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  }

  return (
    // Perspective stage. overflow-hidden stays on the article (perspective
    // parent); preserve-3d lives on the inner stack so the 3D isn't flattened.
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-none w-[85vw] sm:w-[350px] md:w-[400px] aspect-square snap-center group overflow-hidden cursor-pointer bg-surface-inverse [perspective:1800px]"
    >
      {/* Image system — physical 3D photograph stack. */}
      <PhotoStack images={images} title={location.name.replace(" - ", " — ")} isHovered={isHovered} />

      {/* Red spring-glide overlay + staggered reveal (unchanged). */}
      <div className="absolute inset-0 bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] ease-out flex flex-col items-center justify-center p-6 text-center z-10 pointer-events-none group-hover:pointer-events-auto">
        <h3 className="text-2xl md:text-3xl font-black font-display uppercase text-white mb-6 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
          {location.name.replace(" - ", " — ")}
        </h3>

        <div className="flex flex-col gap-3 w-full max-w-[200px] transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[700ms] delay-[75ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
          <button
            type="button"
            onClick={() => navigate(orderHref)}
            className="w-full bg-white text-accent text-xs font-bold tracking-widest uppercase py-3.5 px-4 hover:bg-surface-inverse hover:text-white transition-colors"
          >
            Order Now
          </button>
        </div>
      </div>
    </article>
  );
}

/**
 * PhotoStack — the two-photo 3D stack. Isolated from the parent so a swap
 * (state change) only re-renders the planes, never the overlay/CTAs.
 */
function PhotoStack({
  images,
  title,
  isHovered,
}: {
  images: string[];
  title: string;
  isHovered: boolean;
}) {
  // Index (0 | 1) of the photo currently in front.
  const [frontIdx, setFrontIdx] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Idle, single image, or reduced-motion → hold (or ease back to) photo 1.
    if (!isHovered || images.length < 2 || prefersReduced) {
      setFrontIdx(0);
      return;
    }

    // First swap begins immediately for an instant cinematic response, then
    // keeps swapping every 1900ms (900ms swap + 1000ms hold).
    setFrontIdx((prev) => (prev === 0 ? 1 : 0));
    const id = setInterval(() => {
      setFrontIdx((prev) => (prev === 0 ? 1 : 0));
    }, SWAP_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isHovered, images.length]);

  return (
    <div className="absolute inset-0 [transform-style:preserve-3d]">
      {images.slice(0, 2).map((src, idx) => {
        const isFront = frontIdx === idx;
        return (
          <div
            key={idx}
            className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] [backface-visibility:hidden] [will-change:transform]"
            style={{
              transform: isFront
                ? "rotateX(0deg) translateZ(0px)"
                : "rotateX(-75deg) translateZ(-120px)",
            }}
          >
            <Image
              src={src}
              alt={`${title} view ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 85vw, (max-width: 768px) 350px, 400px"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
