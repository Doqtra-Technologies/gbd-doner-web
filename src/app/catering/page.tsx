import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CateringForm } from "@/app/catering/catering-form";

export const metadata: Metadata = {
  title: "Catering",
  description: "GBD for team lunches, corporate events, and city-wide takeovers.",
};

export default function CateringPage() {
  return (
    <Container className="py-20 md:py-28 grid gap-16 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <div className="display-eyebrow text-gbd-red mb-4">Catering</div>
        <h1 className="display-h1 text-gbd-navy">Feed the team. Properly.</h1>
        <p className="body-lg text-gbd-navy/75 mt-6">
          From 10-person huddles to 500-head launch parties. We bring the spit, the
          flatbreads, and the energy. Tell us what you need below.
        </p>
        <ul className="mt-8 space-y-3 body-base text-gbd-navy/75">
          <li>· Office lunches & team huddles</li>
          <li>· Conferences and brand activations</li>
          <li>· Weddings, after-parties, late-night refuels</li>
        </ul>
      </div>
      <div className="lg:col-span-3">
        <CateringForm />
      </div>
    </Container>
  );
}
