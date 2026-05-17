"use client";

import { useState, type FormEvent } from "react";
import { CTAButton } from "@/components/ui/cta-button";

type Status = "idle" | "submitting" | "ok" | "error";

/**
 * CateringForm — bottom-border-only fields.
 *
 * Strips all default browser chrome (rounded corners, default outlines,
 * background fills) so every input is just a label + a 1px line.
 * Focus snaps the line to GBD Red. The form sits inside the 4/8 grid
 * defined by the page; it owns its internal 2-column matrix with tight
 * column gaps and architectural row spacing.
 */
export function CateringForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("ok");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16"
    >
      <Field label="Name" name="name" required placeholder="Jane Smith" />
      <Field
        label="Email"
        name="email"
        type="email"
        required
        placeholder="jane@company.com"
      />
      <Field label="Company" name="company" placeholder="Company Ltd." />
      <Field
        label="Headcount"
        name="headcount"
        type="number"
        required
        placeholder="e.g. 40"
      />

      <Field
        label="Tell us about the event"
        name="message"
        textarea
        placeholder="Date, venue, vibe — anything that helps us plan."
        className="sm:col-span-2"
      />

      <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4">
        <p
          className="font-body text-sm text-text-secondary min-h-[1.25rem]"
          aria-live="polite"
        >
          {status === "idle" && "We'll get back to you within one working day."}
          {status === "submitting" && "Sending your brief…"}
          {status === "ok" && "Thanks — your brief is in. We'll reply shortly."}
          {status === "error" && "Something went wrong — please try again."}
        </p>
        <CTAButton
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send Brief"}
        </CTAButton>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
  className?: string;
}) {
  const id = `catering-${name}`;
  // appearance-none + border-0 + border-b strips all browser defaults.
  // Only the bottom border remains. Focus snaps it to brand red.
  const fieldClass =
    "w-full appearance-none rounded-none bg-transparent border-0 border-b border-border-hairline px-0 py-3 font-body text-base text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-0 focus:border-accent transition-colors duration-300 ease-smooth";

  return (
    <label htmlFor={id} className={"flex flex-col gap-2 " + className}>
      <span className="font-body uppercase tracking-eyebrow text-[11px] text-text-secondary">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          required={required}
          placeholder={placeholder}
          className={fieldClass}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={fieldClass}
        />
      )}
    </label>
  );
}
