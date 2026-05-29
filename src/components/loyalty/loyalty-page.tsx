"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/ui/cta-button";

const copy = {
  hero: "REAL FLAVOUR. REAL PEOPLE. YOU IN?",
  headline: "MORE THAN JUST DONER.",
  intro:
    "Great British Doner isn’t just another grab-and-go spot. It’s a modern street food brand built around bold flavour, quality ingredients, and a culture that brings people together.",
  rhythm: "Big flavours. Fresh preparation. Fast-paced energy.",
  promise:
    "A brand made for people who crave more than the ordinary.",
  close:
    "From wraps to loaded boxes, every bite is built to hit properly.",
  cta: "Join the movement. Your next craving starts here.",
};

const HERO_IMAGE = "/locations/Piccadilly.webp";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function LoyaltyPage() {
  return (
    <main className="relative overflow-hidden bg-canvas text-text-primary">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          background:
            "radial-gradient(circle at 12% 12%, rgba(201,64,53,0.08), transparent 24%), radial-gradient(circle at 88% 10%, rgba(15,30,45,0.05), transparent 22%), linear-gradient(180deg, rgba(255,248,234,0.9) 0%, rgba(255,255,255,0.92) 35%, rgba(255,253,248,0.96) 100%)",
        }}
      />

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-4 py-5 sm:px-6 lg:px-6 lg:py-6"
      >
        <motion.div
          variants={rise}
          className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.34em] text-text-secondary"
        >
          <span className="inline-flex items-center rounded-full border border-border-hairline bg-canvas px-3 py-1">
            Loyalty
          </span>
          <span className="inline-flex items-center rounded-full border border-border-hairline bg-canvas px-3 py-1">
            Dynamic mode
          </span>
        </motion.div>

        <div className="rounded-[8px] border border-border-hairline bg-canvas shadow-[0_24px_60px_rgba(15,30,45,0.08)] overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            variants={rise}
              className="relative overflow-hidden border-b border-border-hairline bg-[linear-gradient(180deg,#fffdf8_0%,#fff8ea_100%)] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,64,53,0.08), transparent 38%), linear-gradient(220deg, rgba(15,30,45,0.05), transparent 45%)",
              }}
            />
            <div className="relative flex h-full min-h-[420px] flex-col justify-between gap-8 lg:min-h-[520px]">
              <div className="max-w-[28rem]">
                <h1 className="font-display text-[clamp(2.5rem,6vw,4.7rem)] font-bold uppercase tracking-[-0.04em] leading-[0.9] text-text-primary">
                  {copy.hero}
                </h1>
                <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-text-secondary sm:text-base">
                  Get exclusive access to seasonal drops, secret menu items, and
                  fuel-focused content delivered weekly.
                </p>
              </div>

              <div className="flex max-w-lg flex-wrap gap-3">
                <div className="flex min-w-[220px] flex-1 items-center rounded-none border border-border-strong bg-canvas px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-text-secondary">
                  Enter email address
                </div>
                <CTAButton
                  variant="primary"
                  size="md"
                  href="/locations"
                  className="rounded-none"
                >
                  For insiders
                </CTAButton>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={rise}
              className="relative min-h-[420px] overflow-hidden bg-canvas lg:min-h-[520px]"
          >
            <Image
              src={HERO_IMAGE}
              alt="GBD dining atmosphere"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover opacity-100"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,248,234,0.12)_0%,rgba(255,255,255,0.05)_40%,rgba(255,248,234,0.1)_100%)]" />

            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-4">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-text-secondary/70">
                  01 / VIBE INSIDER
                </p>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border-hairline bg-canvas text-accent shadow-[0_8px_20px_rgba(15,30,45,0.08)]">
                  <StarMark />
                </div>
              </div>

              <div className="max-w-md self-start rounded-[28px] border border-border-hairline bg-canvas/90 p-5 backdrop-blur-[2px] sm:p-6 shadow-[0_16px_30px_rgba(15,30,45,0.08)]">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
                  {copy.headline}
                </p>
                <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary sm:text-base">
                  {copy.intro}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </motion.section>

      <section className="relative mx-auto w-full max-w-[1180px] px-4 pb-8 sm:px-6 lg:px-6 lg:pb-10">
        <div className="border-t border-border-hairline bg-canvas px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_0.75fr_0.75fr_1.2fr] lg:items-start">
            <div>
              <p className="font-display text-3xl font-bold uppercase tracking-[-0.04em] text-accent sm:text-4xl">
                VIBE
              </p>
              <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-text-secondary">
                {copy.cta}
              </p>
              <div className="mt-6 flex gap-3">
                <FooterIconButton label="Share" />
                <FooterIconButton label="Save" />
              </div>
            </div>

            <FooterColumn
              title="Navigation"
              links={[
                { label: "Menu", href: "/menu" },
                { label: "Locations", href: "/locations" },
                { label: "Loyalty", href: "/loyalty" },
                { label: "Our Story", href: "/our-story" },
              ]}
            />

            <FooterColumn
              title="About"
              links={[
                { label: "Sustainability", href: "/our-story" },
                { label: "Careers", href: "/feed" },
                { label: "Press", href: "/feed" },
                { label: "Nutritional", href: "/menu" },
              ]}
            />

            <div>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
                System Access
              </p>
              <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-text-secondary">
                Fueling the city’s high-performers with pure energy since 2020.
                Healthy eating, served for the future.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-12 items-center justify-center rounded-none border border-border-strong bg-canvas px-4 text-[11px] font-bold uppercase tracking-[0.22em] text-text-primary transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  Get it on Play Store
                </a>
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-12 items-center justify-center rounded-none border border-border-strong bg-canvas px-4 text-[11px] font-bold uppercase tracking-[0.22em] text-text-primary transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  Download on App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <p className="font-display text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
        {title}
      </p>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="font-display text-sm font-bold uppercase tracking-[0.18em] text-text-primary transition-colors duration-300 hover:text-accent"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterIconButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-9 w-9 items-center justify-center border border-border-hairline bg-canvas text-text-primary transition-colors duration-300 hover:border-accent hover:text-accent"
      aria-label={label}
    >
      <span aria-hidden className="text-xs font-bold uppercase">
        {label.slice(0, 1)}
      </span>
    </button>
  );
}

function StarMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 1.8 14.8 9l7.2 2.8-7.2 2.8L12 21.8 9.2 14.6 2 11.8 9.2 9 12 1.8Z" />
    </svg>
  );
}