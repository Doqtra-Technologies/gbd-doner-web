"use client";

import { useState } from "react";
import { useLocationState } from "@/components/locations/location-state";
import { calculateDistance, formatKilometres } from "@/lib/distance";

/**
 * Operational search input.
 *
 * Features:
 * - Global address search with automatic geocoding
 * - "Use my location" button to find nearest outlet
 * - Displays distance to nearest outlet after search/geolocation
 * - Improved error handling and user feedback
 */
export function LocationSearch() {
  const {
    query,
    setQuery,
    isSearching,
    allLocations,
    selectedId,
    setSelectedId,
    setUserCoordinates,
    activeCoordinates,
  } = useLocationState();
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const handleUseMyLocation = () => {
    setGeoError(null);
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoError(
        "Geolocation not supported. Try searching for a location instead."
      );
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoordinates({ lat: latitude, lng: longitude });
        setQuery("");

        // Find the nearest outlet
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

        if (nearest) {
          setSelectedId(nearest.loc.id);
        }
        setGeoLoading(false);
      },
      (error) => {
        // More detailed error messages based on geolocation error code
        if (error.code === 1) {
          setGeoError(
            "Please enable location access in your browser settings."
          );
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
        maximumAge: 300000, // Cache location for 5 minutes
      }
    );
  };

  // Get the nearest location for distance display
  const nearestLocation =
    activeCoordinates && allLocations.length > 0
      ? [...allLocations]
          .map((l) => ({
            loc: l,
            d: calculateDistance(
              activeCoordinates.lat,
              activeCoordinates.lng,
              l.coordinates.lat,
              l.coordinates.lng,
            ),
          }))
          .sort((a, b) => a.d - b.d)[0]
      : null;

  const nearestDistance =
    nearestLocation ? formatKilometres(nearestLocation.d) : null;

  return (
    <div className="flex flex-col gap-3">
      <label className="flex h-12 items-center gap-3 border-b border-border-strong px-1">
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

      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={geoLoading}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-border-hairline px-3 font-display font-bold uppercase tracking-button text-[11px] text-text-primary transition-all duration-300 ease-smooth hover:border-border-strong hover:text-accent disabled:opacity-50"
          title="Find the nearest outlet to your current location"
        >
          <PinIcon />
          {geoLoading ? "Locating…" : "Find Nearest"}
        </button>

        {nearestDistance && (
          <span className="font-display font-bold uppercase tracking-button text-[11px] text-accent px-2 py-1 bg-accent/10 rounded-full">
            Nearest: {nearestDistance} away
          </span>
        )}
      </div>

      {geoError && (
        <p className="font-body text-xs text-red-600" role="status">
          ⚠️ {geoError}
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
