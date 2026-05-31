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
  title: "The Feed",
  description:
    "Nutrition science, community spotlights, and the GBD point of view.",
};

type FeedArticle = {
  category: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
};

const FALLBACK_IMAGE = "/blog/1.png";

function postToArticle(post: Post): FeedArticle {
  return {
    category: (post.category ?? "BLOG").toUpperCase(),
    title: post.title,
    excerpt: post.excerpt ?? "",
    image: post.featuredImageUrl ?? FALLBACK_IMAGE,
    slug: `/feed/${post.slug}`,
  };
}

export default async function FeedPage() {
  const [posts, pageSettings] = await Promise.all([
    getPosts(),
    getFeedPageSettings(),
  ]);

  const articles = posts.map(postToArticle);
  const featured: FeedArticle = articles[0] ?? feedData.featuredArticle;
  const grid: FeedArticle[] = articles.slice(1);

  return (
    <main className="w-full bg-canvas">
      <FeedHero featured={featured} pageSettings={pageSettings} />
      <ArticleGrid articles={grid} emptyState={pageSettings.emptyState} />
    </main>
  );
}

function FeedHero({
  featured,
  pageSettings,
}: {
  featured: FeedArticle;
  pageSettings: FeedPageSettings;
}) {
  const heroTitle = pageSettings.headingLines.join(" ");

  return (
    <section className="border-b border-border-hairline bg-[linear-gradient(180deg,#fffdf8_0%,#fff8ec_100%)]">
      <div className="mx-auto w-full max-w-shell px-5 pt-10 pb-12 sm:px-8 lg:px-10 lg:pt-14 lg:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.34em] text-text-secondary">
            {pageSettings.eyebrow}
          </p>

          <h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4.8rem)] font-bold uppercase tracking-display leading-[0.88] text-text-primary">
            {heroTitle}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-text-secondary sm:text-base">
            {pageSettings.lead}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[28px] border border-border-hairline bg-canvas shadow-[0_20px_60px_rgba(15,30,45,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative lg:col-span-7 min-h-[26rem] bg-surface-inverse overflow-hidden">
              <Link href={featured.slug} aria-label={featured.title} className="group absolute inset-0 block">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,26,31,0.08)_0%,rgba(20,26,31,0.34)_100%)]" />

                <div className="absolute left-5 top-5 z-10 rounded-full bg-surface-inverse/90 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.28em] text-text-inverse backdrop-blur-sm">
                  Featured Story
                </div>

                <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-10">
                  <span className="inline-flex items-center gap-2 rounded-full bg-canvas/90 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.28em] text-text-primary backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {featured.category}
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:col-span-5 lg:p-10">
              <div className="space-y-5">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
                  Performance
                </p>

                <h2 className="max-w-xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-bold uppercase tracking-display leading-[0.9] text-text-primary">
                  {featured.title}
                </h2>

                <p className="max-w-xl font-body text-sm leading-relaxed text-text-secondary sm:text-base">
                  {featured.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-border-hairline pt-5">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-canvas text-sm font-bold uppercase text-text-primary">
                  {initialsForAuthor(pageSettings.eyebrow)}
                </div>

                <div className="min-w-0">
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-text-secondary">
                    By GBD Editorial
                  </p>
                  <p className="mt-1 truncate font-body text-sm text-text-secondary">
                    Wellness, habits, and everyday performance.
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

function ArticleGrid({
  articles,
  emptyState,
}: {
  articles: ReadonlyArray<FeedArticle>;
  emptyState: string;
}) {
  if (articles.length === 0) {
    return (
      <section className="py-24 text-center">
        <p className="font-body text-sm text-text-secondary opacity-70">
          {emptyState}
        </p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 w-full border-b border-border-hairline">
      {articles.map((article, i) => (
        <div
          key={`${article.slug}-${i}`}
          className={[
            "border-r border-b border-border-hairline last:border-b-0",
            "md:[&:nth-child(2n)]:border-r-0",
            "lg:[&:nth-child(2n)]:border-r",
            "lg:[&:nth-child(3n)]:border-r-0",
            articles.length - i <= 3 ? "lg:border-b-0" : "",
            articles.length - i <= 2 ? "md:border-b-0 lg:border-b-0" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <ArticleCard article={article} />
        </div>
      ))}
    </section>
  );
}

function initialsForAuthor(value: string): string {
  const words = value.split(/\s+/).filter(Boolean);
  const letters = words.slice(0, 2).map((word) => word[0]?.toUpperCase() ?? "");
  return letters.join("") || "GB";
}

function ArticleCard({ article }: { article: FeedArticle }) {
  return (
    <article className="group flex flex-col h-full bg-canvas">
      <Link
        href={article.slug}
        aria-label={article.title}
        className="block"
      >
        <div className="relative w-full aspect-square md:aspect-[4/5] overflow-hidden border-b border-border-hairline">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-full object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.99)] transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-grow justify-center gap-4 p-8 lg:p-12">
        <span className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-accent">
          {article.category}
        </span>

        <h3 className="font-display font-bold uppercase tracking-display leading-tight text-text-primary text-xl md:text-2xl line-clamp-3">
          <Link
            href={article.slug}
            className="transition-colors duration-300 ease-smooth group-hover:text-accent"
          >
            {article.title}
          </Link>
        </h3>

        <p className="font-body text-sm leading-relaxed text-text-secondary opacity-70 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="mt-auto pt-4">
          <Link
            href={article.slug}
            className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-primary border-b border-border-strong pb-0.5 transition-colors duration-300 ease-smooth hover:text-accent hover:border-accent"
          >
            Read Article
          </Link>
        </div>
      </div>
    </article>
  );
}
