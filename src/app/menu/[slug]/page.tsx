import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getMenuItemBySlug,
  getMenuItems,
} from "@/data/repositories/menu-repository";
import { formatGBP } from "@/lib/utils";
import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/lib/config";

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const items = await getMenuItems();
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getMenuItemBySlug(slug);
  if (!item) return { title: "Menu item not found" };
  return {
    title: `${item.title} | GBD Doner Menu`,
    description: item.description || `Enjoy the ${item.title} from GBD Doner. Prepared fresh daily.`,
    alternates: { canonical: `/menu/${slug}` },
    openGraph: {
      title: `${item.title} | GBD Doner Menu`,
      description: item.description || `Enjoy the ${item.title} from GBD Doner.`,
      url: `/menu/${slug}`,
      images: item.imageUrl ? [item.imageUrl] : undefined,
    },
  };
}

export default async function MenuItemDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const item = await getMenuItemBySlug(slug);
  if (!item) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: item.title,
    description: item.description,
    image: item.imageUrl ? (item.imageUrl.startsWith("http") ? item.imageUrl : `${siteConfig.url}${item.imageUrl}`) : undefined,
    offers: {
      "@type": "Offer",
      price: item.priceGBP,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/menu/${item.slug}`
    },
    suitableForDiet: (item.dietaryFlags as string[] | undefined)?.includes("VG") ? "https://schema.org/VeganDiet" : (item.dietaryFlags as string[] | undefined)?.includes("Halal") ? "https://schema.org/HalalDiet" : undefined,
  };

  return (
    <main className="w-full bg-canvas">
      <JsonLd data={schema} />
      <article className="border-b border-border-hairline">
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-border-hairline">
          <div className="md:col-span-6 relative w-full aspect-square bg-text-primary/[0.03] p-8 lg:p-16 border-b md:border-b-0 md:border-r border-border-hairline">
            {item.imageUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain drop-shadow-sm"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-surface-muted/30" aria-hidden />
            )}
          </div>

          <div className="md:col-span-6 flex flex-col gap-8 p-10 lg:p-16">
            <Link
              href="/menu"
              className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-secondary hover:text-accent transition-colors"
            >
              ← Back to menu
            </Link>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-accent">
                  {item.category}
                </span>
                {item.isBestSeller && (
                  <span className="inline-flex items-center font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-primary border border-border-strong px-2 py-0.5">
                    Best Seller
                  </span>
                )}
              </div>
              <h1 className="font-display font-bold uppercase tracking-display leading-[0.9] text-text-primary text-3xl md:text-4xl lg:text-5xl">
                {item.title}
              </h1>
              {item.priceGBP !== null && (
                <span className="font-display font-bold text-text-primary text-2xl">
                  {formatGBP(item.priceGBP)}
                </span>
              )}
            </div>

            {item.description && (
              <p className="font-body text-base leading-relaxed text-text-secondary max-w-prose">
                {item.description}
              </p>
            )}

            {item.bodyHtml && (
              <div
                className="font-body text-base leading-relaxed text-text-primary [&_p]:mb-4"
                dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
              />
            )}

            {item.allergens.length > 0 && (
              <section>
                <h2 className="font-display font-bold uppercase tracking-eyebrow text-xs text-text-secondary mb-3">
                  Allergens
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {item.allergens.map((a) => (
                    <li
                      key={a.code}
                      className="inline-flex items-center border border-border-hairline px-2.5 py-1 font-body text-xs text-text-primary"
                    >
                      {a.label}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {item.nutrition && (
              <section>
                <h2 className="font-display font-bold uppercase tracking-eyebrow text-xs text-text-secondary mb-3">
                  Nutrition
                </h2>
                <dl className="grid grid-cols-4 gap-4">
                  <Macro label="Cal" value={`${item.nutrition.calories}`} />
                  <Macro label="Protein" value={`${item.nutrition.protein}g`} />
                  <Macro label="Carbs" value={`${item.nutrition.carbs}g`} />
                  <Macro label="Fat" value={`${item.nutrition.fat}g`} />
                </dl>
              </section>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}

function Macro({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-l border-border-hairline pl-3">
      <dt className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-secondary">
        {label}
      </dt>
      <dd className="font-display font-bold text-text-primary text-base">
        {value}
      </dd>
    </div>
  );
}
