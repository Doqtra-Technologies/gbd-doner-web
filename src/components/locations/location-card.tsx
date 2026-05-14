"use client";

import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Location } from "@/domain/location";

const PROVIDER_LABEL: Record<string, string> = {
  deliveroo: "Deliveroo",
  ubereats: "Uber Eats",
  justeat: "Just Eat",
};

export function LocationCard({
  location,
  active,
  onSelect,
}: {
  location: Location;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      onClick={onSelect}
      className={cn(
        "p-6 border-l-4 cursor-pointer transition-colors duration-300",
        active
          ? "border-gbd-red bg-gbd-cream/60"
          : "border-transparent hover:bg-gbd-cream/40",
      )}
    >
      <h3 className="font-display font-bold uppercase tracking-display text-xl text-gbd-navy">
        {location.name}
      </h3>
      <div className="mt-2 body-base text-gbd-navy/75">
        {location.addressLine1}
        {location.addressLine2 ? `, ${location.addressLine2}` : ""}, {location.city}{" "}
        {location.postcode}
      </div>
      {location.phone && (
        <div className="mt-1 body-base text-gbd-navy/60">{location.phone}</div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {location.clickAndCollectUrl && (
          <ButtonLink
            href={location.clickAndCollectUrl}
            external
            variant="primary"
            size="md"
          >
            Click + Collect
          </ButtonLink>
        )}
        {location.deliveryLinks.map((d) => (
          <ButtonLink
            key={d.provider}
            href={d.url}
            external
            variant="ghost"
            size="md"
          >
            {PROVIDER_LABEL[d.provider] ?? d.provider}
          </ButtonLink>
        ))}
      </div>

      {active && location.hours.length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          {location.hours.map((h) => (
            <div key={h.day} className="flex justify-between text-gbd-navy/70">
              <dt className="font-display font-bold uppercase tracking-[0.12em] text-xs">
                {h.day}
              </dt>
              <dd>
                {h.open}–{h.close}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
