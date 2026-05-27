<?php
/**
 * Plugin Name: GBD Seeder
 * Description: One-shot import of the original site content (menu items, locations, blog posts) into WordPress. Idempotent — re-running skips records that already exist by slug. Adds a "GBD Seeder" page under Tools.
 * Version: 1.0.0
 * Author: GBD Doner
 */

if (!defined('ABSPATH')) exit;

// ============================================================================
// SEED DATA — mirrors src/data/graphql/mocks.ts
// ============================================================================

function gbd_seed_menu_items() {
    return [
        // ---------- BOXES ----------
        ['slug'=>'beef-doner-box','title'=>'Beef Doner Box','desc'=>'Slow cooked 100% beef doner slices, rich and tender. Loaded with any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber + 2 sauces of choice. Served with golden chips, fluffy rice, or soft tortilla.','image'=>'/menu/boxes/BEEF HALLOUMI SALAD BOX-ORG-NEW.jpg','category'=>'boxes','best'=>true,'allergens'=>[],'dietary'=>[]],
        ['slug'=>'chicken-doner-box','title'=>'Chicken Doner Box','desc'=>'Succulent flame-grilled chicken doner, tender and seasoned. Served with any/all 5 fresh salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber + 2 signature sauces. Your choice of golden chips, fluffy rice, or warm tortilla.','image'=>'/menu/boxes/chicken CHIPS BOX2-ORG-NEW.jpg','category'=>'boxes','best'=>true,'allergens'=>[],'dietary'=>[]],
        ['slug'=>'mixed-doner-box','title'=>'Mixed Doner Box','desc'=>'Flame-grilled chicken and tender beef doner combo. Customise with any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber + 2 signature sauces. Choose golden chips, fluffy rice, or tortilla.','image'=>'/menu/boxes/MIXED BOX-ORG-NEW.jpg','category'=>'boxes','best'=>true,'allergens'=>[],'dietary'=>[]],
        ['slug'=>'halloumi-box','title'=>'Halloumi Box','desc'=>'Golden fried halloumi, crispy outside and soft inside. Served with any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber + 2 sauces. Choose golden chips, fluffy rice, or tortilla.','image'=>'/menu/boxes/HALLOUMI BOX-ORG-cropped.jpg','category'=>'boxes','best'=>true,'allergens'=>[['code'=>'MILK','label'=>'Milk']],'dietary'=>['V']],
        ['slug'=>'falafel-box','title'=>'Falafel Box','desc'=>'Golden, crispy falafel pieces with chickpeas, herbs, and spices. Served with any/all 5 fresh salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber + 2 signature sauces. Choose golden chips, fluffy rice, or warm tortilla.','image'=>'/menu/boxes/FALAFEL BOX-new-cropped.jpg','category'=>'boxes','best'=>false,'allergens'=>[],'dietary'=>['V','GF']],
        ['slug'=>'vegan-doner-box','title'=>'Vegan Doner Box','desc'=>'100% plant-based doner, grilled and flavourful. Loaded with any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber + 2 vegan sauces. Served with golden chips, rice, or tortilla.','image'=>'/menu/boxes/VEGAN BOX-NEW.jpg','category'=>'boxes','best'=>false,'allergens'=>[],'dietary'=>['VG']],
        ['slug'=>'beef-halloumi-box','title'=>'Beef + Halloumi Box','desc'=>'Tender beef doner + crispy fried halloumi. Customise with any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber + 2 signature sauces. Choose golden chips, fluffy rice, or tortilla.','image'=>'/menu/boxes/BEEF HALLOUMI SALAD BOX-ORG-NEW.jpg','category'=>'boxes','best'=>false,'allergens'=>[['code'=>'MILK','label'=>'Milk']],'dietary'=>[]],
        ['slug'=>'chicken-halloumi-box','title'=>'Chicken + Halloumi Box','desc'=>'Juicy chicken doner + golden fried halloumi. Served with any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber + 2 sauces. Choose golden chips, rice, or tortilla.','image'=>'/menu/boxes/chicken halloumi box-new.jpg','category'=>'boxes','best'=>false,'allergens'=>[['code'=>'MILK','label'=>'Milk']],'dietary'=>[]],

        // ---------- WRAPS ----------
        ['slug'=>'beef-doner-wrap','title'=>'Beef Doner Wrap','desc'=>'Premium 100% beef doner cuts grilled to perfection, wrapped in a warm toasted tortilla. Customise with any or all of 5 fresh salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber. Finished with 2 signature sauces.','image'=>'/menu/wraps/BEEF WRAP-ORG-ED-small-1200.jpg','category'=>'wraps','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>[]],
        ['slug'=>'chicken-doner-wrap','title'=>'Chicken Doner Wrap','desc'=>'Premium 100% chicken doner cuts grilled to perfection, wrapped in a warm toasted tortilla. Customise with any or all of 5 fresh salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber. Finished with 2 signature sauces.','image'=>'/menu/wraps/CHICKEN WARP 2-ORG-ED-1200.jpg','category'=>'wraps','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>[]],
        ['slug'=>'mixed-doner-wrap','title'=>'Mixed Doner Wrap','desc'=>'Premium 100% beef and chicken doner cuts grilled to perfection, wrapped in a warm toasted tortilla. Customise with any or all of 5 fresh salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber. Finished with 2 signature sauces.','image'=>'/menu/wraps/MIXED WRAP-ORG-ED-new.jpg','category'=>'wraps','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>[]],
        ['slug'=>'halloumi-wrap','title'=>'Halloumi Wrap','desc'=>'Fried halloumi, crispy outside and soft inside, in a toasted tortilla. Choose any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber. Finished with 2 signature sauces.','image'=>'/menu/wraps/HALLOUMI WRAP-ORG-ED-1200.jpg','category'=>'wraps','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten'],['code'=>'MILK','label'=>'Milk']],'dietary'=>['V']],
        ['slug'=>'falafel-wrap','title'=>'Falafel Wrap','desc'=>'Crispy falafel in a warm tortilla. Add any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber. Finished with 2 sauces.','image'=>'/menu/wraps/FALAFEL WRAP-ORG-ED-1200.jpg','category'=>'wraps','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>['V']],
        ['slug'=>'vegan-doner-wrap','title'=>'Vegan Doner Wrap','desc'=>'100% plant-based doner in a toasted tortilla. Customise with any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber. Guilt-free and satisfying.','image'=>'/menu/wraps/FALAFEL WRAP-ORG-ED-1200.jpg','category'=>'wraps','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>['VG']],
        ['slug'=>'beef-halloumi-wrap','title'=>'Beef Halloumi Wrap','desc'=>'Grilled beef doner + golden fried halloumi in a warm tortilla. Customise with any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber. Finished with 2 signature sauces.','image'=>'/menu/wraps/BEEF HALLOUMI WRAP-ORG-ED-1200.jpg','category'=>'wraps','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten'],['code'=>'MILK','label'=>'Milk']],'dietary'=>[]],
        ['slug'=>'chicken-halloumi-wrap','title'=>'Chicken + Halloumi Wrap','desc'=>'Succulent chicken doner + fried halloumi in a warm tortilla. Load any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber. Finished with 2 sauces.','image'=>'/menu/wraps/CHICKEN HALLOUMI WRAP-ORG-ED-1200.jpg','category'=>'wraps','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten'],['code'=>'MILK','label'=>'Milk']],'dietary'=>[]],

        // ---------- BURGERS ----------
        ['slug'=>'beef-doner-burger','title'=>'Beef Doner Burger','desc'=>'Generous slices of slow-cooked beef doner, carved fresh and grilled, piled high in a toasted brioche bun. Load with any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber. Smothered with 2 signature sauces.','image'=>'/menu/burgers/BEEF BURGER-ORG-ED.jpg','category'=>'burgers','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>[]],
        ['slug'=>'chicken-doner-burger','title'=>'Chicken Doner Burger','desc'=>'Succulent flame-grilled chicken doner slices, layered in a soft-toasted brioche bun. Customise with any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber. Drizzled with 2 sauces of choice.','image'=>'/menu/burgers/CHICKEN BURGER 2-ORG-ED-SMALL.jpg','category'=>'burgers','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>[]],
        ['slug'=>'crispy-halloumi-burger','title'=>'Crispy Halloumi Burger','desc'=>'Golden fried halloumi patty, crispy outside and soft inside, stacked in a toasted brioche bun. Add any/all 5 salads: lettuce, red cabbage, white cabbage, onion, pickled cucumber. Finished with 2 sauces of choice.','image'=>'/menu/burgers/vegan burger-ed.jpg','category'=>'burgers','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten'],['code'=>'MILK','label'=>'Milk']],'dietary'=>['V']],

        // ---------- COMBOS ----------
        ['slug'=>'duo-saver','title'=>'Duo Saver','desc'=>'2 wraps or boxes, 2 sides, 2 drinks and a cheesecake.','image'=>'/menu/combos/DUO SAVER.jpg','category'=>'combos','best'=>false,'allergens'=>[],'dietary'=>[]],
        ['slug'=>'solo-feast','title'=>'Solo Feast','desc'=>'1 wrap or box, 1 side, 1 drink and a cheesecake.','image'=>'/menu/combos/SOLO FEAST.jpg','category'=>'combos','best'=>false,'allergens'=>[],'dietary'=>[]],
        ['slug'=>'family-feast-box','title'=>'Family Feast Box','desc'=>'4 wraps or boxes of your choice, 4 sides, 4 drinks and 2 cheesecakes. Perfect for sharing.','image'=>'/menu/combos/FAMILY FEAST BOX.jpg','category'=>'combos','best'=>false,'allergens'=>[],'dietary'=>[]],

        // ---------- DESSERTS ----------
        ['slug'=>'vegan-baklava','title'=>'Vegan Baklava','desc'=>'Dairy-free baklava with pistachios and plant-based syrup.','image'=>'/menu/desserts/Vegan Baklava-web.jpg','category'=>'desserts','best'=>false,'allergens'=>[['code'=>'NUTS','label'=>'Nuts']],'dietary'=>['VG','N']],
        ['slug'=>'homemade-cheesecake','title'=>'Homemade Cheesecake','desc'=>'Creamy cheesecake on a buttery biscuit base.','image'=>'/menu/desserts/CHEESECAKE-ORG.jpg','category'=>'desserts','best'=>false,'allergens'=>[['code'=>'MILK','label'=>'Milk'],['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>['V']],
        ['slug'=>'tiramisu','title'=>'Tiramisu','desc'=>'Coffee-soaked ladyfingers with mascarpone and cocoa.','image'=>'/menu/desserts/CHEESECAKE CHOCOLATE.jpg','category'=>'desserts','best'=>false,'allergens'=>[['code'=>'MILK','label'=>'Milk'],['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>['V']],
        ['slug'=>'banana-pudding','title'=>'Banana Pudding','desc'=>'Creamy banana pudding layered for a sweet finish.','image'=>'/menu/desserts/Banana Pudding-web.jpg','category'=>'desserts','best'=>false,'allergens'=>[['code'=>'MILK','label'=>'Milk']],'dietary'=>['V']],
        ['slug'=>'pistachio-baklava','title'=>'Pistachio Baklava','desc'=>'Traditional Turkish baklava with pistachios.','image'=>'/menu/desserts/Vegan Baklava-web.jpg','category'=>'desserts','best'=>false,'allergens'=>[['code'=>'NUTS','label'=>'Nuts'],['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>['V','N']],

        // ---------- SIDES ----------
        ['slug'=>'fries-regular','title'=>'Fries','desc'=>'Regular portion of golden fries.','image'=>'/menu/sides/chips.jpg','category'=>'sides','best'=>false,'allergens'=>[],'dietary'=>['VG']],
        ['slug'=>'onion-rings','title'=>'Onion Rings','desc'=>'6 pieces of crispy onion rings.','image'=>'/menu/sides/onion rings.jpg','category'=>'sides','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>['V']],
        ['slug'=>'chicken-nuggets-6-pieces','title'=>'Chicken Nuggets','desc'=>'6 pieces of crispy chicken nuggets served with dipping sauce.','image'=>'/menu/sides/chicken nuggets.jpg','category'=>'sides','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>[]],
        ['slug'=>'halloumi-4-pieces','title'=>'Halloumi','desc'=>'4 pieces of golden halloumi.','image'=>'/menu/sides/halloumi sticks.jpg','category'=>'sides','best'=>false,'allergens'=>[['code'=>'MILK','label'=>'Milk']],'dietary'=>['V']],
        ['slug'=>'mozzarella-sticks-4-pieces','title'=>'Mozzarella Sticks','desc'=>'4 pieces of crispy mozzarella sticks.','image'=>'/menu/sides/cheese sticks.jpg','category'=>'sides','best'=>false,'allergens'=>[['code'=>'MILK','label'=>'Milk'],['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>['V']],
        ['slug'=>'hummus-and-naan','title'=>'Hummus and Naan','desc'=>'Creamy hummus served with warm naan bread.','image'=>'/menu/sides/side salad.jpg','category'=>'sides','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>['V']],
        ['slug'=>'falafel-side','title'=>'Falafel','desc'=>'Crispy falafel served as a side.','image'=>'/menu/sides/FALAFEL.jpg','category'=>'sides','best'=>false,'allergens'=>[],'dietary'=>['V','VG']],
        ['slug'=>'cheese-bites','title'=>'Cheese Bites','desc'=>'Crispy chilli cheese bites.','image'=>'/menu/sides/chilli cheese bites.jpg','category'=>'sides','best'=>false,'allergens'=>[['code'=>'MILK','label'=>'Milk'],['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>['V']],
        ['slug'=>'rice-portion','title'=>'Rice Portion','desc'=>'Seasoned rice served as a side.','image'=>'/menu/sides/RICE.jpg','category'=>'sides','best'=>false,'allergens'=>[],'dietary'=>['VG','GF']],
        ['slug'=>'tortilla','title'=>'Tortilla','desc'=>'Soft tortilla bread served on the side.','image'=>'/menu/sides/chips box.jpg','category'=>'sides','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>['V']],
        ['slug'=>'side-salad','title'=>'Side Salad','desc'=>'Fresh mixed salad with crunchy vegetables.','image'=>'/menu/sides/side salad.jpg','category'=>'sides','best'=>false,'allergens'=>[],'dietary'=>['VG','GF']],
        ['slug'=>'zoogest-kids-nuggets','title'=>'Zoogest Kids Nuggets','desc'=>'Kids-size chicken nuggets portion.','image'=>'/menu/sides/chicken nuggets.jpg','category'=>'sides','best'=>false,'allergens'=>[['code'=>'GLUTEN','label'=>'Gluten']],'dietary'=>[]],

        // ---------- DRINKS ----------
        ['slug'=>'ayran','title'=>'Ayran','desc'=>'Classic chilled yoghurt drink.','image'=>'/menu/drinks/AYRAN-small.jpg','category'=>'drinks','best'=>false,'allergens'=>[['code'=>'MILK','label'=>'Milk']],'dietary'=>['V']],
        ['slug'=>'coke-zero','title'=>'Coke Zero','desc'=>'Chilled Coke Zero.','image'=>'/menu/drinks/COKE ZERO.jpg','category'=>'drinks','best'=>false,'allergens'=>[],'dietary'=>[]],
        ['slug'=>'diet-coke','title'=>'Diet Coke','desc'=>'Chilled Diet Coke.','image'=>'/menu/drinks/DIET COKE.jpg','category'=>'drinks','best'=>false,'allergens'=>[],'dietary'=>[]],
        ['slug'=>'fanta','title'=>'Fanta','desc'=>'Chilled Fanta.','image'=>'/menu/drinks/FANTA-small.jpg','category'=>'drinks','best'=>false,'allergens'=>[],'dietary'=>[]],
        ['slug'=>'fruit-shoot','title'=>'Fruit Shoot','desc'=>'Kids fruit drink.','image'=>'/menu/drinks/FRUIT SHOOT.jpg','category'=>'drinks','best'=>false,'allergens'=>[],'dietary'=>[]],
        ['slug'=>'sprite','title'=>'Sprite','desc'=>'Chilled Sprite.','image'=>'/menu/drinks/SPRITE.jpg','category'=>'drinks','best'=>false,'allergens'=>[],'dietary'=>[]],
    ];
}

function gbd_seed_locations() {
    $hours_standard = [
        ['day'=>'Mon','open'=>'11:00','close'=>'23:00'],
        ['day'=>'Tue','open'=>'11:00','close'=>'23:00'],
        ['day'=>'Wed','open'=>'11:00','close'=>'23:00'],
        ['day'=>'Thu','open'=>'11:00','close'=>'00:00'],
        ['day'=>'Fri','open'=>'11:00','close'=>'01:00'],
        ['day'=>'Sat','open'=>'11:00','close'=>'01:00'],
        ['day'=>'Sun','open'=>'12:00','close'=>'22:00'],
    ];
    $hours_picc = [
        ['day'=>'Mon','open'=>'11:00','close'=>'22:00'],
        ['day'=>'Tue','open'=>'11:00','close'=>'22:00'],
        ['day'=>'Wed','open'=>'11:00','close'=>'22:00'],
        ['day'=>'Thu','open'=>'11:00','close'=>'23:00'],
        ['day'=>'Fri','open'=>'11:00','close'=>'00:00'],
        ['day'=>'Sat','open'=>'11:00','close'=>'00:00'],
        ['day'=>'Sun','open'=>'12:00','close'=>'21:00'],
    ];
    return [
        ['slug'=>'deansgate','title'=>'GBD Deansgate','addr1'=>'Bridge Street','city'=>'Manchester','postcode'=>'M3 2BW','phone'=>'0161 000 1001','flagship'=>true,'lat'=>53.4794,'lng'=>-2.2442,'click'=>'https://order.gbdoner.com/deansgate','image'=>'/locations/Deansgate.png','hours'=>$hours_standard,'delivery'=>[['provider'=>'deliveroo','url'=>'https://deliveroo.co.uk/menu/manchester/deansgate/gbd'],['provider'=>'ubereats','url'=>'https://ubereats.com/gb/store/gbd-deansgate']]],
        ['slug'=>'liverpool','title'=>'GBD Liverpool','addr1'=>'Bold Street','city'=>'Liverpool','postcode'=>'L1 4EA','phone'=>'0151 000 1002','flagship'=>false,'lat'=>53.4084,'lng'=>-2.9916,'click'=>'https://order.gbdoner.com/liverpool','image'=>'/locations/Liverpool.png','hours'=>$hours_standard,'delivery'=>[['provider'=>'deliveroo','url'=>'https://deliveroo.co.uk/menu/liverpool/gbd'],['provider'=>'justeat','url'=>'https://just-eat.co.uk/restaurants-gbd-liverpool']]],
        ['slug'=>'piccadilly','title'=>'GBD Piccadilly','addr1'=>'Piccadilly Plaza','city'=>'Manchester','postcode'=>'M1 1AD','phone'=>'0161 000 1003','flagship'=>false,'lat'=>53.4812,'lng'=>-2.2376,'click'=>'https://order.gbdoner.com/piccadilly','image'=>'/locations/Piccadilly.webp','hours'=>$hours_picc,'delivery'=>[['provider'=>'ubereats','url'=>'https://ubereats.com/gb/store/gbd-piccadilly']]],
    ];
}

function gbd_seed_posts() {
    return [
        ['slug'=>'the-protein-truth','title'=>"The Protein Truth: What's Actually in a Doner",'excerpt'=>"We break down the macros, the marketing, and what 'real food' should mean for fast-casual in 2026.",'date'=>'2026-04-22','category'=>'Nutrition'],
        ['slug'=>'shoreditch-spotlight','title'=>'Shoreditch Spotlight: The Crew Behind the Spit','excerpt'=>'Meet the team turning out 800 bowls a day without losing the plot.','date'=>'2026-04-10','category'=>'Community'],
        ['slug'=>'urban-kineticism','title'=>"Urban Kineticism: Designing for a City That Doesn't Sit Still",'excerpt'=>"Why our spaces are built around motion, queues, and the 90-second lunch.",'date'=>'2026-03-28','category'=>'Design'],
    ];
}

// ============================================================================
// IMPORT LOGIC
// ============================================================================

function gbd_seed_run() {
    $created = ['menu' => 0, 'location' => 0, 'post' => 0];
    $skipped = ['menu' => 0, 'location' => 0, 'post' => 0];

    // --- Menu items ---
    foreach (gbd_seed_menu_items() as $m) {
        $existing = get_page_by_path($m['slug'], OBJECT, 'menu_item');
        if ($existing) { $skipped['menu']++; continue; }

        $id = wp_insert_post([
            'post_title'   => $m['title'],
            'post_name'    => $m['slug'],
            'post_excerpt' => $m['desc'],
            'post_status'  => 'publish',
            'post_type'    => 'menu_item',
        ], true);
        if (is_wp_error($id)) continue;

        carbon_set_post_meta($id, 'price_gbp', '');
        carbon_set_post_meta($id, 'is_best_seller', !empty($m['best']));
        carbon_set_post_meta($id, 'category', $m['category']);
        carbon_set_post_meta($id, 'image_url', $m['image']);
        carbon_set_post_meta($id, 'dietary_flags', $m['dietary']);
        carbon_set_post_meta($id, 'allergens', $m['allergens']);
        $created['menu']++;
    }

    // --- Locations ---
    foreach (gbd_seed_locations() as $l) {
        $existing = get_page_by_path($l['slug'], OBJECT, 'location');
        if ($existing) { $skipped['location']++; continue; }

        $id = wp_insert_post([
            'post_title'  => $l['title'],
            'post_name'   => $l['slug'],
            'post_status' => 'publish',
            'post_type'   => 'location',
        ], true);
        if (is_wp_error($id)) continue;

        carbon_set_post_meta($id, 'address_line1',         $l['addr1']);
        carbon_set_post_meta($id, 'city',                  $l['city']);
        carbon_set_post_meta($id, 'postcode',              $l['postcode']);
        carbon_set_post_meta($id, 'phone',                 $l['phone']);
        carbon_set_post_meta($id, 'is_flagship',           !empty($l['flagship']));
        carbon_set_post_meta($id, 'lat',                   $l['lat']);
        carbon_set_post_meta($id, 'lng',                   $l['lng']);
        carbon_set_post_meta($id, 'click_and_collect_url', $l['click']);
        carbon_set_post_meta($id, 'image_url',             $l['image']);
        carbon_set_post_meta($id, 'hours',                 $l['hours']);
        carbon_set_post_meta($id, 'delivery_links',        $l['delivery']);
        $created['location']++;
    }

    // --- Posts ---
    foreach (gbd_seed_posts() as $p) {
        $existing = get_page_by_path($p['slug'], OBJECT, 'post');
        if ($existing) { $skipped['post']++; continue; }

        $cat_id = get_cat_ID($p['category']);
        if (!$cat_id) {
            $cat = wp_insert_term($p['category'], 'category');
            $cat_id = is_array($cat) && !is_wp_error($cat) ? (int) $cat['term_id'] : 0;
        }

        $id = wp_insert_post([
            'post_title'    => $p['title'],
            'post_name'     => $p['slug'],
            'post_excerpt'  => $p['excerpt'],
            'post_content'  => '<p>' . esc_html($p['excerpt']) . '</p><p><em>Full article content goes here. Edit this post in WordPress to add your story.</em></p>',
            'post_status'   => 'publish',
            'post_type'     => 'post',
            'post_date'     => $p['date'] . ' 12:00:00',
            'post_category' => $cat_id ? [$cat_id] : [],
        ], true);
        if (is_wp_error($id)) continue;
        $created['post']++;
    }

    update_option('gbd_seeder_last_run', current_time('mysql'));
    return ['created' => $created, 'skipped' => $skipped];
}

// ============================================================================
// ADMIN PAGE (Tools -> GBD Seeder)
// ============================================================================

add_action('admin_menu', function () {
    add_management_page('GBD Seeder', 'GBD Seeder', 'manage_options', 'gbd-seeder', 'gbd_seeder_page');
});

function gbd_seeder_page() {
    if (!current_user_can('manage_options')) return;

    $result = null;
    if (isset($_POST['gbd_seeder_run']) && check_admin_referer('gbd_seeder_run')) {
        $result = gbd_seed_run();
    }

    $last_run = get_option('gbd_seeder_last_run');
    $menu_count     = (int) wp_count_posts('menu_item')->publish;
    $location_count = (int) wp_count_posts('location')->publish;
    $post_count     = (int) wp_count_posts('post')->publish;

    echo '<div class="wrap">';
    echo '<h1>GBD Seeder</h1>';
    echo '<p>One-shot import of the existing site content (menu items, locations, blog posts) into WordPress. Safe to re-run — anything already present (matched by slug) is skipped.</p>';

    echo '<h2>Current content</h2>';
    echo '<table class="widefat" style="max-width:480px"><tbody>';
    echo "<tr><td>Menu items (published)</td><td><strong>$menu_count</strong></td></tr>";
    echo "<tr><td>Locations (published)</td><td><strong>$location_count</strong></td></tr>";
    echo "<tr><td>Blog posts (published)</td><td><strong>$post_count</strong></td></tr>";
    echo '</tbody></table>';

    if ($last_run) {
        echo '<p><em>Last run: ' . esc_html($last_run) . '</em></p>';
    }

    if ($result) {
        echo '<div class="notice notice-success" style="padding:14px 18px"><h3 style="margin-top:0">Seeder finished</h3>';
        echo '<ul style="list-style:disc;margin-left:20px">';
        echo '<li>Menu items: <strong>' . (int)$result['created']['menu'] . ' created</strong>, ' . (int)$result['skipped']['menu'] . ' skipped (already existed)</li>';
        echo '<li>Locations: <strong>' . (int)$result['created']['location'] . ' created</strong>, ' . (int)$result['skipped']['location'] . ' skipped</li>';
        echo '<li>Posts: <strong>' . (int)$result['created']['post'] . ' created</strong>, ' . (int)$result['skipped']['post'] . ' skipped</li>';
        echo '</ul></div>';
    }

    echo '<h2 style="margin-top:30px">Run seeder</h2>';
    echo '<form method="post">';
    wp_nonce_field('gbd_seeder_run');
    echo '<p><button type="submit" name="gbd_seeder_run" value="1" class="button button-primary button-large">Import all mock content into WordPress</button></p>';
    echo '<p class="description">Imports ~45 menu items, 3 locations, and 3 starter blog posts. Image fields point at <code>/public/menu/...</code> and <code>/public/locations/...</code> — those assets already live in the Next.js project.</p>';
    echo '</form>';

    echo '</div>';
}
