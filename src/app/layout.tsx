import type { Metadata } from "next";
import { Montserrat, Open_Sans, Anton } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/config";
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
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} ${anton.variable} scroll-smooth`}
    >
      <body className="font-body antialiased">
        <Nav />
        <main className="relative w-full min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
