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
    // pt-16 / pt-20 = exact navbar height (h-16 mobile, h-20 desktop) — no gap.
    // Using <div> avoids a second nested <main> inside layout.tsx's own <main>.
    <div className="w-full bg-canvas pt-16 lg:pt-20">
      <OutletLocationsPage locations={locations} />
    </div>
  );
}
