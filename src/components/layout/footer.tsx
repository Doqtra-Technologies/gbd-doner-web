"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config";

type Column = {
  heading: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
};

const columns: Column[] = [
  {
    heading: "Explore",
    links: [
      { label: "Menu", href: "/menu" },
      { label: "Locations", href: "/locations" },
      { label: "Our Story", href: "/our-story" },
      {
        label: "Franchise Enquiries",
        href: "https://germandonerkebab.com/gb/german-doner-kebab-gdk-fast-food-franchise-opportunity/uk",
        external: true,
      },
      {
        label: "Allergens Info",
        href: "https://germandonerkebab.com/gb/allergen-information",
        external: true,
      },
    ],
  },
  {
    heading: "Connect",
    links: [
      {
        label: "Contact Us",
        href: "https://germandonerkebab.com/gb/contact-us",
        external: true,
      },
      { label: "Catering", href: "/catering" },
      { label: "Instagram", href: siteConfig.social.instagram, external: true },
      { label: "TikTok", href: siteConfig.social.tiktok, external: true },
    ],
  },
  {
    heading: "Legal",
    links: [
      {
        label: "Privacy Policy",
        href: "https://atis.life/privacy-policy",
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-gbd-navy">
      <Container className="pt-24 md:pt-32 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          <div>
            <Link href="/" aria-label={`${siteConfig.name} — Home`} className="inline-block">
              <img
                src="/logo.svg"
                alt="Great British Doner"
                className="h-10 w-auto"
                style={{ objectFit: "contain" }}
              />
            </Link>
            <p className="mt-6 max-w-xs font-body text-sm leading-relaxed text-gbd-navy/70">
              British Doner Redefined. Ethically sourced, spit-fired, built for
              the city.
            </p>
          </div>

          {columns.map((col) => (
            <FooterColumn key={col.heading} column={col} />
          ))}
        </div>

        <div className="mt-24 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display font-bold uppercase tracking-tighter text-2xl md:text-3xl text-gbd-navy">
              Sign up to our newsletter
            </h2>
            <p className="mt-3 font-body text-sm text-gbd-navy/65 max-w-md">
              New drops, store openings, and the occasional 1AM offer. No spam.
            </p>
          </div>
          <div className="lg:col-span-5">
            <NewsletterField />
          </div>
        </div>
      </Container>

      <div className="border-t border-gbd-navy/15">
        <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-gbd-navy/60">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-display font-bold uppercase tracking-[0.2em] text-[10px] text-gbd-navy/60">
            British Doner Redefined
          </p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ column }: { column: Column }) {
  return (
    <div>
      <h3 className="font-display font-bold uppercase tracking-[0.16em] text-sm text-gbd-navy">
        {column.heading}
      </h3>
      <ul className="mt-6 space-y-3">
        {column.links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="font-body text-sm text-gbd-navy hover:opacity-70 transition-opacity"
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="font-body text-sm text-gbd-navy hover:opacity-70 transition-opacity"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterField() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("ok");
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <div className="relative flex items-center border-b border-gbd-navy focus-within:border-b-2">
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-transparent py-3 pr-12 font-body text-base text-gbd-navy placeholder:text-gbd-navy/40 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute right-0 inline-flex h-10 w-10 items-center justify-center text-gbd-navy hover:text-gbd-red transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
        </button>
      </div>
      <p
        className="mt-2 min-h-[1.25rem] font-body text-xs text-gbd-navy/60"
        aria-live="polite"
      >
        {status === "ok" && "Thanks — you're on the list."}
      </p>
    </form>
  );
}
