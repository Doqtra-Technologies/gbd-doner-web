/**
 * Site-wide editable settings managed in wp-admin (Site Settings page).
 * Every field is optional — repos always merge with defaults so the UI
 * still renders coherently if a field is left blank in WP.
 */
export interface CateringFormSettings {
  eyebrow: string;
  headingLines: string[];
  lead: string;

  fieldNameLabel: string;
  fieldNamePlaceholder: string;
  fieldEmailLabel: string;
  fieldEmailPlaceholder: string;
  fieldCompanyLabel: string;
  fieldCompanyPlaceholder: string;
  fieldHeadcountLabel: string;
  fieldHeadcountPlaceholder: string;
  fieldMessageLabel: string;
  fieldMessagePlaceholder: string;

  submitLabel: string;
  submitLabelSending: string;

  statusIdle: string;
  statusSending: string;
  statusSuccess: string;
  statusError: string;

  recipientEmail: string | null;
}

export interface LocationsPageSettings {
  eyebrow: string;
  heading: string;
  emptyState: string;
}

export interface FeedPageSettings {
  eyebrow: string;
  headingLines: string[];
  lead: string;
  emptyState: string;
}

export interface CravingsCardSettings {
  label: string;
  title: string;
  desc: string;
  imageUrl: string;
}

export interface HomePageSettings {
  heroVideoUrl: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleLine3: string;
  heroLead: string;
  cravingsEyebrow: string;
  cravingsHeadingLine1: string;
  cravingsHeadingLine2: string;
  cravingsCard1: CravingsCardSettings;
  cravingsCard2: CravingsCardSettings;
}

export interface BlueprintPoint {
  eyebrow: string;
  title: string;
  desc: string;
  imageUrl: string | null;
  watermark: string | null;
}

export interface RecognitionItem {
  imageUrl: string;
  label: string;
  copy: string;
  link?: string;
}

export interface OurStoryPageSettings {
  heroImageUrl: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubheading: string;
  philosophyEyebrow: string;
  philosophyHeadingLine1: string;
  philosophyHeadingLine2: string;
  philosophyLeadParagraph: string;
  philosophySecondaryText: string;
  philosophyTags: string;
  philosophyImage1Url: string;
  philosophyImage2Url: string;
  philosophyStatValue: string;
  philosophyStatLabel: string;
  philosophyTagLabel: string;
  blueprintEyebrow: string;
  blueprintHeading: string;
  blueprintDesc: string;
  blueprintPt1: BlueprintPoint;
  blueprintPt2: BlueprintPoint;
  blueprintPt3: BlueprintPoint;
  communityEyebrow: string;
  communityHeading: string;
  communityDesc: string;
  recognitionItems: RecognitionItem[];
}

export interface GlobalSettings {
  contactEmail: string;
  copyright: string;
  socialInstagram: string;
  socialTiktok: string;
  socialFacebook: string;
  newsletterHeading: string;
  newsletterSubtext: string;
}
