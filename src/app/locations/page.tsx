import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { LocationsView } from "@/components/locations/locations-view";
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
      <Container className="pt-20 pb-10">
        <div className="display-eyebrow text-gbd-red mb-4">Locations</div>
        <h1 className="display-h1 text-gbd-navy max-w-3xl">Find your spot.</h1>
        <p className="body-lg text-gbd-navy/70 max-w-2xl mt-6">
          Pick a store for opening hours, Click + Collect, or order through your favourite
          delivery app.
        </p>
      </Container>
      <LocationsView locations={locations} />
    </>
  );
}
