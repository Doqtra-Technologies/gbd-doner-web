"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { Numeral } from "@/components/ui/numeral";
import { CTAButton } from "@/components/ui/cta-button";
import { DUR, EASE } from "@/brand/motion";

type Status = "idle" | "submitting" | "ok" | "error";

/**
 * Newsletter — editorial closing spread.
 *
 * Reads like the back page of a magazine: numeral marker, oversized
 * headline taking the left column, a small clean form occupying the
 * right column. The input is a single hairline-bottom field — no boxy
 * container, no rounded chrome. The composition feels printed, not
 * built.
 */
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
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.reveal, ease: EASE.editorial }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end"
        >
          <div className="lg:col-span-7">
            <Numeral index="05" label="Vibe Insider" className="mb-8" />
            <Heading level={2}>
              <span className="block">Eat first.</span>
              <span className="block pl-[6%]">
                Hear about it first<span className="text-accent">.</span>
              </span>
            </Heading>
            <p className="font-body text-base md:text-lg leading-relaxed mt-10 max-w-md text-text-secondary">
              Drop-only menu items, store openings, and the occasional free
              meal. No spam — just signal.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-5 flex flex-col gap-6"
            aria-label="Subscribe to GBD newsletter"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex items-center border-b border-border-strong focus-within:border-accent transition-colors duration-300 ease-smooth">
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@city.co.uk"
                className="flex-1 bg-transparent py-4 font-body text-lg text-text-primary placeholder:text-text-disabled focus:outline-none"
              />
            </div>
            <CTAButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "submitting"}
              className="self-start"
            >
              {status === "submitting" ? "Sending…" : "I'm In"}
            </CTAButton>
            <p
              className="font-body text-sm text-text-secondary min-h-[1.25rem]"
              aria-live="polite"
            >
              {status === "ok" && "Welcome to the inside. Check your inbox."}
              {status === "error" && "Something went wrong — try again."}
            </p>
          </form>
        </motion.div>
      </Container>
    </Section>
  );
}
