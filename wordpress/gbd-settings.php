<?php
/**
 * Plugin Name: GBD Site Settings
 * Description: Site-wide editable copy (catering form copy + recipient, etc.) via Carbon Fields theme options. Exposed under siteSettings.* in WPGraphQL.
 * Version: 1.0.0
 * Author: GBD Doner
 *
 * Requires: gbd-schema.php (which boots Carbon Fields) to be active.
 */

if (!defined('ABSPATH')) exit;

// -----------------------------------------------------------------------------
// 1. Theme Options page — "Site Settings" in the WP admin sidebar
// -----------------------------------------------------------------------------

add_action('carbon_fields_register_fields', function () {
    if (!class_exists('\Carbon_Fields\Container\Container')) return;

    $Container = '\Carbon_Fields\Container\Container';
    $Field     = '\Carbon_Fields\Field\Field';

    $Container::make('theme_options', __('Site Settings'))
        ->set_icon('dashicons-admin-settings')
        ->add_tab(__('Catering Form'), [
            // ---------- Section copy ----------
            $Field::make('separator', 'sep_section', __('Section copy (the left column above the form)')),

            $Field::make('text', 'catering_eyebrow', __('Section eyebrow'))
                ->set_default_value('05 — Enquiry'),

            $Field::make('textarea', 'catering_heading_lines', __('Heading (one line per row)'))
                ->set_rows(3)
                ->help_text("Each line is rendered as its own block. A '.' anywhere is auto-styled as a red accent dot.")
                ->set_default_value("Let's fuel\nyour next\nevent."),

            $Field::make('textarea', 'catering_lead', __('Lead paragraph'))
                ->set_rows(3)
                ->set_default_value("Tell us a little about your event. We'll come back with a tailored menu, pricing, and timings — within one working day."),

            // ---------- Field labels & placeholders ----------
            $Field::make('separator', 'sep_fields', __('Form field labels & placeholders')),

            $Field::make('text', 'catering_field_name_label',       __('Name — label'))->set_default_value('Name'),
            $Field::make('text', 'catering_field_name_placeholder', __('Name — placeholder'))->set_default_value('Jane Smith'),

            $Field::make('text', 'catering_field_email_label',       __('Email — label'))->set_default_value('Email'),
            $Field::make('text', 'catering_field_email_placeholder', __('Email — placeholder'))->set_default_value('jane@company.com'),

            $Field::make('text', 'catering_field_company_label',       __('Company — label'))->set_default_value('Company'),
            $Field::make('text', 'catering_field_company_placeholder', __('Company — placeholder'))->set_default_value('Company Ltd.'),

            $Field::make('text', 'catering_field_headcount_label',       __('Headcount — label'))->set_default_value('Headcount'),
            $Field::make('text', 'catering_field_headcount_placeholder', __('Headcount — placeholder'))->set_default_value('e.g. 40'),

            $Field::make('text', 'catering_field_message_label',       __('Message — label'))->set_default_value('Tell us about the event'),
            $Field::make('text', 'catering_field_message_placeholder', __('Message — placeholder'))->set_default_value('Date, venue, vibe — anything that helps us plan.'),

            // ---------- Submit + status ----------
            $Field::make('separator', 'sep_submit', __('Submit button & status messages')),

            $Field::make('text', 'catering_submit_label',         __('Submit button — label'))->set_default_value('Send Brief'),
            $Field::make('text', 'catering_submit_label_sending', __('Submit button — while sending'))->set_default_value('Sending…'),

            $Field::make('text', 'catering_status_idle',    __('Status — idle'))->set_default_value("We'll get back to you within one working day."),
            $Field::make('text', 'catering_status_sending', __('Status — sending'))->set_default_value("Sending your brief…"),
            $Field::make('text', 'catering_status_success', __('Status — success'))->set_default_value("Thanks — your brief is in. We'll reply shortly."),
            $Field::make('text', 'catering_status_error',   __('Status — error'))->set_default_value("Something went wrong — please try again."),

            // ---------- Submission ----------
            $Field::make('separator', 'sep_submission', __('Where the enquiries go')),

            $Field::make('text', 'catering_recipient_email', __('Recipient email'))
                ->set_attribute('type', 'email')
                ->help_text('All enquiries from this form get emailed here. Leave blank to fall back to the .env CATERING_EMAIL_TO value.')
                ->set_default_value(''),
        ])

        // -------------------------------------------------------------
        // Locations Page tab
        // -------------------------------------------------------------
        ->add_tab(__('Locations Page'), [
            $Field::make('separator', 'sep_loc_copy', __('Sidebar header (shown above the branch list)')),

            $Field::make('text', 'locations_eyebrow', __('Eyebrow'))
                ->set_default_value('Locations'),

            $Field::make('text', 'locations_heading', __('Heading'))
                ->set_default_value('Find your nearest branch for pickup or delivery.'),

            $Field::make('separator', 'sep_loc_empty', __('Empty state')),

            $Field::make('text', 'locations_empty_state', __('Shown when the search returns no branches'))
                ->set_default_value('No locations match your search.'),
        ])

        // -------------------------------------------------------------
        // Feed (Blog) Page tab
        // -------------------------------------------------------------
        ->add_tab(__('Feed (Blog) Page'), [
            $Field::make('separator', 'sep_feed_copy', __('Hero (left column above the featured article)')),

            $Field::make('text', 'feed_eyebrow', __('Eyebrow'))
                ->set_default_value('The Feed'),

            $Field::make('textarea', 'feed_heading_lines', __('Heading (one line per row)'))
                ->set_rows(3)
                ->help_text("Each line renders as its own block. A '.' anywhere is auto-styled as a red accent dot.")
                ->set_default_value("Words from\nthe spit."),

            $Field::make('textarea', 'feed_lead', __('Lead paragraph'))
                ->set_rows(3)
                ->set_default_value('Nutrition deep-dives, store openings, and the people behind the brand.'),

            $Field::make('separator', 'sep_feed_empty', __('Empty state')),

            $Field::make('text', 'feed_empty_state', __('Shown when there are no articles to display'))
                ->set_default_value('More stories arriving soon.'),
        ]);
});

// -----------------------------------------------------------------------------
// 2. GraphQL exposure  ->  siteSettings.catering
// -----------------------------------------------------------------------------

add_action('graphql_register_types', function () {

    register_graphql_object_type('CateringFormSettings', [
        'description' => 'Editable copy + submission settings for the catering enquiry form.',
        'fields' => [
            'eyebrow'             => ['type' => 'String'],
            'headingLines'        => ['type' => ['list_of' => 'String']],
            'lead'                => ['type' => 'String'],

            'fieldNameLabel'       => ['type' => 'String'],
            'fieldNamePlaceholder' => ['type' => 'String'],
            'fieldEmailLabel'       => ['type' => 'String'],
            'fieldEmailPlaceholder' => ['type' => 'String'],
            'fieldCompanyLabel'       => ['type' => 'String'],
            'fieldCompanyPlaceholder' => ['type' => 'String'],
            'fieldHeadcountLabel'       => ['type' => 'String'],
            'fieldHeadcountPlaceholder' => ['type' => 'String'],
            'fieldMessageLabel'       => ['type' => 'String'],
            'fieldMessagePlaceholder' => ['type' => 'String'],

            'submitLabel'         => ['type' => 'String'],
            'submitLabelSending'  => ['type' => 'String'],

            'statusIdle'    => ['type' => 'String'],
            'statusSending' => ['type' => 'String'],
            'statusSuccess' => ['type' => 'String'],
            'statusError'   => ['type' => 'String'],

            'recipientEmail' => ['type' => 'String'],
        ],
    ]);

    register_graphql_object_type('LocationsPageSettings', [
        'description' => 'Editable copy on the /locations page.',
        'fields' => [
            'eyebrow'    => ['type' => 'String'],
            'heading'    => ['type' => 'String'],
            'emptyState' => ['type' => 'String'],
        ],
    ]);

    register_graphql_object_type('FeedPageSettings', [
        'description' => 'Editable copy on the /feed (blog) page.',
        'fields' => [
            'eyebrow'      => ['type' => 'String'],
            'headingLines' => ['type' => ['list_of' => 'String']],
            'lead'         => ['type' => 'String'],
            'emptyState'   => ['type' => 'String'],
        ],
    ]);

    register_graphql_object_type('SiteSettings', [
        'description' => 'Site-wide editable settings.',
        'fields' => [
            'catering'  => ['type' => 'CateringFormSettings'],
            'locations' => ['type' => 'LocationsPageSettings'],
            'feed'      => ['type' => 'FeedPageSettings'],
        ],
    ]);

    register_graphql_field('RootQuery', 'siteSettings', [
        'type'    => 'SiteSettings',
        'resolve' => function () {
            $heading_raw = carbon_get_theme_option('catering_heading_lines') ?: '';
            $heading_lines = array_values(array_filter(array_map('trim', preg_split("/\r\n|\r|\n/", $heading_raw))));

            return [
                'catering' => [
                    'eyebrow'      => carbon_get_theme_option('catering_eyebrow') ?: null,
                    'headingLines' => $heading_lines,
                    'lead'         => carbon_get_theme_option('catering_lead') ?: null,

                    'fieldNameLabel'            => carbon_get_theme_option('catering_field_name_label') ?: null,
                    'fieldNamePlaceholder'      => carbon_get_theme_option('catering_field_name_placeholder') ?: null,
                    'fieldEmailLabel'           => carbon_get_theme_option('catering_field_email_label') ?: null,
                    'fieldEmailPlaceholder'     => carbon_get_theme_option('catering_field_email_placeholder') ?: null,
                    'fieldCompanyLabel'         => carbon_get_theme_option('catering_field_company_label') ?: null,
                    'fieldCompanyPlaceholder'   => carbon_get_theme_option('catering_field_company_placeholder') ?: null,
                    'fieldHeadcountLabel'       => carbon_get_theme_option('catering_field_headcount_label') ?: null,
                    'fieldHeadcountPlaceholder' => carbon_get_theme_option('catering_field_headcount_placeholder') ?: null,
                    'fieldMessageLabel'         => carbon_get_theme_option('catering_field_message_label') ?: null,
                    'fieldMessagePlaceholder'   => carbon_get_theme_option('catering_field_message_placeholder') ?: null,

                    'submitLabel'        => carbon_get_theme_option('catering_submit_label') ?: null,
                    'submitLabelSending' => carbon_get_theme_option('catering_submit_label_sending') ?: null,

                    'statusIdle'    => carbon_get_theme_option('catering_status_idle') ?: null,
                    'statusSending' => carbon_get_theme_option('catering_status_sending') ?: null,
                    'statusSuccess' => carbon_get_theme_option('catering_status_success') ?: null,
                    'statusError'   => carbon_get_theme_option('catering_status_error') ?: null,

                    'recipientEmail' => carbon_get_theme_option('catering_recipient_email') ?: null,
                ],
                'locations' => [
                    'eyebrow'    => carbon_get_theme_option('locations_eyebrow') ?: null,
                    'heading'    => carbon_get_theme_option('locations_heading') ?: null,
                    'emptyState' => carbon_get_theme_option('locations_empty_state') ?: null,
                ],
                'feed' => (function () {
                    $feed_heading_raw = carbon_get_theme_option('feed_heading_lines') ?: '';
                    $feed_heading_lines = array_values(array_filter(array_map('trim', preg_split("/\r\n|\r|\n/", $feed_heading_raw))));
                    return [
                        'eyebrow'      => carbon_get_theme_option('feed_eyebrow') ?: null,
                        'headingLines' => $feed_heading_lines,
                        'lead'         => carbon_get_theme_option('feed_lead') ?: null,
                        'emptyState'   => carbon_get_theme_option('feed_empty_state') ?: null,
                    ];
                })(),
            ];
        },
    ]);
});
