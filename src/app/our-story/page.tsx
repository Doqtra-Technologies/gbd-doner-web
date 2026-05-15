import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Ethical sourcing, urban kineticism, and the British doner reframe. The story behind GBD.",
};

export default function OurStoryPage() {
  return (
    <article>
      <Section size="hero">
        <Container>
          <Eyebrow tone="accent" className="block mb-4">
            Our Story
          </Eyebrow>
          <Heading level={1} className="max-w-4xl">
            A doner that earns its place in the city.
          </Heading>
          <p className="font-body text-lg leading-relaxed mt-8 max-w-2xl text-text-secondary">
            We started GBD because the British high-street doner deserved better
            — better sourcing, better food, better design. Same speed, none of
            the apologies.
          </p>
        </Container>
      </Section>

      <Section size="standard" className="border-t border-border-hairline">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <Eyebrow tone="accent" className="block mb-4">
              Ethical Sourcing
            </Eyebrow>
            <Heading level={2} className="mb-6">
              From farm to spit, on the record.
            </Heading>
            <p className="font-body text-lg leading-relaxed text-text-secondary">
              British chicken from Red Tractor-assured farms. Grass-fed lamb
              from a co-operative we name in-store. No mystery meat, no fillers
              — and a sourcing page we update quarterly.
            </p>
          </div>
          <div>
            <Eyebrow tone="accent" className="block mb-4">
              Urban Kineticism
            </Eyebrow>
            <Heading level={2} className="mb-6">
              Designed for motion.
            </Heading>
            <p className="font-body text-lg leading-relaxed text-text-secondary">
              Our stores are built around the 90-second lunch queue and the
              late-night flow. Open kitchens, fast lines, no fluorescent panic
              — just rhythm. The architecture matches the food: confident,
              quick, alive.
            </p>
          </div>
        </Container>
      </Section>

      <Section size="standard" className="border-t border-border-hairline">
        <Container>
          <div className="grid gap-12 sm:grid-cols-3">
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
    <div>
      <div className="font-display font-bold tracking-display text-accent text-5xl md:text-6xl">
        {number}
      </div>
      <div className="font-display font-bold uppercase tracking-eyebrow text-xs text-text-secondary mt-3">
        {label}
      </div>
    </div>
  );
}
