"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CTAButton } from "@/components/ui/cta-button";
import type { Location } from "@/domain/location";
import { calculateDistance, formatKilometres } from "@/lib/distance";
import { cn } from "@/lib/utils";

type LocatedBranch = {
  location: Location;
  distance: number | null;
};

export function AlwaysOnTheMoveSection({ locations }: { locations: Location[] }) {
  const fallbackBranch = useMemo<LocatedBranch | null>(() => {
    const flagship = locations.find((location) => location.isFlagship);
    const location = flagship ?? locations[0];
    return location ? { location, distance: null } : null;
  }, [locations]);

  const [nearestBranch, setNearestBranch] = useState<LocatedBranch | null>(
    fallbackBranch,
  );
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const activeLocation = nearestBranch?.location ?? fallbackBranch?.location ?? null;
  const distanceLabel =
    nearestBranch?.distance !== null && nearestBranch?.distance !== undefined
      ? formatKilometres(nearestBranch.distance)
      : null;

  const collectionLink = activeLocation?.clickAndCollectUrl ?? null;
  const mapLink = activeLocation
    ? `https://www.google.com/maps/search/?api=1&query=${activeLocation.coordinates.lat},${activeLocation.coordinates.lng}`
    : "/locations";

  function handleFindNearest() {
    setGeoError(null);

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoError("Geolocation is not supported.");
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearest = [...locations]
          .map((location) => ({
            location,
            distance: calculateDistance(
              latitude,
              longitude,
              location.coordinates.lat,
              location.coordinates.lng,
            ),
          }))
          .sort((a, b) => a.distance - b.distance)[0];

        if (nearest) {
          setNearestBranch(nearest);
        }
        setGeoLoading(false);
      },
      (error) => {
        if (error.code === 1) {
          setGeoError("Please enable location access in your browser settings.");
        } else if (error.code === 2) {
          setGeoError("Unable to retrieve your location. Please try again.");
        } else if (error.code === 3) {
          setGeoError("Location request timed out. Please try again.");
        } else {
          setGeoError("Unable to access your location.");
        }
        setGeoLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }

  return (
    <section className="relative overflow-hidden border-t border-border-hairline bg-canvas py-16 lg:py-24 text-text-primary">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="flex flex-col lg:col-span-6">
          <span className="font-display text-[11px] font-bold uppercase tracking-eyebrow text-accent">
            City Ready
          </span>
          <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.9] text-text-primary">
            Always On The Move
          </h2>
          <div className="mt-7 max-w-[58ch] space-y-4 font-body text-base leading-relaxed text-text-secondary md:text-lg">
            <p className="text-xl font-semibold text-text-primary md:text-2xl">
              Big flavour, wherever the city takes you.
            </p>
            <p>
              From busy lunch breaks to late-night cravings, Great British
              Doner is always close by with freshly made wraps, loaded boxes,
              and street food done properly.
            </p>
            <p>
              Find your nearest location and order your favourites on the go.
            </p>
          </div>

          <div className="mt-9 w-full max-w-xl">
            <NearestBranchPanel
              location={activeLocation}
              distanceLabel={distanceLabel}
              geoLoading={geoLoading}
              geoError={geoError}
              onFindNearest={handleFindNearest}
              mapLink={mapLink}
              collectionLink={collectionLink}
            />
          </div>
        </div>

        <div className="lg:col-span-6">
          <CityMotionVisual location={activeLocation} distanceLabel={distanceLabel} />
        </div>
      </div>
    </section>
  );
}

function NearestBranchPanel({
  location,
  distanceLabel,
  geoLoading,
  geoError,
  onFindNearest,
  mapLink,
  collectionLink,
}: {
  location: Location | null;
  distanceLabel: string | null;
  geoLoading: boolean;
  geoError: string | null;
  onFindNearest: () => void;
  mapLink: string;
  collectionLink: string | null;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex min-h-24 items-center gap-4 rounded-[8px] border border-border-hairline bg-white p-4 shadow-[0_10px_30px_rgba(15,30,45,0.08)] sm:p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <PinIcon />
        </div>
        <div className="min-w-0">
          <p className="font-display text-[11px] font-bold uppercase tracking-button text-text-secondary">
            {distanceLabel ? "Nearest Location" : "Featured Location"}
          </p>
          <p className="mt-1 truncate font-display text-sm font-bold uppercase tracking-display text-text-primary sm:text-base">
            {location ? location.name.replace(" - ", " — ") : "Find your nearest GBD"}
          </p>
          <p className="mt-1 font-body text-xs text-text-secondary">
            {location
              ? `${location.addressLine1}, ${location.city} ${location.postcode}`
              : "Allow location access to show your closest branch."}
          </p>
          {distanceLabel && (
            <p className="mt-2 font-display text-[11px] font-bold uppercase tracking-button text-accent">
              {distanceLabel} away
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onFindNearest}
        disabled={geoLoading}
        className="inline-flex h-14 w-full items-center justify-center rounded-[8px] bg-surface-inverse px-6 font-display text-xs font-bold uppercase tracking-button text-white transition-colors duration-300 ease-smooth hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {geoLoading ? "Finding Nearest" : "Find Nearest Location"}
      </button>

      {geoError && (
        <p className="font-body text-sm text-accent" role="status">
          {geoError}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {collectionLink && (
          <CTAButton href={collectionLink} external size="md">
            Collection
          </CTAButton>
        )}
        <CTAButton href={mapLink} external={/^https?:\/\//.test(mapLink)} variant="tertiary">
          Open Map
        </CTAButton>
      </div>
    </div>
  );
}

function CityMotionVisual({
  location,
  distanceLabel,
}: {
  location: Location | null;
  distanceLabel: string | null;
}) {
  const imageSrc = location?.imageUrl ?? "/locations/Piccadilly.png";
  const label = location?.city ?? "GBD";

  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-[8px] border border-white bg-white shadow-[0_20px_60px_rgba(15,30,45,0.16)] md:min-h-[520px]">
      <Image
        src={imageSrc}
        alt={location ? `${location.name} location` : "Great British Doner location"}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.86)_0%,rgba(255,255,255,0.66)_36%,rgba(15,30,45,0.18)_100%)]" />

      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="relative h-[330px] w-[180px] rounded-[34px] border-[7px] border-white bg-canvas shadow-[0_24px_50px_rgba(15,30,45,0.28)] md:h-[420px] md:w-[230px]">
          <div className="absolute left-1/2 top-2 h-4 w-20 -translate-x-1/2 rounded-full bg-surface-inverse/20" />
          <div className="absolute inset-x-4 bottom-4 top-8 overflow-hidden rounded-[24px]" style={{ backgroundColor: "#f7f1e8" }}>
            <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(28deg,transparent_0_44%,rgba(15,30,45,0.14)_45%,rgba(15,30,45,0.14)_47%,transparent_48%),linear-gradient(118deg,transparent_0_48%,rgba(15,30,45,0.12)_49%,rgba(15,30,45,0.12)_51%,transparent_52%),linear-gradient(0deg,rgba(15,30,45,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,30,45,0.08)_1px,transparent_1px)] [background-size:160px_120px,140px_160px,34px_34px,34px_34px]" />
            <div className="absolute left-1/2 top-[42%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-[0_14px_32px_rgba(201,64,53,0.35)]">
              <PinIcon className="h-8 w-8" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 border-t border-border-hairline bg-white/92 p-4">
              <p className="font-display text-[10px] font-bold uppercase tracking-button text-accent">
                {label}
              </p>
              <p className="mt-1 truncate font-display text-xs font-bold uppercase tracking-display text-text-primary">
                {location ? location.name.replace(" - ", " — ") : "Find your branch"}
              </p>
              <p className="mt-1 font-body text-[11px] text-text-secondary">
                {distanceLabel ?? "Fresh wraps, boxes and street food nearby."}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 right-8 hidden items-center justify-between border border-border-hairline bg-white/90 px-5 py-4 shadow-[0_12px_32px_rgba(15,30,45,0.12)] backdrop-blur md:flex">
          <div>
            <p className="font-display text-[10px] font-bold uppercase tracking-button text-text-secondary">
              Live branch
            </p>
            <p className="mt-1 font-display text-sm font-bold uppercase tracking-display text-text-primary">
              {location ? location.name.replace(" - ", " — ") : "Great British Doner"}
            </p>
          </div>
          <span className="h-3 w-3 rounded-full bg-accent" aria-hidden />
        </div>
      </div>
    </div>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-5 w-5", className)}
    >
      <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
