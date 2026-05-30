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
      className="w-full grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-6"
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

      <div className="sm:col-span-2 flex flex-col items-center gap-4 pt-3">
        <p
          className="min-h-[1.25rem] text-center font-body text-sm text-text-secondary"
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
    textarea
      ? "w-full min-h-[120px] appearance-none rounded-[14px] border border-border-hairline bg-canvas px-4 py-4 font-body text-base text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-0 focus:border-accent transition-colors duration-300 ease-smooth"
      : "w-full appearance-none rounded-[14px] border border-border-hairline bg-canvas px-4 py-3 font-body text-base text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-0 focus:border-accent transition-colors duration-300 ease-smooth";

  return (
    <label htmlFor={id} className={"flex flex-col gap-2 " + className}>
      <span className="font-body text-[11px] uppercase tracking-eyebrow text-text-secondary">
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
