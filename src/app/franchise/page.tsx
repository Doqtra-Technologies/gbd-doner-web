import type { Metadata } from "next";
import Image from "next/image";
import { FranchiseForm } from "@/components/franchise/franchise-form";

export const metadata: Metadata = {
  title: "Franchise | Levent Börek",
  description: "Join our story. Franchise opportunities available with Levent Börek.",
};

export default function FranchisePage() {
  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row bg-white text-text-primary">
      {/* Left Column: Visual Banner */}
      <section className="relative lg:sticky lg:top-0 lg:h-screen w-full lg:w-1/2 flex-none h-[45vh] sm:h-[55vh] overflow-hidden group">
        {/* Banner image with smooth transition */}
        <Image
          src="/banner/location.jpeg"
          alt="Levent Börek Franchise Banner"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-[1500ms] ease-smooth group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />

        {/* Brand Text Overlay */}
        <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 lg:bottom-16 lg:left-16 z-10 flex flex-col gap-4 text-white">
          <h1 className="font-campaign font-bold tracking-display leading-[0.9] text-5xl sm:text-6xl xl:text-7xl uppercase text-white">
            GBD<br />
            Franchise
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-white/90 mt-1">
            Join our story
          </p>
        </div>
      </section>

      {/* Right Column: Enquiry Form */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center bg-white px-6 py-12 sm:px-12 lg:px-16 xl:px-20 lg:h-screen lg:overflow-y-auto pt-24 lg:pt-32 pb-16">
        <div className="mx-auto w-full max-w-xl">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-text-primary sm:text-3xl">
              Franchise Opportunities
            </h2>
            <p className="font-body text-sm text-text-secondary mt-2 leading-relaxed">
              Partner with one of the most successful food networks. Fill out the application form below to request detailed franchise information, and our expansion team will get in touch with you.
            </p>
          </div>

          <FranchiseForm />
        </div>
      </section>
    </main>
  );
}
