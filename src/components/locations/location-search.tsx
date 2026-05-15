"use client";

import { useState, useEffect, useRef } from "react";
import { calculateDistance } from "@/lib/distance";
import { geocodeLocation } from "@/lib/geocoding";
import type { Location } from "@/domain/location";

export function LocationSearch({
  locations,
  onSearch,
  onUseMyLocation,
  onFilterChange,
  activeFilter,
}: {
  locations: Location[];
  onSearch: (searchTerm: string) => void;
  onUseMyLocation: (closestLocation: Location) => void;
  onFilterChange: (city: string | null) => void;
  activeFilter: string | null;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isGeocodingSearch, setIsGeocodingSearch] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout>();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);

    // Clear previous debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Debounce the geocoding search
    if (term.trim()) {
      setIsGeocodingSearch(true);
      debounceTimer.current = setTimeout(async () => {
        const result = await geocodeLocation(term);
        if (result) {
          // Find the closest location to the geocoded coordinates
          let closestLocation = locations[0];
          let closestDistance = calculateDistance(
            result.lat,
            result.lng,
            closestLocation.coordinates.lat,
            closestLocation.coordinates.lng
          );

          for (let i = 1; i < locations.length; i++) {
            const distance = calculateDistance(
              result.lat,
              result.lng,
              locations[i].coordinates.lat,
              locations[i].coordinates.lng
            );
            if (distance < closestDistance) {
              closestDistance = distance;
              closestLocation = locations[i];
            }
          }

          onUseMyLocation(closestLocation);
        }
        setIsGeocodingSearch(false);
      }, 1000);
    } else {
      setIsGeocodingSearch(false);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleUseMyLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Find the closest location
        let closestLocation = locations[0];
        let closestDistance = calculateDistance(
          latitude,
          longitude,
          closestLocation.coordinates.lat,
          closestLocation.coordinates.lng
        );

        for (let i = 1; i < locations.length; i++) {
          const distance = calculateDistance(
            latitude,
            longitude,
            locations[i].coordinates.lat,
            locations[i].coordinates.lng
          );
          if (distance < closestDistance) {
            closestDistance = distance;
            closestLocation = locations[i];
          }
        }

        setSearchTerm("");
        onUseMyLocation(closestLocation);
        setIsLoadingLocation(false);
      },
      (error) => {
        setLocationError("Unable to access your location. Please try again.");
        setIsLoadingLocation(false);
      }
    );
  };

  return (
    <div className="p-6 border-b border-gbd-navy/10 bg-gbd-cream/30">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search location or enter postcode..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 border border-gbd-navy/20 rounded-lg text-gbd-navy placeholder-gbd-navy/40 focus:outline-none focus:border-gbd-red focus:ring-2 focus:ring-gbd-red/20"
          />
          {isGeocodingSearch && (
            <div className="absolute right-3 top-3 text-sm text-gbd-navy/60">
              Searching...
            </div>
          )}
        </div>
        <button
          onClick={handleUseMyLocation}
          disabled={isLoadingLocation}
          className="px-6 py-3 bg-gbd-red text-white rounded-lg font-semibold hover:bg-gbd-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {isLoadingLocation ? "Finding..." : "Use My Location"}
        </button>
      </div>
      {locationError && (
        <div className="mt-2 text-sm text-red-600">{locationError}</div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange(activeFilter === "London" ? null : "London")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeFilter === "London"
              ? "bg-gbd-red text-white"
              : "bg-gbd-navy/10 text-gbd-navy hover:bg-gbd-navy/20"
          }`}
        >
          London
        </button>
        <button
          onClick={() => onFilterChange(activeFilter === "Manchester" ? null : "Manchester")}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activeFilter === "Manchester"
              ? "bg-gbd-red text-white"
              : "bg-gbd-navy/10 text-gbd-navy hover:bg-gbd-navy/20"
          }`}
        >
          Manchester
        </button>
      </div>
    </div>
  );
}
