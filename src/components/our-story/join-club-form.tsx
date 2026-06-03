"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "ok" | "error";

export function JoinClubForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe. Please try again.");
      }

      setStatus("ok");
      setEmail("");
    } catch (error: any) {
      console.error("Subscription error:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-full">
      <div className="relative">
        <label htmlFor="join-email" className="sr-only">
          Email Address
        </label>
        <input
          id="join-email"
          type="email"
          name="email"
          required
          disabled={status === "submitting" || status === "ok"}
          placeholder="your.email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full appearance-none rounded-none border border-border-strong bg-canvas px-4 py-3 font-body text-xs text-text-primary placeholder:text-text-disabled/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-300 disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting" || status === "ok"}
        className="inline-flex h-12 w-full items-center justify-center bg-surface-inverse px-6 font-display text-xs font-bold uppercase tracking-button text-white transition-colors duration-300 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Signing Up..." : status === "ok" ? "Joined" : "Sign Up"}
      </button>

      {status === "ok" && (
        <p className="font-body text-xs text-accent mt-1 text-center transition-all duration-300">
          Welcome! You have successfully joined the club.
        </p>
      )}

      {status === "error" && (
        <p className="font-body text-xs text-accent mt-1 text-center transition-all duration-300">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
