import { NextResponse } from "next/server";
import { draftMode } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const POST_TYPE_BASE: Record<string, string> = {
  menu_item: "/menu",
  location: "/locations",
  post: "/feed",
};

export async function GET(request: Request) {
  const expected = process.env.WORDPRESS_PREVIEW_SECRET;
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const slug = url.searchParams.get("slug");
  const postType = url.searchParams.get("post_type") ?? "post";

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "Server misconfigured: WORDPRESS_PREVIEW_SECRET missing." },
      { status: 500 },
    );
  }

  if (secret !== expected || !slug) {
    return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 });
  }

  (await draftMode()).enable();

  const base = POST_TYPE_BASE[postType] ?? "/feed";
  const safeSlug = encodeURIComponent(slug);
  return NextResponse.redirect(new URL(`${base}/${safeSlug}`, url.origin));
}
