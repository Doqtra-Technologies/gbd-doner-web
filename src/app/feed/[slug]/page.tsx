import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/data/repositories/posts-repository";

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImageUrl ? [post.featuredImageUrl] : undefined,
    },
  };
}

export default async function FeedArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const publishedLabel = formatDate(post.publishedAt);

  return (
    <main className="w-full bg-canvas">
      <article className="border-b border-border-hairline">
        <header className="grid grid-cols-1 md:grid-cols-12 border-b border-border-hairline">
          <div className="md:col-span-5 flex flex-col justify-center gap-8 p-10 lg:p-16">
            <Link
              href="/feed"
              className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-secondary hover:text-accent transition-colors"
            >
              ← The Feed
            </Link>
            <span className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-accent">
              {post.category}
            </span>
            <h1 className="font-display font-bold uppercase tracking-display leading-[0.9] text-text-primary text-3xl md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 font-body text-xs text-text-secondary opacity-70">
              <span>{post.author}</span>
              {publishedLabel && (
                <>
                  <span aria-hidden>·</span>
                  <time dateTime={post.publishedAt}>{publishedLabel}</time>
                </>
              )}
            </div>
          </div>
          {post.featuredImageUrl && (
            <div className="relative md:col-span-7 w-full aspect-square md:aspect-auto md:min-h-[420px] bg-surface-inverse">
              <Image
                src={post.featuredImageUrl}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          )}
        </header>

        {post.bodyHtml && (
          <div className="px-8 lg:px-16 py-16 lg:py-24 max-w-3xl mx-auto">
            <div
              className="prose-feed font-body text-base leading-relaxed text-text-primary [&_p]:mb-5 [&_h2]:font-display [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-display [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_a]:text-accent [&_a]:underline-offset-4 hover:[&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_img]:my-8"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />
          </div>
        )}
      </article>
    </main>
  );
}

function formatDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
