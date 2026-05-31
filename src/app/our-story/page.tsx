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
    <section className="border-b border-white/20 bg-surface-inverse text-white">
      <div className="mx-auto flex w-full max-w-shell flex-col gap-4 px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
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
    <section className="border-b border-border-strong bg-canvas">
      <div className="mx-auto grid w-full max-w-shell grid-cols-1 gap-8 px-5 py-8 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-12">
        <div className="flex flex-col justify-center gap-6 lg:col-span-5">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-text-secondary">
            Our Story
          </p>
          <h1 className="max-w-[10ch] font-display text-[clamp(3rem,7vw,5.5rem)] font-bold uppercase tracking-display leading-[0.88] text-text-primary">
            Who we are
          </h1>
          <div className="space-y-4">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-xl font-body text-sm leading-relaxed text-text-secondary sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:col-span-7 lg:grid-cols-2">
          {section.images.slice(0, 2).map((src, index) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden border border-border-strong md:aspect-[4/5]"
            >
              <Image
                src={src}
                alt={index === 0 ? section.title : `${section.title} detail`}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="rounded-none object-cover"
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
    <section className="border-b border-border-strong bg-canvas">
      <div className="mx-auto w-full max-w-shell px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-center gap-6 border border-border-strong bg-canvas p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
              {section.title}
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase tracking-display leading-[0.9] text-text-primary">
              The experience
            </h2>
            <div className="space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-xl font-body text-sm leading-relaxed text-text-secondary sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7">
            {section.images.map((src, index) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden border border-border-strong md:aspect-[4/5]"
              >
                <Image
                  src={src}
                  alt={`${section.title} image ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 22vw"
                  className="rounded-none object-cover"
                />
              </div>
            ))}
          </div>
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
    <section className="border-b border-border-strong bg-canvas">
      <div className={cn("mx-auto grid w-full max-w-shell grid-cols-1 gap-6 px-5 py-8 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-12", reverse && "lg:[direction:rtl]")}>
        <div className={cn("flex flex-col justify-center gap-6 border border-border-strong bg-canvas p-6 sm:p-8 lg:col-span-5 lg:p-10", reverse && "lg:[direction:ltr]")}>
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-text-secondary">
            {section.title}
          </p>
          <div className="space-y-4">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-xl font-body text-sm leading-relaxed text-text-secondary sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7", reverse && "lg:[direction:ltr]")}>
          {section.images.map((src, index) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden border border-border-strong md:aspect-[4/5]"
            >
              <Image
                src={src}
                alt={`${section.title} image ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="rounded-none object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
