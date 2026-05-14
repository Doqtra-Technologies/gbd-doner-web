"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gbd-navy text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-gbd-red/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-[420px] h-[420px] rounded-full bg-gbd-red/10 blur-3xl" />
      </div>

      <Container className="relative py-28 md:py-40 grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="display-eyebrow text-gbd-red mb-6"
          >
            Est. 2026 · London
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-h1"
          >
            British <span className="text-gbd-red">Doner</span>
            <br />
            Redefined.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="body-lg mt-8 max-w-xl text-white/75"
          >
            Ethically sourced. Urban kinetic. Built for the 90-second lunch and
            the 1AM craving. This is doner with a backbone.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end"
        >
          <ButtonLink href="/menu" size="lg" variant="primary">
            See the Menu
          </ButtonLink>
          <ButtonLink href="/locations" size="lg" variant="ghost" className="text-white border-white/30 hover:border-white">
            Find a Store
          </ButtonLink>
        </motion.div>
      </Container>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="h-1 bg-gbd-red origin-left"
      />
    </section>
  );
}
