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
import { PageBanner } from "@/components/ui/page-banner";

export default async function CateringPage() {
  const cateringSettings = await getCateringSettings();
  return (
    <main className="w-full bg-canvas text-text-primary">
      <PageBanner
        imageSrc="/catering/3.png"
        imageAlt="GBD Catering"
        eyebrow="GBD CATERING"
        headline={
          <>
            MODERN STREET FOOD,<br />MADE FOR<br />EVERYDAY LIFE
          </>
        }
        subheading="Fast. Fresh. Delivered."
      />
      <CateringRequestForm settings={cateringSettings} />
    </main>
  );
}

function CateringRequestForm({ settings }: { settings: CateringFormSettings }) {
  return (
    <section id="enquiry" className="border-b border-border-hairline bg-canvas px-5 py-8 sm:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-shell border-l border-border-hairline bg-canvas px-0 py-8 sm:py-10 lg:px-0 lg:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 lg:px-10">
          <div className="mb-6 overflow-hidden rounded-[18px] border border-border-hairline bg-canvas shadow-[0_14px_30px_rgba(15,30,45,0.06)]">
            <div className="relative h-24 sm:h-32 lg:h-36">
              <Image
                src="/catering/1.png"
                alt="GBD catering event setup with team enjoying food"
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover [filter:contrast(1.03)_saturate(1.04)_brightness(1.01)]"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-[18px] border border-border-hairline bg-canvas shadow-[0_16px_40px_rgba(15,30,45,0.08)]">
            <div className="relative px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[22px] bg-canvas" />
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mx-auto w-full max-w-full text-balance break-words font-display text-4xl font-bold uppercase tracking-display leading-[0.95] text-text-primary md:text-5xl lg:text-6xl">
                  Let’s craft your next event
                </h2>
                <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-text-secondary sm:text-base">
                  Fill out the form below and our team will get back to you shortly to plan your perfect Great British Doner experience.
                </p>
                <p className="mx-auto mt-3 max-w-2xl font-body text-sm leading-relaxed text-text-secondary sm:text-base">
                  Whether it’s a corporate lunch, private gathering, brand event, or team celebration — we’ll help bring bold flavour to the table.
                </p>
              </div>

              <div className="mt-8">
                <CateringForm settings={settings} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
