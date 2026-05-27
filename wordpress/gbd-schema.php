<?php
/**
 * Plugin Name: GBD Schema (Carbon Fields + WPGraphQL)
 * Description: Defines admin fields for menu_item / location CPTs via Carbon Fields, then exposes them under the same GraphQL shape the Next.js frontend already queries (menuItemFields / locationFields).
 * Version: 1.0.0
 * Author: GBD Doner
 *
 * Requires:
 *   - WPGraphQL (active)
 *   - Carbon Fields source extracted to wp-content/mu-plugins/carbon-fields/
 *     (so this file can require its loader.php — see wordpress/README.md)
 */

if (!defined('ABSPATH')) exit;

// -----------------------------------------------------------------------------
// 1. Bootstrap Carbon Fields
// -----------------------------------------------------------------------------

// Composer autoload (only present if Carbon Fields was installed via composer).
$gbd_carbon_autoload = __DIR__ . '/carbon-fields/vendor/autoload.php';
if (file_exists($gbd_carbon_autoload)) {
    require_once $gbd_carbon_autoload;
}

add_action('after_setup_theme', function () {
    if (class_exists('\Carbon_Fields\Carbon_Fields')) {
        \Carbon_Fields\Carbon_Fields::boot();
    }
});

// -----------------------------------------------------------------------------
// 2. Register admin fields
// -----------------------------------------------------------------------------

add_action('carbon_fields_register_fields', function () {
    if (!class_exists('\Carbon_Fields\Container\Container')) return;

    $Container = '\Carbon_Fields\Container\Container';
    $Field     = '\Carbon_Fields\Field\Field';

    // ---------- Menu Item Fields ----------
    $Container::make('post_meta', __('Menu Item Fields'))
        ->where('post_type', '=', 'menu_item')
        ->add_fields([
            $Field::make('text', 'price_gbp', __('Price (GBP)'))
                ->set_attribute('type', 'number')
                ->set_attribute('step', '0.01')
                ->set_required(true),

            $Field::make('checkbox', 'is_best_seller', __('Best Seller?'))
                ->set_option_value('yes'),

            $Field::make('select', 'category', __('Category'))
                ->set_required(true)
                ->add_options([
                    'boxes'    => 'Boxes',
                    'wraps'    => 'Wraps',
                    'burgers'  => 'Burgers',
                    'combos'   => 'Combos',
                    'sides'    => 'Sides',
                    'drinks'   => 'Drinks',
                    'desserts' => 'Desserts',
                ]),

            $Field::make('text', 'image_url', __('Image URL / Path'))
                ->help_text('Public path like /menu/boxes/foo.jpg, OR a full external URL. Leave blank to use the WP Featured Image instead.'),

            $Field::make('set', 'dietary_flags', __('Dietary flags'))
                ->add_options([
                    'V'  => 'Vegetarian (V)',
                    'VG' => 'Vegan (VG)',
                    'GF' => 'Gluten-free (GF)',
                    'DF' => 'Dairy-free (DF)',
                    'N'  => 'Contains nuts (N)',
                ]),

            $Field::make('complex', 'allergens', __('Allergens'))
                ->add_fields([
                    $Field::make('text', 'code', __('Code')),
                    $Field::make('text', 'label', __('Label')),
                ])
                ->set_header_template('<%- label || code %>'),

            $Field::make('complex', 'nutrition', __('Nutrition'))
                ->set_max(1)
                ->add_fields([
                    $Field::make('text', 'calories', __('Calories'))->set_attribute('type', 'number'),
                    $Field::make('text', 'protein',  __('Protein (g)'))->set_attribute('type', 'number'),
                    $Field::make('text', 'carbs',    __('Carbs (g)'))->set_attribute('type', 'number'),
                    $Field::make('text', 'fat',      __('Fat (g)'))->set_attribute('type', 'number'),
                ]),
        ]);

    // ---------- Location Fields ----------
    $Container::make('post_meta', __('Location Fields'))
        ->where('post_type', '=', 'location')
        ->add_fields([
            $Field::make('text', 'address_line1', __('Address Line 1'))->set_required(true),
            $Field::make('text', 'address_line2', __('Address Line 2')),
            $Field::make('text', 'city',          __('City'))->set_required(true),
            $Field::make('text', 'postcode',      __('Postcode'))->set_required(true),
            $Field::make('text', 'phone',         __('Phone')),

            $Field::make('checkbox', 'is_flagship', __('Flagship Branch?'))
                ->help_text('Renders a flagship badge in the UI.')
                ->set_option_value('yes'),

            $Field::make('text', 'lat', __('Latitude'))
                ->set_attribute('type', 'number')->set_attribute('step', '0.0000001')->set_required(true),
            $Field::make('text', 'lng', __('Longitude'))
                ->set_attribute('type', 'number')->set_attribute('step', '0.0000001')->set_required(true),

            $Field::make('text', 'click_and_collect_url', __('Click + Collect URL')),

            $Field::make('text', 'image_url', __('Image URL / Path'))
                ->help_text('Public path like /locations/Deansgate.png, OR a full external URL. Leave blank to use the WP Featured Image instead.'),

            $Field::make('complex', 'delivery_links', __('Delivery Links'))
                ->add_fields([
                    $Field::make('select', 'provider', __('Provider'))->add_options([
                        'deliveroo' => 'Deliveroo',
                        'ubereats'  => 'Uber Eats',
                        'justeat'   => 'Just Eat',
                    ]),
                    $Field::make('text', 'url', __('URL')),
                ])
                ->set_header_template('<%- provider %>'),

            $Field::make('complex', 'hours', __('Opening Hours'))
                ->add_fields([
                    $Field::make('select', 'day', __('Day'))->add_options([
                        'Mon' => 'Mon', 'Tue' => 'Tue', 'Wed' => 'Wed',
                        'Thu' => 'Thu', 'Fri' => 'Fri', 'Sat' => 'Sat', 'Sun' => 'Sun',
                    ]),
                    $Field::make('text', 'open',  __('Open')),
                    $Field::make('text', 'close', __('Close')),
                ])
                ->set_header_template('<%- day %>: <%- open %> – <%- close %>'),
        ]);
});

// -----------------------------------------------------------------------------
// 3. Expose fields under the existing GraphQL shape
//    (Matches src/data/graphql/queries.ts so the frontend needs no changes.)
// -----------------------------------------------------------------------------

add_action('graphql_register_types', function () {

    // ---------- Object types ----------

    register_graphql_object_type('Allergen', [
        'fields' => [
            'code'  => ['type' => 'String'],
            'label' => ['type' => 'String'],
        ],
    ]);

    register_graphql_object_type('NutritionFacts', [
        'fields' => [
            'calories' => ['type' => 'Float'],
            'protein'  => ['type' => 'Float'],
            'carbs'    => ['type' => 'Float'],
            'fat'      => ['type' => 'Float'],
        ],
    ]);

    register_graphql_object_type('MenuItemFields', [
        'fields' => [
            'priceGbp'     => ['type' => 'Float'],
            'isBestSeller' => ['type' => 'Boolean'],
            'category'     => ['type' => 'String'],
            'imageUrl'     => ['type' => 'String'],
            'dietaryFlags' => ['type' => ['list_of' => 'String']],
            'allergens'    => ['type' => ['list_of' => 'Allergen']],
            'nutrition'    => ['type' => 'NutritionFacts'],
        ],
    ]);

    register_graphql_object_type('DeliveryLink', [
        'fields' => [
            'provider' => ['type' => 'String'],
            'url'      => ['type' => 'String'],
        ],
    ]);

    register_graphql_object_type('OpeningHours', [
        'fields' => [
            'day'   => ['type' => 'String'],
            'open'  => ['type' => 'String'],
            'close' => ['type' => 'String'],
        ],
    ]);

    register_graphql_object_type('LocationFields', [
        'fields' => [
            'addressLine1'        => ['type' => 'String'],
            'addressLine2'        => ['type' => 'String'],
            'city'                => ['type' => 'String'],
            'postcode'            => ['type' => 'String'],
            'phone'               => ['type' => 'String'],
            'isFlagship'          => ['type' => 'Boolean'],
            'lat'                 => ['type' => 'Float'],
            'lng'                 => ['type' => 'Float'],
            'clickAndCollectUrl'  => ['type' => 'String'],
            'imageUrl'            => ['type' => 'String'],
            'deliveryLinks'       => ['type' => ['list_of' => 'DeliveryLink']],
            'hours'               => ['type' => ['list_of' => 'OpeningHours']],
        ],
    ]);

    // ---------- Resolvers ----------

    register_graphql_field('MenuProduct', 'menuItemFields', [
        'type'    => 'MenuItemFields',
        'resolve' => function ($post) {
            $id = $post->ID;
            $price = carbon_get_post_meta($id, 'price_gbp');
            $nutrition_rows = carbon_get_post_meta($id, 'nutrition');
            $nutrition = (is_array($nutrition_rows) && !empty($nutrition_rows)) ? $nutrition_rows[0] : null;

            $dietary = carbon_get_post_meta($id, 'dietary_flags');
            if (!is_array($dietary)) $dietary = [];

            return [
                'priceGbp'     => ($price === '' || $price === null) ? null : (float) $price,
                'isBestSeller' => (bool) carbon_get_post_meta($id, 'is_best_seller'),
                'category'     => carbon_get_post_meta($id, 'category') ?: null,
                'imageUrl'     => carbon_get_post_meta($id, 'image_url') ?: null,
                'dietaryFlags' => $dietary,
                'allergens'    => carbon_get_post_meta($id, 'allergens') ?: [],
                'nutrition'    => $nutrition ? [
                    'calories' => isset($nutrition['calories']) && $nutrition['calories'] !== '' ? (float) $nutrition['calories'] : null,
                    'protein'  => isset($nutrition['protein'])  && $nutrition['protein']  !== '' ? (float) $nutrition['protein']  : null,
                    'carbs'    => isset($nutrition['carbs'])    && $nutrition['carbs']    !== '' ? (float) $nutrition['carbs']    : null,
                    'fat'      => isset($nutrition['fat'])      && $nutrition['fat']      !== '' ? (float) $nutrition['fat']      : null,
                ] : null,
            ];
        },
    ]);

    register_graphql_field('Branch', 'locationFields', [
        'type'    => 'LocationFields',
        'resolve' => function ($post) {
            $id = $post->ID;
            $lat = carbon_get_post_meta($id, 'lat');
            $lng = carbon_get_post_meta($id, 'lng');

            return [
                'addressLine1'       => carbon_get_post_meta($id, 'address_line1') ?: null,
                'addressLine2'       => carbon_get_post_meta($id, 'address_line2') ?: null,
                'city'               => carbon_get_post_meta($id, 'city') ?: null,
                'postcode'           => carbon_get_post_meta($id, 'postcode') ?: null,
                'phone'              => carbon_get_post_meta($id, 'phone') ?: null,
                'isFlagship'         => (bool) carbon_get_post_meta($id, 'is_flagship'),
                'lat'                => ($lat === '' || $lat === null) ? null : (float) $lat,
                'lng'                => ($lng === '' || $lng === null) ? null : (float) $lng,
                'clickAndCollectUrl' => carbon_get_post_meta($id, 'click_and_collect_url') ?: null,
                'imageUrl'           => carbon_get_post_meta($id, 'image_url') ?: null,
                'deliveryLinks'      => carbon_get_post_meta($id, 'delivery_links') ?: [],
                'hours'              => carbon_get_post_meta($id, 'hours') ?: [],
            ];
        },
    ]);
});
