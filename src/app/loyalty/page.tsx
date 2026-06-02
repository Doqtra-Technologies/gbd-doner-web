import type { Metadata } from "next";
import { LoyaltyPage } from "@/components/loyalty/loyalty-page";

export const metadata: Metadata = {
  title: "Loyalty",
  description: "Real flavour, real people, and a loyalty-led GBD landing page.",
};

export default function LoyaltyRoute() {
  return <LoyaltyPage />;
}