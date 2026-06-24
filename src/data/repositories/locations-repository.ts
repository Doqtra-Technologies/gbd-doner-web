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
  return (locations || []).map(loc => {
    let coordinates = loc.coordinates || { lat: 0, lng: 0 };
    if (loc.slug === "manchester-oldham") {
      coordinates = { lat: 53.5572822, lng: -2.1383486 };
      loc.clickAndCollectUrl = "https://order.britishdonner.com/menu";
      loc.deliveryLinks = [{ provider: "deliveroo", url: "https://order.britishdonner.com/menu" }];
    }
    return {
      ...loc,
      name: loc.name ? loc.name.trim() : "",
      city: loc.city ? loc.city.trim() : "",
      coordinates,
      hours: loc.hours || [],
      deliveryLinks: loc.deliveryLinks || [],
    };
  });
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

  let coordinates = loc.coordinates || { lat: 0, lng: 0 };
  if (loc.slug === "manchester-oldham") {
    coordinates = { lat: 53.5572822, lng: -2.1383486 };
    loc.clickAndCollectUrl = "https://order.britishdonner.com/menu";
    loc.deliveryLinks = [{ provider: "deliveroo", url: "https://order.britishdonner.com/menu" }];
  }

  return {
    ...loc,
    name: loc.name ? loc.name.trim() : "",
    city: loc.city ? loc.city.trim() : "",
    coordinates,
    hours: loc.hours || [],
    deliveryLinks: loc.deliveryLinks || [],
    bodyHtml: null, // Sanity structure currently omits rich text body for locations
  };
}
