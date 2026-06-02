import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { blogData } from "@/data/content";

const { article } = blogData;

export const metadata: Metadata = {
  title: article.title,
  description: article.paragraphs[0],
};

export default function VeganDonerArticlePage() {
  return (
    // pt-16 / pt-20 = exact navbar height so NavAnchor is never hidden behind it.
    // All six article paragraphs are rendered in a single uninterrupted reading
    // column; the image gallery closes the piece beneath the final paragraph.
    <article className="w-full bg-canvas text-text-primary pt-16 lg:pt-20">
      <NavAnchor />
      <Masthead />
      <HeroImage />
      <ReadingColumn paragraphs={article.paragraphs} />
      <ClosingGallery />
    </article>
  );
}

function NavAnchor() {
  return (
    <nav
      aria-label="Article navigation"
      className="relative w-full border-b border-border-hairline bg-canvas"
    >
      <div className="mx-auto flex w-full max-w-shell items-center px-6 py-4 sm:px-8 lg:px-12">
        <Link
          href="/feed"
          className="flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-eyebrow text-text-secondary transition-colors duration-300 hover:text-accent"
        >
          <span aria-hidden>←</span>
          Back to The Feed
        </Link>
        <span className="absolute left-1/2 -translate-x-1/2 font-display text-[10px] font-bold uppercase tracking-eyebrow text-accent">
          {article.category}
        </span>
      </div>
    </nav>
  );
}

function Masthead() {
  return (
    <header className="w-full border-b border-border-hairline bg-canvas">
      <div className="mx-auto w-full max-w-shell px-6 py-14 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-3xl font-bold uppercase tracking-display leading-[0.9] text-text-primary text-balance sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
        </div>
      </div>
    </header>
  );
}

function HeroImage() {
  return (
    <div className="relative w-full aspect-[21/9] border-b border-border-hairline bg-surface-inverse">
      <Image
        src={article.heroImage}
        alt={article.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}

/**
 * All six article paragraphs in order, uninterrupted.
 * Text is rendered exactly as stored in content.ts — no modification.
 */
function ReadingColumn({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <section className="w-full border-b border-border-hairline bg-canvas py-14 lg:py-24">
      <div className="mx-auto w-full max-w-[65ch] px-6 sm:px-8">
        <div className="flex flex-col gap-7">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="font-body text-base leading-[1.75] text-text-secondary lg:text-[1.0625rem]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Editorial image gallery — closes the article below the final paragraph. */
function ClosingGallery() {
  return (
    <div className="grid grid-cols-1 border-b border-border-hairline bg-canvas md:grid-cols-3">
      {article.inlineGallery.map((src, i, arr) => (
        <div
          key={src}
          className={cn(
            "relative aspect-square overflow-hidden border-b border-border-hairline md:border-b-0 md:border-r",
            i === arr.length - 1 && "border-b-0 md:border-r-0",
          )}
        >
          <Image
            src={src}
            alt={`GBD vegan doner — view ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
