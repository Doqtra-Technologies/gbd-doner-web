import { Hero } from "@/components/home/hero";
import { BestSellers } from "@/components/home/best-sellers";
import { MadeForEveryCraving } from "@/components/home/made-for-every-craving";
import { StoryMarqueeAndBrick } from "@/components/home/story-marquee-and-brick";
import { LocationLedger } from "@/components/locations/location-ledger";
import { getLocations } from "@/data/repositories/locations-repository";

export const revalidate = 60;

export default async function HomePage() {
  const locations = await getLocations();
  return (
    <>
      <Hero />
      <MadeForEveryCraving />
      <BestSellers />
      <LocationLedger locations={locations} />
      <StoryMarqueeAndBrick />
      {/* Newsletter lives inside <Footer /> (TerminalFooter). */}
    </>
  );
}
