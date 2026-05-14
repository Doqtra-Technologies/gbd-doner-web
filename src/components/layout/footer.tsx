import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-gbd-navy text-white mt-32">
      <Container className="py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display font-bold uppercase tracking-[0.18em] text-2xl">
            GBD<span className="text-gbd-red">.</span>Doner
          </div>
          <p className="body-base mt-4 max-w-md text-white/70">
            {siteConfig.tagline}. Ethically sourced. Built for the city.
          </p>
        </div>

        <div>
          <div className="display-eyebrow text-gbd-red mb-4">Explore</div>
          <ul className="space-y-2">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="display-eyebrow text-gbd-red mb-4">Follow</div>
          <ul className="space-y-2">
            <li>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="text-white/80 hover:text-white transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noreferrer noopener"
                className="text-white/80 hover:text-white transition-colors"
              >
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <div>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</div>
          <div className="font-display uppercase tracking-[0.16em] text-xs">
            British Doner Redefined
          </div>
        </Container>
      </div>
    </footer>
  );
}
