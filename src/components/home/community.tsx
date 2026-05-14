"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const ease = [0.22, 1, 0.36, 1] as const;

const shots = [
  {
    src: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=85",
    alt: "Friends sharing food at a GBD counter",
    className:
      "absolute top-0 left-2 sm:left-8 w-[58%] aspect-[3/4] -rotate-[6deg] z-10",
  },
  {
    src: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=85",
    alt: "Doner being carved off the spit",
    className:
      "absolute top-24 right-0 sm:right-2 w-[52%] aspect-[4/5] rotate-[4deg] z-20",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=85",
    alt: "Close-up plate of GBD lamb doner",
    className:
      "absolute bottom-0 left-12 sm:left-24 w-[55%] aspect-[5/4] -rotate-[3deg] z-30",
  },
];

export function Community() {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative w-full aspect-[4/5] max-w-xl mx-auto">
              {shots.map((s, i) => (
                <motion.div
                  key={s.src}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease }}
                  className={s.className}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 1024px) 60vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="block font-display font-bold uppercase tracking-[0.22em] text-[11px] text-gbd-red mb-8"
            >
              The Community
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-display font-bold uppercase tracking-tighter leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gbd-navy"
            >
              <span className="block">Real Food.</span>
              <span className="block pl-[12%] md:pl-[18%]">Real</span>
              <span className="block">Community.</span>
              <span className="block pl-[6%] md:pl-[10%] text-gbd-red">
                You In?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="mt-10 max-w-md font-body text-base md:text-lg leading-relaxed text-gbd-navy/70"
            >
              We&apos;re not a chain. We&apos;re a kitchen, a neighbourhood,
              and a way of eating that respects the source and the seat at the
              table. Pull up.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45, ease }}
              className="mt-10 flex items-center gap-8"
            >
              <Link
                href="/our-story"
                className="inline-flex h-12 items-center justify-center rounded-full border border-gbd-navy bg-white px-7 font-display font-bold uppercase tracking-[0.14em] text-[11px] text-gbd-navy transition-colors duration-300 hover:border-transparent hover:bg-gbd-navy hover:text-white"
              >
                Our Story
              </Link>
              <Link
                href="/feed"
                className="group inline-flex items-center gap-2 font-display font-bold uppercase tracking-[0.16em] text-xs text-gbd-navy hover:text-gbd-red transition-colors"
              >
                The Feed <span aria-hidden className="transition-transform duration-500 ease-smooth group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
