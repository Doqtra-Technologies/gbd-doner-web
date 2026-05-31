import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Canonical image surface.
 *
 * Editorial photography contract:
 *  - Sharp corners (rounded-none) — never softened.
 *  - Optional flat 1px offset border for the layered editorial look.
 *  - Universal cinematic warmth via CSS filter — slightly raised
 *    contrast + saturation, slightly reduced brightness — applied
 *    invariantly so every photograph reads as part of one shoot.
 *  - Optional gentle hover drift (1.02x over 1100ms) — slow, atmospheric;
 *    never zoomy.
 *
 * Two aspect ratios only: "4/5" (product, location, post card) and
 * "16/10" (hero, lifestyle).
 */
type ImageRatio = "4/5" | "16/10";

const ratioClasses: Record<ImageRatio, string> = {
  "4/5": "aspect-[4/5]",
  "16/10": "aspect-[16/10]",
};

/**
 * Cinematic warmth.
 *
 * `contrast(1.04)` lifts the blacks slightly (charcoal feel).
 * `saturate(1.06)` warms reds/browns without hue-shifting.
 * `brightness(0.99)` knocks the highlights back a fraction so plates
 * read as plated, not as blown-out studio shots.
 *
 * Applied uniformly so every image — Unsplash placeholder or future
 * commissioned shoot — reads from the same colour register.
 */
const CINEMATIC_FILTER = "[filter:contrast(1.04)_saturate(1.06)_brightness(0.99)]";

export interface ImageBlockProps
  extends Omit<ImageProps, "fill" | "width" | "height" | "className"> {
  ratio?: ImageRatio;
  offset?: boolean;
  hoverZoom?: boolean;
  /** Disable the cinematic warmth filter for diagnostic/logo contexts. */
  raw?: boolean;
  className?: string;
  imageClassName?: string;
}

export function ImageBlock({
  ratio = "4/5",
  offset = false,
  hoverZoom = false,
  raw = false,
  className,
  imageClassName,
  alt,
  sizes,
  ...imageProps
}: ImageBlockProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {offset && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 border border-border-strong"
        />
      )}
      <div className={cn("relative w-full overflow-hidden", ratioClasses[ratio])}>
        <Image
          {...imageProps}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          className={cn(
            "rounded-none object-cover",
            !raw && CINEMATIC_FILTER,
            hoverZoom &&
              "transition-transform duration-[1200ms] ease-smooth group-hover:scale-105",
            imageClassName,
          )}
        />
      </div>
    </div>
  );
}
