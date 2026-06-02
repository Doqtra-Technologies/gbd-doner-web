import type { Metadata } from "next";
import { OutletLocationsPage } from "@/components/locations/outlet-locations-page";
import { getLocations } from "@/data/repositories/locations-repository";
import { PageBanner } from "@/components/ui/page-banner";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Browse outlet locations, filter by city, and open each store page for details.",
};

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="w-full bg-canvas">
      <PageBanner
        imageSrc="/banner/location.jpeg"
        imageAlt="GBD locations showcase"
        eyebrow="LOCATIONS"
        headline={
          <>
            FIND YOUR<br />NEAREST GBD<br />LOCATION
          </>
        }
        subheading="Built around flavour, fast-paced energy and everyday convenience."
      />
      <OutletLocationsPage locations={locations} />
    </div>
  );
}
