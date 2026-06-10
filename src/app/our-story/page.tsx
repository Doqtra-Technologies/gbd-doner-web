import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { PageBanner } from "@/components/ui/page-banner";
import { JoinClubForm } from "@/components/our-story/join-club-form";
import { getOurStoryPageSettings } from "@/data/repositories/site-settings-repository";
import type { OurStoryPageSettings } from "@/domain/site-settings";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Great British Doner — adapting traditional shish doner culture to the speed, aesthetics, and lifestyle of modern Britain.",
};

// Long, editorial zoom on hover — the page's single shared motion primitive.
const CINEMATIC =
  "object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105";

/** Wide editorial shell — broader than the product max-w-shell for magazine air. */
function Shell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1400px] px-6 lg:px-12", className)}>
      {children}
    </div>
  );
}

export default async function OurStoryPage() {
  const storySettings = await getOurStoryPageSettings();

  return (
    <main className="w-full bg-canvas text-text-primary">
      <StoryHero settings={storySettings} />
      <PhilosophySpread settings={storySettings} />
      <BlueprintSection settings={storySettings} />
      <CommunitySection settings={storySettings} />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   1 · HERO — full-bleed photograph, oversized stacked megatitle bottom-left.
   ──────────────────────────────────────────────────────────────────────── */
function StoryHero({ settings }: { settings: OurStoryPageSettings }) {
  const headline = (
    <>
      {settings.heroTitleLine1}
      {settings.heroTitleLine2 && (
        <>
          <br />
          {settings.heroTitleLine2}
        </>
      )}
    </>
  );

  return (
    <PageBanner
      imageSrc={settings.heroImageUrl}
      imageAlt="Great British Doner — freshly carved shish doner"
      eyebrow={settings.heroEyebrow}
      headline={headline}
      subheading={settings.heroSubheading}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   2 · PHILOSOPHY — left editorial column, right offset image composition with
       an overlapping stat plate and a hairline caption tag.
   ──────────────────────────────────────────────────────────────────────── */
function PhilosophySpread({ settings }: { settings: OurStoryPageSettings }) {
  return (
    <Section size="compact" className="border-b border-border-hairline">
      <Shell>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial column */}
          <div className="flex flex-col gap-7 lg:col-span-5">
            <Eyebrow tone="accent">{settings.philosophyEyebrow}</Eyebrow>
            <Heading level={2} className="text-balance">
              {settings.philosophyHeadingLine1}
              {settings.philosophyHeadingLine2 && (
                <>
                  <br />
                  {settings.philosophyHeadingLine2}
                </>
              )}
            </Heading>
            <p className="max-w-xl font-body text-lg leading-relaxed text-text-primary whitespace-pre-line">
              {settings.philosophyLeadParagraph}
            </p>
            <p className="max-w-xl font-body text-base leading-relaxed text-text-secondary whitespace-pre-line">
              {settings.philosophySecondaryText}
            </p>
            {settings.philosophyTags && (
              <span className="mt-2 inline-flex w-max items-center gap-2.5 border border-border-hairline px-4 py-2 font-display text-[10px] font-bold uppercase tracking-eyebrow text-text-primary">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                {settings.philosophyTags}
              </span>
            )}
          </div>

          {/* Offset image composition */}
          <div className="relative lg:col-span-7">
            <div className="grid grid-cols-2 gap-5 sm:gap-8">
              <div className="group relative aspect-[4/5] overflow-hidden">
                <Image
                  src={settings.philosophyImage1Url}
                  alt="GBD restaurant interior and counter"
                  fill
                  sizes="(max-width: 1024px) 50vw, 28vw"
                  className={CINEMATIC}
                />
              </div>
              <div className="group relative mt-8 aspect-[4/5] overflow-hidden lg:mt-16">
                <Image
                  src={settings.philosophyImage2Url}
                  alt="A freshly prepared GBD wrap"
                  fill
                  sizes="(max-width: 1024px) 50vw, 28vw"
                  className={CINEMATIC}
                />
              </div>
            </div>

            {/* Overlapping stat plate */}
            <div className="absolute -bottom-6 left-4 z-10 flex w-[58%] max-w-[260px] flex-col gap-1 bg-surface-inverse p-5 text-white sm:left-6 lg:-left-10">
              <span className="font-display text-4xl font-black leading-none sm:text-5xl">
                {settings.philosophyStatValue}
              </span>
              <span className="font-body text-[11px] leading-snug text-white/70">
                {settings.philosophyStatLabel}
              </span>
            </div>

            {/* Caption tag */}
            <span className="absolute -top-3 right-4 z-10 bg-accent px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-eyebrow text-white">
              {settings.philosophyTagLabel}
            </span>
          </div>
        </div>
      </Shell>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   3 · BLUEPRINT — centred intro, a two-up principle row of differing heights,
       then a full-width inverse band (reference's coloured band).
   ──────────────────────────────────────────────────────────────────────── */
function BlueprintSection({ settings }: { settings: OurStoryPageSettings }) {
  return (
    <Section size="compact" className="border-b border-border-hairline">
      <Shell>
        {/* Centred chapter intro */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <Eyebrow tone="accent">{settings.blueprintEyebrow}</Eyebrow>
          <Heading level={2}>{settings.blueprintHeading}</Heading>
          <p className="font-body text-base leading-relaxed text-text-secondary">
            {settings.blueprintDesc}
          </p>
        </div>

        {/* Two-up principle row — deliberately unequal heights. */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Large block — image + copy */}
          <div className="flex flex-col gap-7 lg:col-span-7">
            {settings.blueprintPt1.imageUrl && (
              <div className="group relative aspect-[16/10] overflow-hidden">
                <Image
                  src={settings.blueprintPt1.imageUrl}
                  alt={settings.blueprintPt1.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className={CINEMATIC}
                />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <Eyebrow tone="secondary">{settings.blueprintPt1.eyebrow}</Eyebrow>
              <Heading level={3}>{settings.blueprintPt1.title}</Heading>
              <p className="max-w-lg font-body text-base leading-relaxed text-text-secondary">
                {settings.blueprintPt1.desc}
              </p>
            </div>
          </div>

          {/* Small block — text-led, offset down */}
          <div className="flex flex-col gap-3 lg:col-span-5 lg:mt-16 lg:pl-8">
            <Eyebrow tone="secondary">{settings.blueprintPt2.eyebrow}</Eyebrow>
            <Heading level={3}>{settings.blueprintPt2.title}</Heading>
            <p className="max-w-md font-body text-base leading-relaxed text-text-secondary">
              {settings.blueprintPt2.desc}
            </p>
            {settings.blueprintPt2.watermark && (
              <span className="mt-2 font-display text-6xl font-black leading-none text-text-primary/10">
                {settings.blueprintPt2.watermark}
              </span>
            )}
          </div>
        </div>

        {/* Full-width inverse band */}
        <div className="mt-12 grid grid-cols-1 overflow-hidden bg-surface-inverse text-white lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 p-8 sm:p-12 lg:p-16">
            <Eyebrow tone="accent">{settings.blueprintPt3.eyebrow}</Eyebrow>
            <Heading level={2} tone="inverse">
              {settings.blueprintPt3.title}
            </Heading>
            <p className="max-w-md font-body text-base leading-relaxed text-white/70">
              {settings.blueprintPt3.desc}
            </p>
            <Link
              href="/menu"
              className="mt-2 inline-flex h-12 w-max items-center justify-center bg-accent px-8 font-display text-xs font-bold uppercase tracking-button text-white transition-colors duration-300 hover:bg-white hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View The Menu
            </Link>
          </div>
          {settings.blueprintPt3.imageUrl && (
            <div className="group relative min-h-[280px] overflow-hidden lg:min-h-0">
              <Image
                src={settings.blueprintPt3.imageUrl}
                alt={settings.blueprintPt3.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={CINEMATIC}
              />
            </div>
          )}
        </div>
      </Shell>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   4 · COMMUNITY — centred intro, a row of recognition cards closing on a
       hairline "join" plate (reference's "Join the Tribe").
   ──────────────────────────────────────────────────────────────────────── */
function CommunitySection({ settings }: { settings: OurStoryPageSettings }) {
  return (
    <Section size="compact">
      <Shell>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <Eyebrow tone="accent">{settings.communityEyebrow}</Eyebrow>
          <Heading level={2}>{settings.communityHeading}</Heading>
          <p className="font-body text-base leading-relaxed text-text-secondary">
            {settings.communityDesc}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {settings.recognitionItems.map((item) => {
            const cardContent = (
              <>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                    className={CINEMATIC}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Heading level={3} className="group-hover:text-accent transition-colors duration-300">
                    {item.label}
                  </Heading>
                  <p className="font-body text-sm leading-relaxed text-text-secondary">
                    {item.copy}
                  </p>
                </div>
              </>
            );

            if (item.link) {
              return (
                <a
                  key={item.label}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <article key={item.label} className="group flex flex-col gap-4">
                {cardContent}
              </article>
            );
          })}

          {/* Join plate — bordered, text-led */}
          <div className="flex flex-col justify-between gap-6 border border-border-hairline p-7">
            <div className="flex flex-col gap-3">
              <span
                aria-hidden
                className="inline-flex h-11 w-11 items-center justify-center bg-accent font-display text-lg font-black text-white"
              >
                GBD
              </span>
              <Heading level={3}>Join The Club</Heading>
              <p className="font-body text-sm leading-relaxed text-text-secondary">
                Rewards, product drops, and first access to new openings.
              </p>
            </div>
            <JoinClubForm />
          </div>
        </div>
      </Shell>
    </Section>
  );
}
