"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-black/5">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display font-bold uppercase tracking-[0.18em] text-base text-gbd-navy"
        >
          GBD<span className="text-gbd-red">.</span>Doner
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-display text-xs uppercase tracking-[0.16em] transition-colors duration-300",
                  active ? "text-gbd-red" : "text-gbd-navy hover:text-gbd-red",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/locations" size="md">
            Order Now
          </ButtonLink>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2"
        >
          <div className="space-y-1.5">
            <span
              className={cn(
                "block h-0.5 w-6 bg-gbd-navy transition-transform duration-300",
                open && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-gbd-navy transition-opacity duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-gbd-navy transition-transform duration-300",
                open && "-translate-y-2 -rotate-45",
              )}
            />
          </div>
        </button>
      </Container>

      {open && (
        <nav className="lg:hidden border-t border-black/5 bg-white">
          <Container className="py-6 flex flex-col gap-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-base uppercase tracking-[0.14em] text-gbd-navy hover:text-gbd-red"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/locations" size="lg" className="mt-2 w-full">
              Order Now
            </ButtonLink>
          </Container>
        </nav>
      )}
    </header>
  );
}
