"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { CTAButton } from "@/components/ui/cta-button";
import { EASE } from "@/brand/motion";

type Status = "idle" | "submitting" | "ok" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("ok");
    setEmail("");
  }

  return (
    <Section size="standard" className="border-t border-border-hairline">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE.out }}
        >
          <Eyebrow tone="accent" className="block mb-4">
            Vibe Insider
          </Eyebrow>
          <Heading level={2}>Eat first. Hear about it first.</Heading>
          <p className="font-body text-lg leading-relaxed mt-5 max-w-md text-text-secondary">
            Drop-only menu items, store openings, and the occasional free meal.
            No spam — just signal.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE.out }}
          className="flex flex-col gap-3"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@city.co.uk"
              className="flex-1 h-14 px-5 bg-canvas text-text-primary placeholder:text-text-disabled font-body text-base border border-border-strong focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <CTAButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "I'm In"}
            </CTAButton>
          </div>
          <p
            className="font-body text-sm text-text-secondary min-h-[1.25rem]"
            aria-live="polite"
          >
            {status === "ok" && "Welcome to the inside. Check your inbox."}
            {status === "error" && "Something went wrong — try again."}
          </p>
        </motion.form>
      </Container>
    </Section>
  );
}
