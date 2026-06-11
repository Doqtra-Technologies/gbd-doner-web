import Link from "next/link";
import { CTAButton } from "@/components/ui/cta-button";
import { globalData } from "@/data/content";
import type { GlobalSettings } from "@/domain/site-settings";

const { newsletter, footerLists, contact } = globalData;

// Fine film grain, generated inline so it ships without an asset request.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

type DirectoryColumn = {
  title: string;
  links: ReadonlyArray<{ label: string; href: string; download?: boolean }>;
};

export function Footer({ settings }: { settings?: GlobalSettings }) {
  const directory: ReadonlyArray<DirectoryColumn> = [
    footerLists.about,
    {
      title: "FOLLOW US",
      links: [
        { label: "Instagram", href: settings?.socialInstagram || globalData.footerLists.follow.links[0].href },
        { label: "TikTok", href: settings?.socialTiktok || globalData.footerLists.follow.links[1].href },
        { label: "Facebook", href: settings?.socialFacebook || globalData.footerLists.follow.links[2].href },
      ],
    },
    footerLists.explore,
  ];

  return (
    <footer
      data-theme="dark"
      className="relative w-full overflow-hidden bg-surface-inverse text-text-inverse antialiased"
    >
      {/* ── Cinematic atmosphere ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, #0F1E2D 0%, #0A121C 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(65% 55% at 50% 100%, rgba(201,64,53,0.12), transparent 72%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
      />

      <div className="border-t border-text-inverse/10">
        <CinematicBand />
        <DirectoryMatrix directory={directory} />
        <NewsletterRow settings={settings} />
        <BaselineRow settings={settings} />
      </div>
    </footer>
  );
}

/**
 * CinematicBand — the final-scene brand statement. Oversized wordmark type
 * with a red micro-label and a high-priority CTA, set on the atmospheric
 * navy gradient so the footer opens like a campaign sign-off.
 */
function CinematicBand() {
  return (
    <div className="border-b border-text-inverse/10 px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-9">
          <div className="flex items-center gap-3.5">
            <span aria-hidden className="h-px w-9 bg-gbd-red" />
            <span className="font-display text-[11px] font-bold uppercase tracking-eyebrow text-accent">
              Find Your GBD
            </span>
          </div>
          <h2
            className="mt-6 font-campaign uppercase text-white text-[clamp(2.5rem,8vw,6.5rem)]"
            style={{ lineHeight: 0.9, letterSpacing: "-0.03em" }}
          >
            <span className="block">Great British</span>
            <span className="block">
              Doner<span className="text-accent">.</span>
            </span>
          </h2>
        </div>
        <div className="lg:col-span-3 lg:flex lg:justify-end">
          <CTAButton
            variant="primary"
            size="lg"
            href="/order-now"
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            Order Now
          </CTAButton>
        </div>
      </div>
    </div>
  );
}

function DirectoryMatrix({ directory }: { directory: ReadonlyArray<DirectoryColumn> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-full border-b border-text-inverse/10">
      {directory.map((col) => (
        <DirectoryCell key={col.title} title={col.title} links={col.links} />
      ))}
    </div>
  );
}

function DirectoryCell({ title, links }: DirectoryColumn) {
  return (
    <div className="p-10 lg:p-16 border-b md:border-b-0 md:border-r border-text-inverse/10 last:border-r-0">
      <h3 className="text-[9px] uppercase tracking-eyebrow text-text-inverse opacity-40 mb-8">
        {title}
      </h3>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink href={link.href} label={link.label} download={link.download} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLink({ href, label, download }: { href: string; label: string; download?: boolean }) {
  const external = /^https?:\/\//.test(href);
  const className =
    "block text-sm font-light text-text-inverse opacity-80 hover:opacity-100 hover:text-accent transition-all duration-300 ease-out mb-4 hover:translate-x-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
      >
        {label}
      </a>
    );
  }
  if (download) {
    return (
      <a
        href={href}
        download
        className={className}
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function NewsletterRow({ settings }: { settings?: GlobalSettings }) {
  return (
    <div className="w-full p-10 lg:p-16 border-b border-text-inverse/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div>
        <span className="block text-[9px] uppercase tracking-eyebrow text-text-inverse opacity-40 mb-4">
          {settings?.newsletterHeading || newsletter.heading}
        </span>
        <p className="max-w-md text-sm text-text-inverse opacity-70 font-light leading-relaxed">
          {settings?.newsletterSubtext || newsletter.subtext}
        </p>
      </div>

      <form className="relative w-full md:w-[500px] group">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          name="email"
          required
          placeholder="your.email"
          className="w-full appearance-none bg-transparent border-0 border-b border-text-inverse/20 py-4 text-2xl lg:text-3xl font-light text-text-inverse focus:outline-none focus:border-accent focus:ring-0 transition-colors duration-500 placeholder:text-text-inverse/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute right-0 bottom-5 text-text-inverse opacity-50 group-hover:text-accent group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
}

function BaselineRow({ settings }: { settings?: GlobalSettings }) {
  const copyright = settings?.copyright || contact.copyright;
  const email = settings?.contactEmail || contact.email;

  return (
    <div className="w-full px-10 py-6 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-inverse border-t border-text-inverse/10">
      <p className="text-[10px] uppercase tracking-eyebrow text-text-inverse opacity-40">
        {copyright}
      </p>
      <a
        href={`mailto:${email}`}
        className="text-[10px] uppercase tracking-eyebrow text-text-inverse opacity-40 hover:opacity-100 transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        {email}
      </a>
    </div>
  );
}
