import type { Metadata } from "next";
import { EditorialArticlePage } from "@/components/feed/editorial-article";
import { whyMorePeopleChoosingVeganDonerArticle } from "@/data/content";

export const metadata: Metadata = {
  title: `${whyMorePeopleChoosingVeganDonerArticle.title} | GBD Doner Feed`,
  description: whyMorePeopleChoosingVeganDonerArticle.excerpt,
  alternates: {
    canonical: `/feed/${whyMorePeopleChoosingVeganDonerArticle.slug}`,
  },
};

export default function Page() {
  return <EditorialArticlePage article={whyMorePeopleChoosingVeganDonerArticle} />;
}
