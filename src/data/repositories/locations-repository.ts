import { dataConfig } from "@/lib/config";
import type { Location, OpeningHours, DeliveryLink } from "@/domain/location";
import { getGraphQLClient } from "@/data/graphql/client";
import { LOCATIONS_QUERY, LOCATION_BY_SLUG_QUERY } from "@/data/graphql/queries";
import { MOCK_LOCATIONS } from "@/data/graphql/mocks";

interface RawLocationsResponse {
  locations: {
    nodes: Array<{
      id: string;
      slug: string;
      title: string;
      locationFields: {
        addressLine1: string | null;
        addressLine2: string | null;
        city: string | null;
        postcode: string | null;
        phone: string | null;
        isFlagship: boolean | null;
        lat: number | null;
        lng: number | null;
        clickAndCollectUrl: string | null;
        imageUrl: string | null;
        deliveryLinks: DeliveryLink[] | null;
        hours: OpeningHours[] | null;
      } | null;
    }>;
  };
}

export async function getLocations(): Promise<Location[]> {
  if (dataConfig.useMocks) return MOCK_LOCATIONS;

  const client = getGraphQLClient();
  const data = await client.request<RawLocationsResponse>(LOCATIONS_QUERY);

  return data.locations.nodes.map((node): Location => {
    const f = node.locationFields;
    return {
      id: node.id,
      slug: node.slug,
      name: node.title,
      addressLine1: f?.addressLine1 ?? "",
      addressLine2: f?.addressLine2 ?? null,
      city: f?.city ?? "",
      postcode: f?.postcode ?? "",
      phone: f?.phone ?? null,
      isFlagship: Boolean(f?.isFlagship),
      coordinates: { lat: f?.lat ?? 0, lng: f?.lng ?? 0 },
      hours: f?.hours ?? [],
      clickAndCollectUrl: f?.clickAndCollectUrl ?? null,
      deliveryLinks: f?.deliveryLinks ?? [],
      imageUrl: f?.imageUrl ?? null,
    };
  });
}

export interface LocationDetail extends Location {
  /** Long-form HTML body from the WP editor; null when not provided. */
  bodyHtml: string | null;
}

interface RawLocationBySlugResponse {
  location: {
    id: string;
    slug: string;
    title: string;
    content: string | null;
    locationFields: RawLocationsResponse["locations"]["nodes"][number]["locationFields"];
  } | null;
}

export async function getLocationBySlug(slug: string): Promise<LocationDetail | null> {
  if (dataConfig.useMocks) {
    const hit = MOCK_LOCATIONS.find((l) => l.slug === slug);
    return hit ? { ...hit, bodyHtml: null } : null;
  }

  const client = getGraphQLClient();
  const data = await client.request<RawLocationBySlugResponse>(LOCATION_BY_SLUG_QUERY, { slug });
  const node = data.location;
  if (!node) return null;

  const f = node.locationFields;
  return {
    id: node.id,
    slug: node.slug,
    name: node.title,
    addressLine1: f?.addressLine1 ?? "",
    addressLine2: f?.addressLine2 ?? null,
    city: f?.city ?? "",
    postcode: f?.postcode ?? "",
    phone: f?.phone ?? null,
    isFlagship: Boolean(f?.isFlagship),
    coordinates: { lat: f?.lat ?? 0, lng: f?.lng ?? 0 },
    hours: f?.hours ?? [],
    clickAndCollectUrl: f?.clickAndCollectUrl ?? null,
    deliveryLinks: f?.deliveryLinks ?? [],
    imageUrl: f?.imageUrl ?? null,
    bodyHtml: node.content ?? null,
  };
}
