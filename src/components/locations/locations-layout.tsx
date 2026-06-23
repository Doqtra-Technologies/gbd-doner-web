"use client";

import dynamic from "next/dynamic";
import { useCallback } from "react";
import { LocationStateProvider, useLocationState } from "@/components/locations/location-state";
import { LocationsSidebar } from "@/components/locations/locations-sidebar";
import { DirectionsDialog } from "@/components/ui/directions-dialog";
import type { Location } from "@/domain/location";
import type { LocationsPageSettings } from "@/domain/site-settings";
import { LOCATIONS_PAGE_DEFAULTS } from "@/data/repositories/site-settings-repository";

/**
 * Operational locations surface.
 *
 * Desktop (lg+):
 *   40% sidebar / 60% map split, both pinned to the viewport so the user
 *   can scan branches without losing the map. Sidebar scrolls
 *   independently; map stays stationary.
 *
 * Mobile / tablet:
 *   1. Compact search + filters
 *   2. Map preview (capped at ~50vh — does not dominate)
 *   3. Vertically-stacked branch cards
 *
 * The split-screen is wrapped in <LocationStateProvider> which owns:
 * query, search coordinates, filter, selectedId, hoveredId. All children
 * read/write via the useLocationState hook — no prop drilling.
 *
 * The map is dynamically imported with SSR disabled (Leaflet expects
 * window). A neutral placeholder preserves layout while the bundle loads.
 */
const LocationsMap = dynamic(
  () =>
    import("@/components/locations/locations-map").then((m) => m.LocationsMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-border-hairline animate-pulse" />
    ),
  },
);

export function LocationsLayout({
  locations,
  pageSettings = LOCATIONS_PAGE_DEFAULTS,
}: {
  locations: Location[];
  pageSettings?: LocationsPageSettings;
}) {
  return (
    <LocationStateProvider locations={locations}>
      <LocationsLayoutInner pageSettings={pageSettings} />
    </LocationStateProvider>
  );
}

function LocationsLayoutInner({ pageSettings }: { pageSettings: LocationsPageSettings }) {
  const { directionsLocationId, setDirectionsLocationId, allLocations } =
    useLocationState();

  const selectedLocation = allLocations.find(
    (l) => l.id === directionsLocationId,
  );

  const handleDirectionsConfirm = useCallback(() => {
    if (!selectedLocation) return;
    const { coordinates, name } = selectedLocation;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}&destination_place_id=${name}`;
    window.open(url, "_blank");
    setDirectionsLocationId(null);
  }, [selectedLocation, setDirectionsLocationId]);

  return (
    <>
      <main className="mt-16 lg:mt-20 flex min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)] w-screen flex-col md:flex-row md:h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] md:overflow-hidden bg-canvas min-w-0 min-h-0">
        <LocationsSidebar pageSettings={pageSettings} />

        {/* Map — preview on mobile, fullscreen on desktop */}
        <div className="order-2 md:order-none relative z-[10] flex-none h-[35vh] sm:h-[40vh] md:flex-1 md:h-full min-w-0 min-h-0 md:overflow-hidden">
          <LocationsMap />
        </div>
      </main>

      {selectedLocation && (
        <DirectionsDialog
          isOpen={directionsLocationId !== null}
          locationName={selectedLocation.name.replace(" - ", " — ")}
          onClose={() => setDirectionsLocationId(null)}
          onConfirm={handleDirectionsConfirm}
        />
      )}
    </>
  );
}
