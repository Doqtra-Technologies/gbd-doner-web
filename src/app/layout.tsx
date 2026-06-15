import type { Metadata } from "next";
import { Montserrat, Open_Sans, Anton } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/config";
import { getGlobalSettings } from "@/data/repositories/site-settings-repository";
import { JsonLd } from "@/components/ui/json-ld";
import { BreadcrumbSchema } from "@/components/ui/breadcrumb-schema";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700"],
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400"],
  display: "swap",
});

// Campaign display face — scoped to the homepage hero headline only.
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Great British Doner | Modern Street Food",
  description:
    "British doner engineered for bold cravings. From farm to spit, on the record.",
  openGraph: {
    type: "website",
    title: "Great British Doner | Modern Street Food",
    description:
      "British doner engineered for bold cravings. From farm to spit, on the record.",
    images: [
      {
        url: "https://images.example.com/gbd-og.jpg",
        width: 1200,
        height: 630,
        alt: "Great British Doner — Modern Street Food",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Great British Doner | Modern Street Food",
    description:
      "British doner engineered for bold cravings. From farm to spit, on the record.",
    images: ["https://images.example.com/gbd-og.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "ADD_GOOGLE_SITE_VERIFICATION_CODE",
    other: {
      "msvalidate.01": "ADD_BING_SITE_VERIFICATION_CODE",
    },
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalSettings = await getGlobalSettings();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GBD Doner",
    legalName: "Great British Doner",
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo/gbd-logo.png`,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.tiktok,
      siteConfig.social.facebook,
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GBD Doner",
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} ${anton.variable} scroll-smooth`}
    >
      <body className="font-body antialiased">
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <BreadcrumbSchema />
        <Nav settings={globalSettings} />
        <main className="relative w-full min-h-screen">{children}</main>
        <Footer settings={globalSettings} />
      </body>
    </html>
  );
}
