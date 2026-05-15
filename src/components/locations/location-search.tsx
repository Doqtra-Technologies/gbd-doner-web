"use client";

import { useState } from "react";
import { useLocationState } from "@/components/locations/location-state";
import { calculateDistance } from "@/lib/distance";

/**
 * Operational search input.
 *
 * Reads/writes query through LocationState (debounced geocoding lives in
 * the provider). Exposes an optional "Use my location" affordance that
 * resolves the device geolocation, finds the nearest branch, and selects it.
 */
export function LocationSearch() {
  const { query, setQuery, isSearching, allLocations, setSelectedId } =
    useLocationState();
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const handleUseMyLocation = () => {
    setGeoError(null);
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearest = [...allLocations]
          .map((l) => ({
            loc: l,
            d: calculateDistance(
              latitude,
              longitude,
              l.coordinates.lat,
              l.coordinates.lng,
            ),
          }))
          .sort((a, b) => a.d - b.d)[0];
        if (nearest) setSelectedId(nearest.loc.id);
        setGeoLoading(false);
      },
      () => {
        setGeoError("Unable to access your location.");
        setGeoLoading(false);
      },
      { enableHighAccuracy: false, timeout: 8000 },
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-3 border-b border-border-strong py-1.5">
        {isSearching ? <SpinnerIcon /> : <SearchIcon />}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by location or address"
          className="w-full bg-transparent font-body text-sm text-text-primary placeholder:text-text-disabled focus:outline-none"
          aria-label="Search locations"
        />
      </label>

      <button
        type="button"
        onClick={handleUseMyLocation}
        disabled={geoLoading}
        className="inline-flex items-center gap-2 self-start font-display font-bold uppercase tracking-button text-[11px] text-text-primary transition-colors duration-300 ease-smooth hover:text-accent disabled:opacity-50"
      >
        <PinIcon />
        {geoLoading ? "Locating…" : "Use my location"}
      </button>

      {geoError && (
        <p className="font-body text-xs text-text-secondary" role="status">
          {geoError}
        </p>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-text-primary"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="animate-spin h-4 w-4 text-text-primary"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
