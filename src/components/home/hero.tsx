"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { DUR, EASE } from "@/brand/motion";

/**
 * Hero — fullscreen cinematic video stage for the homepage.
 *
 * A high-budget campaign frame rather than a restaurant header:
 *   • 100svh video background with a navy cinematic colour grade.
 *   • Four stacked overlays — navy wash, left→right readability gradient,
 *     edge vignette, fine film grain — for drama, depth and legibility.
 *   • Editorial left composition with luxury left padding, capped ~720px.
 *   • Anton campaign type. "MORE FLAVOR" rides over an animated, textured
 *     GBD-red brush stroke (paint swipe wipes in, then the word settles).
 *   • Staggered fade-up reveal + restrained scroll parallax + a magnetic
 *     primary CTA. All motion respects prefers-reduced-motion.
 *
 * Palette is strictly brand: white #FFFFFF, navy #0F1E2D, red #C94035.
 * Buttons are bespoke to the hero (solid red + glass) and intentionally
 * diverge from the global CTAButton system, which is tuned for light
 * surfaces.
 */

const RED = "#C94035";

// Fine film grain, generated inline so it ships without an asset request.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax: the video drifts down, content lifts and fades
  // as the next section rises into view. Disabled under reduced-motion.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-9%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, reduceMotion ? 1 : 0]);

  // Single rise primitive — each element passes its own delay via `custom`
  // so the headline reads as one controlled, cinematic sequence.
  const rise: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    show: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: DUR.slow, ease: EASE.editorial, delay: reduceMotion ? 0 : delay },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] overflow-hidden -mt-20 bg-gbd-navy"
    >
      {/* ── Video stage ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.drift, ease: EASE.editorial }}
        style={{ y: videoY }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.div
          initial={{ scale: reduceMotion ? 1 : 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4, ease: EASE.editorial }}
          className="absolute inset-0 -top-[7%] h-[114%]"
        >
          <video
            src="/banner/0515(3).mp4"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover [filter:contrast(1.06)_saturate(1.08)_brightness(0.78)]"
          />
        </motion.div>
      </motion.div>

      {/* ── Overlays ────────────────────────────────────────────────── */}
      {/* 1 · Deep navy cinematic grade. */}
      <div aria-hidden className="absolute inset-0 bg-gbd-navy/55 mix-blend-multiply" />
      {/* 2 · Directional darkness — anchors text on the left, releases the
             food on the right. Lighter mid-tones on desktop. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#0A121C]/95 via-[#0F1E2D]/60 to-transparent md:via-[#0F1E2D]/35"
      />
      {/* 3 · Bottom lift — keeps the low-sitting mobile content readable. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#0A121C]/90 via-transparent to-transparent md:from-[#0F1E2D]/40"
      />
      {/* 4 · Vignette — soft cinematic fall-off at the edges. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 48% 45%, transparent 50%, rgba(10,18,28,0.55) 100%)",
        }}
      />
      {/* 5 · Film grain — fine, low-opacity, overlay-blended. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.11] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
      />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex min-h-[100svh] items-end md:items-center"
      >
        <div
          className="w-full pb-24 pr-6 md:pb-0"
          style={{ paddingLeft: "clamp(32px, 6vw, 120px)", paddingRight: "clamp(24px, 5vw, 80px)" }}
        >
          <div className="max-w-[720px]">
            {/* Micro-label */}
            <motion.div
              variants={rise}
              custom={0.25}
              initial="hidden"
              animate="show"
              className="flex items-center gap-3.5"
            >
              <span aria-hidden className="h-px w-9 bg-gbd-red" />
              <span className="font-display text-[11px] font-medium uppercase tracking-[0.34em] text-white/75">
                Spit-Fired · Served Fast
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="mt-6 font-campaign uppercase text-white text-[clamp(3.25rem,11vw,9rem)]"
              style={{ lineHeight: 0.9, letterSpacing: "-0.04em" }}
            >
              <motion.span
                variants={rise}
                custom={0.37}
                initial="hidden"
                animate="show"
                className="block"
              >
                More Meat
              </motion.span>

              {/* Brush-highlighted line: paint wipes in, then the word rises. */}
              <span className="relative block">
                <BrushStroke reduceMotion={!!reduceMotion} />
                <motion.span
                  variants={rise}
                  custom={0.62}
                  initial="hidden"
                  animate="show"
                  className="relative z-10 block"
                >
                  More Flavor
                </motion.span>
              </span>

              <motion.span
                variants={rise}
                custom={0.78}
                initial="hidden"
                animate="show"
                className="block"
              >
                More Doner
              </motion.span>
            </h1>

            {/* Supporting line */}
            <motion.p
              variants={rise}
              custom={0.98}
              initial="hidden"
              animate="show"
              className="mt-7 max-w-md font-body text-base leading-relaxed text-white/70 sm:text-lg"
            >
              British doner engineered for bold cravings.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={rise}
              custom={1.12}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              {/* Primary — solid red, magnetic, soft glow */}
              <MagneticButton href="/locations" reduceMotion={!!reduceMotion}>
                Choose Your Fuel
              </MagneticButton>

              {/* Secondary — glass morphism */}
              <Link
                href="/menu"
                className="group inline-flex h-14 w-full items-center justify-center rounded-full border border-white/25 bg-white/[0.06] px-10 font-display text-sm font-bold uppercase tracking-button text-white backdrop-blur-md transition-all duration-[420ms] ease-smooth hover:border-white/55 hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1E2D] sm:w-auto"
              >
                View Menu
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue — minimal, desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: reduceMotion ? 0.6 : 1 }}
        transition={{ delay: 1.4, duration: DUR.standard, ease: EASE.editorial }}
        style={{ opacity: contentOpacity }}
        className="pointer-events-none absolute bottom-8 right-8 z-10 hidden items-center gap-3 md:flex"
      >
        <span className="font-display text-[10px] font-medium uppercase tracking-[0.3em] text-white/55">
          Scroll
        </span>
        <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-white/20">
          {!reduceMotion && (
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-white/80"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.4 }}
            />
          )}
        </span>
      </motion.div>
    </section>
  );
}

/**
 * BrushStroke — an organic GBD-red paint swipe behind "MORE FLAVOR".
 *
 * The shape is a hand-drawn-style path roughened by an SVG turbulence +
 * displacement filter (imperfect, semi-organic edges) with a faint grain
 * overlay for paint texture. It is angled slightly and wipes on left→right
 * via an animated clip-path before the word settles above it.
 */
function BrushStroke({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.span
      aria-hidden
      initial={{ clipPath: reduceMotion ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
      animate={{ clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE.editorial, delay: reduceMotion ? 0 : 0.5 }}
      className="pointer-events-none absolute left-[-5%] right-[-5%] top-[10%] bottom-[6%] z-0"
      style={{ rotate: -2.5 }}
    >
      <svg
        viewBox="0 0 640 180"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <filter id="gbd-brush-rough" x="-12%" y="-45%" width="124%" height="190%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.014 0.028"
              numOctaves="2"
              seed="11"
              result="t"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="t"
              scale="26"
              xChannelSelector="R"
              yChannelSelector="G"
              result="d"
            />
            <feGaussianBlur in="d" stdDeviation="0.7" />
          </filter>
          <filter id="gbd-brush-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="4" result="n" />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0"
            />
          </filter>
          <clipPath id="gbd-brush-clip">
            <path d="M14,110 C72,84 152,74 252,79 C362,84 482,66 612,84 C630,86 632,150 612,151 C470,156 330,168 210,155 C120,146 60,150 22,141 C6,137 2,120 14,110 Z" />
          </clipPath>
        </defs>
        <g filter="url(#gbd-brush-rough)">
          <path
            d="M14,110 C72,84 152,74 252,79 C362,84 482,66 612,84 C630,86 632,150 612,151 C470,156 330,168 210,155 C120,146 60,150 22,141 C6,137 2,120 14,110 Z"
            fill={RED}
          />
          {/* Paint texture — dark specks clipped to the swipe silhouette. */}
          <g clipPath="url(#gbd-brush-clip)" style={{ mixBlendMode: "multiply" }}>
            <rect width="640" height="180" filter="url(#gbd-brush-grain)" opacity="0.3" />
          </g>
        </g>
      </svg>
    </motion.span>
  );
}

/**
 * MagneticButton — solid-red primary CTA that eases toward the cursor on
 * hover (spring-damped) and carries a soft red glow. Magnetism and glow are
 * inert under reduced-motion / on touch (no hover).
 */
function MagneticButton({
  href,
  children,
  reduceMotion,
}: {
  href: string;
  children: ReactNode;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.3 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.45);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="w-full sm:w-auto"
    >
      <Link
        href={href}
        className="group relative inline-flex h-14 w-full items-center justify-center rounded-full bg-gbd-red px-10 font-display text-sm font-bold uppercase tracking-button text-white shadow-[0_10px_40px_-8px_rgba(201,64,53,0.65)] transition-all duration-[420ms] ease-smooth hover:brightness-110 hover:shadow-[0_16px_55px_-8px_rgba(201,64,53,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1E2D] sm:w-auto"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-gbd-red/40 blur-xl transition-opacity duration-[420ms] ease-smooth group-hover:opacity-70"
        />
        <span className="relative">{children}</span>
      </Link>
    </motion.div>
  );
}
