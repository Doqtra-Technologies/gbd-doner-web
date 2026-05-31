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
      data-theme="dark"
      className="relative w-full h-[100vh] min-h-screen flex items-center justify-center overflow-hidden bg-gbd-navy"
    >
      {/* ── Video stage ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.drift, ease: EASE.editorial }}
        style={{ y: videoY }}
        className="absolute inset-0 z-[1] will-change-transform"
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

      {/* ── Overlays (z-2: above the video, below the content) ───────── */}
      <div aria-hidden className="absolute inset-0 z-[2]">
        {/* 1 · Deep navy cinematic grade. */}
        <div className="absolute inset-0 bg-gbd-navy/55 mix-blend-multiply" />
        {/* 2 · Directional darkness — anchors text on the left, releases the
               food on the right. Lighter mid-tones on desktop. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A121C]/95 via-[#0F1E2D]/60 to-transparent md:via-[#0F1E2D]/35" />
        {/* 3 · Bottom lift — keeps the low-sitting mobile content readable. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A121C]/90 via-transparent to-transparent md:from-[#0F1E2D]/40" />
        {/* 4 · Vignette — soft cinematic fall-off at the edges. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 48% 45%, transparent 50%, rgba(10,18,28,0.55) 100%)",
          }}
        />
        {/* 5 · Film grain — fine, low-opacity, overlay-blended. */}
        <div
          className="absolute inset-0 opacity-[0.11] mix-blend-overlay"
          style={{ backgroundImage: GRAIN, backgroundSize: "200px 200px" }}
        />
      </div>

      {/* ── Content (z-20: above overlays) ───────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex w-full min-h-screen items-end md:items-center"
      >
        <div className="w-full pb-24 px-8 lg:px-24 md:pb-0">
          <div className="max-w-[620px]">
            {/* Micro-label */}
            <motion.div
              variants={rise}
              custom={0.25}
              initial="hidden"
              animate="show"
              className="flex items-center gap-3.5"
            >
              <span aria-hidden className="h-px w-9 bg-gbd-red" />
              <span className="font-display text-[10px] tracking-widest uppercase opacity-60 text-white">
                Spit-Fired · Served Fast
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="mt-8 font-campaign uppercase text-white text-[clamp(2.8rem,9.5vw,7.75rem)] text-balance tracking-tight">
              <motion.span
                variants={rise}
                custom={0.37}
                initial="hidden"
                animate="show"
                className="block"
              >
                More Meat
              </motion.span>

              <motion.span
                variants={rise}
                custom={0.62}
                initial="hidden"
                animate="show"
                className="block"
              >
                More Flavor
              </motion.span>

              <motion.span
                variants={rise}
                custom={0.78}
                initial="hidden"
                animate="show"
                className="relative inline-block w-max mt-2 lg:mt-4"
              >
                {/* The Text */}
                <span className="relative z-10 text-white">More Doner</span>
                
                {/* The Brush Stroke Behind the Text */}
                <motion.svg 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.05, duration: 0.6, ease: EASE.editorial }}
                  className="absolute left-[-5%] top-[10%] w-[110%] h-[90%] text-accent fill-current -z-10" 
                  viewBox="0 0 400 100" 
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M10,60 C40,40 100,30 200,35 C300,40 360,50 390,45 C395,44 395,75 390,80 C360,95 250,90 150,85 C50,80 15,85 10,75 C5,65 5,65 10,60 Z" 
                    opacity="0.9"
                    style={{
                      transform: "rotate(-2deg)",
                      transformOrigin: "center"
                    }}
                  />
                </motion.svg>
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
              <MagneticButton href="/order-now" reduceMotion={!!reduceMotion}>
                Choose Your Fuel
              </MagneticButton>

              {/* Secondary — glass morphism */}
              <Link
                href="/menu"
                className="group inline-flex h-14 w-full items-center justify-center rounded-full border border-white/20 bg-surface-inverse/50 px-10 font-display text-sm font-bold uppercase tracking-button text-white backdrop-blur-md transition-all duration-300 ease-smooth hover:bg-surface-inverse hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto"
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
        className="group inline-flex h-14 w-full items-center justify-center rounded-full border border-transparent bg-accent px-10 font-display text-sm font-bold uppercase tracking-button text-white transition-colors duration-300 ease-smooth hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto"
      >
        {children}
      </Link>
    </motion.div>
  );
}
