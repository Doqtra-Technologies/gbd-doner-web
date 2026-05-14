// GraphQL queries assume WPGraphQL + WPGraphQL for ACF are installed,
// and the CPTs from wordpress/cpt-registration.php are active.
// Field shapes mirror wordpress/acf-field-groups.json.

export const MENU_ITEMS_QUERY = /* GraphQL */ `
  query MenuItems {
    menuItems(first: 100) {
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
    locations(first: 100) {
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
  }
`;

export const POSTS_QUERY = /* GraphQL */ `
  query Posts {
    posts(first: 24, where: { status: PUBLISH }) {
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
