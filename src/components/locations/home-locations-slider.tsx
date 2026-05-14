import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import type { Location } from "@/domain/location";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80";

export function HomeLocationsSlider({ locations }: { locations: Location[] }) {
  return (
    <section className="bg-[#FFFFFF] py-24">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display font-bold uppercase tracking-tight text-[#0F1E2D] text-3xl md:text-4xl">
            Our Locations
          </h2>
          <span className="hidden sm:block font-display font-bold uppercase tracking-widest text-[#0F1E2D] text-sm">
            Est 2026 | London
          </span>
        </div>

        <div className="mt-12">
          <div
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-label="Locations carousel"
          >
            {locations.map((loc) => (
              <SliderCard key={loc.id} location={loc} />
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/locations"
            className="group inline-flex h-12 items-center justify-center rounded-full border border-[#0F1E2D] bg-transparent px-8 font-display font-bold uppercase tracking-widest text-xs text-[#0F1E2D] transition-all duration-300 hover:bg-[#C94035] hover:border-[#C94035] hover:text-[#FFFFFF]"
          >
            View All
          </Link>
        </div>
      </Container>
    </section>
  );
}

function SliderCard({ location }: { location: Location }) {
  return (
    <Link
      href={`/locations#${location.slug}`}
      className="group relative shrink-0 snap-start w-[78vw] sm:w-[44vw] lg:w-[32vw] xl:w-[360px]"
    >
      <div className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 border border-[#0F1E2D]" />
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FFFFFF]">
        <Image
          src={location.imageUrl ?? FALLBACK_IMAGE}
          alt={location.name}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 360px"
          className="rounded-none object-cover"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <span className="font-display font-bold uppercase tracking-tight text-[#0F1E2D] text-base">
          {location.name}
        </span>
        <span className="font-body text-xs text-[#0F1E2D] opacity-80">
          {location.city}
        </span>
      </div>
    </Link>
  );
}
