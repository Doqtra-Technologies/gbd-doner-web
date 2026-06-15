import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/home/hero";
import { BestSellers } from "@/components/home/best-sellers";
import { MadeForEveryCraving } from "@/components/home/made-for-every-craving";
import { TrustBadges } from "@/components/home/trust-badges";
import { OutletCarousel } from "@/components/locations/outlet-carousel";
import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/lib/config";
import { getLocations } from "@/data/repositories/locations-repository";

export const revalidate = 60;

const SEO_PAGES: Record<string, { title: string, desc: string, hero: any, h2: string, h3: string }> = {
  "halal-doner": {
    title: "100% Halal Doner | Great British Doner",
    desc: "Authentic, freshly prepared halal doner. No compromises. Spit-fired perfection.",
    hero: { heroTitleLine1: "100% Halal", heroTitleLine2: "Certified", heroTitleLine3: "More Doner", heroLead: "Authentic, freshly prepared halal doner. No compromises." },
    h2: "100% Halal", h3: "No Compromises."
  },
  "vegan-doner": {
    title: "The Best Vegan Doner | Great British Doner",
    desc: "100% plant-based doner. Award-winning taste. Great British Doner.",
    hero: { heroTitleLine1: "100%", heroTitleLine2: "Plant-Based", heroTitleLine3: "Vegan Doner", heroLead: "100% plant-based doner. Award-winning taste." },
    h2: "Vegan", h3: "Excellence."
  },
  "doner-delivery": {
    title: "Doner Delivery Near Me | Order Online | GBD",
    desc: "Order Great British Doner for fast delivery via UberEats, Deliveroo, and JustEat.",
    hero: { heroTitleLine1: "Fast", heroTitleLine2: "Fresh", heroTitleLine3: "Delivery", heroLead: "Order Great British Doner for fast delivery straight to your door." },
    h2: "Fast", h3: "Delivery."
  },
  "doner-near-me": {
    title: "Doner Near Me | Find Great British Doner",
    desc: "Craving doner near you? Find your nearest Great British Doner location.",
    hero: { heroTitleLine1: "Find", heroTitleLine2: "Doner", heroTitleLine3: "Near Me", heroLead: "Craving doner near you? Find your nearest Great British Doner location." },
    h2: "Find", h3: "Us."
  },
  "doner-catering": {
    title: "Doner Catering Services | Great British Doner",
    desc: "Bring bold flavour to your event. GBD Doner catering for all occasions.",
    hero: { heroTitleLine1: "Doner", heroTitleLine2: "Event", heroTitleLine3: "Catering", heroLead: "Bring bold flavour to your event. GBD Doner catering for all occasions." },
    h2: "Event", h3: "Catering."
  },
  "corporate-catering": {
    title: "Corporate Catering Services | Great British Doner",
    desc: "Office lunches, team events, corporate catering by Great British Doner.",
    hero: { heroTitleLine1: "Corporate", heroTitleLine2: "Lunch", heroTitleLine3: "Catering", heroLead: "Office lunches, team events, corporate catering by Great British Doner." },
    h2: "Corporate", h3: "Events."
  },
  "event-catering-manchester": {
    title: "Event Catering in Manchester | GBD Doner",
    desc: "Manchester's best event catering. Bold doner flavours for your private events.",
    hero: { heroTitleLine1: "Event", heroTitleLine2: "Catering", heroTitleLine3: "Manchester", heroLead: "Manchester's best event catering. Bold doner flavours for your private events." },
    h2: "Manchester", h3: "Events."
  },
  "event-catering-liverpool": {
    title: "Event Catering in Liverpool | GBD Doner",
    desc: "Liverpool's best event catering. Bold doner flavours for your private events.",
    hero: { heroTitleLine1: "Event", heroTitleLine2: "Catering", heroTitleLine3: "Liverpool", heroLead: "Liverpool's best event catering. Bold doner flavours for your private events." },
    h2: "Liverpool", h3: "Events."
  },
  "doner-franchise": {
    title: "Doner Franchise Opportunities | GBD Doner",
    desc: "Own a Great British Doner franchise. Join the modern street food revolution.",
    hero: { heroTitleLine1: "Doner", heroTitleLine2: "Franchise", heroTitleLine3: "Opportunities", heroLead: "Own a Great British Doner franchise. Join the modern street food revolution." },
    h2: "Franchise", h3: "Now."
  },
  "restaurant-franchise": {
    title: "Restaurant Franchise Opportunities | GBD Doner",
    desc: "Open a restaurant franchise with Great British Doner today.",
    hero: { heroTitleLine1: "Restaurant", heroTitleLine2: "Franchise", heroTitleLine3: "Opportunities", heroLead: "Open a restaurant franchise with Great British Doner today." },
    h2: "Open", h3: "A Franchise."
  },
  "food-franchise-uk": {
    title: "Food Franchise UK | Great British Doner",
    desc: "The fastest growing food franchise in the UK. Find out more.",
    hero: { heroTitleLine1: "Food", heroTitleLine2: "Franchise", heroTitleLine3: "UK", heroLead: "The fastest growing food franchise in the UK. Find out more." },
    h2: "UK", h3: "Expansion."
  },
  "manchester-doner": {
    title: "The Best Doner in Manchester | GBD Doner",
    desc: "Find the best doner in Manchester. Great British Doner Deansgate & Piccadilly.",
    hero: { heroTitleLine1: "Manchester", heroTitleLine2: "Doner", heroTitleLine3: "Kebabs", heroLead: "Find the best doner in Manchester. Great British Doner Deansgate & Piccadilly." },
    h2: "Manchester", h3: "Doner."
  },
  "liverpool-doner": {
    title: "The Best Doner in Liverpool | GBD Doner",
    desc: "Find the best doner in Liverpool. Great British Doner Bold Street & Express.",
    hero: { heroTitleLine1: "Liverpool", heroTitleLine2: "Doner", heroTitleLine3: "Kebabs", heroLead: "Find the best doner in Liverpool. Great British Doner Bold Street & Express." },
    h2: "Liverpool", h3: "Doner."
  },
  "best-doner-manchester": {
    title: "Best Doner in Manchester | Great British Doner",
    desc: "Voted one of the best. Taste the greatest doner in Manchester.",
    hero: { heroTitleLine1: "Best", heroTitleLine2: "Doner", heroTitleLine3: "Manchester", heroLead: "Voted one of the best. Taste the greatest doner in Manchester." },
    h2: "Best in", h3: "Manchester."
  },
  "best-doner-liverpool": {
    title: "Best Doner in Liverpool | Great British Doner",
    desc: "Voted one of the best. Taste the greatest doner in Liverpool.",
    hero: { heroTitleLine1: "Best", heroTitleLine2: "Doner", heroTitleLine3: "Liverpool", heroLead: "Voted one of the best. Taste the greatest doner in Liverpool." },
    h2: "Best in", h3: "Liverpool."
  }
};

type Params = { slug: string };

export function generateStaticParams() {
  return Object.keys(SEO_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = params;
  const data = SEO_PAGES[p.slug];
  if (!data) return { title: "Page Not Found" };
  
  return {
    title: data.title,
    description: data.desc,
    alternates: { canonical: `/${p.slug}` },
    openGraph: {
      title: data.title,
      description: data.desc,
      url: `/${p.slug}`,
      type: "website",
    },
  };
}

export default async function SEOLandingPage({ params }: { params: Params }) {
  const p = params;
  const data = SEO_PAGES[p.slug];
  if (!data) notFound();

  const locations = await getLocations();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.title,
    description: data.desc,
    url: `${siteConfig.url}/${p.slug}`
  };

  return (
    <main className="w-full bg-canvas overflow-x-hidden">
      <JsonLd data={schema} />
      <Hero settings={data.hero} />
      <TrustBadges />
      <MadeForEveryCraving settings={{ cravingsHeadingLine1: data.h2, cravingsHeadingLine2: data.h3 } as any} />
      <BestSellers />
      <OutletCarousel locations={locations} />
    </main>
  );
}
