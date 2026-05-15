import Link from "next/link";
import { ImageBlock } from "@/components/ui/image-block";
import { Heading } from "@/components/ui/heading";
import { CTAButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";
import type { Location, OpeningHours } from "@/domain/location";

/**
 * Canonical location card.
 *
 * Sizes:
 *   compact — used in the homepage slider. Image + name + city only.
 *   full    — used on the locations page grid. Adds grouped hours, phone,
 *             and "View Directions" tertiary CTA.
 *
 * Image treatment shared: 4/5 ratio, sharp corners, offset border for the
 * editorial layered look. No drop shadow.
 */
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80";

export interface LocationCardProps {
  location: Location;
  size?: "compact" | "full";
  className?: string;
}

export function LocationCard({
  location,
  size = "full",
  className,
}: LocationCardProps) {
  const compact = size === "compact";

  const imageBlock = (
    <ImageBlock
      ratio="4/5"
      offset
      src={location.imageUrl ?? FALLBACK_IMAGE}
      alt={location.name}
      sizes={
        compact
          ? "(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 360px"
          : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      }
    />
  );

  if (compact) {
    return (
      <Link
        href={`/locations#${location.slug}`}
        aria-label={location.name}
        className={cn("group block w-full", className)}
      >
        {imageBlock}
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <span className="font-display font-bold uppercase tracking-display text-base text-text-primary">
            {location.name}
          </span>
          <span className="font-body text-xs text-text-secondary">
            {location.city}
          </span>
        </div>
      </Link>
    );
  }

  const hoursLines = summarizeHours(location.hours);
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;

  return (
    <article
      id={location.slug}
      className={cn("flex flex-col items-center text-center", className)}
    >
      {imageBlock}

      <Heading level={3} className="mt-6">
        {location.name}
      </Heading>

      <div className="mt-3 space-y-1">
        {hoursLines.map((line) => (
          <p key={line} className="font-body text-sm text-text-secondary">
            {line}
          </p>
        ))}
        {location.phone && (
          <p className="font-body text-sm text-text-secondary">
            {location.phone}
          </p>
        )}
      </div>

      <CTAButton
        variant="tertiary"
        href={directionsHref}
        external
        className="mt-4"
      >
        View Directions
      </CTAButton>
    </article>
  );
}

const DAY_ORDER: OpeningHours["day"][] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

function summarizeHours(hours: OpeningHours[]): string[] {
  if (!hours.length) return [];
  const byDay = new Map(hours.map((h) => [h.day, h]));
  const sorted = DAY_ORDER.filter((d) => byDay.has(d)).map((d) => byDay.get(d)!);

  const lines: string[] = [];
  let i = 0;
  while (i < sorted.length) {
    const start = sorted[i];
    let j = i;
    while (
      j + 1 < sorted.length &&
      sorted[j + 1].open === start.open &&
      sorted[j + 1].close === start.close
    ) {
      j++;
    }
    const range = i === j ? start.day : `${start.day} - ${sorted[j].day}`;
    lines.push(`${range}: ${start.open} - ${start.close}`);
    i = j + 1;
  }
  return lines;
}
