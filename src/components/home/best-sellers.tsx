"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { CTAButton } from "@/components/ui/cta-button";
import { Numeral } from "@/components/ui/numeral";
import { ProductCard } from "@/components/product/product-card";
import { formatGBP } from "@/lib/utils";
import { DUR, EASE } from "@/brand/motion";
import type { MenuItem } from "@/domain/menu-item";

export function BestSellers({ items }: { items: MenuItem[] }) {
  return (
    <Section size="standard">
      <Container>
        {/* Editorial header — type column 7/12, blurb 4/12, indented to 9/12.
            Numeral marker stamps the section like a chapter opening. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-20">
          <div className="lg:col-span-7">
            <Numeral index="02" label="The Lineup" className="mb-8" />
            <Heading level={2}>
              <span className="block">Salad Bowls</span>
              <span className="block pl-[8%]">
                <span className="text-text-disabled">&amp;</span> Power Plates
                <span className="text-accent">.</span>
              </span>
            </Heading>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="font-body text-base md:text-lg leading-relaxed text-text-secondary">
              Real ingredients. Real protein. Built for runners, builders,
              and everyone in between.
            </p>
            <CTAButton variant="tertiary" href="/menu" className="mt-10">
              Full Menu
            </CTAButton>
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: DUR.reveal,
                delay: i * 0.08,
                ease: EASE.editorial,
              }}
            >
              <ProductCard
                variant="hero"
                title={item.title}
                price={formatGBP(item.priceGBP)}
                description={item.description}
                imageUrl={item.imageUrl}
                href="/menu"
                nutrition={item.nutrition}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
