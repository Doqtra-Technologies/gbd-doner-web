import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ArticleBlock, EditorialArticle } from "@/data/content";

export function EditorialArticlePage({ article }: { article: EditorialArticle }) {
  return (
    <main className="w-full bg-canvas text-text-primary pt-16 lg:pt-20">
      <article className="border-b border-border-hairline">
        <Header article={article} />
        <ArticleBody content={article.content} />
        <ClosingGallery images={article.inlineGallery} title={article.title} />
      </article>
    </main>
  );
}

function Header({ article }: { article: EditorialArticle }) {
  return (
    <header className="grid grid-cols-1 border-b border-border-hairline md:grid-cols-12">
      <div className="flex flex-col justify-center gap-8 p-10 md:col-span-5 lg:p-16">
        <Link
          href="/feed"
          className="font-display text-[10px] font-bold uppercase tracking-eyebrow text-text-secondary transition-colors hover:text-accent"
        >
          ← The Feed
        </Link>
        <span className="font-display text-[10px] font-bold uppercase tracking-eyebrow text-accent">
          {article.category}
        </span>
        <h1 className="font-display text-3xl font-bold uppercase tracking-display leading-[0.9] text-text-primary md:text-4xl lg:text-5xl">
          {article.title}
        </h1>
      </div>
      <div className="relative w-full bg-surface-inverse md:col-span-7 md:min-h-[420px] aspect-square md:aspect-auto">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 58vw"
          className="object-cover"
        />
      </div>
    </header>
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
