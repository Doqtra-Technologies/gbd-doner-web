# GBD Doner — WordPress Setup Guide

For your hosting partner or anyone setting up the WordPress side. Once done, the website pulls all menu items, locations, and blog posts straight from your WP admin — no developer needed for everyday edits.

## What you'll end up with

- A separate WordPress install on a subdomain (e.g. `api.gbdoner.com`) used only for editing content.
- Two custom sections in the admin sidebar: **Menu Items** and **Locations**.
- The public website at `gbdoner.com` reads from WordPress automatically.

## Step 1 — Install WordPress

Use any host you like (WP Engine, Kinsta, SiteGround, your existing host). Install it on a subdomain like `api.gbdoner.com`.

Recommended security:
- Enable HTTPS.
- Disable file editing in the admin (`define('DISALLOW_FILE_EDIT', true);` in `wp-config.php`).
- Use a strong admin password and 2FA.

## Step 2 — Install three free plugins

In the WordPress admin, go to **Plugins → Add New**, search for and install/activate each of these:

1. **WPGraphQL** — exposes your content over a modern API.
2. **Advanced Custom Fields (ACF)** — adds the price, allergens, coordinates, hours, etc. fields.
3. **WPGraphQL for ACF** — connects the two.

## Step 3 — Add the GBD Content Types plugin

This creates the "Menu Items" and "Locations" sections in your admin.

1. Take the file `wordpress/gbd-content-types.php` from this project.
2. Upload it to WordPress at: `/wp-content/plugins/gbd-content-types/gbd-content-types.php`
   (Create the `gbd-content-types` folder if it doesn't exist.)
3. Go to **Plugins** in admin and activate **GBD Content Types**.

You should now see **Menu Items** and **Locations** in the left sidebar.

## Step 4 — Import the field definitions

This adds the right fields (Price, Allergens, Coordinates, Opening Hours, etc.) to each Menu Item and Location.

1. In WordPress admin, go to **ACF → Tools**.
2. Choose **Import Field Groups**.
3. Upload the file `wordpress/acf-field-groups.json` from this project.
4. Click **Import**.

You should now see two field groups in **ACF → Field Groups**: *Menu Item Fields* and *Location Fields*.

## Step 5 — Add your first menu item & location

- **Menu Items → Add New**: Add title, description, set a featured image, fill in price/category/allergens/nutrition.
- **Locations → Add New**: Add the store name, fill in address, latitude/longitude, hours, and delivery links.

> Tip: To get latitude/longitude, search the address on Google Maps, right-click the pin, and click the coordinates to copy them.

## Step 6 — Hand the API URL to your developer

Once content is loading, the developer needs one line — your GraphQL endpoint. It's usually:

```
https://api.gbdoner.com/graphql
```

They'll plug it into the frontend `.env` file and the website will start pulling from WordPress automatically.

## What you can do day-to-day (no developer needed)

- Add/edit menu items, prices, allergens.
- Open or close store locations.
- Update opening hours.
- Publish blog posts in **Posts** for "The Feed".
- Featured images update everywhere automatically (Best Sellers, Menu, Blog).

Changes typically appear on the live site within ~60 seconds.

## Need help?

If anything looks off (a field missing, GraphQL returning errors), share the error with your developer along with the page where it happened — that's usually all they'll need.
