"use client";

import { useState, type FormEvent } from "react";
import { CTAButton } from "@/components/ui/cta-button";

type Status = "idle" | "submitting" | "ok" | "error";

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
    <form onSubmit={onSubmit} className="w-full space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Company" name="company" />
        <Field label="Headcount" name="headcount" type="number" required />
      </div>

      <Field label="Tell us about the event" name="message" textarea />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4">
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const id = `catering-${name}`;
  const input =
    "w-full bg-transparent rounded-none border border-border-strong px-4 py-3.5 font-body text-base text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0 transition-colors";

  return (
    <label htmlFor={id} className="block">
      <span className="block font-body text-sm text-text-primary mb-2">
        {label}
        {required && <span className="text-text-primary"> *</span>}
      </span>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          required={required}
          placeholder="Date, venue, vibe — anything that helps us plan."
          className={input}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholderFor(name)}
          className={input}
        />
      )}
    </label>
  );
}

function placeholderFor(name: string): string {
  switch (name) {
    case "name":
      return "Jane Smith";
    case "email":
      return "jane@company.com";
    case "company":
      return "Company Ltd.";
    case "headcount":
      return "e.g. 40";
    default:
      return "";
  }
}
