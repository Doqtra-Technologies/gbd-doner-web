"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "ok" | "error";

export function CateringForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // Stub — wire to /api/catering, Gravity Forms, or a CRM later.
    await new Promise((r) => setTimeout(r, 800));
    setStatus("ok");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={onSubmit} className="bg-gbd-cream p-8 md:p-10 space-y-5">
      <Row>
        <Field label="Your name" name="name" required />
        <Field label="Company" name="company" />
      </Row>
      <Row>
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
      </Row>
      <Row>
        <Field label="Event date" name="date" type="date" required />
        <Field label="Headcount" name="headcount" type="number" required />
      </Row>
      <Field label="Tell us about the event" name="notes" textarea />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <p className="text-sm text-gbd-navy/60 max-w-sm">
          We&apos;ll get back to you within one working day.
        </p>
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send Brief"}
        </Button>
      </div>
      <p className="text-sm text-gbd-navy/70 min-h-[1.25rem]" aria-live="polite">
        {status === "ok" && "Thanks — your brief is in. We'll reply shortly."}
        {status === "error" && "Something went wrong — try again."}
      </p>
    </form>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const id = `field-${name}`;
  const baseInput =
    "w-full bg-white border border-gbd-navy/10 px-4 py-3 font-body text-base text-gbd-navy placeholder:text-gbd-navy/40 focus:outline-none focus:border-gbd-red focus:ring-1 focus:ring-gbd-red transition-colors";
  return (
    <label htmlFor={id} className="block">
      <span className="display-eyebrow text-gbd-navy/70 block mb-2">
        {label}
        {required && <span className="text-gbd-red"> *</span>}
      </span>
      {textarea ? (
        <textarea id={id} name={name} rows={4} required={required} className={baseInput} />
      ) : (
        <input id={id} name={name} type={type} required={required} className={baseInput} />
      )}
    </label>
  );
}
