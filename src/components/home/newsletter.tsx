"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "ok" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    // Stubbed handler — wire to your provider of choice later (Klaviyo,
    // Mailchimp, WP plugin via GraphQL mutation, etc.).
    await new Promise((r) => setTimeout(r, 700));
    setStatus("ok");
    setEmail("");
  }

  return (
    <section className="bg-gbd-red text-white">
      <Container className="py-24 md:py-28 grid gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="display-eyebrow text-white/80 mb-4">Vibe Insider</div>
          <h2 className="display-h2">Eat first. Hear about it first.</h2>
          <p className="body-lg mt-5 max-w-md text-white/85">
            Drop-only menu items, store openings, and the occasional free meal.
            No spam — just signal.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
              className="flex-1 h-14 px-5 bg-white text-gbd-navy placeholder:text-gbd-navy/40 font-body text-base focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={status === "submitting"}
              className="sm:w-auto"
            >
              {status === "submitting" ? "Sending…" : "I'm In"}
            </Button>
          </div>
          <p className="text-sm text-white/75 min-h-[1.25rem]" aria-live="polite">
            {status === "ok" && "Welcome to the inside. Check your inbox."}
            {status === "error" && "Something went wrong — try again."}
          </p>
        </motion.form>
      </Container>
    </section>
  );
}
