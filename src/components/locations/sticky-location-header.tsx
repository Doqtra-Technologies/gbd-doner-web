"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { LocationSearch } from "@/components/locations/location-search";
import { LocationFilters } from "@/components/locations/location-filters";
import { useLocationState } from "@/components/locations/location-state";
import { cn } from "@/lib/utils";

export function StickyLocationHeader({ className }: { className?: string }) {
  const { filteredLocations } = useLocationState();

  return (
    <div
      className={cn(
        "sticky top-0 z-[30] shrink-0 border-b border-border-hairline bg-canvas/95 px-5 pb-4 pt-5 backdrop-blur sm:px-6 lg:px-6",
        className,
      )}
    >
      <Eyebrow tone="accent" className="block mb-2">
        Locations
      </Eyebrow>
      <p className="font-display font-bold uppercase tracking-display text-sm text-text-primary">
        Find your nearest branch for pickup or delivery.
      </p>

      <div className="mt-4 space-y-3">
        <LocationSearch />
        <LocationFilters />
      </div>

      <div className="mt-3 font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-secondary">
        {filteredLocations.length}
        {filteredLocations.length === 1 ? " branch" : " branches"}
      </div>
    </div>
  );
}
