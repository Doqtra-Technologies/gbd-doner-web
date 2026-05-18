"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Logo } from "@/components/brand/logo";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

/**
 * TerminalAnchor — architectural-grid footer.
 *
 * Inverts the canvas (navy bg, white type) so the bottom of the site
 * reads as a physical anchor. Nothing floats. Every cell is locked into
 * a strict 12-column grid with `border-white/20` hairlines.
 *
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │ Vibe Insider block       (border-y)                          │
 *   │ ┌────────────────────────────────────────┬────────────────┐ │
 *   │ │ col-span-8   border-r                  │ col-span-4     │ │
 *   │ │ 05 — VIBE INSIDER                      │ (empty top)    │ │
 *   │ │ SIGN UP TO OUR                          │                │ │
 *   │ │   NEWSLETTER.   (ink brick)            │ ──────  SUBMIT →│ │
 *   │ │ Subtext...                              │ email input    │ │
 *   │ └────────────────────────────────────────┴────────────────┘ │
 *   ├─────────────────────────────────────────────────────────────┤
 *   │ Footer Matrix            (border-b)                          │
 *   │ ┌──────────┬───────┬──────────┬──────────┬──────────┐       │
 *   │ │ col-4    │ col-2 │ col-2    │ col-2    │ col-2    │       │
 *   │ │ Brand    │ EMPTY │ EXPLORE  │ CONNECT  │ LEGAL    │       │
 *   │ │ box      │ void  │          │          │          │       │
 *   │ └──────────┴───────┴──────────┴──────────┴──────────┘       │
 *   ├─────────────────────────────────────────────────────────────┤
 *   │ © 2026 GBD Doner.                BRITISH DONER REDEFINED     │
 *   └─────────────────────────────────────────────────────────────┘
 *
 * The "Empty Tension Box" in the matrix is intentional — high-end
 * editorial restraint. A 2-column structural void between the brand
 * paragraph and the directory columns. Reads as deliberate space, not
 * absent content.
 */
const directory: Array<{
  heading: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}> = [
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
    <footer className="w-full bg-surface-inverse text-text-inverse">
      <VibeInsiderBlock />
      <FooterMatrix />
      <CopyrightBaseline />
    </footer>
  );
}

function VibeInsiderBlock() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "ok">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("ok");
    setEmail("");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 border-t border-b border-white/20">
      {/* Typographic brick */}
      <div className="md:col-span-8 md:border-r md:border-white/20 p-8 lg:p-16 flex flex-col justify-between gap-12">
        <span className="font-body uppercase tracking-eyebrow text-xs opacity-60">
          05 — Vibe Insider
        </span>

        <h2 className="font-display font-bold uppercase tracking-display leading-none text-3xl lg:text-4xl">
          <span className="block">Sign up to</span>
          <span className="block">
            our newsletter
            <span className="text-accent">.</span>
          </span>
        </h2>

        <p className="font-body text-sm opacity-70 max-w-md leading-relaxed">
          Drop-only menu items, store openings, and the occasional free
          meal. No spam — just signal.
        </p>
      </div>

      {/* Input cell */}
      <div className="md:col-span-4 p-8 lg:p-16 flex flex-col justify-end">
        <form
          onSubmit={onSubmit}
          aria-label="Subscribe to the GBD newsletter"
          className="w-full"
        >
          <label htmlFor="terminal-email" className="sr-only">
            Email address
          </label>
          <div className="relative w-full border-b border-white/30 focus-within:border-white pb-3 transition-colors duration-300 ease-smooth">
            <input
              id="terminal-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@city.co.uk"
              className="w-full bg-transparent outline-none text-sm font-body pr-24 placeholder:text-white/40 text-text-inverse"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="absolute right-0 bottom-3 font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-inverse hover:text-accent transition-colors duration-300 ease-smooth disabled:opacity-50"
            >
              {status === "submitting" ? "Sending…" : "Submit →"}
            </button>
          </div>
          <p
            className="mt-4 font-body text-xs opacity-60 min-h-[1rem]"
            aria-live="polite"
          >
            {status === "ok" && "Welcome to the inside. Check your inbox."}
          </p>
        </form>
      </div>
    </div>
  );
}

function FooterMatrix() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/20">
      {/* Brand box */}
      <div className="md:col-span-4 md:border-r md:border-white/20 p-8 lg:p-16">
        <Logo size="sm" variant="inverse" />
        <p className="mt-6 max-w-xs font-body text-sm opacity-70 leading-relaxed">
          British Doner Redefined. Ethically sourced, spit-fired, built
          for the city.
        </p>
      </div>

      {/* Empty Tension Box — intentional structural void */}
      <div
        aria-hidden
        className="hidden md:block md:col-span-2 md:border-r md:border-white/20"
      />

      {/* Directory columns — 3 evenly-split sub-columns inside col-span-6 */}
      <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3">
        {directory.map((col, i) => (
          <DirectoryColumn
            key={col.heading}
            heading={col.heading}
            links={col.links}
            isLast={i === directory.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function DirectoryColumn({
  heading,
  links,
  isLast,
}: {
  heading: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
  isLast: boolean;
}) {
  return (
    <div
      className={cn(
        "p-8 lg:p-16 w-full",
        !isLast && "border-r border-white/20",
        // First two on mobile keep a bottom hairline; the last does not.
        !isLast && "border-b border-white/20 sm:border-b-0",
      )}
    >
      <h3 className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-accent mb-8">
        {heading}
      </h3>
      <ul>
        {links.map((l) => (
          <li key={l.label} className="mb-4 last:mb-0">
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="block font-body text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 ease-smooth"
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="block font-body text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 ease-smooth"
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

function CopyrightBaseline() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-6 px-8 lg:px-16 gap-3">
      <p className="font-body text-[11px] opacity-40">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
      <p className="font-display font-bold uppercase tracking-eyebrow text-[10px] opacity-40">
        British Doner Redefined
      </p>
    </div>
  );
}
