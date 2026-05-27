// GraphQL queries against WPGraphQL + Carbon Fields.
// CPT graphql identifiers (from wordpress/gbd-content-types.php):
//   menu_item CPT -> menuProduct(s)   (avoids WPGraphQL's built-in MenuItem)
//   location  CPT -> branch(es)       (avoids potential nav-menu collision)
// Aliases below ('menuItems: menuProducts(...)' etc.) keep the response shape
// stable so repository code can keep reading `data.menuItems` / `data.menuItem`
// / `data.locations` / `data.location` unchanged.

export const MENU_ITEMS_QUERY = /* GraphQL */ `
  query MenuItems {
    menuItems: menuProducts(first: 100) {
      nodes {
        id
        slug
        title
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        menuItemFields {
          priceGbp
          isBestSeller
          category
          imageUrl
          dietaryFlags
          allergens {
            code
            label
          }
          nutrition {
            calories
            protein
            carbs
            fat
          }
        }
      }
    }
  }
`;

export const LOCATIONS_QUERY = /* GraphQL */ `
  query Locations {
    locations: branches(first: 100) {
      nodes {
        id
        slug
        title
        locationFields {
          addressLine1
          addressLine2
          city
          postcode
          phone
          isFlagship
          lat
          lng
          clickAndCollectUrl
          imageUrl
          deliveryLinks {
            provider
            url
          }
          hours {
            day
            open
            close
          }
        }
      }
    }
  }
`;

export const MENU_ITEM_BY_SLUG_QUERY = /* GraphQL */ `
  query MenuItemBySlug($slug: ID!) {
    menuItem: menuProduct(id: $slug, idType: SLUG) {
      id
      slug
      title
      excerpt
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      menuItemFields {
        priceGbp
        isBestSeller
        category
        allergens {
          code
          label
        }
        nutrition {
          calories
          protein
          carbs
          fat
        }
      }
    }
  }
`;

export const LOCATION_BY_SLUG_QUERY = /* GraphQL */ `
  query LocationBySlug($slug: ID!) {
    location: branch(id: $slug, idType: SLUG) {
      id
      slug
      title
      content
      locationFields {
        addressLine1
        addressLine2
        city
        postcode
        phone
        isFlagship
        lat
        lng
        clickAndCollectUrl
        deliveryLinks {
          provider
          url
        }
        hours {
          day
          open
          close
        }
      }
    }
  }
`;

export const POST_BY_SLUG_QUERY = /* GraphQL */ `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      excerpt
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
        }
      }
      categories(first: 1) {
        nodes {
          name
        }
      }
    }
  }
`;

export const SITE_SETTINGS_QUERY = /* GraphQL */ `
  query SiteSettings {
    siteSettings {
      catering {
        eyebrow
        headingLines
        lead
        fieldNameLabel
        fieldNamePlaceholder
        fieldEmailLabel
        fieldEmailPlaceholder
        fieldCompanyLabel
        fieldCompanyPlaceholder
        fieldHeadcountLabel
        fieldHeadcountPlaceholder
        fieldMessageLabel
        fieldMessagePlaceholder
        submitLabel
        submitLabelSending
        statusIdle
        statusSending
        statusSuccess
        statusError
        recipientEmail
      }
      locations {
        eyebrow
        heading
        emptyState
      }
      feed {
        eyebrow
        headingLines
        lead
        emptyState
      }
    }
  }
`;

export const POSTS_QUERY = /* GraphQL */ `
  query Posts {
    posts(first: 24) {
      nodes {
        id
        slug
        title
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
        categories(first: 1) {
          nodes {
            name
          }
        }
      }
    }
  }
`;
