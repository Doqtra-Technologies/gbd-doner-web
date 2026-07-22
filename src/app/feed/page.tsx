import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/data/repositories/posts-repository";
import { getFeedPageSettings } from "@/data/repositories/site-settings-repository";
import { feedData } from "@/data/content";
import type { Post } from "@/domain/post";
import type { FeedPageSettings } from "@/domain/site-settings";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The Feed | Stories, News & Culture | GBD Doner",
  description: "Nutrition science, community spotlights, and the Great British Doner point of view. Dive into modern street food culture.",
  keywords: ["doner kebab blog", "GBD Doner news", "vegan doner news", "british street food blog"],
  alternates: {
    canonical: "/feed",
  },
  openGraph: {
    title: "The Feed | Stories, News & Culture | GBD Doner",
    description: "Nutrition science, community spotlights, and the Great British Doner point of view.",
    url: "/feed",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Feed | Stories, News & Culture | GBD Doner",
    description: "Nutrition science, community spotlights, and the Great British Doner point of view.",
  },
};

type FeedArticle = {
  category: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
};

// Every image rendered on this page must come from /public/blog only.
// External URLs (CMS, CDN, Unsplash) are rejected and replaced with the
// local fallback so no external image request ever leaves the page.
const FALLBACK_IMAGE = "/blog/1.png";

function localImageOrFallback(url: string | null | undefined): string {
  if (!url) return FALLBACK_IMAGE;
  if (url.startsWith("http://") || url.startsWith("https://")) return FALLBACK_IMAGE;
  return url;
}

function postToArticle(post: Post): FeedArticle {
  return {
    category: (post.category ?? "BLOG").toUpperCase(),
    title: post.title,
    excerpt: post.excerpt ?? "",
    image: localImageOrFallback(post.featuredImageUrl),
    slug: `/feed/${post.slug}`,
  };
}

import { PageBanner } from "@/components/ui/page-banner";

export default async function FeedPage() {
  const [posts, pageSettings] = await Promise.all([
    getPosts(),
    getFeedPageSettings(),
  ]);

  const articles = posts.map(postToArticle);
  const featured: FeedArticle =
    articles.find((a) => a.slug.includes("vegan-doner")) ??
    articles[0] ??
    { ...feedData.featuredArticle, image: localImageOrFallback(feedData.featuredArticle.image) };

  const remainingCmsArticles = articles.filter((a) => a.slug !== featured.slug);
  const gridArticles = [...remainingCmsArticles, ...feedData.gridArticles].filter(
    (a, i, arr) => arr.findIndex((b) => b.slug === a.slug) === i && a.slug !== featured.slug,
  );

  return (
    <main className="w-full bg-canvas">
      <PageBanner
        imageSrc="/blog/3.png"
        imageAlt="Feed"
        headline="FEED"
        imagePosition="object-bottom"
      />
      <FeedBanner article={featured} badge="Featured Story" eyebrow="Latest" priority />
      {gridArticles.map((article) => (
        <FeedBanner key={article.slug} article={article} eyebrow="From The Feed" />
      ))}
    </main>
  );
}

function FeedBanner({
  article,
  badge,
  eyebrow,
  priority,
}: {
  article: FeedArticle;
  badge?: string;
  eyebrow: string;
  priority?: boolean;
}) {
  return (
    <section className="border-b border-border-hairline bg-canvas py-16 lg:py-24">
      <div className="mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[28px] border border-border-hairline bg-canvas shadow-[0_8px_24px_rgba(15,30,45,0.06),0_24px_60px_rgba(15,30,45,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-[48%_52%]">

            {/* Image pane */}
            <div className="relative min-h-[22rem] overflow-hidden bg-surface-inverse sm:min-h-[28rem]">
              <Link href={article.slug} aria-label={article.title} className="group absolute inset-0 block">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  priority={priority}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,30,45,0.05)_0%,rgba(15,30,45,0.28)_100%)]" />
                {badge && (
                  <div className="absolute left-5 top-5 z-10 rounded-full bg-surface-inverse/85 px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.28em] text-text-inverse backdrop-blur-sm">
                    {badge}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-canvas/90 px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.28em] text-text-primary backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {article.category}
                  </span>
                </div>
              </Link>
            </div>

            {/* Content pane */}
            <div className="flex flex-col justify-between gap-8 p-8 lg:p-12">
              <div className="flex flex-col gap-6">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
                  {eyebrow}
                </p>

                <h2 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-bold uppercase tracking-display leading-[0.95] text-text-primary text-balance">
                  <Link
                    href={article.slug}
                    className="inline-block transition-[color,transform] duration-300 ease-out hover:translate-x-1 hover:text-accent"
                  >
                    {article.title}
                  </Link>
                </h2>

                <p className="font-body text-base leading-[1.75] text-text-secondary line-clamp-4">
                  {article.excerpt}
                </p>
              </div>

              {/* Author row */}
              <div className="flex items-center gap-4 border-t border-border-hairline pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-inverse text-xs font-bold uppercase text-text-inverse">
                  GB
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-text-secondary">
                    By GBD Editorial
                  </p>
                  <p className="mt-0.5 truncate font-body text-xs text-text-secondary">
                    Food culture, plant-based dining, and the future of fast food.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
