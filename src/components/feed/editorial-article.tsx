import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ArticleBlock, EditorialArticle } from "@/data/content";

export function EditorialArticlePage({ article }: { article: EditorialArticle }) {
  return (
    <article className="w-full bg-canvas text-text-primary pt-16 lg:pt-20">
      <NavAnchor category={article.category} />
      <Masthead title={article.title} />
      <HeroImage src={article.heroImage} alt={article.title} />
      <ArticleBody content={article.content} />
      <ClosingGallery images={article.inlineGallery} title={article.title} />
    </article>
  );
}

function NavAnchor({ category }: { category: string }) {
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
          {category}
        </span>
      </div>
    </nav>
  );
}

function Masthead({ title }: { title: string }) {
  return (
    <header className="w-full border-b border-border-hairline bg-canvas">
      <div className="mx-auto w-full max-w-shell px-6 py-14 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-3xl font-bold uppercase tracking-display leading-[0.9] text-text-primary text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
}

function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full aspect-[21/9] border-b border-border-hairline bg-surface-inverse">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}

function ArticleBody({ content }: { content: ArticleBlock[] }) {
  return (
    <section className="w-full border-b border-border-hairline bg-canvas py-14 lg:py-24">
      <div className="mx-auto w-full max-w-[65ch] px-6 sm:px-8">
        <div className="flex flex-col gap-7">
          {content.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="font-display text-xl font-bold uppercase tracking-display leading-[0.95] text-text-primary sm:text-2xl mt-4"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul
                  key={i}
                  className="list-disc pl-6 flex flex-col gap-2 font-body text-base leading-[1.75] text-text-secondary lg:text-[1.0625rem]"
                >
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={i}
                className="font-body text-base leading-[1.75] text-text-secondary lg:text-[1.0625rem]"
              >
                {block.text}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Editorial image gallery — closes the article below the final paragraph. */
function ClosingGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="grid grid-cols-1 border-b border-border-hairline bg-canvas md:grid-cols-3">
      {images.map((src, i, arr) => (
        <div
          key={src}
          className={cn(
            "relative aspect-square overflow-hidden border-b border-border-hairline md:border-b-0 md:border-r",
            i === arr.length - 1 && "border-b-0 md:border-r-0",
          )}
        >
          <Image
            src={src}
            alt={`${title} — view ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
