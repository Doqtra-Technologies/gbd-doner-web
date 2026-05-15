import { ProductCard } from "@/components/product/product-card";

export interface MenuCardProps {
  title: string;
  price: string | number;
  description: string;
  imageUrl: string;
}

/**
 * Thin wrapper kept for backwards-compatibility. New code should use
 * <ProductCard variant="compact" /> directly.
 */
export function MenuCard({ title, price, description, imageUrl }: MenuCardProps) {
  const displayPrice =
    typeof price === "number" ? `£${price.toFixed(2)}` : price;

  return (
    <ProductCard
      variant="compact"
      title={title}
      price={displayPrice}
      description={description}
      imageUrl={imageUrl}
    />
  );
}
