"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { useLocationState } from "@/components/locations/location-state";
import { createLocationMarkerIcon, createSearchMarkerIcon } from "./location-marker";
import { calculateDistance, formatKilometres } from "@/lib/distance";

const NAVY = "#0F1E2D";
const RED = "#C94035";
const WHITE = "#FFFFFF";

/**
 * Operational map for the locations page.
 *
 * Uses Leaflet over OpenStreetMap tiles — no Mapbox token required. The
 * basemap is desaturated via CSS filter to keep it visually quiet so the
 * brand-coloured markers carry the focus.
 *
 * Reads everything it needs from the shared LocationState context:
 * filteredLocations, selectedId, hoveredId, activeCoordinates. Writes
 * back: selectedId on marker click, hoveredId on marker hover.
 *
 * Markers are pure DOM (Leaflet divIcon) so they inherit no Leaflet
 * styling and follow the brand contract strictly: navy 14px dot by
 * default, red 20px dot when selected (with subtle red wash), red 18px
 * dot on hover.
 */
export function LocationsMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const searchMarkerRef = useRef<L.Marker | null>(null);
  const styleElRef = useRef<HTMLStyleElement | null>(null);

  const {
    filteredLocations,
    allLocations,
    selectedId,
    setSelectedId,
    hoveredId,
    setHoveredId,
    activeCoordinates,
    setDirectionsLocationId,
  } = useLocationState();

  // Initialise the map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([51.5074, -0.1278], 11);

    L.control.zoom({ position: "topright" }).addTo(map);
    L.control
      .attribution({ position: "bottomright", prefix: false })
      .addAttribution(
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      )
      .addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Quiet the basemap so the brand markers carry visual weight.
    const style = document.createElement("style");
    style.textContent = `
      .leaflet-tile-container img {
        filter: grayscale(0.85) brightness(1.05) contrast(0.95) saturate(0.6);
      }
      .leaflet-container { background: #f6f4ee; outline: none; }
      .leaflet-control-container { position: relative; z-index: 20; }
      .gbd-marker { display: flex; align-items: center; justify-content: center; cursor: pointer; }
      .gbd-marker-dot {
        display: block; width: 14px; height: 14px; border-radius: 50%;
        background: ${NAVY}; border: 2px solid ${WHITE};
        transition: width 220ms cubic-bezier(0.22,1,0.36,1),
                    height 220ms cubic-bezier(0.22,1,0.36,1),
                    background 220ms ease-out,
                    box-shadow 220ms ease-out;
      }
      .gbd-marker[data-hovered="true"] .gbd-marker-dot { width: 18px; height: 18px; background: ${RED}; }
      .gbd-marker[data-selected="true"] .gbd-marker-dot {
        width: 22px; height: 22px; background: ${RED};
        box-shadow: 0 0 0 6px rgba(201, 64, 53, 0.18);
      }
      .gbd-search-dot {
        display: block; width: 14px; height: 14px; border-radius: 50%;
        background: ${WHITE}; border: 2px solid ${NAVY};
      }
    `;
    document.head.appendChild(style);
    styleElRef.current = style;

    mapRef.current = map;

    const markers = markersRef.current;
    return () => {
      map.remove();
      mapRef.current = null;
      markers.clear();
      if (styleElRef.current && document.head.contains(styleElRef.current)) {
        document.head.removeChild(styleElRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reconcile markers with filteredLocations.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const visibleIds = new Set(filteredLocations.map((l) => l.id));

    // Remove markers that left the visible set.
    markersRef.current.forEach((marker, id) => {
      if (!visibleIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    // Add markers for newly-visible locations.
    filteredLocations.forEach((loc) => {
      if (markersRef.current.has(loc.id)) return;
      const icon = createLocationMarkerIcon(loc.name);
      const marker = L.marker([loc.coordinates.lat, loc.coordinates.lng], { icon });
      marker.on("click", () => {
        setSelectedId(loc.id);
        // Show directions dialog on marker click
        setTimeout(() => setDirectionsLocationId(loc.id), 100);
      });
      marker.on("mouseover", () => setHoveredId(loc.id));
      marker.on("mouseout", () => setHoveredId(null));
      marker.addTo(map);
      markersRef.current.set(loc.id, marker);
    });

    // Default framing — fit all visible markers when no search is active.
    if (!activeCoordinates && filteredLocations.length > 0) {
      const bounds = L.latLngBounds(
        filteredLocations.map(
          (l) => [l.coordinates.lat, l.coordinates.lng] as L.LatLngTuple,
        ),
      );
      if (bounds.isValid()) {
        map.fitBounds(bounds, {
          padding: [60, 60],
          maxZoom: 12,
          animate: true,
          duration: 0.6,
        });
      }
    }
  }, [
    filteredLocations,
    activeCoordinates,
    setSelectedId,
    setHoveredId,
    setDirectionsLocationId,
  ]);

  // Highlight selected + hovered markers.
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement();
      if (!el) return;
      const dotWrap = el.querySelector(".gbd-marker") as HTMLElement | null;
      if (!dotWrap) return;
      dotWrap.dataset.selected = id === selectedId ? "true" : "false";
      dotWrap.dataset.hovered = id === hoveredId ? "true" : "false";
      // Selected marker should sit above the others.
      if (id === selectedId) {
        marker.setZIndexOffset(1000);
      } else if (id === hoveredId) {
        marker.setZIndexOffset(500);
      } else {
        marker.setZIndexOffset(0);
      }
    });
  }, [selectedId, hoveredId]);

  // Fly to selection.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId) return;
    const loc = allLocations.find((l) => l.id === selectedId);
    if (!loc) return;
    map.flyTo([loc.coordinates.lat, loc.coordinates.lng], Math.max(map.getZoom(), 14), {
      animate: true,
      duration: 0.7,
    });
  }, [selectedId, allLocations]);

  // Drop a search-centre marker + frame search + nearest branches.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (searchMarkerRef.current) {
      searchMarkerRef.current.remove();
      searchMarkerRef.current = null;
    }

    if (!activeCoordinates) return;

    const icon = createSearchMarkerIcon();
    const marker = L.marker(
      [activeCoordinates.lat, activeCoordinates.lng],
      { icon, interactive: false },
    ).addTo(map);
    searchMarkerRef.current = marker;

    const nearest = [...allLocations]
      .map((l) => ({
        loc: l,
        d: calculateDistance(
          activeCoordinates.lat,
          activeCoordinates.lng,
          l.coordinates.lat,
          l.coordinates.lng,
        ),
      }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);

    const bounds = L.latLngBounds([
      [activeCoordinates.lat, activeCoordinates.lng],
      ...nearest.map(
        ({ loc }) => [loc.coordinates.lat, loc.coordinates.lng] as L.LatLngTuple,
      ),
    ]);
    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [80, 80],
        maxZoom: 14,
        animate: true,
        duration: 0.7,
      });
    }
  }, [activeCoordinates, allLocations]);

  return (
    <div className="relative z-[10] h-full w-full">
      <div ref={containerRef} className="absolute inset-0" />
      {activeCoordinates && (
        <NearestBranchBanner
          activeCoordinates={activeCoordinates}
          nearest={filteredLocations[0]}
        />
      )}
    </div>
  );
}

function NearestBranchBanner({
  activeCoordinates,
  nearest,
}: {
  activeCoordinates: { lat: number; lng: number };
  nearest: ReturnType<typeof useLocationState>["filteredLocations"][number] | undefined;
}) {
  if (!nearest) return null;
  const distance = calculateDistance(
    activeCoordinates.lat,
    activeCoordinates.lng,
    nearest.coordinates.lat,
    nearest.coordinates.lng,
  );
  return (
    <div className="pointer-events-none absolute left-4 top-4 z-[30] bg-canvas border border-border-strong px-4 py-3">
      <div className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-secondary">
        Nearest Branch
      </div>
      <div className="mt-1 font-display font-bold uppercase tracking-display text-sm text-text-primary">
        {nearest.name}
      </div>
      <div className="mt-1 font-body text-xs text-text-secondary">
        {formatKilometres(distance)} away
      </div>
    </div>
  );
}
