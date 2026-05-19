import type { Metadata } from "next";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { storyData } from "@/data/content";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Great British Doner — modern fast-casual food redefining the traditional UK doner experience.",
};

type StorySection = (typeof storyData.sections)[number];

export default function OurStoryPage() {
  const [hero, ...rows] = storyData.sections;

  return (
    <article className="w-full bg-canvas">
      <StoryHero section={hero} />
      {rows.map((section) => (
        <StoryLedgerRow key={section.title} section={section} />
      ))}
    </article>
  );
}


function StoryHero({ section }: { section: StorySection }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-border-hairline">
      <div className="lg:border-r lg:border-border-hairline p-8 sm:p-12 lg:p-16 flex flex-col gap-8">
        <h1 className="font-display font-bold uppercase tracking-display leading-none text-3xl lg:text-4xl text-text-primary">
          {section.title}
        </h1>
        <div className="flex flex-col gap-4">
          {section.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="font-body text-sm opacity-80 leading-relaxed text-text-primary max-w-md"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[60vh] overflow-hidden">
        <Image
          src={section.images[0]}
          alt={section.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

function StoryLedgerRow({ section }: { section: StorySection }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-border-hairline">
      <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col gap-8">
        <h2 className="font-display font-bold uppercase tracking-display leading-none text-3xl lg:text-4xl text-text-primary">
          {section.title}
        </h2>
        <div className="flex flex-col gap-4">
          {section.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="font-body text-sm opacity-80 leading-relaxed text-text-primary max-w-md"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7 lg:border-l lg:border-border-hairline grid grid-cols-1 md:grid-cols-3 gap-0">
        {section.images.map((src, i) => (
          <div
            key={src}
            className={cn(
              "relative aspect-[4/5] overflow-hidden",
              i > 0 && "md:border-l md:border-border-hairline",
            )}
          >
            <Image
              src={src}
              alt={`${section.title} — frame ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
