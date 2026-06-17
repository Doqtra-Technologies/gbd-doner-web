import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// All domains owned by GBD Doner that should point to the primary site.
const REDIRECT_DOMAINS = [
  "greatbritishdoner.shop",
  "greatbritishdoner.co",
  "greatbritishdoner.online",
  "greatdonerbritish.com",
  "greatbritishdoners.com",
  "greatbritishdonner.com",
  "britishdonner.com",
  "greatbritishkebab.com",
  "greatbritishrestaurant.com",
  "gbddoner.io",
  "gbddoner.app",
  "gbddoner.shop",
  "gbddoner.com",
  "greatbritishdoner.com",
];

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  // Skip redirect in local development or if host header is missing
  if (
    !host ||
    host.includes("localhost") ||
    host.includes("127.0.0.1") ||
    host.includes("gbd.local")
  ) {
    return NextResponse.next();
  }

  // Get the primary site URL configured in the .env file (without protocol)
  const siteUrlEnv = process.env.NEXT_PUBLIC_SITE_URL || "https://greatbritishdoner.com";
  let primaryHost = "greatbritishdoner.com";
  try {
    primaryHost = new URL(siteUrlEnv).hostname;
  } catch (error) {
    primaryHost = siteUrlEnv.replace(/https?:\/\//, "");
  }

  // Normalize host name (lowercase, remove port if any)
  const cleanHost = host.split(":")[0].toLowerCase();

  // If client is accessing via an alias domain, perform a 301 Permanent Redirect
  if (cleanHost !== primaryHost && REDIRECT_DOMAINS.includes(cleanHost)) {
    const protocol = siteUrlEnv.startsWith("https") ? "https" : "http";
    const redirectUrl = `${protocol}://${primaryHost}${request.nextUrl.pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon.png, og.jpg (asset files)
     * - sitemap.xml, robots.txt, sitemaps (SEO files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|og.jpg|sitemap.xml|robots.txt|sitemaps).*)",
  ],
};
