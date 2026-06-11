import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { PageBanner } from "@/components/ui/page-banner";
import { JoinClubForm } from "@/components/our-story/join-club-form";
import { AnimatedNumber } from "@/components/ui/animated-number";
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
      <AwardsSection />
      <StatsSection />
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
   AwardsSection — showcases GBD's recognition (Kebab Awards, TURTA, PETA).
   Matches the cinematic asymmetric layout of the Home page's Favourites.
   ──────────────────────────────────────────────────────────────────────── */
// Fine film grain, generated inline so it ships without an asset request.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface AwardTileProps {
  award: { title: string; desc: string; image: string; link?: string };
  featured?: boolean;
  className?: string;
}

function AwardTile({ award, featured = false, className }: AwardTileProps) {
  const content = (
    <>
      {/* Ambient red glow behind the logo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50 blur-2xl transition-opacity duration-700 ease-smooth group-hover:opacity-90"
        style={{ background: "radial-gradient(50% 45% at 50% 60%, rgba(201,64,53,0.32), transparent 72%)" }}
      />
      
      {/* Image filling the entire card */}
      <Image
        src={award.image}
        alt={award.title}
        fill
        sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 30vw"}
        className="object-cover [filter:contrast(1.08)_saturate(1.06)_brightness(0.84)] transition-transform duration-[1300ms] ease-smooth group-hover:scale-[1.06]"
      />

      {/* Legibility gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,18,28,0.95) 0%, rgba(15,30,45,0.45) 44%, transparent 80%)",
        }}
      />
      {/* Hover deepen */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gbd-navy/0 transition-colors duration-700 ease-smooth group-hover:bg-gbd-navy/20"
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 120% at 50% 42%, transparent 54%, rgba(10,18,28,0.55) 100%)" }}
      />
      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
      />
      {/* Glass top hairline + red accent border */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div
        aria-hidden
        className="absolute inset-0 rounded-none sm:rounded-[24px] ring-1 ring-gbd-red/15 transition-[box-shadow] duration-700 ease-smooth group-hover:ring-gbd-red/45"
      />
      {/* Content */}
      <div className={cn("absolute inset-x-0 bottom-0", featured ? "p-7 sm:p-9 lg:p-10" : "p-6 sm:p-7")}>
        <div className="transition-transform duration-700 ease-smooth group-hover:-translate-y-1.5">
          <span
            className={cn(
              "block font-campaign leading-none text-white/90 uppercase",
              featured ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl",
            )}
            style={{ letterSpacing: "-0.02em" }}
          >
            {award.title}
          </span>
          <p className="mt-3 font-body text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
            {award.desc}
          </p>
        </div>
      </div>
    </>
  );

  const classes = cn(
    "group relative block overflow-hidden rounded-none sm:rounded-[24px] bg-gbd-navy shadow-[0_36px_100px_-32px_rgba(201,64,53,0.2),0_22px_60px_-30px_rgba(10,18,28,0.9)] w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
    className,
  );

  if (award.link) {
    return (
      <a
        href={award.link}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return <div className={classes}>{content}</div>;
}

function AwardsSection() {
  const FEATURED_AWARD = {
    title: "British Kebab Awards",
    desc: "Recognised for culinary excellence and standard-setting quality in British street food.",
    image: "/Story/BRITISH KEBAB AWARDS.JPEG",
  };

  const SECONDARY_AWARDS = [
    {
      title: "TURTA Awards",
      desc: "Celebrated at the 4th Turkish Restaurant & Takeaway Awards for outstanding doner craftsmanship.",
      image: "/Story/TURTA.jpeg",
    },
    {
      title: "PETA Vegan Food Award",
      desc: "Awarded Best Vegan Kebab, pioneering modern plant-based options across the nation.",
      image: "/Story/PETA.png",
      link: "https://www.peta.org.uk/press/gbd-doner-wins-peta-vegan-food-award-for-best-vegan-kebab/",
    },
  ];

  return (
    <section
      data-theme="dark"
      className="relative overflow-hidden bg-surface-inverse pt-12 pb-16 md:pt-20 md:pb-24 text-text-inverse border-b border-border-hairline"
    >
      {/* ── Atmospheric background (navy depth, never flat black) ────── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{ background: "linear-gradient(180deg, #0A121C 0%, #0F1E2D 50%, #0A121C 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 45% at 82% 14%, rgba(201,64,53,0.10), transparent 60%), radial-gradient(45% 40% at 10% 90%, rgba(201,64,53,0.06), transparent 65%), radial-gradient(75% 60% at 50% 45%, rgba(20,38,56,0.5), transparent 78%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
      />

      <Shell>
        {/* ── Split editorial header ─────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end mb-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-accent">
              <span>03</span>
              <span aria-hidden className="h-px w-12 bg-current opacity-60" />
              <span className="text-white/55">Accolades</span>
            </div>
            <h2
              className="mt-5 font-campaign uppercase text-white text-[clamp(2.25rem,6vw,4.5rem)]"
              style={{ lineHeight: 0.9, letterSpacing: "-0.03em" }}
            >
              <span className="block">Award-Winning</span>
              <span className="block">
                Standards<span className="text-accent">.</span>
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-7 lg:col-span-4 lg:items-end lg:text-right">
            <p className="max-w-sm font-body text-sm leading-relaxed text-white/65 sm:text-base">
              Preserving authentic Turkish culinary heritage while leading the next generation of modern British street food.
            </p>
          </div>
        </div>

        {/* ── Featured + secondary (deliberate hierarchy imbalance) ──── */}
        <div className="-mx-5 sm:mx-0 grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Dominant featured tile */}
          <div className="lg:col-span-7">
            <AwardTile
              award={FEATURED_AWARD}
              featured
              className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[34rem]"
            />
          </div>

          {/* Two secondary tiles, stacked */}
          <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
            {SECONDARY_AWARDS.map((award) => (
              <div key={award.title} className="lg:flex-1">
                <AwardTile
                  award={award}
                  className="aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[15.5rem]"
                />
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   STATS — dark band with numeric achievements.
   ──────────────────────────────────────────────────────────────────────── */
function StatsSection() {
  return (
    <Section size="compact" className="bg-surface-inverse text-white">
      <Shell>
        <div className="flex flex-col items-center py-8 lg:py-12">
          <Heading level={3} tone="inverse" className="mb-10 text-center sm:mb-14">
            We&apos;re Good with Numbers
          </Heading>
          <div className="flex w-full max-w-4xl flex-wrap justify-center gap-x-8 gap-y-12 sm:justify-between sm:gap-x-0">
            <div className="flex flex-col items-center gap-3">
              <span className="font-display text-5xl font-bold leading-none sm:text-6xl md:text-[80px]">
                <AnimatedNumber value={5} />
              </span>
              <span className="font-body text-xs text-white/70 sm:text-sm">
                Locations
              </span>
            </div>

            <div className="hidden items-center justify-center sm:flex">
              <span aria-hidden className="mt-[-24px] h-1.5 w-1.5 rounded-full bg-white/30" />
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="font-display text-5xl font-bold leading-none sm:text-6xl md:text-[80px]">
                <AnimatedNumber value={100000} suffix="+" />
              </span>
              <span className="font-body text-xs text-white/70 sm:text-sm">
                Doners Served
              </span>
            </div>

            <div className="hidden items-center justify-center sm:flex">
              <span aria-hidden className="mt-[-24px] h-1.5 w-1.5 rounded-full bg-white/30" />
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="font-display text-5xl font-bold leading-none sm:text-6xl md:text-[80px]">
                <AnimatedNumber value={4.9} decimals={1} />
              </span>
              <span className="font-body text-xs text-white/70 sm:text-sm">
                Google Review
              </span>
            </div>

            <div className="hidden items-center justify-center sm:flex">
              <span aria-hidden className="mt-[-24px] h-1.5 w-1.5 rounded-full bg-white/30" />
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="font-display text-5xl font-bold leading-none sm:text-6xl md:text-[80px]">
                <AnimatedNumber value={4} suffix="+" />
              </span>
              <span className="font-body text-xs text-white/70 sm:text-sm">
                Industry Awards
              </span>
            </div>
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
                    className="object-contain transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
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
