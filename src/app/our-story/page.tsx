import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { PageBanner } from "@/components/ui/page-banner";
import { JoinClubForm } from "@/components/our-story/join-club-form";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Great British Doner — adapting traditional shish doner culture to the speed, aesthetics, and lifestyle of modern Britain.",
};

/**
 * Our Story — editorial "magazine" recreation of the supplied reference, mapped
 * onto the GBD design system.
 *
 * Reference DNA preserved: full-bleed megatitle hero → philosophy spread with
 * offset imagery + a stat plate → a centred "blueprint" of principle blocks
 * ending in a full-width inverse band → a community grid closing on a join
 * plate. Generous vertical rhythm throughout (Section py-24/py-32).
 *
 * Brand adaptation: the reference's green palette and rounded cards become GBD
 * navy/red/white with sharp hairline edges (consistent with the menu + home).
 * No new hex, brand tracking tokens only, fonts = display/body/campaign.
 */

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

export default function OurStoryPage() {
  return (
    <main className="w-full bg-canvas text-text-primary">
      <StoryHero />
      <PhilosophySpread />
      <BlueprintSection />
      <CommunitySection />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   1 · HERO — full-bleed photograph, oversized stacked megatitle bottom-left.
   ──────────────────────────────────────────────────────────────────────── */
function StoryHero() {
  return (
    <PageBanner
      imageSrc="/Story/our story banner.png"
      imageAlt="Great British Doner — freshly carved shish doner"
      eyebrow="OUR STORY"
      headline={
        <>
          A NEW GENERATION<br />OF DONER
        </>
      }
      subheading="Adapting traditional shish doner culture to the speed, aesthetics and lifestyle of modern Britain."
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   2 · PHILOSOPHY — left editorial column, right offset image composition with
       an overlapping stat plate and a hairline caption tag.
   ──────────────────────────────────────────────────────────────────────── */
function PhilosophySpread() {
  return (
    <Section size="compact" className="border-b border-border-hairline">
      <Shell>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial column */}
          <div className="flex flex-col gap-7 lg:col-span-5">
            <Eyebrow tone="accent">Our Philosophy</Eyebrow>
            <Heading level={2} className="text-balance">
              Real Food.
              <br />
              Real Standards.
            </Heading>
            <p className="max-w-xl font-body text-lg leading-relaxed text-text-primary">
              At GBD, every detail matters.
              <br />
              <br />
              We use authentic shish doner.
              <br />
              We invest heavily in product development.
              <br />
              We place technology at the centre of our operations.
              <br />
              And we see design not just as aesthetics, but as part of the customer experience itself.
            </p>
            <p className="max-w-xl font-body text-base leading-relaxed text-text-secondary">
              Our approach is built around consistency, quality, and modern hospitality.
              <br />
              We stay connected to our roots, but we don’t believe tradition should stand still.
              <br />
              To us, tradition should evolve while being preserved.
              <br />
              By developing one of Britain’s first vegan shish doner concepts, we’ve also helped introduce doner culture to new generations and changing consumer habits.
              <br />
              Today, our stores maintain an average Google rating of 4.9 out of 5 — something we see as a reflection of the standards and experience we aim to deliver every single day.
              <br />
            </p>
            <span className="mt-2 inline-flex w-max items-center gap-2.5 border border-border-hairline px-4 py-2 font-display text-[10px] font-bold uppercase tracking-eyebrow text-text-primary">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              British Kebab Awards · PETA Approved
            </span>
          </div>

          {/* Offset image composition */}
          <div className="relative lg:col-span-7">
            <div className="grid grid-cols-2 gap-5 sm:gap-8">
              <div className="group relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/Story/2.png"
                  alt="GBD restaurant interior and counter"
                  fill
                  sizes="(max-width: 1024px) 50vw, 28vw"
                  className={CINEMATIC}
                />
              </div>
              <div className="group relative mt-8 aspect-[4/5] overflow-hidden lg:mt-16">
                <Image
                  src="/Story/3.png"
                  alt="A freshly prepared GBD wrap"
                  fill
                  sizes="(max-width: 1024px) 50vw, 28vw"
                  className={CINEMATIC}
                />
              </div>
            </div>

            {/* Overlapping stat plate (reference's "94%" card → GBD rating). */}
            <div className="absolute -bottom-6 left-4 z-10 flex w-[58%] max-w-[260px] flex-col gap-1 bg-surface-inverse p-5 text-white sm:left-6 lg:-left-10">
              <span className="font-display text-4xl font-black leading-none sm:text-5xl">
                4.9<span className="text-accent">★</span>
              </span>
              <span className="font-body text-[11px] leading-snug text-white/70">
                Average Google rating across our stores
              </span>
            </div>

            {/* Caption tag (reference's "The Bio-Link"). */}
            <span className="absolute -top-3 right-4 z-10 bg-accent px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-eyebrow text-white">
              The GBD Standard
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
function BlueprintSection() {
  return (
    <Section size="compact" className="border-b border-border-hairline">
      <Shell>
        {/* Centred chapter intro */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <Eyebrow tone="accent">The Blueprint</Eyebrow>
          <Heading level={2}>The GBD Blueprint</Heading>
          <p className="font-body text-base leading-relaxed text-text-secondary">
            How tradition is engineered into a modern food experience — where
            every single detail matters.
          </p>
        </div>

        {/* Two-up principle row — deliberately unequal heights. */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Large block — image + copy */}
          <div className="flex flex-col gap-7 lg:col-span-7">
            <div className="group relative aspect-[16/10] overflow-hidden">
              <Image
                src="/Story/4.png"
                alt="Authentic shish doner on the spit"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={CINEMATIC}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Eyebrow tone="secondary">01 — Sourced</Eyebrow>
              <Heading level={3}>Authentic Shish Doner</Heading>
              <p className="max-w-lg font-body text-base leading-relaxed text-text-secondary">
                We use authentic shish doner and invest heavily in product
                development — staying connected to our roots while letting
                tradition evolve rather than stand still.
              </p>
            </div>
          </div>

          {/* Small block — text-led, offset down */}
          <div className="flex flex-col gap-3 lg:col-span-5 lg:mt-16 lg:pl-8">
            <Eyebrow tone="secondary">02 — Craft</Eyebrow>
            <Heading level={3}>Vegan Pioneers</Heading>
            <p className="max-w-md font-body text-base leading-relaxed text-text-secondary">
              By developing one of Britain’s first vegan shish doner concepts,
              we’ve introduced doner culture to new generations and changing
              consumer habits — without compromising on flavour.
            </p>
            <span className="mt-2 font-display text-6xl font-black leading-none text-text-primary/10">
              VG
            </span>
          </div>
        </div>

        {/* Full-width inverse band (reference's coloured band → GBD navy). */}
        <div className="mt-12 grid grid-cols-1 overflow-hidden bg-surface-inverse text-white lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 p-8 sm:p-12 lg:p-16">
            <Eyebrow tone="accent">03 — Modern</Eyebrow>
            <Heading level={2} tone="inverse">
              Design &amp; Technology
            </Heading>
            <p className="max-w-md font-body text-base leading-relaxed text-white/70">
              We place technology at the centre of our operations and treat
              design not as decoration, but as part of the customer experience
              itself.
            </p>
            <Link
              href="/menu"
              className="mt-2 inline-flex h-12 w-max items-center justify-center bg-accent px-8 font-display text-xs font-bold uppercase tracking-button text-white transition-colors duration-300 hover:bg-white hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View The Menu
            </Link>
          </div>
          <div className="group relative min-h-[280px] overflow-hidden lg:min-h-0">
            <Image
              src="/Story/5.png"
              alt="The GBD experience — design-led modern hospitality"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={CINEMATIC}
            />
          </div>
        </div>
      </Shell>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   4 · COMMUNITY — centred intro, a row of recognition cards closing on a
       hairline "join" plate (reference's "Join the Tribe").
   ──────────────────────────────────────────────────────────────────────── */
const RECOGNITION = [
  {
    image: "/Story/6.png",
    label: "Award-Winning",
    copy: "Recognised at the British Kebab Awards and awarded by PETA.",
  },
  {
    image: "/Story/7.png",
    label: "In The Press",
    copy: "Featured by The Sun and on the BBC discussing doner culture.",
  },
  {
    image: "/Story/8.png",
    label: "A Growing Community",
    copy: "Viral content and a community across Manchester and Liverpool.",
  },
] as const;

function CommunitySection() {
  return (
    <Section size="compact">
      <Shell>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <Eyebrow tone="accent">The Community Effect</Eyebrow>
          <Heading level={2}>More Than A Restaurant</Heading>
          <p className="font-body text-base leading-relaxed text-text-secondary">
            A modern food ecosystem expanding across restaurants, retail, and
            foodservice — built for long-term growth and cultural relevance.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {RECOGNITION.map((item) => (
            <article key={item.label} className="group flex flex-col gap-4">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                  className={CINEMATIC}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Heading level={3}>{item.label}</Heading>
                <p className="font-body text-sm leading-relaxed text-text-secondary">
                  {item.copy}
                </p>
              </div>
            </article>
          ))}

          {/* Join plate — bordered, text-led (reference's "Join the Tribe"). */}
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
