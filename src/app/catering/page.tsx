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
    <main className="w-full bg-canvas text-text-primary">
      <CateringHero />
      <CateringRequestForm settings={cateringSettings} />
    </main>
  );
}

function CateringHero() {
  // GAP FIX (same as /feed): warm cream #fff7eb now leads the gradient at the
  // top — the zone beneath the transparent navbar — fading to #fffdf8 at the
  // bottom. The cream section owns the nav-offset padding (pt-24 / lg:pt-28 =
  // navbar height + 32px) instead of a white bg-canvas wrapper, so the
  // background runs continuously under the navbar — no white band, no floating
  // hero.
  return (
    <section className="border-b border-border-hairline bg-[linear-gradient(180deg,#fff7eb_0%,#fffdf8_100%)] pt-24 pb-12 lg:pt-28 lg:pb-16">
      <div className="mx-auto grid w-full max-w-shell grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-10">
        <div className="flex flex-col justify-center gap-6 lg:pr-6">
          <span className="inline-flex w-fit rounded-full bg-canvas px-4 py-1 font-display text-[10px] font-bold uppercase tracking-[0.32em] text-text-primary">
            Elevate your meeting
          </span>

          <h1 className="max-w-[10ch] font-display text-[clamp(3rem,7vw,5.5rem)] font-bold uppercase tracking-display leading-[0.88] text-text-primary">
            Modern street food, made for everyday life
          </h1>

          <p className="max-w-xl font-body text-sm leading-relaxed text-text-secondary sm:text-base">
            Bold flavours, fast service, and a cleaner approach to doner. From quick lunch breaks to late-night cravings, Great British Doner delivers a modern fast-casual experience built around quality ingredients and everyday convenience.
          </p>

          <p className="max-w-xl font-body text-sm leading-relaxed text-text-secondary sm:text-base">
            Whether you’re grabbing a wrap on the go or ordering in with friends, GBD brings together flavour, speed, and consistency in one seamless experience.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <CTAButton variant="primary" size="lg" href="/menu">
              Explore Menu
            </CTAButton>
            <CTAButton variant="tertiary" href="/order-now">
              Order Online
            </CTAButton>
          </div>
        </div>

        <div className="relative min-h-[26rem] overflow-hidden rounded-[22px] border border-border-hairline bg-surface-inverse shadow-[0_16px_40px_rgba(15,30,45,0.14)] lg:min-h-[34rem]">
          <Image
            src="/catering/1.png"
            alt="GBD catering spread of doner plates and sides"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.99)]"
          />
        </div>
      </div>
    </section>
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
                src="/catering/2.png"
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
