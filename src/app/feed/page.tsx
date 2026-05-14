import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { getPosts } from "@/data/repositories/posts-repository";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The Feed",
  description: "Nutrition science, community spotlights, and the GBD point of view.",
};

export default async function FeedPage() {
  const posts = await getPosts();

  return (
    <Container className="py-20 md:py-28">
      <div className="display-eyebrow text-gbd-red mb-4">The Feed</div>
      <h1 className="display-h1 text-gbd-navy mb-6">Words from the spit.</h1>
      <p className="body-lg text-gbd-navy/70 max-w-2xl mb-16">
        Nutrition deep-dives, store openings, and the people behind the brand.
      </p>

      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="group">
            {post.featuredImageUrl && (
              <div className="relative aspect-[4/3] overflow-hidden bg-gbd-cream mb-5">
                <Image
                  src={post.featuredImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="display-eyebrow text-gbd-red mb-3">{post.category}</div>
            <h2 className="font-display font-bold uppercase tracking-display text-2xl text-gbd-navy leading-tight">
              {post.title}
            </h2>
            <p className="body-base text-gbd-navy/70 mt-3 line-clamp-3">{post.excerpt}</p>
            <div className="text-sm text-gbd-navy/50 mt-4">
              {post.author} ·{" "}
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
