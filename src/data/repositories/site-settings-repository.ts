import { dataConfig } from "@/lib/config";
import { getGraphQLClient } from "@/data/graphql/client";
import { SITE_SETTINGS_QUERY } from "@/data/graphql/queries";
import type {
  CateringFormSettings,
  FeedPageSettings,
  LocationsPageSettings,
} from "@/domain/site-settings";

// ----------------------------------------------------------------------------
// Defaults — every string here matches what was hardcoded on the page before
// these settings existed. If WP is unreachable or a field is left blank, the
// site renders exactly as it always did.
// ----------------------------------------------------------------------------

export const CATERING_DEFAULTS: CateringFormSettings = {
  eyebrow: "05 — Enquiry",
  headingLines: ["Let's fuel", "your next", "event."],
  lead:
    "Tell us a little about your event. We'll come back with a tailored menu, pricing, and timings — within one working day.",

  fieldNameLabel: "Name",
  fieldNamePlaceholder: "Jane Smith",
  fieldEmailLabel: "Email",
  fieldEmailPlaceholder: "jane@company.com",
  fieldCompanyLabel: "Company",
  fieldCompanyPlaceholder: "Company Ltd.",
  fieldHeadcountLabel: "Headcount",
  fieldHeadcountPlaceholder: "e.g. 40",
  fieldMessageLabel: "Tell us about the event",
  fieldMessagePlaceholder: "Date, venue, vibe — anything that helps us plan.",

  submitLabel: "Send Brief",
  submitLabelSending: "Sending…",

  statusIdle: "We'll get back to you within one working day.",
  statusSending: "Sending your brief…",
  statusSuccess: "Thanks — your brief is in. We'll reply shortly.",
  statusError: "Something went wrong — please try again.",

  recipientEmail: null,
};

export const LOCATIONS_PAGE_DEFAULTS: LocationsPageSettings = {
  eyebrow: "Locations",
  heading: "Find your nearest branch for pickup or delivery.",
  emptyState: "No locations match your search.",
};

export const FEED_PAGE_DEFAULTS: FeedPageSettings = {
  eyebrow: "The Feed",
  headingLines: ["Words from", "the spit."],
  lead:
    "Nutrition deep-dives, store openings, and the people behind the brand.",
  emptyState: "More stories arriving soon.",
};

// ----------------------------------------------------------------------------
// Raw GraphQL response shape
// ----------------------------------------------------------------------------

interface RawSiteSettingsResponse {
  siteSettings: {
    catering: Partial<CateringFormSettings> | null;
    locations: Partial<LocationsPageSettings> | null;
    feed: Partial<FeedPageSettings> | null;
  } | null;
}

// ----------------------------------------------------------------------------
// Merge helpers — only override defaults with non-empty strings / arrays
// ----------------------------------------------------------------------------

function mergeStringFields<T>(
  defaults: T,
  raw: Partial<T> | null | undefined,
  arrayKeys: ReadonlyArray<keyof T> = [],
  nullableKeys: ReadonlyArray<keyof T> = [],
): T {
  const out = { ...defaults } as T;
  if (!raw) return out;

  const target = out as unknown as Record<string, unknown>;
  const source = raw as unknown as Record<string, unknown>;

  (Object.keys(defaults as object) as Array<keyof T>).forEach((key) => {
    const k = key as string;
    const value = source[k];

    if (arrayKeys.includes(key)) {
      if (Array.isArray(value) && value.length > 0) target[k] = value;
      return;
    }

    if (nullableKeys.includes(key)) {
      target[k] = value ?? null;
      return;
    }

    if (typeof value === "string" && value.trim().length > 0) target[k] = value;
  });

  return out;
}

// ----------------------------------------------------------------------------
// Single network call, three slices. Lazy-cached per request.
// ----------------------------------------------------------------------------

async function fetchAllSiteSettings(): Promise<RawSiteSettingsResponse["siteSettings"]> {
  if (dataConfig.useMocks) return null;
  try {
    const client = getGraphQLClient();
    const data = await client.request<RawSiteSettingsResponse>(SITE_SETTINGS_QUERY);
    return data.siteSettings ?? null;
  } catch {
    return null;
  }
}

export async function getCateringSettings(): Promise<CateringFormSettings> {
  const raw = await fetchAllSiteSettings();
  return mergeStringFields(
    CATERING_DEFAULTS,
    raw?.catering ?? null,
    ["headingLines"],
    ["recipientEmail"],
  );
}

export async function getLocationsPageSettings(): Promise<LocationsPageSettings> {
  const raw = await fetchAllSiteSettings();
  return mergeStringFields(LOCATIONS_PAGE_DEFAULTS, raw?.locations ?? null);
}

export async function getFeedPageSettings(): Promise<FeedPageSettings> {
  const raw = await fetchAllSiteSettings();
  return mergeStringFields(FEED_PAGE_DEFAULTS, raw?.feed ?? null, [
    "headingLines",
  ]);
}
