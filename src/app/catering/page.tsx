import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CateringForm } from "@/app/catering/catering-form";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "GBD for team lunches, corporate events, and city-wide takeovers.",
};

export default function CateringPage() {
  return (
    <>
      <section className="bg-white pt-20 md:pt-28 pb-24 md:pb-32 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 lg:pt-16">
              <span className="block font-display font-bold uppercase tracking-[0.22em] text-[11px] text-gbd-navy/60 mb-8">
                Catering · 10 – 500 Pax
              </span>
              <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gbd-navy">
                Fuel
                <br />
                Your Team.
              </h1>
              <p className="mt-10 max-w-md font-body text-base md:text-lg leading-relaxed text-gbd-navy/70">
                Office lunches, conference takeovers, late-night refuels.
                We bring the spit, the flatbreads, and the energy — you bring
                the appetite.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-8">
                <a
                  href="#enquiry"
                  className="inline-flex h-14 items-center justify-center rounded-none border border-gbd-navy bg-transparent px-10 font-display font-bold uppercase tracking-[0.16em] text-xs text-gbd-navy transition-colors duration-300 hover:border-transparent hover:bg-gbd-red hover:text-white"
                >
                  Request a Quote
                </a>
                <Link
                  href="/menu"
                  className="group inline-flex items-center gap-2 font-body text-sm text-gbd-navy"
                >
                  <span className="underline underline-offset-[6px] decoration-gbd-navy decoration-[1px] group-hover:decoration-gbd-red group-hover:text-gbd-red transition-colors">
                    Browse the menu
                  </span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="relative w-full aspect-[5/6] lg:aspect-[4/5] lg:translate-x-8 xl:translate-x-16">
                <Image
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=85"
                  alt="GBD catering spread of doner plates and sides"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
              <div className="hidden lg:flex absolute -bottom-8 -left-8 items-center gap-3 bg-white pl-0 pr-4 py-2">
                <span className="h-2 w-2 bg-gbd-red" />
                <span className="font-display font-bold uppercase tracking-[0.2em] text-[10px] text-gbd-navy">
                  Min. 10 · Max. Anything
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="enquiry"
        className="bg-white py-24 md:py-32 border-t border-gbd-navy/10"
      >
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-14 md:mb-20">
              <span className="block font-display font-bold uppercase tracking-[0.22em] text-[11px] text-gbd-navy/60 mb-6">
                Enquiry
              </span>
              <h2 className="font-display font-bold uppercase tracking-tighter leading-[0.95] text-4xl sm:text-5xl md:text-6xl text-gbd-navy">
                Let&apos;s Fuel Your
                <br />
                Next Event.
              </h2>
              <p className="mt-6 font-body text-base text-gbd-navy/70 max-w-xl mx-auto">
                Tell us a little about your event. We&apos;ll come back with a
                tailored menu, pricing, and timings.
              </p>
            </div>
            <CateringForm />
          </div>
        </Container>
      </section>
    </>
  );
}
