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
