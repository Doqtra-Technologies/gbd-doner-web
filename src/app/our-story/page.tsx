import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { Numeral } from "@/components/ui/numeral";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Ethical sourcing, urban kineticism, and the British doner reframe. The story behind GBD.",
};

/**
 * Our Story — editorial monograph.
 *
 * The page reads as four numbered movements (01 Britain, 02 Sourcing,
 * 03 Kineticism, 04 The Numbers). Each opener uses the Numeral marker
 * plus a tightly-set heading; columns are intentionally narrower than
 * the page so the type column reads like a book column rather than a
 * marketing block.
 */
export default function OurStoryPage() {
  return (
    <article>
      <Section size="hero">
        <Container>
          <Numeral index="01" label="Britain" className="mb-10" />
          <Heading level={1} className="max-w-4xl">
            <span className="block">A doner</span>
            <span className="block pl-[6%]">that earns its place</span>
            <span className="block">
              in the city<span className="text-accent">.</span>
            </span>
          </Heading>
          <p className="font-body text-lg leading-relaxed mt-12 max-w-xl text-text-secondary">
            We started GBD because the British high-street doner deserved
            better — better sourcing, better food, better design. Same
            speed, none of the apologies.
          </p>
        </Container>
      </Section>

      <Section size="standard" className="border-t border-border-hairline">
        <Container>
          <div className="grid gap-20 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-6">
              <Numeral index="02" label="Sourcing" className="mb-8" />
              <Heading level={2} className="mb-8">
                From farm to spit, on the record.
              </Heading>
              <p className="font-body text-lg leading-relaxed text-text-secondary max-w-md">
                British chicken from Red Tractor-assured farms. Grass-fed
                lamb from a co-operative we name in-store. No mystery
                meat, no fillers — and a sourcing page we update quarterly.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Numeral index="03" label="Kineticism" className="mb-8" />
              <Heading level={2} className="mb-8">
                Designed for motion.
              </Heading>
              <p className="font-body text-lg leading-relaxed text-text-secondary max-w-md">
                Our stores are built around the 90-second lunch queue and
                the late-night flow. Open kitchens, fast lines, no
                fluorescent panic — just rhythm. The architecture matches
                the food: confident, quick, alive.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section size="standard" className="border-t border-border-hairline">
        <Container>
          <Numeral index="04" label="The Numbers" className="mb-16" />
          <div className="grid gap-16 sm:grid-cols-3">
            <Stat number="100%" label="British-sourced meat" />
            <Stat number="<90s" label="From order to plate" />
            <Stat number="0" label="Artificial fillers" />
          </div>
        </Container>
      </Section>
    </article>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="font-display font-bold tracking-display text-accent text-6xl md:text-7xl leading-[0.9]">
        {number}
      </div>
      <span aria-hidden className="h-px w-12 bg-border-strong" />
      <div className="font-display font-bold uppercase tracking-eyebrow text-xs text-text-secondary">
        {label}
      </div>
    </div>
  );
}
