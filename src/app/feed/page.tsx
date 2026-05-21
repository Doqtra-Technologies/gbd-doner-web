import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { feedData } from "@/data/content";

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

export default function FeedPage() {
  return (
    <main className="w-full bg-canvas">
      <FeedHero featured={feedData.featuredArticle} />
      <ArticleGrid articles={feedData.gridArticles} />
    </main>
  );
}

function FeedHero({ featured }: { featured: FeedArticle }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 border-b border-border-hairline w-full">
      <div className="md:col-span-4 md:border-r md:border-border-hairline flex flex-col justify-center gap-12 p-10 lg:p-16">
        <span className="font-body uppercase tracking-eyebrow text-xs text-text-secondary">
          The Feed
        </span>

        <h1 className="font-display font-bold uppercase tracking-display leading-[0.85] text-text-primary text-4xl sm:text-5xl lg:text-[4rem] max-w-[12ch]">
          <span className="block">Words from</span>
          <span className="block">
            the spit<span className="text-accent">.</span>
          </span>
        </h1>

        <p className="font-body text-sm md:text-base leading-relaxed text-text-secondary opacity-70 max-w-md">
          Nutrition deep-dives, store openings, and the people behind the
          brand.
        </p>
      </div>

      <div className="relative md:col-span-8 w-full aspect-square md:aspect-video lg:aspect-[21/9] bg-surface-inverse overflow-hidden">
        <Link
          href={featured.slug}
          aria-label={featured.title}
          className="group block absolute inset-0"
        >
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="w-full h-full object-cover opacity-70 [filter:contrast(1.04)_saturate(1.06)_brightness(0.98)] transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.02]"
          />

          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 flex flex-col gap-4">
            <span className="block font-display font-bold uppercase tracking-eyebrow text-[10px] text-accent">
              Featured · {featured.category}
            </span>
            <h2 className="font-display font-bold uppercase tracking-display leading-tight text-text-inverse text-2xl md:text-3xl lg:text-[2.25rem] max-w-3xl">
              {featured.title}
            </h2>
            <p className="font-body text-sm text-text-inverse opacity-80 max-w-xl line-clamp-2">
              {featured.excerpt}
            </p>
            <span className="inline-flex w-fit items-center gap-2 font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-inverse border-b border-text-inverse pb-1 transition-colors duration-300 ease-smooth group-hover:text-accent group-hover:border-accent">
              Read Article
              <span
                aria-hidden
                className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function ArticleGrid({ articles }: { articles: ReadonlyArray<FeedArticle> }) {
  if (articles.length === 0) {
    return (
      <section className="py-24 text-center">
        <p className="font-body text-sm text-text-secondary opacity-70">
          More stories arriving soon.
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
