# GBD Headless WordPress — Install & Wiring Guide

This folder holds the **schema + automation glue** for the WordPress side of the
GBD headless setup. WordPress core itself is **not** included — install it
separately (LocalWP / wp-env / Laragon / a real host) and then drop these files
into the right places.

The frontend (Next.js) talks to WP via WPGraphQL. While WP isn't running, the
site renders from `src/data/graphql/mocks.ts` thanks to the `useMocks` flag in
`src/lib/config.ts`.

---

## 1. Install WordPress

Use any local stack you like. Recommended: **LocalWP** with hostname
`gbd.local` (already allowlisted in [`next.config.mjs`](../next.config.mjs)).

After install, log into `http://gbd.local/wp-admin/`.

## 2. Install & activate plugins

Only one plugin is installed via the WP admin UI:

1. **WPGraphQL** — `Plugins → Add New → search "WPGraphQL"` (or install from
   <https://wpgraphql.com/>). Activate.

The field system (Carbon Fields) is installed as **source code**, not a UI
plugin, in step 4 below. This is intentional — it keeps the schema in git and
makes it impossible for the client to break by clicking around.

## 3. Register the Custom Post Types

Copy [`gbd-content-types.php`](./gbd-content-types.php) into:

```
wp-content/mu-plugins/gbd-content-types.php
```

(`mu-plugins` = must-use plugins. Auto-activates, no UI toggle.)

This registers two CPTs, both exposed to GraphQL:

| CPT          | GraphQL plural | Visible in admin |
| ------------ | -------------- | ---------------- |
| `menu_item`  | `menuItems`    | ✅                |
| `location`   | `locations`    | ✅                |

Flush rewrites once: `Settings → Permalinks → Save Changes`.

## 4. Install Carbon Fields + drop the schema mu-plugin

Carbon Fields is a free, code-defined fields library (the alternative to ACF
Pro). The schema lives in [`gbd-schema.php`](./gbd-schema.php) and is
**version-controlled** — the client cannot edit, rename, or break it through
wp-admin. This is the point.

### 4a. Get Carbon Fields source

The fastest install on a LocalWP site uses Composer (LocalWP ships with it).
In LocalWP, click **Site shell** at the top of the gbd-doner Overview tab —
this opens a terminal already `cd`'d into the site root.

```
cd app/public/wp-content/mu-plugins
mkdir carbon-fields
cd carbon-fields
composer require htmlburger/carbon-fields
```

That creates `mu-plugins/carbon-fields/vendor/` with the library inside.

(If Composer isn't available, download the latest source zip from
<https://github.com/htmlburger/carbon-fields/releases>, then run
`composer install` inside the extracted folder once to fetch its
dependencies.)

### 4b. Drop the schema file

Copy [`gbd-schema.php`](./gbd-schema.php) into:

```
wp-content/mu-plugins/gbd-schema.php
```

It auto-loads Carbon Fields from `mu-plugins/carbon-fields/vendor/autoload.php`,
registers the fields below, then exposes them under the **same GraphQL shape**
the Next.js frontend already queries (`menuItemFields` / `locationFields`):

- **Menu Item Fields** — `price_gbp`, `is_best_seller`, `category`
  (`boxes / wraps / burgers / combos / sides / drinks / desserts` — must match
  [`src/domain/menu-item.ts`](../src/domain/menu-item.ts)), `allergens` (complex),
  `nutrition` (complex, max 1).
- **Location Fields** — `address_line1/2`, `city`, `postcode`, `phone`,
  `is_flagship`, `lat`, `lng`, `click_and_collect_url`, `delivery_links`
  (complex), `hours` (complex).

Refresh wp-admin — when editing a Menu Item or Location, the field panels
appear below the editor.

> Note: the legacy `acf-field-groups.json` in this folder is **not** used
> anymore; kept for reference only. Safe to delete once Carbon Fields is live.

## 5. Verify the GraphQL endpoint

Open `http://gbd.local/graphql` in GraphiQL IDE (`GraphQL → GraphiQL IDE` in
admin). Run:

```graphql
query Sanity {
  menuItems(first: 1) { nodes { title menuItemFields { priceGbp category } } }
  locations(first: 1) { nodes { title locationFields { lat lng isFlagship } } }
}
```

If the fields come back named correctly, you're wired.

## 6. Point the frontend at WordPress

In the Next.js project, copy `.env.example → .env.local` and set:

```
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=http://gbd.local/graphql
NEXT_PUBLIC_USE_MOCK_DATA=false
WORDPRESS_REVALIDATE_SECRET=<long-random-string>
WORDPRESS_PREVIEW_SECRET=<another-long-random-string>
```

Restart `next dev`.

## 7. Wire on-publish revalidation

The frontend exposes
[`/api/revalidate`](../src/app/api/revalidate/route.ts). It expects a `POST`
with header `x-wp-revalidate-secret: <WORDPRESS_REVALIDATE_SECRET>` and JSON
body:

```json
{ "postType": "menu_item", "paths": ["/menu"] }
```

`postType` is auto-mapped to the right paths (`menu_item → /menu`,
`location → /locations`, `post → /feed`). `paths` is optional and additive.

Easiest WP-side setup: drop this into `mu-plugins/gbd-revalidate.php`:

```php
<?php
add_action('save_post', function ($post_id, $post) {
    if (wp_is_post_revision($post_id)) return;
    if ($post->post_status !== 'publish') return;

    $secret = getenv('GBD_REVALIDATE_SECRET') ?: 'replace-me';
    $endpoint = getenv('GBD_FRONTEND_URL') ?: 'http://localhost:3000';

    wp_remote_post($endpoint . '/api/revalidate', [
        'headers' => [
            'Content-Type' => 'application/json',
            'x-wp-revalidate-secret' => $secret,
        ],
        'body' => wp_json_encode(['postType' => $post->post_type]),
        'timeout' => 5,
        'blocking' => false,
    ]);
}, 10, 2);
```

Set `GBD_REVALIDATE_SECRET` and `GBD_FRONTEND_URL` in `wp-config.php` via
`putenv()` or use a constants plugin.

## 8. Wire the WP Preview button

The frontend exposes
[`/api/preview`](../src/app/api/preview/route.ts). Override the preview link
in WP with `mu-plugins/gbd-preview.php`:

```php
<?php
add_filter('preview_post_link', function ($link, $post) {
    $secret = getenv('GBD_PREVIEW_SECRET') ?: 'replace-me';
    $frontend = getenv('GBD_FRONTEND_URL') ?: 'http://localhost:3000';
    return add_query_arg([
        'secret' => $secret,
        'slug' => $post->post_name,
        'post_type' => $post->post_type,
    ], $frontend . '/api/preview');
}, 10, 2);
```

`GBD_PREVIEW_SECRET` must match `WORDPRESS_PREVIEW_SECRET` in `.env.local`.

## 9. Client guardrails

The client edits **structured fields only** — never raw HTML / layout / motion
timings. The fields installed in step 4 are pure text, numbers, URLs, and
repeaters; the WP "Editor" / classic body field is intentionally **not**
consumed by the frontend (the menu repository strips HTML from excerpts).

If a field is left empty, the repository layers in
[`src/data/repositories/`](../src/data/repositories/) supply safe fallbacks via
optional chaining — so a half-filled draft never crashes the live site.

---

## File map

| File                          | Purpose                                                |
| ----------------------------- | ------------------------------------------------------ |
| `gbd-content-types.php`       | Register `menu_item` + `location` CPTs (WPGraphQL on). |
| `gbd-schema.php`              | Carbon Fields field definitions + GraphQL field registration. |
| `acf-field-groups.json`       | Legacy — only kept for reference. Not loaded.          |
| *(WP-side, you write)* `mu-plugins/gbd-revalidate.php` | Webhook to `/api/revalidate`.              |
| *(WP-side, you write)* `mu-plugins/gbd-preview.php`    | Rewrites preview URL to `/api/preview`.    |
