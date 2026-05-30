import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const POST_TYPE_PATHS: Record<string, string[]> = {
  menu_item: ["/menu"],
  location: ["/order-now", "/locations"],
  post: ["/feed"],
  // Triggered by the Site Settings (theme-options) save in WP.
  // Touches every page that reads editable copy from siteSettings.
  site_settings: ["/catering", "/order-now", "/feed"],
};

type RevalidatePayload = {
  postType?: string;
  slug?: string;
  paths?: string[];
};

export async function POST(request: Request) {
  const expected = process.env.WORDPRESS_REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "Server misconfigured: WORDPRESS_REVALIDATE_SECRET missing." },
      { status: 500 },
    );
  }

  const provided =
    request.headers.get("x-wp-revalidate-secret") ??
    new URL(request.url).searchParams.get("secret");

  if (provided !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: RevalidatePayload = {};
  try {
    body = (await request.json()) as RevalidatePayload;
  } catch {
    body = {};
  }

  const paths = new Set<string>(body.paths ?? []);
  if (body.postType && POST_TYPE_PATHS[body.postType]) {
    POST_TYPE_PATHS[body.postType].forEach((p) => paths.add(p));
  }

  // If a slug was sent for a CPT, also revalidate the detail page so a
  // single item edit refreshes both the list AND its detail route.
  if (body.slug) {
    const slug = encodeURIComponent(body.slug);
    if (body.postType === "menu_item") paths.add(`/menu/${slug}`);
    if (body.postType === "location")  paths.add(`/locations/${slug}`);
    if (body.postType === "post")      paths.add(`/feed/${slug}`);
  }

  // Always refresh the home in case it surfaces best-sellers/featured posts.
  paths.add("/");

  paths.forEach((p) => revalidatePath(p));

  return NextResponse.json({ ok: true, revalidated: Array.from(paths), now: Date.now() });
}
