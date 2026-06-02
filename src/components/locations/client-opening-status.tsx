"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { OpeningHours } from "@/domain/location";

const DAY_INDEX: Record<OpeningHours["day"], number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function parseHHMM(s: string): number {
  const [h, m] = s.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function computeOpeningStatus(hours: OpeningHours[]) {
  if (!hours.length) return { open: false, label: "Closed" };
  const now = new Date();
  const todayIdx = now.getDay();
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const todayKey = (Object.keys(DAY_INDEX) as OpeningHours["day"][]).find(
    (k) => DAY_INDEX[k] === todayIdx,
  );
  const today = hours.find((h) => h.day === todayKey);
  if (!today) return { open: false, label: "Closed" };
  const open = parseHHMM(today.open);
  let close = parseHHMM(today.close);
  if (close <= open) close += 24 * 60;
  const adjustedNow =
    minutesNow < open && close > 24 * 60 ? minutesNow + 24 * 60 : minutesNow;
  if (adjustedNow >= open && adjustedNow < close) {
    return { open: true, label: "Open Now" };
  }
  return { open: false, label: "Closed" };
}

export function ClientOpeningStatus({ hours }: { hours: OpeningHours[] }) {
  const [status, setStatus] = useState({ open: false, label: "Loading..." });

  useEffect(() => {
    setStatus(computeOpeningStatus(hours));
    const interval = setInterval(() => {
      setStatus(computeOpeningStatus(hours));
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [hours]);

  if (status.label === "Loading...") {
    return <span className="opacity-0">Loading...</span>;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 shrink-0 font-display font-bold uppercase tracking-eyebrow text-xs",
        status.open ? "text-accent" : "text-text-disabled",
      )}
    >
      <span
        className={cn(
          "inline-block h-2 w-2 rounded-full",
          status.open ? "bg-accent" : "bg-border-hairline",
        )}
      />
      {status.label}
    </span>
  );
}
