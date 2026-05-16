import { Hero } from "@/components/home/hero";
import { BestSellers } from "@/components/home/best-sellers";
import { Community } from "@/components/home/community";
import { ArchitecturalLocations } from "@/components/locations/architectural-locations";
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
      <ArchitecturalLocations locations={locations} />
      <Community />
      {/* Newsletter now lives inside <TerminalFooter />, not on the home page. */}
    </>
  );
}
