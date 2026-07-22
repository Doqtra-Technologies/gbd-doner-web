import type { Metadata } from "next";
import { EditorialArticlePage } from "@/components/feed/editorial-article";
import { whatMakesGreatBritishDonerDifferentArticle } from "@/data/content";

export const metadata: Metadata = {
  title: `${whatMakesGreatBritishDonerDifferentArticle.title} | GBD Doner Feed`,
  description: whatMakesGreatBritishDonerDifferentArticle.excerpt,
  alternates: {
    canonical: `/feed/${whatMakesGreatBritishDonerDifferentArticle.slug}`,
  },
};

export default function Page() {
  return <EditorialArticlePage article={whatMakesGreatBritishDonerDifferentArticle} />;
}
