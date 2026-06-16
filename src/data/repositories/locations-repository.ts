import type { Location } from "@/domain/location";
import { client } from "@/data/sanity/client";

export interface LocationDetail extends Location {
  bodyHtml: string | null;
}

export async function getLocations(): Promise<Location[]> {
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

  const locations = await client.fetch<Location[]>(query, {}, {
    next: { tags: ["location"] }
  });
  
  // Ensure nested objects default safely
  return (locations || []).map(loc => ({
    ...loc,
    coordinates: loc.coordinates || { lat: 0, lng: 0 },
    hours: loc.hours || [],
    deliveryLinks: loc.deliveryLinks || [],
  }));
}

export async function getLocationBySlug(slug: string): Promise<LocationDetail | null> {
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

  const loc = await client.fetch<LocationDetail | null>(query, { slug }, {
    next: { tags: ["location", `location:${slug}`] }
  });
  if (!loc) return null;

  return {
    ...loc,
    coordinates: loc.coordinates || { lat: 0, lng: 0 },
    hours: loc.hours || [],
    deliveryLinks: loc.deliveryLinks || [],
    bodyHtml: null, // Sanity structure currently omits rich text body for locations
  };
}
