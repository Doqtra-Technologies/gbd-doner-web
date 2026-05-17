import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Ethical sourcing, urban kineticism, and the British doner reframe. The story behind GBD.",
};

/**
 * Our Story — Architectural Editorial Manifesto.
 *
 * Three locked blocks, edge-to-edge, divided by 1px hairlines:
 *
 *   1. StoryHero        — 12-col split, type 7 / image 5
 *   2. StoryLedgerRows  — full-width horizontal rows for sourcing + kineticism
 *   3. StoryDataMatrix  — 3-col stat grid with absolute-positioned labels
 *
 * No Container, no centered shells, no floating islands. Every section
 * physically connects to the viewport edges and to the section above
 * and below it via hairlines.
 */
export default function OurStoryPage() {
  return (
    <article className="w-full bg-canvas">
      <StoryHero />
      <StoryLedgerRows />
      <StoryDataMatrix />
    </article>
  );
}

function StoryHero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-border-hairline lg:min-h-[80vh]">
      {/* Type column — 7/12 with right-side centerline */}
      <div className="lg:col-span-7 lg:border-r lg:border-border-hairline flex flex-col justify-between p-8 sm:p-12 lg:p-16 gap-12 min-h-[55vh] lg:min-h-[80vh]">
        <span className="font-body uppercase tracking-eyebrow text-xs text-accent">
          01 — Britain
        </span>

        <h1 className="font-display font-bold uppercase tracking-display leading-[0.85] text-text-primary text-4xl md:text-5xl lg:text-[3.5rem] max-w-[14ch]">
          <span className="block">A doner that</span>
          <span className="block">earns its place</span>
          <span className="block">
            in the city<span className="text-accent">.</span>
          </span>
        </h1>

        <p className="font-body text-base md:text-lg leading-relaxed text-text-secondary max-w-md">
          We started GBD because the British high-street doner deserved
          better — better sourcing, better food, better design. Same
          speed, none of the apologies.
        </p>
      </div>

      {/* Image column — 5/12, zero padding, full-bleed */}
      <div className="lg:col-span-5 relative min-h-[50vh] lg:min-h-[80vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1800&q=85"
          alt="The GBD kitchen — friends sharing food at the counter"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.98)]"
        />
      </div>
    </section>
  );
}

function StoryLedgerRows() {
  const rows: Array<{
    index: string;
    heading: string;
    description: string;
  }> = [
    {
      index: "02",
      heading: "From farm to spit, on the record.",
      description:
        "British chicken from Red Tractor-assured farms. Grass-fed lamb from a co-operative we name in-store. No mystery meat, no fillers — and a sourcing page we update quarterly. Honest food, traceable to source, because that's what 'British doner' should mean.",
    },
    {
      index: "03",
      heading: "Designed for motion.",
      description:
        "Our stores are built around the 90-second lunch queue and the late-night flow. Open kitchens, fast lines, no fluorescent panic — just rhythm. The architecture matches the food: confident, quick, alive. Urban kineticism, applied to plates.",
    },
  ];

  return (
    <section className="w-full">
      {rows.map((row) => (
        <div
          key={row.index}
          className="grid grid-cols-1 lg:grid-cols-12 border-b border-border-hairline"
        >
          {/* Section heading — col-span-5 */}
          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col gap-6 lg:border-r lg:border-border-hairline">
            <span className="font-body uppercase tracking-eyebrow text-xs text-accent">
              {row.index} — {row.heading.includes("farm") ? "Sourcing" : "Kineticism"}
            </span>
            <h2 className="font-display font-bold uppercase tracking-display leading-[0.9] text-text-primary text-3xl md:text-4xl lg:text-[2.5rem] max-w-[12ch]">
              {row.heading.replace(/\.$/, "")}
              <span className="text-accent">.</span>
            </h2>
          </div>

          {/* Body — col-span-7 */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16">
            <p className="font-body text-base md:text-lg leading-relaxed text-text-secondary max-w-2xl">
              {row.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

function StoryDataMatrix() {
  const stats: Array<{ number: string; label: string }> = [
    { number: "100%", label: "British-sourced meat" },
    { number: "<90s", label: "From order to plate" },
    { number: "0", label: "Artificial fillers" },
  ];

  return (
    <section className="w-full border-b border-border-hairline">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={
              "relative min-h-[280px] md:min-h-[320px] p-8 flex items-center justify-center " +
              (i < stats.length - 1
                ? "border-b md:border-b-0 md:border-r border-border-hairline"
                : "")
            }
          >
            <span className="font-display font-bold tracking-display leading-none text-accent text-6xl md:text-7xl lg:text-8xl">
              {stat.number}
            </span>
            <span
              className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 font-display font-bold uppercase tracking-eyebrow text-[11px] text-text-secondary max-w-[14ch]"
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
