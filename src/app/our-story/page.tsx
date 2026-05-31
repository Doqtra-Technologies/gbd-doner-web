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
    <section className="border-b border-border-hairline bg-[linear-gradient(180deg,#1f140d_0%,#3a2718_100%)] text-white">
      <div className="mx-auto flex w-full max-w-shell flex-col gap-4 px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-white/70">
          Our Story
        </p>
        <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold uppercase tracking-display leading-[0.9]">
          Building a modern doner brand for Britain
        </h1>
        <p className="max-w-3xl font-body text-sm leading-relaxed text-white/80 sm:text-base">
          From rooted tradition to a new-generation food experience, GBD brings quality, design, and consistency together.
        </p>
      </div>
    </section>
  );
}

function StoryHero({ section }: { section: StorySection }) {
  return (
    <section className="border-b border-border-hairline bg-[linear-gradient(180deg,#fffdf8_0%,#fff8ec_100%)]">
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
          <div className="relative min-h-[18rem] overflow-hidden rounded-[24px] border border-border-hairline shadow-[0_16px_40px_rgba(15,30,45,0.08)] lg:min-h-[34rem] lg:row-span-2">
            <Image
              src={section.images[0]}
              alt={section.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <div className="relative min-h-[18rem] overflow-hidden rounded-[24px] border border-border-hairline bg-canvas shadow-[0_16px_40px_rgba(15,30,45,0.08)] lg:min-h-[34rem]">
            <Image
              src={section.images[1]}
              alt={`${section.title} detail`}
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryFeatureStrip({ section }: { section: StorySection }) {
  return (
    <section className="border-b border-border-hairline bg-canvas">
      <div className="mx-auto w-full max-w-shell px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-center gap-6 rounded-[24px] border border-border-hairline bg-canvas p-6 shadow-[0_14px_34px_rgba(15,30,45,0.06)] sm:p-8 lg:col-span-5 lg:p-10">
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:col-span-7">
            {section.images.map((src, index) => (
              <div
                key={src}
                className={cn(
                  "relative overflow-hidden rounded-[24px] border border-border-hairline bg-canvas shadow-[0_16px_40px_rgba(15,30,45,0.08)]",
                  index === 0 && "md:col-span-2 md:min-h-[22rem]",
                  index > 0 && "md:min-h-[22rem]",
                )}
              >
                <Image
                  src={src}
                  alt={`${section.title} image ${index + 1}`}
                  fill
                  sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
                  className="object-cover"
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
    <section className="border-b border-border-hairline bg-canvas">
      <div className={cn("mx-auto grid w-full max-w-shell grid-cols-1 gap-6 px-5 py-8 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-12", reverse && "lg:[direction:rtl]") }>
        <div className={cn("flex flex-col justify-center gap-6 rounded-[24px] border border-border-hairline bg-[linear-gradient(180deg,#fffdf8_0%,#fff8ec_100%)] p-6 shadow-[0_14px_34px_rgba(15,30,45,0.06)] sm:p-8 lg:col-span-5 lg:p-10", reverse && "lg:[direction:ltr]") }>
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

        <div className={cn("grid gap-4 md:grid-cols-2 lg:col-span-7", reverse && "lg:[direction:ltr]") }>
          {section.images.map((src, index) => (
            <div
              key={src}
              className={cn(
                "relative overflow-hidden rounded-[24px] border border-border-hairline shadow-[0_16px_40px_rgba(15,30,45,0.08)]",
                index === 0 ? "min-h-[18rem] md:min-h-[24rem]" : "min-h-[18rem] md:min-h-[24rem]",
              )}
            >
              <Image
                src={src}
                alt={`${section.title} image ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
