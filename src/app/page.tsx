import { Hero } from "@/components/home/hero";
import { BestSellers } from "@/components/home/best-sellers";
import { StoryMarqueeAndBrick } from "@/components/home/story-marquee-and-brick";
import { LocationLedger } from "@/components/locations/location-ledger";
import { getBestSellers } from "@/data/repositories/menu-repository";
import { getLocations } from "@/data/repositories/locations-repository";

export const revalidate = 60;

export default async function HomePage() {
  const [bestSellers, locations] = await Promise.all([
    getBestSellers(4),
    getLocations(),
  ]);
  return (
    <>
      <Hero />
      <BestSellers items={bestSellers} />
      <LocationLedger locations={locations} />
      <StoryMarqueeAndBrick />
      {/* Newsletter lives inside <Footer /> (TerminalFooter). */}
    </>
  );
}
