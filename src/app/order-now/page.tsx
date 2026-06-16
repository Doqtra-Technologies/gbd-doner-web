import type { Metadata } from "next";
import { LocationsLayout } from "@/components/locations/locations-layout";
import { getLocations } from "@/data/repositories/locations-repository";
import { getLocationsPageSettings } from "@/data/repositories/site-settings-repository";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Order Now | Delivery & Collection | GBD Doner",
  description: "Order Great British Doner for delivery or collection. Choose your nearest branch and start your order via Deliveroo, UberEats, or click and collect.",
  keywords: ["order doner online", "doner delivery near me", "GBD Doner delivery", "doner collection"],
  alternates: {
    canonical: "/order-now",
  },
  openGraph: {
    title: "Order Now | Delivery & Collection | GBD Doner",
    description: "Order Great British Doner for delivery or collection. Choose your nearest branch and start your order.",
    url: "/order-now",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Order Now | Delivery & Collection | GBD Doner",
    description: "Order Great British Doner for delivery or collection.",
  },
};

export default async function OrderNowPage() {
  const [locations, pageSettings] = await Promise.all([
    getLocations(),
    getLocationsPageSettings(),
  ]);

  return <LocationsLayout locations={locations} pageSettings={pageSettings} />;
}