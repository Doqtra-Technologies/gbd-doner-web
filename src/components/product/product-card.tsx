import Link from "next/link";
import { CTAButton } from "@/components/ui/cta-button";
import { Heading } from "@/components/ui/heading";
import { ImageBlock } from "@/components/ui/image-block";
import { cn } from "@/lib/utils";

/**
 * Canonical product card.
 *
 * Variants:
 *   hero    — surfaced on the homepage. Tappable image, no CTA button.
 *             Optional nutrition row.
 *   compact — surfaced on the menu page. Image + title/price + description
 *             + "Add to Order" CTA. No nutrition.
 *
 * Both variants share image ratio (4/5), typography, type colour intent,
 * and spacing. They diverge only on affordances appropriate to context.
 */
export interface NutritionFacts {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface ProductCardProps {
  title: string;
  price: string;
  description?: string;
  imageUrl: string;
  href?: string;
  variant?: "hero" | "compact";
  nutrition?: NutritionFacts | null;
  className?: string;
}

export function ProductCard({
  title,
  price,
  description,
  imageUrl,
  href,
  variant = "compact",
  nutrition,
  className,
}: ProductCardProps) {
  const imageNode = (
    <ImageBlock
      ratio="4/5"
      hoverZoom={variant === "hero"}
      src={imageUrl}
      alt={title}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    />
  );

  return (
    <article className={cn("group flex w-full flex-col", className)}>
      {href ? (
        <Link href={href} aria-label={title} className="block">
          {imageNode}
        </Link>
      ) : (
        imageNode
      )}

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-4">
          <Heading
            level={3}
            className="text-lg md:text-xl tracking-display"
          >
            {title}
          </Heading>
          <span className="font-display font-bold text-lg text-text-primary">
            {price}
          </span>
        </div>

        {description && (
          <p className="mt-2 line-clamp-2 font-body text-sm text-text-secondary">
            {description}
          </p>
        )}

        {variant === "hero" && nutrition && (
          <NutritionRow nutrition={nutrition} />
        )}

        {variant === "compact" && (
          <CTAButton variant="primary" size="md" className="mt-6 w-full">
            Add to Order
          </CTAButton>
        )}
      </div>
    </article>
  );
}

function NutritionRow({ nutrition }: { nutrition: NutritionFacts }) {
  const cells: Array<{ label: string; value: string }> = [
    { label: "Cal", value: `${nutrition.calories}` },
    { label: "Protein", value: `${nutrition.protein}g` },
    { label: "Carbs", value: `${nutrition.carbs}g` },
    { label: "Fat", value: `${nutrition.fat}g` },
  ];
  return (
    <dl className="mt-5 grid grid-cols-4 border-t border-border-hairline">
      {cells.map((c, i) => (
        <div
          key={c.label}
          className={cn(
            "flex flex-col items-start py-3",
            i > 0 && "border-l border-border-hairline pl-3",
          )}
        >
          <dt className="font-display font-bold uppercase tracking-eyebrow text-[11px] text-text-disabled">
            {c.label}
          </dt>
          <dd className="mt-1 font-display font-bold text-xs text-text-primary">
            {c.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
