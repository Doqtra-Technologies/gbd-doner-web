import { Hero } from "@/components/home/hero";
import { BestSellers } from "@/components/home/best-sellers";
import { Community } from "@/components/home/community";
import { Newsletter } from "@/components/home/newsletter";
import { getBestSellers } from "@/data/repositories/menu-repository";

export const revalidate = 60;

export default async function HomePage() {
  const bestSellers = await getBestSellers(4);
  return (
    <>
      <Hero />
      <BestSellers items={bestSellers} />
      <Community />
      <Newsletter />
    </>
  );
}
