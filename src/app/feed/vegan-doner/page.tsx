import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { blogData } from "@/data/content";

const { article } = blogData;

export const metadata: Metadata = {
  title: article.title,
  description: article.contentPart1[0],
};

export default function VeganDonerArticlePage() {
  return (
    <article className="w-full bg-canvas text-text-primary">
      <NavAnchor />
      <Masthead />
      <HeroImage />
      <ReadingColumn paragraphs={article.contentPart1} />
      <InterstitialGallery />
      <ReadingColumn paragraphs={article.contentPart2} />
    </article>
  );
}

function NavAnchor() {
  return (
    <nav
      aria-label="Article navigation"
      className="relative w-full px-8 py-6 border-b border-border-hairline flex items-center bg-canvas"
    >
      <Link
        href="/feed"
        className="font-body text-[10px] uppercase tracking-eyebrow text-text-primary hover:text-accent transition-colors duration-300"
      >
        ← Back to Feed
      </Link>
      <span className="absolute left-1/2 -translate-x-1/2 font-body text-[10px] uppercase tracking-eyebrow text-accent">
        {article.category}
      </span>
    </nav>
  );
}

function Masthead() {
  return (
    <header className="w-full px-8 py-16 lg:py-24 flex justify-center bg-canvas border-b border-border-hairline">
      <h1 className="max-w-4xl text-center text-4xl lg:text-5xl font-display font-bold leading-[0.9] tracking-display text-text-primary">
        {article.title}
      </h1>
    </header>
  );
}

function HeroImage() {
  return (
    <div className="relative w-full aspect-[21/9] lg:aspect-[3/1] bg-surface-inverse border-b border-border-hairline">
      <Image
        src={article.heroImage}
        alt={article.title}
        fill
        priority
        sizes="100vw"
        className="object-cover w-full h-full opacity-90"
      />
    </div>
  );
}

function ReadingColumn({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <section className="w-full bg-canvas py-16 px-8 flex justify-center">
      <div className="max-w-2xl w-full flex flex-col gap-6">
        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="font-body text-sm lg:text-base leading-relaxed text-text-secondary"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function InterstitialGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-full border-y border-border-hairline bg-canvas">
      {article.inlineGallery.map((src, i, arr) => (
        <div
          key={src}
          className={cn(
            "relative aspect-square overflow-hidden border-b md:border-b-0 md:border-r border-border-hairline",
            i === arr.length - 1 && "last:border-r-0 last:border-b-0",
          )}
        >
          <Image
            src={src}
            alt={`Vegan doner — frame ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}
