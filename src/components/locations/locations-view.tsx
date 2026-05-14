"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { LocationCard } from "@/components/locations/location-card";
import type { Location } from "@/domain/location";

const LocationsMap = dynamic(
  () => import("@/components/locations/locations-map").then((m) => m.LocationsMap),
  { ssr: false, loading: () => <div className="aspect-[4/3] lg:aspect-auto lg:h-full bg-gbd-cream" /> },
);

export function LocationsView({ locations }: { locations: Location[] }) {
  const [activeId, setActiveId] = useState<string | null>(locations[0]?.id ?? null);

  return (
    <div className="grid lg:grid-cols-2 lg:min-h-[calc(100vh-4rem)]">
      <div className="order-2 lg:order-1 divide-y divide-gbd-navy/10 overflow-y-auto">
        {locations.map((loc) => (
          <LocationCard
            key={loc.id}
            location={loc}
            active={activeId === loc.id}
            onSelect={() => setActiveId(loc.id)}
          />
        ))}
      </div>
      <div className="order-1 lg:order-2 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
        <LocationsMap
          locations={locations}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>
    </div>
  );
}
