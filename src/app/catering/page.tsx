import type { Metadata } from "next";
import Image from "next/image";
import { CTAButton } from "@/components/ui/cta-button";
import { CateringForm } from "@/app/catering/catering-form";
import { getCateringSettings } from "@/data/repositories/site-settings-repository";
import type { CateringFormSettings } from "@/domain/site-settings";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Catering",
  description:
    "GBD for team lunches, corporate events, and city-wide takeovers.",
};

/**
 * Catering — The Corporate Ledger.
 *
 * Two architectural blocks:
 *   1. CateringHero — 50/50 split with vertical centerline hairline
 *   2. ArchitecturalEnquiryForm — 4/8 split with sticky anchor + form
 *      matrix using bottom-border-only inputs
 *
 * Both blocks are edge-to-edge. No Container. No centered shells. The
 * 1px hairlines do the structural work that padding usually does in
 * SaaS-template layouts.
 */
export default async function CateringPage() {
  const cateringSettings = await getCateringSettings();
  return (
    <main className="w-full bg-canvas">
      <CateringHero />
      <CateringImageSection />
      <ArchitecturalEnquiryForm settings={cateringSettings} />
    </main>
  );
}

function CateringHero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-border-hairline lg:min-h-[80vh]">
      {/* Type column — pushes copy to the centerline from the left */}
      <div className="lg:border-r lg:border-border-hairline flex flex-col justify-between gap-12 p-8 sm:p-12 lg:p-16 lg:pr-12 min-h-[55vh] lg:min-h-[80vh]">
        <span className="font-body uppercase tracking-eyebrow text-xs text-text-secondary">
          Catering · 10 – 500 Pax
        </span>

        <div>
          <h1 className="font-display font-bold uppercase tracking-display leading-[0.85] text-text-primary text-5xl md:text-6xl lg:text-[5.5rem] max-w-[10ch]">
            <span className="block">Fuel</span>
            <span className="block">
              your team<span className="text-accent">.</span>
            </span>
          </h1>
          <p className="mt-10 font-body text-base md:text-lg leading-relaxed text-text-secondary max-w-md">
            Office lunches, conference takeovers, late-night refuels. We
            bring the spit, the flatbreads, and the energy — you bring
            the appetite.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <CTAButton variant="primary" size="lg" href="#enquiry">
            Request a Quote
          </CTAButton>
          <CTAButton variant="tertiary" href="/menu">
            Browse the menu
          </CTAButton>
        </div>
      </div>

      {/* Image column — full-bleed, touches the centerline from the right */}
      <div className="relative min-h-[50vh] lg:min-h-[80vh] overflow-hidden">
        <Image
          src="/catering/1.png"
          alt="GBD catering spread of doner plates and sides"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.99)]"
        />
      </div>
    </section>
  );
}

function CateringImageSection() {
  return (
    <section className="w-full border-b border-border-hairline">
      <div className="relative min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh] overflow-hidden">
        <Image
          src="/catering/2.png"
          alt="GBD catering event setup with team enjoying food"
          fill
          sizes="100vw"
          className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.99)]"
        />
      </div>
    </section>
  );
}

function ArchitecturalEnquiryForm({ settings }: { settings: CateringFormSettings }) {
  return (
    <section
      id="enquiry"
      className="grid grid-cols-1 lg:grid-cols-12 border-y border-border-hairline"
    >
      {/* Sticky anchor — col-span-4 */}
      <aside className="lg:col-span-4 lg:border-r lg:border-border-hairline">
        <div className="lg:sticky lg:top-20 p-8 sm:p-12 lg:p-16 flex flex-col gap-10">
          <span className="font-body uppercase tracking-eyebrow text-xs text-accent">
            {settings.eyebrow}
          </span>
          <h2 className="font-display font-bold uppercase tracking-display leading-[0.9] text-text-primary text-3xl md:text-4xl lg:text-[2.5rem] max-w-[12ch]">
            {settings.headingLines.map((line, i) => (
              <span key={i} className="block">
                {renderLineWithAccentDot(line)}
              </span>
            ))}
          </h2>
          <p className="font-body text-sm md:text-base leading-relaxed text-text-secondary max-w-sm">
            {settings.lead}
          </p>
        </div>
      </aside>

      {/* Form matrix — col-span-8 */}
      <div className="lg:col-span-8 p-8 sm:p-12 lg:p-16">
        <CateringForm settings={settings} />
      </div>
    </section>
  );
}

/**
 * Splits a line at the last "." so the dot is rendered in accent red,
 * matching the original hardcoded design ("event<span class="accent">.</span>").
 * Lines without a "." render unchanged.
 */
function renderLineWithAccentDot(line: string): React.ReactNode {
  const idx = line.lastIndexOf(".");
  if (idx === -1) return line;
  return (
    <>
      {line.slice(0, idx)}
      <span className="text-accent">{line.slice(idx)}</span>
    </>
  );
}
