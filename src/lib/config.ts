export const siteConfig = {
  name: "GBD Doner",
  tagline: "British Doner Redefined",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gbddoner.com",
  description:
    "Modern fast-casual doner. Ethically sourced, urban-kinetic, built for the city.",
  ogImage: "/og.jpg",
  nav: [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/locations", label: "Locations" },
    { href: "/our-story", label: "Our Story" },
    // { href: "/loyalty", label: "Loyalty" },
    { href: "/catering", label: "Catering" },
    { href: "/feed", label: "The Feed" },
    { href: "/franchise", label: "Franchise" },
  ],
  social: {
    instagram: "https://www.instagram.com/greatbritishdoner/",
    facebook: "https://www.facebook.com/p/Great-British-Doner-61580394281827/",
    tiktok: "https://www.tiktok.com/@greatbritishdoner",
  },
} as const;

export const dataConfig = {
  revalidateSeconds: Number(process.env.SANITY_REVALIDATE_SECONDS ?? 60),
} as const;

export const mapConfig = {
  defaultCenter: { lng: -0.1276, lat: 51.5074 },
  defaultZoom: 11,
} as const;
