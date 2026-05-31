import type { Metadata } from "next";
import { OutletLocationsPage } from "@/components/locations/outlet-locations-page";
import { getLocations } from "@/data/repositories/locations-repository";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Browse outlet locations, filter by city, and open each store page for details.",
};

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <main className="w-full bg-canvas pt-28 lg:pt-36">
      <OutletLocationsPage locations={locations} />
    </main>
  );
}
