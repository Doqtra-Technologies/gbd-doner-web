"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CTAButton } from "@/components/ui/cta-button";
import { LocationCard } from "@/components/location/location-card";
import type { Location } from "@/domain/location";

export function HomeLocationsSlider({ locations }: { locations: Location[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const container = sliderRef.current;
    if (!container) return;
    const overflow = container.scrollWidth > container.clientWidth + 1;
    setHasOverflow(overflow);
    if (!overflow) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    setCanScrollLeft(container.scrollLeft > 1);
    setCanScrollRight(container.scrollLeft < maxScrollLeft - 1);
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const container = sliderRef.current;
    if (!container) return;
    const offset = Math.round(container.clientWidth * 0.8);
    container.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
    requestAnimationFrame(updateScrollState);
  };

  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;
    updateScrollState();

    const handleResize = () => updateScrollState();
    window.addEventListener("resize", handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => updateScrollState());
      resizeObserver.observe(container);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, [locations.length, updateScrollState]);

  return (
    <Section size="standard">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading level={2}>Our Locations</Heading>
          <div className="flex items-center gap-4">
            <Eyebrow tone="primary" className="hidden sm:block">
              Est 2026 · London
            </Eyebrow>
            {hasOverflow && (
              <div className="flex items-center gap-2">
                <ScrollControl
                  direction="left"
                  onClick={() => scrollByAmount("left")}
                  disabled={!canScrollLeft}
                />
                <ScrollControl
                  direction="right"
                  onClick={() => scrollByAmount("right")}
                  disabled={!canScrollRight}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-label="Locations carousel"
            onScroll={updateScrollState}
          >
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="shrink-0 snap-start w-[78vw] sm:w-[44vw] lg:w-[32vw] xl:w-[360px]"
              >
                <LocationCard location={loc} size="compact" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <CTAButton variant="primary" size="md" href="/locations">
            View All
          </CTAButton>
        </div>
      </Container>
    </Section>
  );
}

function ScrollControl({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={`Scroll locations ${direction}`}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-canvas text-text-primary transition-all duration-300 ease-smooth hover:bg-accent hover:border-accent hover:text-text-inverse disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-canvas disabled:hover:border-border-strong disabled:hover:text-text-primary"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
