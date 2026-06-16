import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLocationBySlug,
  getLocations,
} from "@/data/repositories/locations-repository";
import type { OpeningHours } from "@/domain/location";
import { ClientOpeningStatus } from "@/components/locations/client-opening-status";
import { calculateDistance } from "@/lib/distance";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/lib/config";

export const revalidate = 60;

type Params = { slug: string };

const DAY_ORDER: OpeningHours["day"][] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

const MOCK_AMENITIES = [
  "Dine-in Available",
  "Takeaway",
  "Wheelchair Accessible",
  "Free Wi-Fi",
  "100% Halal Certified Meat",
];

export async function generateStaticParams(): Promise<Params[]> {
  const locations = await getLocations();
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = await getLocationBySlug(slug);
  if (!loc) return { title: "Location not found" };
  return {
    title: `${loc.name} | GBD Doner Locations`,
    description: `${loc.addressLine1}, ${loc.city} ${loc.postcode}. Find opening hours, delivery, and Click + Collect.`,
    alternates: { canonical: `/locations/${slug}` },
    openGraph: {
      title: `${loc.name} | GBD Doner Locations`,
      description: `${loc.addressLine1}, ${loc.city} ${loc.postcode}. Find opening hours, delivery, and Click + Collect.`,
      url: `/locations/${slug}`,
      images: loc.imageUrl ? [loc.imageUrl] : [],
    }
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const loc = await getLocationBySlug(slug);
  if (!loc) notFound();

  const sortedHours = [...loc.hours].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day),
  );

  // Calculate nearby locations
  const allLocations = await getLocations();
  const nearbyLocations = allLocations
    .filter((l) => l.id !== loc.id)
    .sort((a, b) => {
      const distA = calculateDistance(
        loc.coordinates.lat,
        loc.coordinates.lng,
        a.coordinates.lat,
        a.coordinates.lng,
      );
      const distB = calculateDistance(
        loc.coordinates.lat,
        loc.coordinates.lng,
        b.coordinates.lat,
        b.coordinates.lng,
      );
      return distA - distB;
    })
    .slice(0, 3);

  const galleryImages = loc.images && loc.images.length > 0 ? loc.images : (loc.imageUrl ? [loc.imageUrl] : []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: loc.name,
    image: loc.imageUrl ? [loc.imageUrl.startsWith("http") ? loc.imageUrl : `${siteConfig.url}${loc.imageUrl}`] : undefined,
    url: `${siteConfig.url}/locations/${loc.slug}`,
    telephone: loc.phone || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.addressLine1,
      addressLocality: loc.city,
      postalCode: loc.postcode,
      addressCountry: "UK"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.coordinates.lat,
      longitude: loc.coordinates.lng
    },
    openingHoursSpecification: sortedHours.map(h => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close
    })),
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tiktok
    ],
    menu: `${siteConfig.url}/menu`
  };

  return (
    <main className="w-full bg-canvas pb-24">
      <JsonLd data={schema} />
      {/* 1. Hero Section */}
      <section
        data-theme="dark"
        className="relative w-full min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-end bg-surface-inverse"
      >
        <div className="absolute inset-0">
          <Image
            src={loc.imageUrl ?? "/banner/location.jpeg"}
            alt={loc.name}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-inverse via-surface-inverse/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-12 lg:pb-16 flex flex-col items-start gap-6">
          <Link
            href="/locations"
            className="font-display font-bold uppercase tracking-eyebrow text-xs text-white/70 hover:text-white transition-colors flex items-center gap-2 mb-4"
          >
            <span>←</span> Back to all locations
          </Link>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 mb-2">
              <ClientOpeningStatus hours={loc.hours} />
              {loc.isFlagship && (
                <span className="inline-flex items-center px-2 py-1 bg-accent text-white font-display font-bold uppercase tracking-eyebrow text-[10px]">
                  Flagship
                </span>
              )}
            </div>
            <h1 className="font-display font-extrabold uppercase text-white tracking-display leading-[0.9] text-5xl md:text-7xl lg:text-8xl">
              {loc.name}
            </h1>
            <p className="font-body text-white/90 text-lg md:text-xl max-w-2xl mt-4">
              {loc.addressLine1}
              {loc.addressLine2 ? `, ${loc.addressLine2}` : ""}
              <br />
              {loc.city}, {loc.postcode}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            {loc.clickAndCollectUrl && (
              <a
                href={loc.clickAndCollectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-white hover:bg-white hover:text-accent font-display font-bold uppercase tracking-button text-xs px-8 py-4 transition-colors"
              >
                Click + Collect
              </a>
            )}
            {loc.deliveryLinks && loc.deliveryLinks.length > 0 && (
              <a
                href={loc.deliveryLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-white text-white hover:bg-white hover:text-text-primary font-display font-bold uppercase tracking-button text-xs px-8 py-4 transition-colors"
              >
                Delivery
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-16 md:mt-24 flex flex-col gap-24">
        
        {/* 2. Store Overview */}
        {loc.bodyHtml && (
          <section className="max-w-[800px]">
            <h2 className="font-display font-bold uppercase tracking-eyebrow text-accent text-xs mb-6">
              Store Overview
            </h2>
            <div
              className="font-body text-lg leading-relaxed text-text-secondary [&_p]:mb-6 [&_strong]:text-text-primary [&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: loc.bodyHtml }}
            />
          </section>
        )}

        {/* 3. Opening Hours + Map */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-display font-bold uppercase tracking-eyebrow text-accent text-xs mb-6">
                Opening Hours
              </h2>
              {sortedHours.length === 0 ? (
                <p className="font-body text-text-secondary">Hours coming soon.</p>
              ) : (
                <dl className="flex flex-col border-t border-border-hairline">
                  {sortedHours.map((h) => (
                    <div
                      key={h.day}
                      className="flex justify-between py-4 border-b border-border-hairline"
                    >
                      <dt className="font-display font-bold uppercase tracking-eyebrow text-sm text-text-primary">
                        {h.day}
                      </dt>
                      <dd className="font-body text-base text-text-secondary">
                        {h.open} – {h.close}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            {/* 4. Amenities */}
            <div>
              <h2 className="font-display font-bold uppercase tracking-eyebrow text-accent text-xs mb-6 mt-4">
                Amenities
              </h2>
              <ul className="flex flex-wrap gap-3">
                {MOCK_AMENITIES.map((amenity) => (
                  <li
                    key={amenity}
                    className="font-display font-bold uppercase tracking-button text-[10px] px-4 py-2 bg-surface border border-border-strong text-text-primary rounded-full"
                  >
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full aspect-square lg:aspect-auto lg:h-full min-h-[400px] bg-surface relative overflow-hidden border border-border-hairline">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${loc.coordinates.lat},${loc.coordinates.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              className="absolute inset-0 w-full h-full grayscale opacity-90 contrast-125"
            />
          </div>
        </section>

        {/* 5. Delivery Platforms */}
        {loc.deliveryLinks && loc.deliveryLinks.length > 0 && (
          <section className="pt-12 border-t border-border-hairline">
            <h2 className="font-display font-bold uppercase tracking-eyebrow text-accent text-xs mb-8">
              Available on Delivery
            </h2>
            <div className="flex flex-wrap gap-4">
              {loc.deliveryLinks.map((link) => (
                <a
                  key={link.provider}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center justify-center min-w-[200px] h-16 border px-8 transition-colors",
                    link.provider === "deliveroo" ? "border-border-strong text-text-primary hover:bg-accent hover:border-accent hover:text-white" : "",
                    link.provider === "ubereats" ? "border-border-strong text-text-primary hover:bg-accent hover:border-accent hover:text-white" : "",
                    link.provider === "justeat" ? "border-border-strong text-text-primary hover:bg-accent hover:border-accent hover:text-white" : ""
                  )}
                >
                  <span className="font-display font-bold uppercase tracking-button text-sm">
                    {link.provider === "deliveroo" ? "Deliveroo" : link.provider === "ubereats" ? "Uber Eats" : "Just Eat"}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 6. Gallery */}
        {galleryImages.length > 0 && (
          <section className="pt-12 border-t border-border-hairline">
            <h2 className="font-display font-bold uppercase tracking-eyebrow text-accent text-xs mb-8">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, i) => (
                <div key={i} className="relative aspect-square bg-surface-inverse overflow-hidden">
                  <Image
                    src={img}
                    alt={`${loc.name} interior ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Nearby Locations */}
        {nearbyLocations.length > 0 && (
          <section className="pt-24 pb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div className="flex flex-col gap-3">
                <span className="font-display font-bold uppercase tracking-eyebrow text-accent text-[10px]">
                  Explore More
                </span>
                <h2 className="font-display font-bold uppercase tracking-display text-3xl md:text-5xl text-text-primary">
                  Nearby Locations
                </h2>
              </div>
              <Link
                href="/locations"
                className="font-display font-bold uppercase tracking-button text-xs text-text-secondary hover:text-accent transition-colors pb-1 border-b border-transparent hover:border-accent"
              >
                View all locations →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyLocations.map((nearbyLoc) => (
                <Link
                  key={nearbyLoc.id}
                  href={`/locations/${nearbyLoc.slug}`}
                  className="group flex flex-col gap-4"
                >
                  <div className="relative w-full aspect-square bg-surface-inverse overflow-hidden">
                    <Image
                      src={nearbyLoc.imageUrl ?? "/banner/location.jpeg"}
                      alt={nearbyLoc.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold uppercase text-xl text-text-primary group-hover:text-accent transition-colors">
                      {nearbyLoc.name}
                    </h3>
                    <p className="font-body text-text-secondary text-sm">
                      {nearbyLoc.addressLine1}, {nearbyLoc.city}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
