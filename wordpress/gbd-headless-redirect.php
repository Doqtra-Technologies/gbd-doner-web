<?php
/**
 * Plugin Name: GBD Headless Redirect
 * Description: This WordPress install is a headless CMS — the public site is rendered by Next.js. Anyone hitting the WP front-end gets bounced to the Next.js site. wp-admin and /graphql stay accessible.
 * Version: 1.0.0
 * Author: GBD Doner
 *
 * Configuration:
 *   - In production, set GBD_FRONTEND_URL in wp-config.php or as an environment variable:
 *       define('GBD_FRONTEND_URL', 'https://greatbritishdoner.com');
 *       OR
 *       GBD_FRONTEND_URL=https://greatbritishdoner.com
 *   - Falls back to http://localhost:3000 for local dev.
 */

if (!defined('ABSPATH')) exit;

add_action('template_redirect', function () {
    // Don't redirect admin pages, login, AJAX, REST, GraphQL, cron, or feeds.
    if (
        is_admin()
        || (defined('DOING_AJAX') && DOING_AJAX)
        || (defined('DOING_CRON') && DOING_CRON)
        || (defined('REST_REQUEST') && REST_REQUEST)
        || (defined('GRAPHQL_HTTP_REQUEST') && GRAPHQL_HTTP_REQUEST)
        || is_feed()
    ) {
        return;
    }

    // Don't redirect WPGraphQL endpoint or any /graphql* request.
    $req = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
    if (
        strpos($req, '/graphql') === 0
        || strpos($req, '/wp-login.php') !== false
        || strpos($req, '/wp-admin') !== false
    ) {
        return;
    }

    $frontend = defined('GBD_FRONTEND_URL') 
        ? GBD_FRONTEND_URL 
        : (getenv('GBD_FRONTEND_URL') ?: 'http://localhost:3000');
    wp_redirect(rtrim($frontend, '/') . $req, 302);
    exit;
});

/**
 * Force successful logins to redirect to the WordPress dashboard (wp-admin).
 * This prevents users from being redirected to the homepage, which would
 * trigger the frontend redirect and bounce them to the Next.js site.
 */
add_filter('login_redirect', function ($redirect_to, $request, $user) {
    if (is_a($user, 'WP_User')) {
        return admin_url();
    }
    return $redirect_to;
}, 10, 3);

