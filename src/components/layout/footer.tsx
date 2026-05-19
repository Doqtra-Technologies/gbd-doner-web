import Link from "next/link";
import { globalData } from "@/data/content";

const { newsletter, footerLists, contact } = globalData;

type DirectoryColumn = {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
};

const directory: ReadonlyArray<DirectoryColumn> = [
  footerLists.about,
  footerLists.follow,
  footerLists.explore,
  {
    title: "LEGAL",
    links: [{ label: "Privacy Policy", href: "/privacy" }],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-surface-inverse text-text-inverse border-t border-text-inverse/10 antialiased">
      <DirectoryMatrix />
      <NewsletterRow />
      <BaselineRow />
    </footer>
  );
}

function DirectoryMatrix() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 w-full border-b border-text-inverse/10">
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
            <FooterLink href={link.href} label={link.label} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const external = /^https?:\/\//.test(href);
  const className =
    "block text-sm font-light text-text-inverse opacity-80 hover:opacity-100 transition-all duration-300 mb-4 hover:translate-x-1";

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
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

function NewsletterRow() {
  return (
    <div className="w-full p-10 lg:p-16 border-b border-text-inverse/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div>
        <span className="block text-[9px] uppercase tracking-eyebrow text-text-inverse opacity-40 mb-4">
          {newsletter.heading}
        </span>
        <p className="max-w-md text-sm text-text-inverse opacity-70 font-light leading-relaxed">
          {newsletter.subtext}
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
          className="w-full appearance-none bg-transparent border-0 border-b border-text-inverse/20 py-4 text-2xl lg:text-3xl font-light text-text-inverse focus:outline-none focus:border-accent focus:ring-0 transition-colors duration-500 placeholder:text-text-inverse/20"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute right-0 bottom-5 text-text-inverse opacity-50 group-hover:text-accent group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 cursor-pointer"
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

function BaselineRow() {
  return (
    <div className="w-full px-10 py-6 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-inverse border-t border-text-inverse/10">
      <p className="text-[10px] uppercase tracking-eyebrow text-text-inverse opacity-40">
        {contact.copyright}
      </p>
      <a
        href={`mailto:${contact.email}`}
        className="text-[10px] uppercase tracking-eyebrow text-text-inverse opacity-40 hover:opacity-100 transition-opacity duration-300"
      >
        {contact.email}
      </a>
    </div>
  );
}
