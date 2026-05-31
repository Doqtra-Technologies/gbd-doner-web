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

// Cinematic scale: deliberate zoom with long easing for editorial motion.
const CINEMATIC_SCALE =
  "object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105";

export default function OurStoryPage() {
  const [whoWeAre, experience, vision] = storyData.sections;

  return (
    <main className="w-full bg-canvas text-text-primary">
      <StoryBanner />
      <StoryHero section={whoWeAre} />
      <StoryFeatureStrip section={experience} />
      <StorySplitSection section={vision} reverse />
    </main>
  );
}

function StoryBanner() {
  return (
    <section className="border-b border-white/20 bg-surface-inverse text-white" data-theme="dark">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-4 px-6 py-10 lg:px-12 lg:py-14">
        <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
          Our Story
        </p>
        <h1 className="max-w-4xl text-balance font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold uppercase tracking-display leading-[0.9]">
          Building a modern doner brand for Britain
        </h1>
        <p className="max-w-3xl font-body text-sm leading-relaxed text-white/70 sm:text-base">
          From rooted tradition to a new-generation food experience, GBD brings quality, design, and consistency together.
        </p>
      </div>
    </section>
  );
}

function StoryHero({ section }: { section: StorySection }) {
  return (
    <section className="border-t border-border-hairline">
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 items-start gap-12 px-6 py-12 lg:grid-cols-12 lg:gap-24 lg:px-12">
        <div className="flex flex-col gap-6 text-balance lg:col-span-5">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-surface-inverse/70">
            Our Story
          </p>
          <h1 className="max-w-[10ch] font-display text-[clamp(3rem,7vw,5.5rem)] font-bold uppercase tracking-display leading-[0.88] text-surface-inverse">
            Who we are
          </h1>
          {section.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={cn(
                "max-w-xl font-body",
                index === 0
                  ? "text-2xl font-light text-surface-inverse mb-8"
                  : "text-base text-surface-inverse/70 mb-6",
                index === section.paragraphs.length - 1 && "mb-0",
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-7">
          {section.images.slice(0, 2).map((src, index) => (
            <div
              key={src}
              className={cn(
                "group relative aspect-[4/5] overflow-hidden",
                index === 0 ? "mt-0" : "mt-24",
              )}
            >
              <Image
                src={src}
                alt={index === 0 ? section.title : `${section.title} detail`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 35vw"
                className={cn("rounded-none", CINEMATIC_SCALE)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryFeatureStrip({ section }: { section: StorySection }) {
  return (
    <section className="border-t border-border-hairline">
      <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 items-start gap-12 px-6 py-12 lg:grid-cols-12 lg:gap-24 lg:px-12">
        <div className="flex flex-col gap-6 text-balance lg:col-span-5">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
            {section.title}
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase tracking-display leading-[0.9] text-surface-inverse">
            The experience
          </h2>
          {section.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={cn(
                "max-w-xl font-body",
                index === 0
                  ? "text-2xl font-light text-surface-inverse mb-8"
                  : "text-base text-surface-inverse/70 mb-6",
                index === section.paragraphs.length - 1 && "mb-0",
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-7">
          {section.images.map((src, index) => (
            <div
              key={src}
              className={cn(
                "group relative aspect-[4/5] overflow-hidden",
                index % 2 === 0 ? "mt-0" : "mt-24",
              )}
            >
              <Image
                src={src}
                alt={`${section.title} image ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 22vw"
                className={cn("rounded-none", CINEMATIC_SCALE)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySplitSection({
  section,
  reverse = false,
}: {
  section: StorySection;
  reverse?: boolean;
}) {
  return (
    <section className="border-t border-border-hairline">
      <div
        className={cn(
          "mx-auto grid w-full max-w-[1920px] grid-cols-1 items-start gap-12 px-6 py-12 lg:grid-cols-12 lg:gap-24 lg:px-12",
          reverse && "lg:[direction:rtl]",
        )}
      >
        <div className={cn("flex flex-col gap-6 text-balance lg:col-span-5", reverse && "lg:[direction:ltr]")}>
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-surface-inverse/70">
            {section.title}
          </p>
          {section.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={cn(
                "max-w-xl font-body",
                index === 0
                  ? "text-2xl font-light text-surface-inverse mb-8"
                  : "text-base text-surface-inverse/70 mb-6",
                index === section.paragraphs.length - 1 && "mb-0",
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className={cn("grid grid-cols-2 gap-8 lg:col-span-7", reverse && "lg:[direction:ltr]")}>
          {section.images.map((src, index) => (
            <div
              key={src}
              className={cn(
                "group relative aspect-[4/5] overflow-hidden",
                index % 2 === 0 ? "mt-0" : "mt-24",
              )}
            >
              <Image
                src={src}
                alt={`${section.title} image ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className={cn("rounded-none", CINEMATIC_SCALE)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
