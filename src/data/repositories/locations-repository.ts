import { dataConfig } from "@/lib/config";
import type { Location } from "@/domain/location";
import { client } from "@/data/sanity/client";
import { MOCK_LOCATIONS } from "@/data/graphql/mocks";

export interface LocationDetail extends Location {
  bodyHtml: string | null;
}

export async function getLocations(): Promise<Location[]> {
  if (dataConfig.useMocks) return MOCK_LOCATIONS;

  try {
    const query = `*[_type == "location"] | order(name asc) {
      "id": _id,
      "slug": slug.current,
      name,
      addressLine1,
      addressLine2,
      city,
      postcode,
      phone,
      isFlagship,
      coordinates,
      hours,
      clickAndCollectUrl,
      deliveryLinks,
      "imageUrl": image.asset->url,
      "images": images[].asset->url
    }`;

    const locations = await client.fetch<Location[]>(query);
    
    // Ensure nested objects default safely
    return (locations || []).map(loc => ({
      ...loc,
      coordinates: loc.coordinates || { lat: 0, lng: 0 },
      hours: loc.hours || [],
      deliveryLinks: loc.deliveryLinks || [],
    }));
  } catch (error) {
    console.error("Failed to fetch locations from Sanity, falling back to mock locations:", error);
    return MOCK_LOCATIONS;
  }
}

export async function getLocationBySlug(slug: string): Promise<LocationDetail | null> {
  if (dataConfig.useMocks) {
    const hit = MOCK_LOCATIONS.find((l) => l.slug === slug);
    return hit ? { ...hit, bodyHtml: null } : null;
  }

  try {
    const query = `*[_type == "location" && slug.current == $slug][0] {
      "id": _id,
      "slug": slug.current,
      name,
      addressLine1,
      addressLine2,
      city,
      postcode,
      phone,
      isFlagship,
      coordinates,
      hours,
      clickAndCollectUrl,
      deliveryLinks,
      "imageUrl": image.asset->url,
      "images": images[].asset->url
    }`;

    const loc = await client.fetch<LocationDetail | null>(query, { slug });
    if (!loc) return null;

    return {
      ...loc,
      coordinates: loc.coordinates || { lat: 0, lng: 0 },
      hours: loc.hours || [],
      deliveryLinks: loc.deliveryLinks || [],
      bodyHtml: null, // Sanity structure currently omits rich text body for locations
    };
  } catch (error) {
    console.error(`Failed to fetch location by slug ${slug} from Sanity, falling back to mock:`, error);
    const hit = MOCK_LOCATIONS.find((l) => l.slug === slug);
    return hit ? { ...hit, bodyHtml: null } : null;
  }
}
