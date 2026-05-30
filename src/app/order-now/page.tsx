import type { Metadata } from "next";
import { LocationsLayout } from "@/components/locations/locations-layout";
import { getLocations } from "@/data/repositories/locations-repository";
import { getLocationsPageSettings } from "@/data/repositories/site-settings-repository";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Order Now",
  description:
    "Choose a branch to start your order, view delivery links, or collect in store.",
};

export default async function OrderNowPage() {
  const [locations, pageSettings] = await Promise.all([
    getLocations(),
    getLocationsPageSettings(),
  ]);

  return <LocationsLayout locations={locations} pageSettings={pageSettings} />;
}