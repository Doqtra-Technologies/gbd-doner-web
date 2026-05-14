export interface OpeningHours {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  open: string;
  close: string;
}

export interface DeliveryLink {
  provider: "deliveroo" | "ubereats" | "justeat";
  url: string;
}

export interface Location {
  id: string;
  slug: string;
  name: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  postcode: string;
  phone: string | null;
  coordinates: { lat: number; lng: number };
  hours: OpeningHours[];
  clickAndCollectUrl: string | null;
  deliveryLinks: DeliveryLink[];
  imageUrl?: string | null;
}
