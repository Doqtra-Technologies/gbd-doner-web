"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { JsonLd } from "@/components/ui/json-ld";

export function BreadcrumbSchema() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;

  const pathSegments = pathname.split("/").filter(Boolean);
  
  const itemListElement = pathSegments.map((segment, index) => {
    const url = `${siteConfig.url}/${pathSegments.slice(0, index + 1).join("/")}`;
    const name = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      "@type": "ListItem",
      position: index + 1,
      name,
      item: url,
    };
  });

  // Always prepend Home
  itemListElement.unshift({
    "@type": "ListItem",
    position: 0,
    name: "Home",
    item: siteConfig.url,
  });

  // Fix positions (1-indexed)
  const adjustedItemList = itemListElement.map((item, idx) => ({
    ...item,
    position: idx + 1,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: adjustedItemList,
  };

  return <JsonLd data={schema} />;
}
