import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Canonical image surface.
 *
 * - Two aspect ratios only: "4/5" (product, location, post card) and
 *   "16/10" (hero, lifestyle).
 * - Sharp corners always (rounded-none).
 * - Optional flat 1px offset border (no shadow) for the editorial layered
 *   look. Premium minimalism: never a drop shadow.
 * - Optional gentle hover zoom (1.02x over 600ms). Off by default.
 */
type ImageRatio = "4/5" | "16/10";

const ratioClasses: Record<ImageRatio, string> = {
  "4/5": "aspect-[4/5]",
  "16/10": "aspect-[16/10]",
};

export interface ImageBlockProps
  extends Omit<ImageProps, "fill" | "width" | "height" | "className"> {
  ratio?: ImageRatio;
  offset?: boolean;
  hoverZoom?: boolean;
  className?: string;
  imageClassName?: string;
}

export function ImageBlock({
  ratio = "4/5",
  offset = false,
  hoverZoom = false,
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
            hoverZoom &&
              "transition-transform duration-600 ease-smooth group-hover:scale-[1.02]",
            imageClassName,
          )}
        />
      </div>
    </div>
  );
}
