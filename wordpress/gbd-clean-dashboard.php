<?php
/**
 * Plugin Name: GBD Clean Dashboard & Sidebar
 * Description: Cleans up default WP dashboard widgets, removes unused admin menus for client users, and adds a custom branded helper widget.
 * Version: 1.0.0
 * Author: GBD Doner
 */

if (!defined('ABSPATH')) exit;

// -----------------------------------------------------------------------------
// 1. Remove standard dashboard widgets & add custom welcome panel
// -----------------------------------------------------------------------------

add_action('wp_dashboard_setup', function () {
    global $wp_meta_boxes;

    // Remove Quick Draft, At a Glance, Activity, News, Site Health
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']);
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_site_health']);

    // Add custom welcome widget
    wp_add_dashboard_widget(
        'gbd_welcome_widget',
        '🍔 Great British Doner — Content Dashboard',
        'gbd_render_welcome_widget'
    );
});

// Remove default "Welcome to WordPress" panel
remove_action('welcome_panel', 'wp_welcome_panel');

function gbd_render_welcome_widget() {
    ?>
    <div style="padding: 10px 5px;">
        <h2 style="margin-top: 0; font-weight: 800; color: #C94035;">Welcome to your Website Control Center!</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #333;">
            This dashboard is configured specifically for managing the content on the live website. Use the links in the left sidebar to update different sections:
        </p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
        <ul style="font-size: 14px; line-height: 2.2; list-style: none; padding-left: 0;">
            <li>⚙️ <a href="<?php echo admin_url('admin.php?page=crb_site_settings.php'); ?>" style="font-weight: 600; text-decoration: none; color: #0073aa;">Site Settings</a> — Edit text copy and images for the <strong>Home Page</strong>, <strong>Our Story</strong>, <strong>Catering Details</strong>, and social handles.</li>
            <li>🍔 <a href="<?php echo admin_url('edit.php?post_type=menu_item'); ?>" style="font-weight: 600; text-decoration: none; color: #0073aa;">Menu Items</a> — Add new dishes, edit category listings, change prices, and set dietary flags.</li>
            <li>📍 <a href="<?php echo admin_url('edit.php?post_type=location'); ?>" style="font-weight: 600; text-decoration: none; color: #0073aa;">Locations</a> — Manage store addresses, update opening hours, and change delivery links.</li>
            <li>📰 <a href="<?php echo admin_url('edit.php'); ?>" style="font-weight: 600; text-decoration: none; color: #0073aa;">Posts ("The Feed")</a> — Write, edit, and publish news and blog articles.</li>
        </ul>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
        <p style="font-size: 12px; color: #666; margin-bottom: 0;">
            💡 <strong>Need Help?</strong> Refer to the project handover documents or contact your development team for support.
        </p>
    </div>
    <?php
}

// -----------------------------------------------------------------------------
// 2. Clean up sidebar menu items for non-developers
// -----------------------------------------------------------------------------

add_action('admin_menu', function () {
    $current_user = wp_get_current_user();
    
    // If the user is NOT the main developer (gbd-owner), hide technical menus
    if ($current_user && $current_user->user_login !== 'gbd-owner') {
        remove_menu_page('edit-comments.php');          // Comments (Unused in Headless)
        remove_menu_page('edit.php?post_type=page');     // Pages (All pages are structured under Site Settings)
        remove_menu_page('themes.php');                 // Appearance
        remove_menu_page('plugins.php');                // Plugins
        remove_menu_page('users.php');                  // Users
        remove_menu_page('tools.php');                  // Tools
        remove_menu_page('options-general.php');        // Settings
        remove_menu_page('graphql');                    // WPGraphQL Settings
    }
}, 999);
