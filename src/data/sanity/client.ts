import { createClient } from "next-sanity";
import { dataConfig } from "@/lib/config";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j2iu1u4e";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  fetch: {
    next: {
      revalidate: dataConfig.revalidateSeconds,
    },
  },
});
