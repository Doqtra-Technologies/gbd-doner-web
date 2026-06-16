import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const POST_TYPE_PATHS: Record<string, string[]> = {
  menuItem: ["/menu"],
  location: ["/order-now", "/locations"],
  post: ["/feed"],
  siteSettings: ["/catering", "/order-now", "/feed"],
};

type RevalidatePayload = {
  _type?: string;
  slug?: { current?: string } | string;
};

export async function POST(request: Request) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "Revalidation is not configured." },
      { status: 401 },
    );
  }

  // Check URL param or custom header for the Sanity Webhook secret
  const provided =
    request.headers.get("x-sanity-secret") ??
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

  const paths = new Set<string>();
  
  if (body._type && POST_TYPE_PATHS[body._type]) {
    POST_TYPE_PATHS[body._type].forEach((p) => paths.add(p));
  }

  // Handle slug revalidation for list vs detail
  let currentSlug = "";
  if (typeof body.slug === "string") {
    currentSlug = body.slug;
  } else if (body.slug?.current) {
    currentSlug = body.slug.current;
  }

  if (currentSlug) {
    const slug = encodeURIComponent(currentSlug);
    if (body._type === "menuItem") paths.add(`/menu/${slug}`);
    if (body._type === "location")  paths.add(`/locations/${slug}`);
    if (body._type === "post")      paths.add(`/feed/${slug}`);
  }

  // Always refresh the home in case it surfaces best-sellers/featured posts.
  paths.add("/");

  paths.forEach((p) => revalidatePath(p));

  return NextResponse.json({ ok: true, revalidated: Array.from(paths), now: Date.now() });
}
