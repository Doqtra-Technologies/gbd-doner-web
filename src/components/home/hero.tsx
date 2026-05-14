"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 flex items-center px-6 sm:px-10 lg:pl-16 xl:pl-24 py-20 lg:py-32">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="inline-block font-display font-bold uppercase tracking-[0.22em] text-[11px] text-gbd-navy/60 mb-10"
            >
              Est. London · 2026
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="font-display font-bold uppercase tracking-tighter leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-gbd-navy"
            >
              British
              <br />
              Doner
              <br />
              Redefined.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="mt-10 max-w-md font-body text-base md:text-lg leading-relaxed text-gbd-navy/75"
            >
              Ethically sourced. Spit-fired. Built for the 90-second lunch and
              the 1AM craving. Honest food, raised to a higher bar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease }}
              className="mt-12 flex items-center gap-8"
            >
              <Link
                href="/locations"
                className="inline-flex h-14 items-center justify-center rounded-full bg-gbd-red px-10 font-display font-bold uppercase tracking-[0.14em] text-xs text-white transition-colors duration-300 hover:bg-gbd-navy"
              >
                Order Now
              </Link>
              <Link
                href="/menu"
                className="group inline-flex items-center gap-3 font-display font-bold uppercase tracking-[0.16em] text-xs text-gbd-navy"
              >
                <span className="relative">
                  See the Menu
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-gbd-navy origin-left scale-x-100 transition-transform duration-500 ease-smooth group-hover:scale-x-0" />
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-gbd-red origin-right scale-x-0 transition-transform duration-500 ease-smooth group-hover:origin-left group-hover:scale-x-100" />
                </span>
                <span aria-hidden className="transition-transform duration-500 ease-smooth group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease }}
          className="lg:col-span-7 relative min-h-[60vh] lg:min-h-[88vh] bg-white"
        >
          <Image
            src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=2000&q=85"
            alt="Spit-fired British doner plate"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />

          <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-gbd-red" />
            <span className="font-display font-bold uppercase tracking-[0.2em] text-[10px] text-white/90">
              Spit-Fired · Served Fast
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
