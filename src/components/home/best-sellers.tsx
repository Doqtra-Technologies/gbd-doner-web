"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DUR, EASE } from "@/brand/motion";

/**
 * BestSellers — showcase of our best-selling items.
 *
 * Uses static images from public/best-sellers folder with simple layout.
 */
export function BestSellers() {
  const items = [
    { id: 1, src: "/best-sellers/1.png", alt: "Best Seller 1" },
    { id: 2, src: "/best-sellers/2.png", alt: "Best Seller 2" },
    { id: 3, src: "/best-sellers/3.png", alt: "Best Seller 3" },
  ];

  return (
    <section className="w-full max-w-none bg-canvas">
      {/* Header row */}
      <div className="grid grid-cols-12 border-y border-border-hairline">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR.reveal, ease: EASE.editorial }}
          className="col-span-12 md:col-span-8 md:border-r md:border-border-hairline p-6 sm:p-8 lg:p-12"
        >
          <span className="block font-display font-bold uppercase tracking-eyebrow text-[11px] text-accent">
            02 — The Lineup
          </span>
          <h2 className="mt-6 font-display font-bold uppercase tracking-display leading-none text-text-primary text-3xl lg:text-4xl">
            <span className="block">Our Best</span>
            <span className="block">
              Sellers<span className="text-accent">.</span>
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: DUR.reveal,
            delay: 0.1,
            ease: EASE.editorial,
          }}
          className="col-span-12 md:col-span-4 p-6 sm:p-8 lg:p-12 flex flex-col justify-between gap-8"
        >
          <p className="font-body text-sm md:text-base leading-relaxed text-text-secondary opacity-80 max-w-md">
            Real ingredients. Real protein. Built for runners, builders,
            and everyone in between.
          </p>
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 w-max font-display font-bold uppercase tracking-button text-xs text-text-primary border-b border-border-strong pb-1 transition-colors duration-300 ease-smooth hover:text-accent hover:border-accent"
          >
            Full Menu
            <span
              aria-hidden
              className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Product grid */}
      <div className="w-full flex justify-center border-b border-border-hairline">
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 p-6 sm:p-8 lg:p-12 place-items-center">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: DUR.reveal,
                delay: i * 0.08,
                ease: EASE.editorial,
              }}
              className="w-full"
            >
              <Link href="/menu" aria-label={item.alt} className="block w-full">
                <div className="relative overflow-hidden rounded-lg border-2 border-border-strong w-full h-64 sm:h-72 md:h-80">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover [filter:contrast(1.04)_saturate(1.06)_brightness(0.99)] transition-transform duration-[1100ms] ease-smooth hover:scale-[1.02]"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
