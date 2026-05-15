import { Hero } from "@/components/home/hero";
import { BestSellers } from "@/components/home/best-sellers";
import { Community } from "@/components/home/community";
import { Newsletter } from "@/components/home/newsletter";
import { HomeLocationsSlider } from "@/components/locations/home-locations-slider";
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
      <HomeLocationsSlider locations={locations} />
      <Community />
      <Newsletter />
    </>
  );
}
