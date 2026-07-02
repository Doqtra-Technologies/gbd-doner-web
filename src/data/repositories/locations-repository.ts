import type { Location } from "@/domain/location";
import { client } from "@/data/sanity/client";

export interface LocationDetail extends Location {
  bodyHtml: string | null;
}

function applyLocationOverrides<T extends Location>(loc: T): T {
  let coordinates = loc.coordinates || { lat: 0, lng: 0 };
  let clickAndCollectUrl = loc.clickAndCollectUrl;
  let deliveryLinks = loc.deliveryLinks || [];
  let hours = loc.hours || [];

  if (loc.slug === "manchester-oldham") {
    coordinates = { lat: 53.5572822, lng: -2.1383486 };
    clickAndCollectUrl = "https://order.britishdonner.com/RestaurantSelection/1";
    deliveryLinks = [{ provider: "deliveroo", url: "https://order.britishdonner.com/RestaurantSelection/1" }];
    hours = [
      { day: "Mon", open: "11:00", close: "23:00" },
      { day: "Tue", open: "11:00", close: "23:00" },
      { day: "Wed", open: "11:00", close: "23:00" },
      { day: "Thu", open: "11:00", close: "23:00" },
      { day: "Fri", open: "11:00", close: "23:00" },
      { day: "Sat", open: "11:00", close: "23:00" },
      { day: "Sun", open: "11:00", close: "23:00" },
    ];
  } else if (loc.slug === "deansgate") {
    clickAndCollectUrl = "https://order.britishdonner.com/RestaurantSelection/3";
  } else if (loc.slug === "liverpool") {
    clickAndCollectUrl = "https://order.britishdonner.com/RestaurantSelection/4";
  } else if (loc.slug === "piccadilly") {
    clickAndCollectUrl = "https://order.britishdonner.com/RestaurantSelection/5";
  }

  return {
    ...loc,
    name: loc.name ? loc.name.trim() : "",
    city: loc.city ? loc.city.trim() : "",
    coordinates,
    clickAndCollectUrl,
    hours,
    deliveryLinks,
  };
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
  
  return (locations || []).map(loc => applyLocationOverrides(loc));
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
    ...applyLocationOverrides(loc),
    bodyHtml: null, // Sanity structure currently omits rich text body for locations
  };
}

