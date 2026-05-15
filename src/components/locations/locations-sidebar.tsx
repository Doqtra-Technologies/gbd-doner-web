"use client";

import { useEffect, useRef } from "react";
import { useLocationState } from "@/components/locations/location-state";
import { LocationSearch } from "@/components/locations/location-search";
import { LocationFilters } from "@/components/locations/location-filters";
import { LocationListItem } from "@/components/locations/location-list-item";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Left panel of the locations split-screen.
 *
 * Composition:
 *   [ Search           ]
 *   [ City filters     ]
 *   [ Result count     ]
 *   [ Scrollable list  ] ← independently scrollable; map stays sticky
 *
 * When the user selects a branch (via map or by clicking another list item),
 * that item scrolls into view inside the sidebar.
 */
export function LocationsSidebar() {
  const { filteredLocations, selectedId } = useLocationState();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedId || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(
      `[data-location-id="${selectedId}"]`,
    );
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedId]);

  return (
    <aside className="flex h-full flex-col bg-canvas">
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="sticky top-0 z-[30] border-b border-border-hairline bg-canvas/95 px-5 pb-4 pt-6 backdrop-blur sm:px-6 lg:px-6 lg:pt-20">
          <Eyebrow tone="accent" className="block mb-2">
            Locations
          </Eyebrow>
          <h1 className="font-display font-bold uppercase tracking-display text-xl text-text-primary">
            Find your nearest branch.
          </h1>
          <p className="mt-2 font-body text-sm text-text-secondary">
            For pickup or delivery. Search by postcode, area, or address.
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

        <div
          ref={listRef}
          className="space-y-2 px-5 py-4 sm:px-6 lg:px-6"
          role="list"
        >
          {filteredLocations.length === 0 ? (
            <p className="font-body text-sm text-text-disabled py-8 text-center">
              No locations match your search.
            </p>
          ) : (
            filteredLocations.map((loc) => (
              <div key={loc.id} data-location-id={loc.id} role="listitem">
                <LocationListItem location={loc} />
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
