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
        'show_in_graphql'     => true,
        'graphql_single_name' => 'menuItem',
        'graphql_plural_name' => 'menuItems',
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
        'show_in_graphql'     => true,
        'graphql_single_name' => 'location',
        'graphql_plural_name' => 'locations',
    ]);
});

// Optional: pretty rewrite flush on activation.
register_activation_hook(__FILE__, function () {
    flush_rewrite_rules();
});
register_deactivation_hook(__FILE__, function () {
    flush_rewrite_rules();
});
