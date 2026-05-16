"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { siteConfig } from "@/lib/config";

/**
 * TerminalFooter — navy-inverted closing anchor.
 *
 * The footer reverses the canvas — deep navy background, white type,
 * white hairlines at 20% opacity. It's the only intentional inversion
 * in the product (footers anchor; section content does not). This
 * preserves the 70/20/10 white/navy/red ratio because the footer is
 * structural terminus, not content.
 *
 * Composition:
 *  - Newsletter zone (full-width). Massive headline left, minimalist
 *    border-bottom-only email input right. The input has no box, no
 *    chrome — a single line that ends in the submit affordance.
 *  - Navigation zone. Inverse logo + three columns of links.
 *  - Meta strip. Copyright left, signature line right.
 */
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
    <footer className="bg-surface-inverse text-text-inverse">
      {/* Newsletter zone */}
      <NewsletterZone />

      {/* Navigation zone */}
      <Container className="pt-20 pb-12 border-t border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          <div>
            <Logo size="md" variant="inverse" />
            <p className="mt-6 max-w-xs font-body text-sm text-white/70">
              British Doner Redefined. Ethically sourced, spit-fired, built
              for the city.
            </p>
          </div>

          {columns.map((col) => (
            <FooterColumn key={col.heading} column={col} />
          ))}
        </div>
      </Container>

      {/* Meta strip */}
      <div className="border-t border-white/20">
        <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/60">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-display font-bold uppercase tracking-eyebrow text-xs text-white/60">
            British Doner Redefined
          </p>
        </Container>
      </div>
    </footer>
  );
}

function NewsletterZone() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "submitting">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("ok");
    setEmail("");
  }

  return (
    <Container className="py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
        <div className="lg:col-span-7">
          <span className="font-display font-bold uppercase tracking-eyebrow text-[11px] text-white/60">
            05 — Vibe Insider
          </span>
          <h2 className="mt-8 font-display font-bold uppercase tracking-display leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-[7vw] xl:text-8xl">
            <span className="block">Sign up</span>
            <span className="block pl-[6%]">
              to our newsletter<span className="text-accent">.</span>
            </span>
          </h2>
          <p className="mt-10 max-w-md font-body text-base md:text-lg leading-relaxed text-white/70">
            Drop-only menu items, store openings, and the occasional free
            meal. No spam — just signal.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="lg:col-span-5 flex flex-col gap-6"
          aria-label="Subscribe to the GBD newsletter"
        >
          <label htmlFor="terminal-email" className="sr-only">
            Email address
          </label>
          <div className="flex items-center border-b border-white/40 focus-within:border-accent transition-colors duration-300 ease-smooth">
            <input
              id="terminal-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@city.co.uk"
              className="flex-1 bg-transparent py-4 font-body text-lg text-text-inverse placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="font-display font-bold uppercase tracking-button text-xs text-text-inverse hover:text-accent transition-colors duration-300 ease-smooth pl-4 py-2 disabled:opacity-50"
            >
              {status === "submitting" ? "Sending…" : "Submit →"}
            </button>
          </div>
          <p
            className="font-body text-sm text-white/60 min-h-[1.25rem]"
            aria-live="polite"
          >
            {status === "ok" && "Welcome to the inside. Check your inbox."}
          </p>
        </form>
      </div>
    </Container>
  );
}

function FooterColumn({ column }: { column: Column }) {
  return (
    <div>
      <h3 className="font-display font-bold uppercase tracking-eyebrow text-sm text-text-inverse">
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
                className="font-body text-sm text-white/80 hover:text-accent transition-colors duration-300 ease-smooth"
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="font-body text-sm text-white/80 hover:text-accent transition-colors duration-300 ease-smooth"
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
