import { dataConfig } from "@/lib/config";
import { client } from "@/data/sanity/client";
import { sanitizeImageUrl } from "@/lib/utils";
import type {
  CateringFormSettings,
  FeedPageSettings,
  LocationsPageSettings,
  HomePageSettings,
  OurStoryPageSettings,
  GlobalSettings,
} from "@/domain/site-settings";

// ----------------------------------------------------------------------------
// Defaults
// ----------------------------------------------------------------------------

export const CATERING_DEFAULTS: CateringFormSettings = {
  eyebrow: "Catering",
  headingLines: ["Modern street food,", "made for everyday life"],
  lead: "Bold flavours, fast service, and a cleaner approach to doner. From quick lunch breaks to late-night cravings, Great British Doner delivers a modern fast-casual experience built around quality ingredients and everyday convenience. Whether you’re grabbing a wrap on the go or ordering in with friends, GBD brings together flavour, speed, and consistency in one seamless experience.",
  fieldNameLabel: "Full Name",
  fieldNamePlaceholder: "Enter your full name",
  fieldEmailLabel: "Email Address",
  fieldEmailPlaceholder: "jane@company.com",
  fieldCompanyLabel: "Company / Organisation",
  fieldCompanyPlaceholder: "Optional",
  fieldHeadcountLabel: "Estimated Guest Count",
  fieldHeadcountPlaceholder: "Select guest size",
  fieldMessageLabel: "Event Details & Requirements",
  fieldMessagePlaceholder: "Tell us more about your event, dietary preferences, vegan requirements, location, or anything else we should know.",
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
  lead: "The UK food scene is evolving — and vegan doner is becoming one of the biggest shifts in modern fast casual dining.",
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
    {
      imageUrl: "/Story/echo.jpeg",
      label: "Liverpool ECHO",
      copy: "Liverpool restaurants' huge honour as they are named among best in UK.",
      link: "https://www.liverpoolecho.co.uk/whats-on/food-drink-news/liverpool-restaurants-huge-honour-named-33493363.amp",
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
// Sanity implementation
// ----------------------------------------------------------------------------

interface RawSiteSettingsResponse {
  global?: Partial<GlobalSettings>;
  // For other settings that are yet to be modeled in Sanity, we just use defaults for now.
}

async function fetchAllSiteSettings(): Promise<RawSiteSettingsResponse | null> {
  const query = `*[_type == "siteSettings"][0]`;
  const data = await client.fetch<any>(query);
  if (!data) return null;
  
  // Map Sanity schema to domain settings
  return {
    global: {
      contactEmail: data.contactEmail,
      copyright: data.copyright,
      socialInstagram: data.socialInstagram,
      socialTiktok: data.socialTiktok,
      socialFacebook: data.socialFacebook,
      newsletterHeading: data.newsletterHeading,
      newsletterSubtext: data.newsletterSubtext,
    }
  };
}

// ----------------------------------------------------------------------------
// Merge helpers 
// ----------------------------------------------------------------------------

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

export async function getCateringSettings(): Promise<CateringFormSettings> {
  return CATERING_DEFAULTS; // No Sanity model yet, use defaults
}

export async function getLocationsPageSettings(): Promise<LocationsPageSettings> {
  return LOCATIONS_PAGE_DEFAULTS; // No Sanity model yet, use defaults
}

export async function getFeedPageSettings(): Promise<FeedPageSettings> {
  return FEED_PAGE_DEFAULTS; // No Sanity model yet, use defaults
}

export async function getHomePageSettings(): Promise<HomePageSettings> {
  return HOME_DEFAULTS; // No Sanity model yet, use defaults
}

export async function getOurStoryPageSettings(): Promise<OurStoryPageSettings> {
  return STORY_DEFAULTS; // No Sanity model yet, use defaults
}

export async function getGlobalSettings(): Promise<GlobalSettings> {
  const raw = await fetchAllSiteSettings();
  return mergeGlobalFields(GLOBAL_DEFAULTS, raw?.global ?? null);
}
