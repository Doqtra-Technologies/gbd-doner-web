import Image from "next/image";

export interface MenuCardProps {
  title: string;
  price: string | number;
  description: string;
  imageUrl: string;
}

export function MenuCard({ title, price, description, imageUrl }: MenuCardProps) {
  const displayPrice = typeof price === "number" ? `£${price.toFixed(2)}` : price;

  return (
    <article className="flex w-full flex-col bg-transparent">
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="rounded-none object-cover"
        />
      </div>

      <div className="mt-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-bold uppercase text-[#0F1E2D] md:text-xl">
            {title}
          </h3>
          <span className="font-display text-lg font-bold text-[#0F1E2D]">
            {displayPrice}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 font-body text-sm text-[#0F1E2D] opacity-80">
          {description}
        </p>

        <button
          type="button"
          className="mt-6 w-full rounded-full border border-[#0F1E2D] bg-transparent py-3 font-display text-sm font-semibold uppercase tracking-widest text-[#0F1E2D] transition-all duration-300 hover:border-[#C94035] hover:bg-[#C94035] hover:text-white"
        >
          Add to Order
        </button>
      </div>
    </article>
  );
}
