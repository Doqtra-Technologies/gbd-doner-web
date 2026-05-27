import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLocationBySlug,
  getLocations,
} from "@/data/repositories/locations-repository";
import type { OpeningHours } from "@/domain/location";

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
    title: loc.name,
    description: `${loc.addressLine1}, ${loc.city} ${loc.postcode}. Find opening hours, delivery, and Click + Collect.`,
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

  return (
    <main className="w-full bg-canvas">
      <article className="border-b border-border-hairline">
        <header className="grid grid-cols-1 md:grid-cols-12 border-b border-border-hairline">
          <div className="md:col-span-5 flex flex-col gap-8 p-10 lg:p-16">
            <Link
              href="/locations"
              className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-secondary hover:text-accent transition-colors"
            >
              ← All locations
            </Link>

            <div className="flex flex-col gap-3">
              {loc.isFlagship && <FlagshipBadge />}
              <h1 className="font-display font-bold uppercase tracking-display leading-[0.9] text-text-primary text-3xl md:text-4xl lg:text-5xl">
                {loc.name}
              </h1>
              <address className="not-italic font-body text-sm text-text-secondary leading-relaxed">
                {loc.addressLine1}
                {loc.addressLine2 && (
                  <>
                    <br />
                    {loc.addressLine2}
                  </>
                )}
                <br />
                {loc.city} · {loc.postcode}
              </address>
              {loc.phone && (
                <a
                  href={`tel:${loc.phone.replace(/\s+/g, "")}`}
                  className="font-body text-sm text-text-primary hover:text-accent transition-colors"
                >
                  {loc.phone}
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {loc.clickAndCollectUrl && (
                <ActionPill href={loc.clickAndCollectUrl} primary>
                  Click + Collect
                </ActionPill>
              )}
              {loc.deliveryLinks?.map((d) => (
                <ActionPill key={d.provider} href={d.url}>
                  {labelForProvider(d.provider)}
                </ActionPill>
              ))}
            </div>
          </div>

          {loc.imageUrl && (
            <div className="relative md:col-span-7 w-full aspect-square md:aspect-auto md:min-h-[480px] bg-surface-inverse">
              <Image
                src={loc.imageUrl}
                alt={loc.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          )}
        </header>

        <section className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-5 p-10 lg:p-16 md:border-r border-border-hairline">
            <h2 className="font-display font-bold uppercase tracking-eyebrow text-xs text-text-secondary mb-6">
              Opening hours
            </h2>
            {sortedHours.length === 0 ? (
              <p className="font-body text-sm text-text-secondary opacity-70">
                Hours coming soon.
              </p>
            ) : (
              <dl className="flex flex-col gap-2">
                {sortedHours.map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between font-body text-sm text-text-primary border-b border-border-hairline pb-2"
                  >
                    <dt className="font-display font-bold uppercase tracking-eyebrow text-[10px]">
                      {h.day}
                    </dt>
                    <dd>
                      {h.open} – {h.close}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {loc.bodyHtml && (
            <div className="md:col-span-7 p-10 lg:p-16">
              <div
                className="font-body text-base leading-relaxed text-text-primary [&_p]:mb-5 [&_h2]:font-display [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-display [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-xl [&_a]:text-accent"
                dangerouslySetInnerHTML={{ __html: loc.bodyHtml }}
              />
            </div>
          )}
        </section>
      </article>
    </main>
  );
}

function ActionPill({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={
        primary
          ? "inline-flex h-10 items-center justify-center rounded-full bg-accent px-5 font-display font-bold uppercase tracking-button text-[10px] text-text-inverse transition-colors hover:bg-text-primary"
          : "inline-flex h-10 items-center justify-center rounded-full border border-border-strong bg-canvas px-5 font-display font-bold uppercase tracking-button text-[10px] text-text-primary transition-colors hover:border-accent hover:text-accent"
      }
    >
      {children}
    </a>
  );
}

function FlagshipBadge() {
  return (
    <span className="inline-flex w-fit items-center gap-2 border border-accent bg-accent/10 px-3 py-1 font-display font-bold uppercase tracking-eyebrow text-[10px] text-accent">
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
      Flagship
    </span>
  );
}

function labelForProvider(p: string): string {
  switch (p) {
    case "deliveroo":
      return "Deliveroo";
    case "ubereats":
      return "Uber Eats";
    case "justeat":
      return "Just Eat";
    default:
      return p;
  }
}
