import { Hero } from "@/components/home/hero";
import { BestSellers } from "@/components/home/best-sellers";
import { MadeForEveryCraving } from "@/components/home/made-for-every-craving";
import { StoryMarqueeAndBrick } from "@/components/home/story-marquee-and-brick";
import { TrustBadges } from "@/components/home/trust-badges";
import { LocationLedger } from "@/components/locations/location-ledger";
import { OutletCarousel } from "@/components/locations/outlet-carousel";
import { getLocations } from "@/data/repositories/locations-repository";
import { getHomePageSettings } from "@/data/repositories/site-settings-repository";

export const revalidate = 60;

export default async function HomePage() {
  const [locations, homeSettings] = await Promise.all([
    getLocations(),
    getHomePageSettings(),
  ]);

  return (
    <>
      <Hero settings={homeSettings} />
      <TrustBadges />
      <MadeForEveryCraving settings={homeSettings} />
      <BestSellers />
      <OutletCarousel locations={locations} />
      <StoryMarqueeAndBrick />
      {/* Newsletter lives inside <Footer /> (TerminalFooter). */}
    </>
  );
}
