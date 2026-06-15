import type { Metadata } from "next";
import { OutletLocationsPage } from "@/components/locations/outlet-locations-page";
import { getLocations } from "@/data/repositories/locations-repository";
import { PageBanner } from "@/components/ui/page-banner";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Find Your Nearest Great British Doner Location",
  description: "Browse all GBD Doner locations across the UK including Manchester and Liverpool. Get directions, opening hours, and store details.",
  keywords: ["GBD Doner locations", "doner near me", "doner kebab manchester", "doner kebab liverpool", "halal doner near me"],
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "Find Your Nearest Great British Doner Location",
    description: "Browse all GBD Doner locations across the UK. Get directions, opening hours, and store details.",
    url: "/locations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Nearest Great British Doner Location",
    description: "Browse all GBD Doner locations across the UK.",
  },
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
