"use client";

import { useEffect } from "react";

export default function LocationDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[locations/[slug]] render failed", error);
  }, [error]);

  return (
    <main className="w-full bg-canvas py-24 px-8 text-center">
      <h1 className="font-display font-bold uppercase tracking-display text-text-primary text-3xl mb-4">
        Location unavailable
      </h1>
      <p className="font-body text-sm text-text-secondary opacity-70 mb-8 max-w-md mx-auto">
        We couldn&rsquo;t load this branch. Please try again in a moment.
      </p>
      <button
        onClick={reset}
        className="font-display font-bold uppercase tracking-eyebrow text-[10px] text-text-primary border-b border-border-strong pb-0.5 transition-colors duration-300 hover:text-accent hover:border-accent"
      >
        Retry
      </button>
    </main>
  );
}
