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
        ])

        // -------------------------------------------------------------
        // Home Page tab
        // -------------------------------------------------------------
        ->add_tab(__('Home Page'), [
            $Field::make('separator', 'sep_home_hero', __('Hero Section')),
            $Field::make('text', 'home_hero_video_url', __('Hero Video URL / Path'))
                ->help_text('e.g. /banner/0515(3).mp4'),
            $Field::make('text', 'home_hero_title_line_1', __('Hero Title Line 1')),
            $Field::make('text', 'home_hero_title_line_2', __('Hero Title Line 2')),
            $Field::make('text', 'home_hero_title_line_3', __('Hero Title Line 3')),
            $Field::make('textarea', 'home_hero_lead', __('Hero Lead Paragraph'))
                ->set_rows(2),

            $Field::make('separator', 'sep_home_cravings', __('Cravings Section')),
            $Field::make('text', 'home_cravings_eyebrow', __('Cravings Eyebrow')),
            $Field::make('text', 'home_cravings_heading_line_1', __('Cravings Heading Line 1')),
            $Field::make('text', 'home_cravings_heading_line_2', __('Cravings Heading Line 2')),

            $Field::make('separator', 'sep_home_cravings_card1', __('Cravings Card 1 (Left)')),
            $Field::make('text', 'home_cravings_card1_label', __('Card 1 Label')),
            $Field::make('text', 'home_cravings_card1_title', __('Card 1 Title')),
            $Field::make('textarea', 'home_cravings_card1_desc', __('Card 1 Description'))
                ->set_rows(2),
            $Field::make('text', 'home_cravings_card1_image_url', __('Card 1 Image URL / Path')),

            $Field::make('separator', 'sep_home_cravings_card2', __('Cravings Card 2 (Right)')),
            $Field::make('text', 'home_cravings_card2_label', __('Card 2 Label')),
            $Field::make('text', 'home_cravings_card2_title', __('Card 2 Title')),
            $Field::make('textarea', 'home_cravings_card2_desc', __('Card 2 Description'))
                ->set_rows(2),
            $Field::make('text', 'home_cravings_card2_image_url', __('Card 2 Image URL / Path')),
        ])

        // -------------------------------------------------------------
        // Our Story Page tab
        // -------------------------------------------------------------
        ->add_tab(__('Our Story Page'), [
            $Field::make('separator', 'sep_story_hero', __('Hero Section')),
            $Field::make('text', 'story_hero_image_url', __('Hero Image URL / Path')),
            $Field::make('text', 'story_hero_eyebrow', __('Hero Eyebrow')),
            $Field::make('text', 'story_hero_title_line_1', __('Hero Title Line 1')),
            $Field::make('text', 'story_hero_title_line_2', __('Hero Title Line 2')),
            $Field::make('textarea', 'story_hero_subheading', __('Hero Subheading'))
                ->set_rows(2),

            $Field::make('separator', 'sep_story_philosophy', __('Philosophy Section')),
            $Field::make('text', 'story_philosophy_eyebrow', __('Philosophy Eyebrow')),
            $Field::make('text', 'story_philosophy_heading_line_1', __('Philosophy Heading Line 1')),
            $Field::make('text', 'story_philosophy_heading_line_2', __('Philosophy Heading Line 2')),
            $Field::make('textarea', 'story_philosophy_lead_paragraph', __('Philosophy Lead Paragraph'))
                ->set_rows(4)
                ->help_text('Use \n for line breaks'),
            $Field::make('textarea', 'story_philosophy_secondary_text', __('Philosophy Secondary Text'))
                ->set_rows(6)
                ->help_text('Use \n for line breaks'),
            $Field::make('text', 'story_philosophy_tags', __('Philosophy Tags'))
                ->help_text('e.g. British Kebab Awards · PETA Approved'),
            $Field::make('text', 'story_philosophy_image1_url', __('Philosophy Image 1 URL / Path')),
            $Field::make('text', 'story_philosophy_image2_url', __('Philosophy Image 2 URL / Path')),
            $Field::make('text', 'story_philosophy_stat_value', __('Philosophy Stat Value'))
                ->help_text('e.g. 4.9★'),
            $Field::make('text', 'story_philosophy_stat_label', __('Philosophy Stat Label'))
                ->help_text('e.g. Average Google rating across our stores'),
            $Field::make('text', 'story_philosophy_tag_label', __('Philosophy Tag Label'))
                ->help_text('e.g. The GBD Standard'),

            $Field::make('separator', 'sep_story_blueprint', __('Blueprint Section')),
            $Field::make('text', 'story_blueprint_eyebrow', __('Blueprint Eyebrow')),
            $Field::make('text', 'story_blueprint_heading', __('Blueprint Heading')),
            $Field::make('textarea', 'story_blueprint_desc', __('Blueprint Description'))
                ->set_rows(2),

            $Field::make('separator', 'sep_story_blueprint_pt1', __('Blueprint Point 1')),
            $Field::make('text', 'story_blueprint_pt1_eyebrow', __('Pt 1 Eyebrow')),
            $Field::make('text', 'story_blueprint_pt1_title', __('Pt 1 Title')),
            $Field::make('textarea', 'story_blueprint_pt1_desc', __('Pt 1 Description'))
                ->set_rows(2),
            $Field::make('text', 'story_blueprint_pt1_image_url', __('Pt 1 Image URL / Path')),

            $Field::make('separator', 'sep_story_blueprint_pt2', __('Blueprint Point 2')),
            $Field::make('text', 'story_blueprint_pt2_eyebrow', __('Pt 2 Eyebrow')),
            $Field::make('text', 'story_blueprint_pt2_title', __('Pt 2 Title')),
            $Field::make('textarea', 'story_blueprint_pt2_desc', __('Pt 2 Description'))
                ->set_rows(2),
            $Field::make('text', 'story_blueprint_pt2_watermark', __('Pt 2 Watermark Text'))
                ->help_text('e.g. VG'),

            $Field::make('separator', 'sep_story_blueprint_pt3', __('Blueprint Point 3')),
            $Field::make('text', 'story_blueprint_pt3_eyebrow', __('Pt 3 Eyebrow')),
            $Field::make('text', 'story_blueprint_pt3_title', __('Pt 3 Title')),
            $Field::make('textarea', 'story_blueprint_pt3_desc', __('Pt 3 Description'))
                ->set_rows(2),
            $Field::make('text', 'story_blueprint_pt3_image_url', __('Pt 3 Image URL / Path')),

            $Field::make('separator', 'sep_story_community', __('Community Section')),
            $Field::make('text', 'story_community_eyebrow', __('Community Eyebrow')),
            $Field::make('text', 'story_community_heading', __('Community Heading')),
            $Field::make('textarea', 'story_community_desc', __('Community Description'))
                ->set_rows(2),

            $Field::make('complex', 'story_recognition_items', __('Recognition Items'))
                ->add_fields([
                    $Field::make('text', 'image_url', __('Image URL / Path')),
                    $Field::make('text', 'label', __('Label')),
                    $Field::make('textarea', 'copy', __('Copy'))->set_rows(2),
                ])
                ->set_header_template('<%- label %>'),
        ])

        // -------------------------------------------------------------
        // Global Settings tab
        // -------------------------------------------------------------
        ->add_tab(__('Global Settings'), [
            $Field::make('separator', 'sep_global_contact', __('Contact Info')),
            $Field::make('text', 'global_contact_email', __('Contact Email')),
            $Field::make('text', 'global_copyright', __('Copyright Text')),

            $Field::make('separator', 'sep_global_socials', __('Social Links')),
            $Field::make('text', 'global_social_instagram', __('Instagram URL')),
            $Field::make('text', 'global_social_tiktok', __('TikTok URL')),
            $Field::make('text', 'global_social_facebook', __('Facebook URL')),

            $Field::make('separator', 'sep_global_newsletter', __('Footer Newsletter')),
            $Field::make('text', 'global_newsletter_heading', __('Newsletter Heading')),
            $Field::make('textarea', 'global_newsletter_subtext', __('Newsletter Subtext'))->set_rows(2),
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

    register_graphql_object_type('CravingsCardSettings', [
        'fields' => [
            'label'    => ['type' => 'String'],
            'title'    => ['type' => 'String'],
            'desc'     => ['type' => 'String'],
            'imageUrl' => ['type' => 'String'],
        ],
    ]);

    register_graphql_object_type('HomePageSettings', [
        'fields' => [
            'heroVideoUrl'          => ['type' => 'String'],
            'heroTitleLine1'        => ['type' => 'String'],
            'heroTitleLine2'        => ['type' => 'String'],
            'heroTitleLine3'        => ['type' => 'String'],
            'heroLead'              => ['type' => 'String'],
            'cravingsEyebrow'       => ['type' => 'String'],
            'cravingsHeadingLine1'  => ['type' => 'String'],
            'cravingsHeadingLine2'  => ['type' => 'String'],
            'cravingsCard1'         => ['type' => 'CravingsCardSettings'],
            'cravingsCard2'         => ['type' => 'CravingsCardSettings'],
        ],
    ]);

    register_graphql_object_type('BlueprintPoint', [
        'fields' => [
            'eyebrow'   => ['type' => 'String'],
            'title'     => ['type' => 'String'],
            'desc'      => ['type' => 'String'],
            'imageUrl'  => ['type' => 'String'],
            'watermark' => ['type' => 'String'],
        ],
    ]);

    register_graphql_object_type('RecognitionItem', [
        'fields' => [
            'imageUrl' => ['type' => 'String'],
            'label'    => ['type' => 'String'],
            'copy'     => ['type' => 'String'],
        ],
    ]);

    register_graphql_object_type('OurStoryPageSettings', [
        'fields' => [
            'heroImageUrl'             => ['type' => 'String'],
            'heroEyebrow'              => ['type' => 'String'],
            'heroTitleLine1'           => ['type' => 'String'],
            'heroTitleLine2'           => ['type' => 'String'],
            'heroSubheading'           => ['type' => 'String'],
            'philosophyEyebrow'        => ['type' => 'String'],
            'philosophyHeadingLine1'   => ['type' => 'String'],
            'philosophyHeadingLine2'   => ['type' => 'String'],
            'philosophyLeadParagraph'  => ['type' => 'String'],
            'philosophySecondaryText'  => ['type' => 'String'],
            'philosophyTags'           => ['type' => 'String'],
            'philosophyImage1Url'      => ['type' => 'String'],
            'philosophyImage2Url'      => ['type' => 'String'],
            'philosophyStatValue'      => ['type' => 'String'],
            'philosophyStatLabel'      => ['type' => 'String'],
            'philosophyTagLabel'       => ['type' => 'String'],
            'blueprintEyebrow'         => ['type' => 'String'],
            'blueprintHeading'         => ['type' => 'String'],
            'blueprintDesc'            => ['type' => 'String'],
            'blueprintPt1'             => ['type' => 'BlueprintPoint'],
            'blueprintPt2'             => ['type' => 'BlueprintPoint'],
            'blueprintPt3'             => ['type' => 'BlueprintPoint'],
            'communityEyebrow'         => ['type' => 'String'],
            'communityHeading'         => ['type' => 'String'],
            'communityDesc'            => ['type' => 'String'],
            'recognitionItems'         => ['type' => ['list_of' => 'RecognitionItem']],
        ],
    ]);

    register_graphql_object_type('GlobalSettings', [
        'fields' => [
            'contactEmail'      => ['type' => 'String'],
            'copyright'         => ['type' => 'String'],
            'socialInstagram'   => ['type' => 'String'],
            'socialTiktok'      => ['type' => 'String'],
            'socialFacebook'    => ['type' => 'String'],
            'newsletterHeading' => ['type' => 'String'],
            'newsletterSubtext' => ['type' => 'String'],
        ],
    ]);

    register_graphql_object_type('SiteSettings', [
        'description' => 'Site-wide editable settings.',
        'fields' => [
            'catering'  => ['type' => 'CateringFormSettings'],
            'locations' => ['type' => 'LocationsPageSettings'],
            'feed'      => ['type' => 'FeedPageSettings'],
            'home'      => ['type' => 'HomePageSettings'],
            'ourStory'  => ['type' => 'OurStoryPageSettings'],
            'global'    => ['type' => 'GlobalSettings'],
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
                'home' => [
                    'heroVideoUrl'          => carbon_get_theme_option('home_hero_video_url') ?: null,
                    'heroTitleLine1'        => carbon_get_theme_option('home_hero_title_line_1') ?: null,
                    'heroTitleLine2'        => carbon_get_theme_option('home_hero_title_line_2') ?: null,
                    'heroTitleLine3'        => carbon_get_theme_option('home_hero_title_line_3') ?: null,
                    'heroLead'              => carbon_get_theme_option('home_hero_lead') ?: null,
                    'cravingsEyebrow'       => carbon_get_theme_option('home_cravings_eyebrow') ?: null,
                    'cravingsHeadingLine1'  => carbon_get_theme_option('home_cravings_heading_line_1') ?: null,
                    'cravingsHeadingLine2'  => carbon_get_theme_option('home_cravings_heading_line_2') ?: null,
                    'cravingsCard1' => [
                        'label'    => carbon_get_theme_option('home_cravings_card1_label') ?: null,
                        'title'    => carbon_get_theme_option('home_cravings_card1_title') ?: null,
                        'desc'     => carbon_get_theme_option('home_cravings_card1_desc') ?: null,
                        'imageUrl' => carbon_get_theme_option('home_cravings_card1_image_url') ?: null,
                    ],
                    'cravingsCard2' => [
                        'label'    => carbon_get_theme_option('home_cravings_card2_label') ?: null,
                        'title'    => carbon_get_theme_option('home_cravings_card2_title') ?: null,
                        'desc'     => carbon_get_theme_option('home_cravings_card2_desc') ?: null,
                        'imageUrl' => carbon_get_theme_option('home_cravings_card2_image_url') ?: null,
                    ],
                ],
                'ourStory' => [
                    'heroImageUrl'             => carbon_get_theme_option('story_hero_image_url') ?: null,
                    'heroEyebrow'              => carbon_get_theme_option('story_hero_eyebrow') ?: null,
                    'heroTitleLine1'           => carbon_get_theme_option('story_hero_title_line_1') ?: null,
                    'heroTitleLine2'           => carbon_get_theme_option('story_hero_title_line_2') ?: null,
                    'heroSubheading'           => carbon_get_theme_option('story_hero_subheading') ?: null,
                    'philosophyEyebrow'        => carbon_get_theme_option('story_philosophy_eyebrow') ?: null,
                    'philosophyHeadingLine1'   => carbon_get_theme_option('story_philosophy_heading_line_1') ?: null,
                    'philosophyHeadingLine2'   => carbon_get_theme_option('story_philosophy_heading_line_2') ?: null,
                    'philosophyLeadParagraph'  => carbon_get_theme_option('story_philosophy_lead_paragraph') ?: null,
                    'philosophySecondaryText'  => carbon_get_theme_option('story_philosophy_secondary_text') ?: null,
                    'philosophyTags'           => carbon_get_theme_option('story_philosophy_tags') ?: null,
                    'philosophyImage1Url'      => carbon_get_theme_option('story_philosophy_image1_url') ?: null,
                    'philosophyImage2Url'      => carbon_get_theme_option('story_philosophy_image2_url') ?: null,
                    'philosophyStatValue'      => carbon_get_theme_option('story_philosophy_stat_value') ?: null,
                    'philosophyStatLabel'      => carbon_get_theme_option('story_philosophy_stat_label') ?: null,
                    'philosophyTagLabel'       => carbon_get_theme_option('story_philosophy_tag_label') ?: null,
                    'blueprintEyebrow'         => carbon_get_theme_option('story_blueprint_eyebrow') ?: null,
                    'blueprintHeading'         => carbon_get_theme_option('story_blueprint_heading') ?: null,
                    'blueprintDesc'            => carbon_get_theme_option('story_blueprint_desc') ?: null,
                    'blueprintPt1' => [
                        'eyebrow'   => carbon_get_theme_option('story_blueprint_pt1_eyebrow') ?: null,
                        'title'     => carbon_get_theme_option('story_blueprint_pt1_title') ?: null,
                        'desc'      => carbon_get_theme_option('story_blueprint_pt1_desc') ?: null,
                        'imageUrl'  => carbon_get_theme_option('story_blueprint_pt1_image_url') ?: null,
                        'watermark' => null,
                    ],
                    'blueprintPt2' => [
                        'eyebrow'   => carbon_get_theme_option('story_blueprint_pt2_eyebrow') ?: null,
                        'title'     => carbon_get_theme_option('story_blueprint_pt2_title') ?: null,
                        'desc'      => carbon_get_theme_option('story_blueprint_pt2_desc') ?: null,
                        'imageUrl'  => null,
                        'watermark' => carbon_get_theme_option('story_blueprint_pt2_watermark') ?: null,
                    ],
                    'blueprintPt3' => [
                        'eyebrow'   => carbon_get_theme_option('story_blueprint_pt3_eyebrow') ?: null,
                        'title'     => carbon_get_theme_option('story_blueprint_pt3_title') ?: null,
                        'desc'      => carbon_get_theme_option('story_blueprint_pt3_desc') ?: null,
                        'imageUrl'  => carbon_get_theme_option('story_blueprint_pt3_image_url') ?: null,
                        'watermark' => null,
                    ],
                    'communityEyebrow'         => carbon_get_theme_option('story_community_eyebrow') ?: null,
                    'communityHeading'         => carbon_get_theme_option('story_community_heading') ?: null,
                    'communityDesc'            => carbon_get_theme_option('story_community_desc') ?: null,
                    'recognitionItems'         => carbon_get_theme_option('story_recognition_items') ?: [],
                ],
                'global' => [
                    'contactEmail'      => carbon_get_theme_option('global_contact_email') ?: null,
                    'copyright'         => carbon_get_theme_option('global_copyright') ?: null,
                    'socialInstagram'   => carbon_get_theme_option('global_social_instagram') ?: null,
                    'socialTiktok'      => carbon_get_theme_option('global_social_tiktok') ?: null,
                    'socialFacebook'    => carbon_get_theme_option('global_social_facebook') ?: null,
                    'newsletterHeading' => carbon_get_theme_option('global_newsletter_heading') ?: null,
                    'newsletterSubtext' => carbon_get_theme_option('global_newsletter_subtext') ?: null,
                ],
            ];
        },
    ]);
});
