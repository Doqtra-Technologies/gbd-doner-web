import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { CTAButton } from "@/components/ui/cta-button";
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
      <Section size="hero">
        <Container>
          <Eyebrow tone="secondary" className="block mb-6">
            The Feed
          </Eyebrow>
          <Heading level={1} className="max-w-4xl">
            Words From
            <br />
            The Spit.
          </Heading>
          <p className="font-body text-lg leading-relaxed mt-8 max-w-xl text-text-secondary">
            Nutrition deep-dives, store openings, and the people behind the
            brand.
          </p>
        </Container>
      </Section>

      {hero && (
        <Section size="standard" className="border-t border-border-hairline">
          <Container>
            <HeroPost post={hero} />
          </Container>
        </Section>
      )}

      <Section size="standard" className="border-t border-border-hairline">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {rest.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </Section>
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
              className="rounded-none object-cover transition-transform duration-600 ease-smooth group-hover:scale-[1.02]"
            />
          </div>
        )}
      </Link>

      <div className="lg:col-span-5">
        <Eyebrow tone="primary" className="block mb-6">
          {post.category}
        </Eyebrow>
        <Heading level={2}>
          <Link
            href={`/feed/${post.slug}`}
            className="hover:text-accent transition-colors duration-300 ease-smooth"
          >
            {post.title}
          </Link>
        </Heading>
        <p className="font-body text-base leading-relaxed mt-6 text-text-secondary line-clamp-4">
          {post.excerpt}
        </p>
        <div className="mt-8 flex items-center gap-4">
          <CTAButton variant="tertiary" href={`/feed/${post.slug}`}>
            Read Article
          </CTAButton>
          <span className="font-body text-xs text-text-disabled">
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
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <Image
              src={post.featuredImageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="rounded-none object-cover transition-transform duration-600 ease-smooth group-hover:scale-[1.02]"
            />
          </div>
        )}
      </Link>

      <div className="pt-6">
        <Eyebrow tone="primary" className="block mb-4">
          {post.category}
        </Eyebrow>
        <Heading level={3} className="line-clamp-2">
          <Link
            href={`/feed/${post.slug}`}
            className="hover:text-accent transition-colors duration-300 ease-smooth"
          >
            {post.title}
          </Link>
        </Heading>
        <p className="font-body text-sm leading-relaxed mt-3 text-text-secondary line-clamp-3">
          {post.excerpt}
        </p>
        <CTAButton variant="tertiary" href={`/feed/${post.slug}`} className="mt-5">
          Read Article
        </CTAButton>
      </div>
    </article>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
