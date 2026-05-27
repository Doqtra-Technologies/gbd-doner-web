"use client";

import { useState, type FormEvent } from "react";
import { CTAButton } from "@/components/ui/cta-button";
import type { CateringFormSettings } from "@/domain/site-settings";

type Status = "idle" | "submitting" | "ok" | "error";

/**
 * CateringForm — bottom-border-only fields.
 *
 * All copy (field labels, placeholders, button text, status messages) is
 * driven by `settings` so the client can edit any of it from
 * wp-admin -> Site Settings -> Catering Form. Structure is fixed.
 */
export function CateringForm({ settings }: { settings: CateringFormSettings }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const form = e.target as HTMLFormElement;
      const data = new FormData(form);

      const enquiry = {
        name: data.get("name"),
        email: data.get("email"),
        company: data.get("company"),
        headcount: parseInt(data.get("headcount") as string),
        message: data.get("message"),
      };

      const response = await fetch("/api/catering-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      setStatus("ok");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16"
    >
      <Field
        label={settings.fieldNameLabel}
        name="name"
        required
        placeholder={settings.fieldNamePlaceholder}
      />
      <Field
        label={settings.fieldEmailLabel}
        name="email"
        type="email"
        required
        placeholder={settings.fieldEmailPlaceholder}
      />
      <Field
        label={settings.fieldCompanyLabel}
        name="company"
        placeholder={settings.fieldCompanyPlaceholder}
      />
      <Field
        label={settings.fieldHeadcountLabel}
        name="headcount"
        type="number"
        required
        placeholder={settings.fieldHeadcountPlaceholder}
      />
      <Field
        label={settings.fieldMessageLabel}
        name="message"
        textarea
        placeholder={settings.fieldMessagePlaceholder}
        className="sm:col-span-2"
      />

      <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4">
        <p
          className="font-body text-sm text-text-secondary min-h-[1.25rem]"
          aria-live="polite"
        >
          {status === "idle" && settings.statusIdle}
          {status === "submitting" && settings.statusSending}
          {status === "ok" && settings.statusSuccess}
          {status === "error" && settings.statusError}
        </p>
        <CTAButton
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? settings.submitLabelSending : settings.submitLabel}
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
