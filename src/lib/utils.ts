import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatGBP(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function sanitizeImageUrl(url: string | null | undefined): string {
  if (!url) return "";

  if (!url.startsWith("http")) return url;

  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL;
  if (!wpUrl) return url;

  try {
    const parsedWp = new URL(wpUrl);
    let credentials = "";
    if (parsedWp.username) {
      credentials = parsedWp.username;
      if (parsedWp.password) {
        credentials += `:${parsedWp.password}`;
      }
      credentials += "@";
    }
    const publicBase = `${parsedWp.protocol}//${credentials}${parsedWp.host}`;

    if (
      url.includes("gbd.local") ||
      url.includes("gbddoner.local") ||
      url.includes("localhost") ||
      url.includes("127.0.0.1")
    ) {
      const parsedImg = new URL(url);
      return `${publicBase}${parsedImg.pathname}${parsedImg.search}`;
    }
  } catch {
    // Ignore parsing errors and return original URL
  }

  return url;
}
