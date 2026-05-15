import L from "leaflet";

export function createLocationMarkerIcon(label: string): L.DivIcon {
  const html = `<div class="gbd-marker" aria-label="${escapeAttr(label)}"><span class="gbd-marker-dot"></span></div>`;
  return L.divIcon({
    html,
    className: "gbd-marker-wrap",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export function createSearchMarkerIcon(): L.DivIcon {
  return L.divIcon({
    html: `<div class="gbd-marker"><span class="gbd-search-dot"></span></div>`,
    className: "gbd-search-wrap",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function escapeAttr(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}
