"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import type { Location } from "@/domain/location";

interface LocationsMapProps {
  locations: Location[];
  selectedLocationId?: string | null;
  filter: string;
  allLocations: Location[];
}

export function LocationsMap({
  locations,
  selectedLocationId,
  filter,
  allLocations,
}: LocationsMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<Map<string, L.Marker>>(new Map());
  const markerGroup = useRef<L.FeatureGroup | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Initialize map once
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    // Initialize map centered on London
    map.current = L.map(mapContainer.current).setView([51.5074, -0.1278], 11);

    // Add OpenStreetMap tile layer with aesthetic filters
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Apply CSS filter to tiles
    const style = document.createElement("style");
    style.textContent = `
      .leaflet-tile-container img {
        filter: brightness(1.1) contrast(0.9) saturate(0.75) !important;
      }
    `;
    document.head.appendChild(style);

    // Create marker group
    markerGroup.current = L.featureGroup().addTo(map.current);

    setIsMapReady(true);

    return () => {
      // Cleanup
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      document.head.removeChild(style);
    };
  }, []);

  // Create or update markers based on filtered locations
  useEffect(() => {
    if (!map.current || !markerGroup.current || !isMapReady) return;

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current.clear();
    markerGroup.current.clearLayers();

    // Create red icon for regular markers
    const redIcon = L.icon({
      iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23dc2626'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z'/%3E%3C/svg%3E",
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28],
    });

    // Create blue icon for selected marker
    const blueIcon = L.icon({
      iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233b82f6'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z'/%3E%3C/svg%3E",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Add markers for all filtered locations
    locations.forEach((location) => {
      if (!location.coordinates.lat || !location.coordinates.lng) return;

      const isSelected = location.id === selectedLocationId;
      const icon = isSelected ? blueIcon : redIcon;

      const marker = L.marker([location.coordinates.lat, location.coordinates.lng], {
        icon,
      });

      const popupContent = `
        <div class="font-body text-sm max-w-xs">
          <p class="font-semibold text-text-primary">${location.name}</p>
          <p class="text-text-secondary text-xs">${location.addressLine1}</p>
          <p class="text-text-secondary text-xs">${location.city}, ${location.postcode}</p>
          ${location.phone ? `<p class="text-text-secondary text-xs mt-1">${location.phone}</p>` : ""}
        </div>
      `;

      marker.bindPopup(popupContent);

      if (isSelected) {
        marker.openPopup();
      }

      marker.addTo(markerGroup.current!);
      markers.current.set(location.id, marker);
    });
  }, [locations, isMapReady, selectedLocationId]);

  // Handle location selection - zoom to selected marker
  useEffect(() => {
    if (!selectedLocationId || !map.current || !isMapReady) return;

    const marker = markers.current.get(selectedLocationId);
    if (marker) {
      const latLng = marker.getLatLng();
      // Smooth zoom animation with fast duration
      map.current.setView(latLng, 16, { 
        animate: true, 
        duration: 0.8,
        easeLinearity: 0.5
      });
      // Open popup with slight delay for animation
      setTimeout(() => marker.openPopup(), 200);
    }
  }, [selectedLocationId, isMapReady]);

  // Handle city filter - zoom to show all locations of that city
  useEffect(() => {
    if (!map.current || !markerGroup.current || !isMapReady) return;

    // If "all" filter, zoom to show all locations
    if (filter === "all" && locations.length > 0) {
      const bounds = L.latLngBounds(
        locations
          .filter((l) => l.coordinates.lat && l.coordinates.lng)
          .map((l) => [l.coordinates.lat, l.coordinates.lng] as L.LatLngTuple)
      );

      if (bounds.isValid()) {
        map.current.fitBounds(bounds, { 
          padding: [50, 50], 
          animate: true, 
          duration: 0.8,
          easeLinearity: 0.5
        });
      }
    } else if (filter !== "all" && locations.length > 0) {
      // Zoom to city-specific locations
      const bounds = L.latLngBounds(
        locations
          .filter((l) => l.city === filter && l.coordinates.lat && l.coordinates.lng)
          .map((l) => [l.coordinates.lat, l.coordinates.lng] as L.LatLngTuple)
      );

      if (bounds.isValid()) {
        map.current.fitBounds(bounds, { 
          padding: [50, 50], 
          animate: true, 
          duration: 0.8,
          easeLinearity: 0.5
        });
      }
    }
  }, [filter, locations, isMapReady]);

  return (
    <div className="rounded-lg border border-border-hairline overflow-hidden bg-canvas">
      <div
        ref={mapContainer}
        className="h-[calc(100vh-120px)] w-full"
        style={{ background: "#f5f5f5" }}
      />
    </div>
  );
}
