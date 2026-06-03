import type { Metadata } from "next";
import { AlwaysOnTheMovePage } from "@/components/always-on-the-move/always-on-the-move-page";
import { getLocations } from "@/data/repositories/locations-repository";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Always On The Move",
  description:
    "Big flavour wherever the city takes you. Find your nearest Great British Doner location and order on the go.",
};

export default async function AlwaysOnTheMoveRoute() {
  const locations = await getLocations();

  return <AlwaysOnTheMovePage locations={locations} />;
}
