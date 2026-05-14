import { dataConfig } from "@/lib/config";
import type { Location, OpeningHours, DeliveryLink } from "@/domain/location";
import { getGraphQLClient } from "@/data/graphql/client";
import { LOCATIONS_QUERY } from "@/data/graphql/queries";
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
        lat: number | null;
        lng: number | null;
        clickAndCollectUrl: string | null;
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
      coordinates: { lat: f?.lat ?? 0, lng: f?.lng ?? 0 },
      hours: f?.hours ?? [],
      clickAndCollectUrl: f?.clickAndCollectUrl ?? null,
      deliveryLinks: f?.deliveryLinks ?? [],
    };
  });
}
