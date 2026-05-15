import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
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
      <Section size="hero">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow tone="accent" className="block mb-4">
                Locations
              </Eyebrow>
              <Heading level={1}>Our Locations.</Heading>
            </div>
            <Eyebrow tone="primary" className="block">
              Est 2026 · London
            </Eyebrow>
          </div>
        </Container>
      </Section>
      <LocationsPageGrid locations={locations} />
    </>
  );
}
