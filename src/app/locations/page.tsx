import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { LocationsPageGrid } from "@/components/locations/locations-page-grid";
import { getLocations } from "@/data/repositories/locations-repository";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Locations",
  description: "Find your nearest GBD Doner. Order for delivery or Click + Collect.",
};

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <>
      <Container className="pt-24 pb-6">
        <div className="flex items-end justify-between gap-6">
          <h1 className="font-display font-bold uppercase tracking-tight text-[#0F1E2D] text-4xl md:text-5xl">
            Our Locations
          </h1>
          <span className="hidden sm:block font-display font-bold uppercase tracking-widest text-[#0F1E2D] text-sm">
            Est 2026 | London
          </span>
        </div>
      </Container>
      <LocationsPageGrid locations={locations} />
    </>
  );
}
