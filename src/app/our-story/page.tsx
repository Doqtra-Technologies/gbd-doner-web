import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Ethical sourcing, urban kineticism, and the British doner reframe. The story behind GBD.",
};

export default function OurStoryPage() {
  return (
    <article>
      <section className="bg-gbd-navy text-white">
        <Container className="py-24 md:py-32">
          <div className="display-eyebrow text-gbd-red mb-4">Our Story</div>
          <h1 className="display-h1 max-w-4xl">A doner that earns its place in the city.</h1>
          <p className="body-lg mt-8 max-w-2xl text-white/75">
            We started GBD because the British high-street doner deserved better — better
            sourcing, better food, better design. Same speed, none of the apologies.
          </p>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <div className="display-eyebrow text-gbd-red mb-4">Ethical Sourcing</div>
            <h2 className="display-h2 text-gbd-navy mb-6">From farm to spit, on the record.</h2>
            <p className="body-lg text-gbd-navy/75">
              British chicken from Red Tractor-assured farms. Grass-fed lamb from a
              co-operative we name in-store. No mystery meat, no fillers — and a sourcing
              page we update quarterly.
            </p>
          </div>
          <div>
            <div className="display-eyebrow text-gbd-red mb-4">Urban Kineticism</div>
            <h2 className="display-h2 text-gbd-navy mb-6">Designed for motion.</h2>
            <p className="body-lg text-gbd-navy/75">
              Our stores are built around the 90-second lunch queue and the late-night
              flow. Open kitchens, fast lines, no fluorescent panic — just rhythm. The
              architecture matches the food: confident, quick, alive.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-gbd-red text-white">
        <Container className="py-24 md:py-28">
          <div className="grid gap-8 sm:grid-cols-3">
            <Stat number="100%" label="British-sourced meat" />
            <Stat number="<90s" label="From order to plate" />
            <Stat number="0" label="Artificial fillers" />
          </div>
        </Container>
      </section>
    </article>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-display font-bold text-5xl md:text-6xl">{number}</div>
      <div className="display-eyebrow mt-3 text-white/80">{label}</div>
    </div>
  );
}
