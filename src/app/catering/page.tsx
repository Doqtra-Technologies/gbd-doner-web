import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { CTAButton } from "@/components/ui/cta-button";
import { CateringForm } from "@/app/catering/catering-form";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "GBD for team lunches, corporate events, and city-wide takeovers.",
};

export default function CateringPage() {
  return (
    <>
      <Section size="hero">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <Eyebrow tone="secondary" className="block mb-8">
                Catering · 10 – 500 Pax
              </Eyebrow>
              <Heading level={1}>
                Fuel
                <br />
                Your Team.
              </Heading>
              <p className="font-body text-lg leading-relaxed mt-10 max-w-md text-text-secondary">
                Office lunches, conference takeovers, late-night refuels. We
                bring the spit, the flatbreads, and the energy — you bring the
                appetite.
              </p>

              <div className="mt-12 flex flex-wrap items-center gap-8">
                <CTAButton variant="primary" size="lg" href="#enquiry">
                  Request a Quote
                </CTAButton>
                <CTAButton variant="tertiary" href="/menu">
                  Browse the menu
                </CTAButton>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="relative w-full aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=85"
                  alt="GBD catering spread of doner plates and sides"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="rounded-none object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="enquiry"
        size="standard"
        className="border-t border-border-hairline"
      >
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <Eyebrow tone="accent" className="block mb-6">
                Enquiry
              </Eyebrow>
              <Heading level={2}>
                Let&apos;s Fuel Your
                <br />
                Next Event.
              </Heading>
              <p className="font-body text-base mt-6 text-text-secondary max-w-xl mx-auto">
                Tell us a little about your event. We&apos;ll come back with a
                tailored menu, pricing, and timings.
              </p>
            </div>
            <CateringForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
