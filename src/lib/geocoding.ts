/**
 * Geocoding utility to convert address text to coordinates using OpenStreetMap Nominatim
 */

export interface GeocodingResult {
  lat: number;
  lng: number;
  displayName: string;
}

export async function geocodeLocation(query: string): Promise<GeocodingResult | null> {
  if (!query.trim()) return null;

  try {
    // Add London to the query to ensure we search in the right location
    const searchQuery = query.includes("London") ? query : `${query}, London, UK`;

    // Search with higher limit to get multiple results and pick the best
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&countrycodes=gb&bounded=1&viewbox=-0.51,51.28,-0.05,51.69`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "GBD-Doner-Web",
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (!data || data.length === 0) return null;

    // Filter results to ensure they're in London area (approximate bounds)
    const londonResults = data.filter((result: any) => {
      const lat = parseFloat(result.lat);
      const lng = parseFloat(result.lon);
      // London approximate bounds
      return lat >= 51.25 && lat <= 51.75 && lng >= -0.5 && lng <= 0.1;
    });

    // Prefer results with higher importance scores (more accurate)
    const bestResult = (londonResults.length > 0 ? londonResults : data).sort(
      (a: any, b: any) => parseFloat(b.importance) - parseFloat(a.importance)
    )[0];

    if (!bestResult) return null;

    return {
      lat: parseFloat(bestResult.lat),
      lng: parseFloat(bestResult.lon),
      displayName: bestResult.display_name,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}
