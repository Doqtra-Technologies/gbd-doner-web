import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/data/repositories/posts-repository";
import type { Post } from "@/domain/post";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The Feed",
  description:
    "Nutrition science, community spotlights, and the GBD point of view.",
};

/**
 * The Feed — Architectural Editorial Magazine.
 *
 * Two locked blocks, edge-to-edge, divided by hairlines:
 *
 *   1. FeedHero       — 4/8 split: masthead left, featured article right
 *                       (full-bleed image with bottom-left overlay)
 *   2. ArticleGrid    — strict 3-col grid with bordered cells
 *
 * No Container, no centered shell. Print-magazine sensibility: every
 * article is a literal cell with its right and bottom hairlines.
 * Right-edge bleed via :nth-child(3n) cancellation.
 */
export default async function FeedPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="w-full bg-canvas">
      <FeedHero featured={featured ?? null} />
      <ArticleGrid posts={rest} />
    </main>
  );
}

function FeedHero({ featured }: { featured: Post | null }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 border-b border-border-hairline w-full">
      {/* Masthead — col-span-4 */}
      <div className="md:col-span-4 md:border-r md:border-border-hairline flex flex-col justify-between gap-12 p-8 lg:p-12 min-h-[40vh] md:min-h-[500px]">
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

      {/* Featured Article — col-span-8 */}
      <div className="relative md:col-span-8 min-h-[55vh] md:min-h-[500px] bg-surface-inverse overflow-hidden">
        {featured ? (
          <Link
            href={`/feed/${featured.slug}`}
            aria-label={featured.title}
            className="group block absolute inset-0"
          >
            {featured.featuredImageUrl && (
              <Image
                src={featured.featuredImageUrl}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover opacity-70 [filter:contrast(1.04)_saturate(1.06)_brightness(0.98)] transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.02]"
              />
            )}

            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <span className="block font-display font-bold uppercase tracking-eyebrow text-[10px] text-accent mb-4">
                Featured · {featured.category}
              </span>
              <h2 className="font-display font-bold uppercase tracking-display leading-tight text-text-inverse text-2xl md:text-3xl lg:text-[2.25rem] max-w-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 font-body text-sm text-text-inverse opacity-80 max-w-xl line-clamp-2">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-inverse border-b border-text-inverse pb-1 transition-colors duration-300 ease-smooth group-hover:text-accent group-hover:border-accent">
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
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-inverse opacity-60 font-body text-sm">
            No featured article yet.
          </div>
        )}
      </div>
    </section>
  );
}

function ArticleGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <section className="py-24 text-center">
        <p className="font-body text-sm text-text-secondary opacity-70">
          More stories arriving soon.
        </p>
      </section>
    );
  }
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 w-full border-b border-border-hairline"
    >
      {posts.map((post, i) => (
        <div
          key={post.id}
          className={[
            "border-r border-b border-border-hairline last:border-b-0",
            "md:[&:nth-child(2n)]:border-r-0",
            "lg:[&:nth-child(2n)]:border-r",
            "lg:[&:nth-child(3n)]:border-r-0",
            // Cancel bottom border on the final row at each breakpoint
            posts.length - i <= 3 ? "lg:border-b-0" : "",
            posts.length - i <= 2 ? "md:border-b-0 lg:border-b-0" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <ArticleCard post={post} />
        </div>
      ))}
    </section>
  );
}

function ArticleCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col h-full bg-canvas">
      <Link
        href={`/feed/${post.slug}`}
        aria-label={post.title}
        className="block"
      >
        {post.featuredImageUrl && (
          <div className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden border-b border-border-hairline">
            <Image
              src={post.featuredImageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.99)] transition-transform duration-[1100ms] ease-smooth group-hover:scale-[1.02]"
            />
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-grow p-6 lg:p-8">
        <span className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-accent mb-4">
          {post.category}
        </span>

        <h3 className="font-display font-bold uppercase tracking-display leading-tight text-text-primary text-xl md:text-2xl line-clamp-3">
          <Link
            href={`/feed/${post.slug}`}
            className="transition-colors duration-300 ease-smooth group-hover:text-accent"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary opacity-70 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-8 flex items-center justify-between gap-3">
          <Link
            href={`/feed/${post.slug}`}
            className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-primary border-b border-border-strong pb-0.5 transition-colors duration-300 ease-smooth hover:text-accent hover:border-accent"
          >
            Read Article
          </Link>
          <span className="font-body text-[10px] text-text-secondary opacity-50 shrink-0">
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>
    </article>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
