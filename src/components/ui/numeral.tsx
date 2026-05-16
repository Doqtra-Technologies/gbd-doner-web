import { cn } from "@/lib/utils";

/**
 * Editorial numeric marker.
 *
 * Used to break the grid in section heads ("01 — STORY", "02 — METHOD",
 * etc.). The numeral sits tight to a long rule and a small uppercase
 * label. Borrowed from print editorial — fashion lookbooks, restaurant
 * cookbooks, architectural monographs.
 *
 * Composition reads as:   01 ─────── LABEL
 *
 * Tone defaults to accent (red) so the numeral feels like a stamp on
 * the page, not just another piece of UI chrome.
 */
type NumeralTone = "accent" | "primary" | "secondary";

const toneClasses: Record<NumeralTone, string> = {
  accent: "text-accent",
  primary: "text-text-primary",
  secondary: "text-text-secondary",
};

export interface NumeralProps {
  index: number | string;
  label?: string;
  tone?: NumeralTone;
  className?: string;
}

export function Numeral({
  index,
  label,
  tone = "accent",
  className,
}: NumeralProps) {
  const indexLabel =
    typeof index === "number" ? String(index).padStart(2, "0") : index;
  return (
    <div
      className={cn(
        "flex items-center gap-4 font-display font-bold uppercase tracking-eyebrow text-[11px]",
        toneClasses[tone],
        className,
      )}
    >
      <span>{indexLabel}</span>
      <span aria-hidden className="h-px w-12 bg-current opacity-60" />
      {label && <span className="text-text-secondary">{label}</span>}
    </div>
  );
}
