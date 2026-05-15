"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { CTAButton } from "@/components/ui/cta-button";
import { EASE } from "@/brand/motion";

const shots = [
  {
    src: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=85",
    alt: "Friends sharing food at a GBD counter",
  },
  {
    src: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=85",
    alt: "Doner being carved off the spit",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=85",
    alt: "Close-up plate of GBD lamb doner",
  },
];

export function Community() {
  return (
    <Section size="standard">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {shots.map((s, i) => (
                <motion.div
                  key={s.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE.out }}
                  className={
                    i === 0
                      ? "col-span-2 relative aspect-[16/10]"
                      : "relative aspect-[4/5]"
                  }
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    className="rounded-none object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <Eyebrow tone="accent" className="block mb-8">
              The Community
            </Eyebrow>

            <Heading level={1}>
              <span className="block">Real Food.</span>
              <span className="block">Real Community.</span>
              <span className="block text-accent">You In?</span>
            </Heading>

            <p className="mt-10 max-w-md font-body text-base md:text-lg leading-relaxed text-text-secondary">
              We&apos;re not a chain. We&apos;re a kitchen, a neighbourhood,
              and a way of eating that respects the source and the seat at the
              table. Pull up.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-8">
              <CTAButton variant="primary" size="md" href="/our-story">
                Our Story
              </CTAButton>
              <CTAButton variant="tertiary" href="/feed">
                The Feed
              </CTAButton>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
