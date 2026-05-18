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
    <footer className="w-full bg-[#0F1E2D] text-white border-t border-white/10 antialiased">
      <DirectoryMatrix />
      <NewsletterRow />
      <BaselineRow />
    </footer>
  );
}

function DirectoryMatrix() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 w-full border-b border-white/10">
      {directory.map((col) => (
        <DirectoryCell key={col.title} title={col.title} links={col.links} />
      ))}
    </div>
  );
}

function DirectoryCell({ title, links }: DirectoryColumn) {
  return (
    <div className="p-10 lg:p-16 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0">
      <h3 className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-8">
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
    "block text-sm font-light text-white/80 hover:text-white transition-all duration-300 mb-4 hover:translate-x-1";

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
    <div className="w-full p-10 lg:p-16 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div>
        <span className="block text-[9px] uppercase tracking-[0.2em] text-white/40 mb-4">
          {newsletter.heading}
        </span>
        <p className="max-w-md text-sm text-white/70 font-light leading-relaxed">
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
          className="w-full appearance-none bg-transparent border-0 border-b border-white/20 py-4 text-2xl lg:text-3xl font-light text-white focus:outline-none focus:border-[#C94035] focus:ring-0 transition-colors duration-500 placeholder:text-white/20"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute right-0 bottom-5 text-white/50 group-hover:text-[#C94035] group-hover:translate-x-2 transition-all duration-300 cursor-pointer"
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
    <div className="w-full px-10 py-6 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0A141E]">
      <p className="text-[10px] uppercase tracking-widest text-white/40">
        {contact.copyright}
      </p>
      <a
        href={`mailto:${contact.email}`}
        className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-300"
      >
        {contact.email}
      </a>
    </div>
  );
}
