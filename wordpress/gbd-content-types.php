<?php
/**
 * Plugin Name: GBD Content Types
 * Description: Registers Menu Items and Locations CPTs for the GBD Doner headless site, exposed via WPGraphQL.
 * Version: 1.0.0
 * Author: GBD Doner
 */

if (!defined('ABSPATH')) exit;

add_action('init', function () {
    register_post_type('menu_item', [
        'labels' => [
            'name'          => 'Menu Items',
            'singular_name' => 'Menu Item',
            'add_new_item'  => 'Add New Menu Item',
        ],
        'public'              => true,
        'has_archive'         => false,
        'show_in_rest'        => true,
        'menu_icon'           => 'dashicons-food',
        'supports'            => ['title', 'editor', 'excerpt', 'thumbnail'],
        // WPGraphQL fields:
        // NOTE: graphql_single/plural names MUST NOT be 'menuItem'/'menuItems'.
        // WordPress already has a built-in MenuItem type for nav menu items
        // (Appearance > Menus). Using those names silently shadows our CPT and
        // returns nav-menu fields instead of ours. menuProduct(s) is safe.
        'show_in_graphql'     => true,
        'graphql_single_name' => 'menuProduct',
        'graphql_plural_name' => 'menuProducts',
    ]);

    register_post_type('location', [
        'labels' => [
            'name'          => 'Locations',
            'singular_name' => 'Location',
            'add_new_item'  => 'Add New Location',
        ],
        'public'              => true,
        'has_archive'         => false,
        'show_in_rest'        => true,
        'menu_icon'           => 'dashicons-location-alt',
        'supports'            => ['title', 'editor', 'thumbnail'],
        // Renamed to 'branch'/'branches' to avoid potential collision with
        // WPGraphQL's nav-menu location concept. Frontend queries use a
        // GraphQL alias to keep the response shape unchanged.
        'show_in_graphql'     => true,
        'graphql_single_name' => 'branch',
        'graphql_plural_name' => 'branches',
    ]);
});

// Disable Gutenberg (block editor) for menu_item + location CPTs.
// Carbon Fields renders inline in the classic editor, but gets buried in a
// collapsed "Meta Boxes" panel under Gutenberg. These CPTs are structured
// data, not long-form content, so classic editor is the better fit anyway.
add_filter('use_block_editor_for_post_type', function ($use_block, $post_type) {
    if (in_array($post_type, ['menu_item', 'location'], true)) {
        return false;
    }
    return $use_block;
}, 10, 2);

// Optional: pretty rewrite flush on activation.
register_activation_hook(__FILE__, function () {
    flush_rewrite_rules();
});
register_deactivation_hook(__FILE__, function () {
    flush_rewrite_rules();
});
