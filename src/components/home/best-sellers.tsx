"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { CTAButton } from "@/components/ui/cta-button";
import { ProductCard } from "@/components/product/product-card";
import { formatGBP } from "@/lib/utils";
import { EASE } from "@/brand/motion";
import type { MenuItem } from "@/domain/menu-item";

export function BestSellers({ items }: { items: MenuItem[] }) {
  return (
    <Section size="standard">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16">
          <div className="lg:col-span-7">
            <Eyebrow tone="accent" className="block mb-6">
              The Lineup
            </Eyebrow>
            <Heading level={2}>
              Salad Bowls
              <br />
              <span className="text-text-disabled">&amp;</span> Power Plates.
            </Heading>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="font-body text-base md:text-lg leading-relaxed text-text-secondary">
              Real ingredients. Real protein. Built for runners, builders, and
              everyone in between.
            </p>
            <CTAButton variant="tertiary" href="/menu" className="mt-8">
              Full Menu
            </CTAButton>
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE.out }}
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
