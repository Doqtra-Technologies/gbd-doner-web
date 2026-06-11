import { dataConfig } from "@/lib/config";
import { getGraphQLClient } from "@/data/graphql/client";
import { SITE_SETTINGS_QUERY } from "@/data/graphql/queries";
import type {
  CateringFormSettings,
  FeedPageSettings,
  LocationsPageSettings,
  HomePageSettings,
  OurStoryPageSettings,
  GlobalSettings,
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

export const HOME_DEFAULTS: HomePageSettings = {
  heroVideoUrl: "/banner/0515(3).mp4",
  heroTitleLine1: "More Meat",
  heroTitleLine2: "More Flavor",
  heroTitleLine3: "More Doner",
  heroLead: "British doner engineered for bold cravings.",
  cravingsEyebrow: "02 — Cravings",
  cravingsHeadingLine1: "Made For Every",
  cravingsHeadingLine2: "Craving",
  cravingsCard1: {
    label: "GBD Favorites",
    title: "Signature Wraps",
    desc: "Stacked with bold flavor and spit-fired perfection.",
    imageUrl: "/craving/roll.png",
  },
  cravingsCard2: {
    label: "Refresh",
    title: "Fuel in Every Sip",
    desc: "Freshly poured perfection.",
    imageUrl: "/craving/juice.png",
  },
};

export const STORY_DEFAULTS: OurStoryPageSettings = {
  heroImageUrl: "/Story/our story banner.png",
  heroEyebrow: "OUR STORY",
  heroTitleLine1: "A NEW GENERATION",
  heroTitleLine2: "OF DONER",
  heroSubheading: "Adapting traditional shish doner culture to the speed, aesthetics and lifestyle of modern Britain.",
  philosophyEyebrow: "Our Philosophy",
  philosophyHeadingLine1: "Real Food.",
  philosophyHeadingLine2: "Real Standards.",
  philosophyLeadParagraph: "At GBD, every detail matters.\n\nWe use authentic shish doner.\nWe invest heavily in product development.\nWe place technology at the centre of our operations.\nAnd we see design not just as aesthetics, but as part of the customer experience itself.",
  philosophySecondaryText: "Our approach is built around consistency, quality, and modern hospitality.\nWe stay connected to our roots, but we don’t believe tradition should stand still.\nTo us, tradition should evolve while being preserved.\nBy developing one of Britain’s first vegan shish doner concepts, we’ve also helped introduce doner culture to new generations and changing consumer habits.\nToday, our stores maintain an average Google rating of 4.9 out of 5 — something we see as a reflection of the standards and experience we aim to deliver every single day.",
  philosophyTags: "British Kebab Awards · PETA Approved",
  philosophyImage1Url: "/Story/2.png",
  philosophyImage2Url: "/Story/3.png",
  philosophyStatValue: "4.9★",
  philosophyStatLabel: "Average Google rating across our stores",
  philosophyTagLabel: "The GBD Standard",
  blueprintEyebrow: "The Blueprint",
  blueprintHeading: "The GBD Blueprint",
  blueprintDesc: "How tradition is engineered into a modern food experience — where every single detail matters.",
  blueprintPt1: {
    eyebrow: "01 — Sourced",
    title: "Authentic Shish Doner",
    desc: "We use authentic shish doner and invest heavily in product development — staying connected to our roots while letting tradition evolve rather than stand still.",
    imageUrl: "/Story/4.png",
    watermark: null,
  },
  blueprintPt2: {
    eyebrow: "02 — Craft",
    title: "Vegan Pioneers",
    desc: "By developing one of Britain’s first vegan shish doner concepts, we’ve introduced doner culture to new generations and changing consumer habits — without compromising on flavour.",
    imageUrl: null,
    watermark: "VG",
  },
  blueprintPt3: {
    eyebrow: "03 — Modern",
    title: "Design & Technology",
    desc: "We place technology at the centre of our operations and treat design not as decoration, but as part of the customer experience itself.",
    imageUrl: "/Story/5.png",
    watermark: null,
  },
  communityEyebrow: "The Community Effect",
  communityHeading: "As seen In",
  communityDesc: "Building the future of modern street food culture.",
  recognitionItems: [
    {
      imageUrl: "/Story/MANCH.png",
      label: "Manchester Evening News",
      copy: "Featured by The Sun and on the BBC discussing doner culture.",
      link: "https://www.manchestereveningnews.co.uk/whats-on/food-drink-news/kebab-shop-named-one-uks-33661572",
    },
    {
      imageUrl: "/Story/6.png",
      label: " the SUN",
      copy: "Featured in The Sun's top 10 kebabs in the UK.",
      link: "",
    },
    {
      imageUrl: "/Story/BBC.png",
      label: "BBC",
      copy: "Viral content and a community across Manchester and Liverpool.",
      link: "https://www.facebook.com/watch/?v=799008026563619",
    },
  ],
};

export const GLOBAL_DEFAULTS: GlobalSettings = {
  contactEmail: "info@gbddoner.com",
  copyright: "© Great British Doner. All Rights Reserved 2026.",
  socialInstagram: "https://www.instagram.com/greatbritishdoner/",
  socialTiktok: "https://www.tiktok.com/@greatbritishdoner",
  socialFacebook: "https://www.facebook.com/p/Great-British-Doner-61580394281827/",
  newsletterHeading: "JOIN THE GBD COMMUNITY",
  newsletterSubtext: "Enter your email address to receive updates, exclusive offers, new launches, and latest news from Great British Doner.",
};

// ----------------------------------------------------------------------------
// Raw GraphQL response shape
// ----------------------------------------------------------------------------

interface RawSiteSettingsResponse {
  siteSettings: {
    catering: Partial<CateringFormSettings> | null;
    locations: Partial<LocationsPageSettings> | null;
    feed: Partial<FeedPageSettings> | null;
    home: Partial<HomePageSettings> | null;
    ourStory: Partial<OurStoryPageSettings> | null;
    global: Partial<GlobalSettings> | null;
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

function mergeHomeFields(defaults: HomePageSettings, raw: Partial<HomePageSettings> | null | undefined): HomePageSettings {
  const out = { ...defaults };
  if (!raw) return out;

  if (raw.heroVideoUrl) out.heroVideoUrl = raw.heroVideoUrl;
  if (raw.heroTitleLine1) out.heroTitleLine1 = raw.heroTitleLine1;
  if (raw.heroTitleLine2) out.heroTitleLine2 = raw.heroTitleLine2;
  if (raw.heroTitleLine3) out.heroTitleLine3 = raw.heroTitleLine3;
  if (raw.heroLead) out.heroLead = raw.heroLead;
  if (raw.cravingsEyebrow) out.cravingsEyebrow = raw.cravingsEyebrow;
  if (raw.cravingsHeadingLine1) out.cravingsHeadingLine1 = raw.cravingsHeadingLine1;
  if (raw.cravingsHeadingLine2) out.cravingsHeadingLine2 = raw.cravingsHeadingLine2;

  if (raw.cravingsCard1) {
    out.cravingsCard1 = {
      label: raw.cravingsCard1.label || defaults.cravingsCard1.label,
      title: raw.cravingsCard1.title || defaults.cravingsCard1.title,
      desc: raw.cravingsCard1.desc || defaults.cravingsCard1.desc,
      imageUrl: raw.cravingsCard1.imageUrl || defaults.cravingsCard1.imageUrl,
    };
  }
  if (raw.cravingsCard2) {
    out.cravingsCard2 = {
      label: raw.cravingsCard2.label || defaults.cravingsCard2.label,
      title: raw.cravingsCard2.title || defaults.cravingsCard2.title,
      desc: raw.cravingsCard2.desc || defaults.cravingsCard2.desc,
      imageUrl: raw.cravingsCard2.imageUrl || defaults.cravingsCard2.imageUrl,
    };
  }

  return out;
}

function mergeStoryFields(defaults: OurStoryPageSettings, raw: Partial<OurStoryPageSettings> | null | undefined): OurStoryPageSettings {
  const out = { ...defaults };
  if (!raw) return out;

  if (raw.heroImageUrl) out.heroImageUrl = raw.heroImageUrl;
  if (raw.heroEyebrow) out.heroEyebrow = raw.heroEyebrow;
  if (raw.heroTitleLine1) out.heroTitleLine1 = raw.heroTitleLine1;
  if (raw.heroTitleLine2) out.heroTitleLine2 = raw.heroTitleLine2;
  if (raw.heroSubheading) out.heroSubheading = raw.heroSubheading;

  if (raw.philosophyEyebrow) out.philosophyEyebrow = raw.philosophyEyebrow;
  if (raw.philosophyHeadingLine1) out.philosophyHeadingLine1 = raw.philosophyHeadingLine1;
  if (raw.philosophyHeadingLine2) out.philosophyHeadingLine2 = raw.philosophyHeadingLine2;
  if (raw.philosophyLeadParagraph) out.philosophyLeadParagraph = raw.philosophyLeadParagraph;
  if (raw.philosophySecondaryText) out.philosophySecondaryText = raw.philosophySecondaryText;
  if (raw.philosophyTags) out.philosophyTags = raw.philosophyTags;
  if (raw.philosophyImage1Url) out.philosophyImage1Url = raw.philosophyImage1Url;
  if (raw.philosophyImage2Url) out.philosophyImage2Url = raw.philosophyImage2Url;
  if (raw.philosophyStatValue) out.philosophyStatValue = raw.philosophyStatValue;
  if (raw.philosophyStatLabel) out.philosophyStatLabel = raw.philosophyStatLabel;
  if (raw.philosophyTagLabel) out.philosophyTagLabel = raw.philosophyTagLabel;

  if (raw.blueprintEyebrow) out.blueprintEyebrow = raw.blueprintEyebrow;
  if (raw.blueprintHeading) out.blueprintHeading = raw.blueprintHeading;
  if (raw.blueprintDesc) out.blueprintDesc = raw.blueprintDesc;

  if (raw.blueprintPt1) {
    out.blueprintPt1 = {
      eyebrow: raw.blueprintPt1.eyebrow || defaults.blueprintPt1.eyebrow,
      title: raw.blueprintPt1.title || defaults.blueprintPt1.title,
      desc: raw.blueprintPt1.desc || defaults.blueprintPt1.desc,
      imageUrl: raw.blueprintPt1.imageUrl || defaults.blueprintPt1.imageUrl,
      watermark: null,
    };
  }
  if (raw.blueprintPt2) {
    out.blueprintPt2 = {
      eyebrow: raw.blueprintPt2.eyebrow || defaults.blueprintPt2.eyebrow,
      title: raw.blueprintPt2.title || defaults.blueprintPt2.title,
      desc: raw.blueprintPt2.desc || defaults.blueprintPt2.desc,
      imageUrl: null,
      watermark: raw.blueprintPt2.watermark || defaults.blueprintPt2.watermark,
    };
  }
  if (raw.blueprintPt3) {
    out.blueprintPt3 = {
      eyebrow: raw.blueprintPt3.eyebrow || defaults.blueprintPt3.eyebrow,
      title: raw.blueprintPt3.title || defaults.blueprintPt3.title,
      desc: raw.blueprintPt3.desc || defaults.blueprintPt3.desc,
      imageUrl: raw.blueprintPt3.imageUrl || defaults.blueprintPt3.imageUrl,
      watermark: null,
    };
  }

  if (raw.communityEyebrow) out.communityEyebrow = raw.communityEyebrow;
  if (raw.communityHeading) out.communityHeading = raw.communityHeading;
  if (raw.communityDesc) out.communityDesc = raw.communityDesc;

  if (Array.isArray(raw.recognitionItems) && raw.recognitionItems.length > 0) {
    out.recognitionItems = raw.recognitionItems.map((item, idx) => {
      const def = defaults.recognitionItems[idx] || defaults.recognitionItems[0];
      let imageUrl = item.imageUrl || def.imageUrl;
      const label = item.label || def.label;
      const copy = item.copy || def.copy;
      const link = item.link || def.link;

      if (label.toLowerCase().includes("sun") && imageUrl.toLowerCase().includes("1.png")) {
        imageUrl = "/Story/6.png";
      }

      return {
        imageUrl,
        label,
        copy,
        link,
      };
    });
  }

  return out;
}

function mergeGlobalFields(defaults: GlobalSettings, raw: Partial<GlobalSettings> | null | undefined): GlobalSettings {
  const out = { ...defaults };
  if (!raw) return out;

  if (raw.contactEmail) out.contactEmail = raw.contactEmail;
  if (raw.copyright) out.copyright = raw.copyright;
  if (raw.socialInstagram) out.socialInstagram = raw.socialInstagram;
  if (raw.socialTiktok) out.socialTiktok = raw.socialTiktok;
  if (raw.socialFacebook) out.socialFacebook = raw.socialFacebook;
  if (raw.newsletterHeading) out.newsletterHeading = raw.newsletterHeading;
  if (raw.newsletterSubtext) out.newsletterSubtext = raw.newsletterSubtext;

  return out;
}

export async function getHomePageSettings(): Promise<HomePageSettings> {
  const raw = await fetchAllSiteSettings();
  return mergeHomeFields(HOME_DEFAULTS, raw?.home ?? null);
}

export async function getOurStoryPageSettings(): Promise<OurStoryPageSettings> {
  const raw = await fetchAllSiteSettings();
  return mergeStoryFields(STORY_DEFAULTS, raw?.ourStory ?? null);
}

export async function getGlobalSettings(): Promise<GlobalSettings> {
  const raw = await fetchAllSiteSettings();
  return mergeGlobalFields(GLOBAL_DEFAULTS, raw?.global ?? null);
}
