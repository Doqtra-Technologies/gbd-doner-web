/**
 * Geocoding utility to convert address text to coordinates using OpenStreetMap Nominatim.
 * Supports global address searching with intelligent fallback strategy.
 */

export interface GeocodingResult {
  lat: number;
  lng: number;
  displayName: string;
}

export async function geocodeLocation(query: string): Promise<GeocodingResult | null> {
  if (!query.trim()) return null;

  try {
    // First attempt: Global search with no restrictions
    let result = await performGeocodingSearch(query, false);

    // Fallback: If the query doesn't include "London", try adding it
    if (!result && !query.toLowerCase().includes("london")) {
      result = await performGeocodingSearch(`${query}, London, UK`, false);
    }

    if (!result) {
      console.warn(`Geocoding failed for query: "${query}"`);
    }

    return result;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

async function performGeocodingSearch(
  query: string,
  restrictToUK: boolean
): Promise<GeocodingResult | null> {
  const params = new URLSearchParams({
    format: "json",
    q: query,
    limit: "10",
    "accept-language": "en",
  });

  // Optionally restrict to UK for better local results if needed
  if (restrictToUK) {
    params.append("countrycodes", "gb");
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "GBD-Doner-Web",
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json() as any[];
    if (!Array.isArray(data) || data.length === 0) return null;

    // Sort by importance score (higher = more relevant)
    const sortedResults = data.sort(
      (a, b) => parseFloat(b.importance) - parseFloat(a.importance)
    );

    // Return the top result with the highest importance
    const bestResult = sortedResults[0];
    if (!bestResult) return null;

    return {
      lat: parseFloat(bestResult.lat),
      lng: parseFloat(bestResult.lon),
      displayName: bestResult.display_name || query,
    };
  } catch (error) {
    console.error("Nominatim API error:", error);
    return null;
  }
}
