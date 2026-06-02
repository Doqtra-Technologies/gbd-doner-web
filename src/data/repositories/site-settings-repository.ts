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
  eyebrow: "Catering",
  headingLines: ["Modern street food,", "made for everyday life"],
  lead:
    "Bold flavours, fast service, and a cleaner approach to doner. From quick lunch breaks to late-night cravings, Great British Doner delivers a modern fast-casual experience built around quality ingredients and everyday convenience. Whether you’re grabbing a wrap on the go or ordering in with friends, GBD brings together flavour, speed, and consistency in one seamless experience.",

  fieldNameLabel: "Full Name",
  fieldNamePlaceholder: "Enter your full name",
  fieldEmailLabel: "Email Address",
  fieldEmailPlaceholder: "jane@company.com",
  fieldCompanyLabel: "Company / Organisation",
  fieldCompanyPlaceholder: "Optional",
  fieldHeadcountLabel: "Estimated Guest Count",
  fieldHeadcountPlaceholder: "Select guest size",
  fieldMessageLabel: "Event Details & Requirements",
  fieldMessagePlaceholder:
    "Tell us more about your event, dietary preferences, vegan requirements, location, or anything else we should know.",

  submitLabel: "Submit Enquiry",
  submitLabelSending: "Sending…",

  statusIdle: "We’ll get back to you shortly.",
  statusSending: "Sending your brief…",
  statusSuccess: "Thanks — your enquiry is in. We’ll reply shortly.",
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
  headingLines: ["Why vegan doner is changing", "fast food in the UK."],
  lead:
    "The UK food scene is evolving — and vegan doner is becoming one of the biggest shifts in modern fast casual dining.",
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
