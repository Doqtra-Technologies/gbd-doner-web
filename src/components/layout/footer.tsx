"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
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
      { label: "Catering", href: "/catering" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "The Feed", href: "/feed" },
      { label: "Instagram", href: siteConfig.social.instagram, external: true },
      { label: "TikTok", href: siteConfig.social.tiktok, external: true },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Allergens Info", href: "/allergens" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-canvas border-t border-border-strong">
      <Container className="pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          <div>
            <Logo size="md" />
            <p className="mt-6 max-w-xs font-body text-sm text-text-secondary">
              British Doner Redefined. Ethically sourced, spit-fired, built for
              the city.
            </p>
          </div>

          {columns.map((col) => (
            <FooterColumn key={col.heading} column={col} />
          ))}
        </div>

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display font-bold uppercase tracking-display text-2xl md:text-3xl text-text-primary">
              Sign up to our newsletter
            </h2>
            <p className="mt-3 font-body text-sm text-text-secondary max-w-md">
              New drops, store openings, and the occasional 1AM offer. No spam.
            </p>
          </div>
          <div className="lg:col-span-5">
            <NewsletterField />
          </div>
        </div>
      </Container>

      <div className="border-t border-border-hairline">
        <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-text-secondary">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-display font-bold uppercase tracking-eyebrow text-xs text-text-secondary">
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
      <h3 className="font-display font-bold uppercase tracking-eyebrow text-sm text-text-primary">
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
                className="font-body text-sm text-text-primary hover:text-accent transition-colors duration-300 ease-smooth"
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="font-body text-sm text-text-primary hover:text-accent transition-colors duration-300 ease-smooth"
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
      <div className="relative flex items-center border-b border-border-strong focus-within:border-b-2">
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-transparent py-3 pr-12 font-body text-base text-text-primary placeholder:text-text-disabled focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute right-0 inline-flex h-10 w-10 items-center justify-center text-text-primary hover:text-accent transition-colors duration-300 ease-smooth"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-5 w-5"
            aria-hidden
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </button>
      </div>
      <p
        className="mt-2 min-h-[1.25rem] font-body text-xs text-text-secondary"
        aria-live="polite"
      >
        {status === "ok" && "Thanks — you're on the list."}
      </p>
    </form>
  );
}
