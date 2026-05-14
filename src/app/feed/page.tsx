import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getPosts } from "@/data/repositories/posts-repository";
import type { Post } from "@/domain/post";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The Feed",
  description:
    "Nutrition science, community spotlights, and the GBD point of view.",
};

export default async function FeedPage() {
  const posts = await getPosts();
  const [hero, ...rest] = posts;

  return (
    <>
      <section className="bg-white pt-20 md:pt-28 pb-12 md:pb-16">
        <Container>
          <span className="block font-display font-bold uppercase tracking-[0.22em] text-[11px] text-gbd-navy/60 mb-6">
            The Feed
          </span>
          <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-5xl md:text-7xl lg:text-8xl text-gbd-navy max-w-4xl">
            Words From
            <br />
            The Spit.
          </h1>
          <p className="mt-8 max-w-xl font-body text-base md:text-lg text-gbd-navy/70">
            Nutrition deep-dives, store openings, and the people behind the brand.
          </p>
        </Container>
      </section>

      {hero && (
        <section className="bg-white py-12 md:py-20">
          <Container>
            <HeroPost post={hero} />
          </Container>
        </section>
      )}

      <section className="bg-white py-16 md:py-24 border-t border-gbd-navy/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {rest.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <NewsletterBlock />
        </Container>
      </section>
    </>
  );
}

function HeroPost({ post }: { post: Post }) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      <Link
        href={`/feed/${post.slug}`}
        aria-label={post.title}
        className="lg:col-span-7 group block"
      >
        {post.featuredImageUrl && (
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src={post.featuredImageUrl}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.03]"
            />
          </div>
        )}
      </Link>

      <div className="lg:col-span-5">
        <span className="block font-body uppercase tracking-widest text-xs text-gbd-navy mb-6">
          {post.category}
        </span>
        <h2 className="font-display font-bold uppercase tracking-tighter leading-[1] text-4xl md:text-5xl text-gbd-navy">
          <Link
            href={`/feed/${post.slug}`}
            className="hover:text-gbd-red transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-6 font-body text-base text-gbd-navy/70 leading-relaxed line-clamp-4">
          {post.excerpt}
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link
            href={`/feed/${post.slug}`}
            className="group inline-flex items-center gap-2 font-display font-bold uppercase tracking-[0.16em] text-xs text-gbd-navy hover:text-gbd-red transition-colors"
          >
            Read Article
            <span
              aria-hidden
              className="transition-transform duration-500 ease-smooth group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <span className="font-body text-xs text-gbd-navy/50">
            {formatDate(post.publishedAt)} · {post.author}
          </span>
        </div>
      </div>
    </article>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/feed/${post.slug}`} aria-label={post.title} className="block">
        {post.featuredImageUrl && (
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src={post.featuredImageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.04]"
            />
          </div>
        )}
      </Link>

      <div className="pt-6">
        <span className="block font-body uppercase tracking-widest text-xs text-gbd-navy mb-4">
          {post.category}
        </span>
        <h3 className="font-display font-bold uppercase tracking-tighter leading-[1.05] text-xl text-gbd-navy line-clamp-2">
          <Link
            href={`/feed/${post.slug}`}
            className="hover:text-gbd-red transition-colors"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 font-body text-sm text-gbd-navy leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <Link
          href={`/feed/${post.slug}`}
          className="group/link mt-5 inline-flex items-center gap-2 font-display font-bold uppercase tracking-[0.16em] text-xs text-gbd-navy hover:text-gbd-red transition-colors"
        >
          Read Article
          <span
            aria-hidden
            className="transition-transform duration-500 ease-smooth group-hover/link:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

function NewsletterBlock() {
  return (
    <div className="border border-gbd-navy bg-white p-10 md:p-14 lg:p-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-7">
          <span className="block font-display font-bold uppercase tracking-[0.22em] text-[11px] text-gbd-navy/60 mb-6">
            The Brief
          </span>
          <h3 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-3xl md:text-5xl text-gbd-navy">
            New Drops.
            <br />
            Straight to your inbox.
          </h3>
          <p className="mt-6 max-w-md font-body text-sm text-gbd-navy/70">
            Monthly notes on what we&apos;re cooking, where we&apos;re opening,
            and the people we&apos;re backing.
          </p>
        </div>
        <NewsletterInlineForm />
      </div>
    </div>
  );
}

function NewsletterInlineForm() {
  return (
    <form
      className="lg:col-span-5"
      action="#"
    >
      <label htmlFor="feed-email" className="sr-only">
        Email address
      </label>
      <div className="relative flex items-center border-b border-gbd-navy focus-within:border-b-2">
        <input
          id="feed-email"
          type="email"
          required
          placeholder="your@email.com"
          className="w-full bg-transparent py-3 pr-12 font-body text-base text-gbd-navy placeholder:text-gbd-navy/40 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute right-0 inline-flex h-10 w-10 items-center justify-center text-gbd-navy hover:text-gbd-red transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-5 w-5"
            aria-hidden
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
