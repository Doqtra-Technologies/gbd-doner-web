import type { Metadata } from "next";
import { LocationsLayout } from "@/components/locations/locations-layout";
import { getLocations } from "@/data/repositories/locations-repository";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find your nearest GBD Doner branch for delivery or Click + Collect.",
};

export default async function LocationsPage() {
  const locations = await getLocations();

  return <LocationsLayout locations={locations} />;
}
