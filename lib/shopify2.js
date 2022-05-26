const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

const endpoint = `https://${domain}/api/2020-07/graphql`;
const headers = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Shopify-Storefront-Access-Token': storefrontAccessToken
});

/**
* The request for the data
**/
export const getShopifyCollectionByHandle = async (handle) => {
    console.log(handle)
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({query: query(handle)})
  });

  const collection = await response.json();
  console.log(collection)
// displayCollection(Collection.data.collectionByHandle);
}



const displayCollection = (Collection) => {
    console.log(Collection)
}

/**
* The graphql query
**/
const query = (handle) => `
{
  collectionByHandle(handle: ${handle}) {
    description(truncateAt: 300)
    descriptionHtml
    image {
      altText
      originalSrc
      transformedSrc(maxHeight: 1000, maxWidth: 2048, crop: CENTER)
    }
    title
    products(first: 24) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          availableForSale
          compareAtPriceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          handle
          id
          images(first: 1) {
            edges {
              node{
                altText
                transformedSrc(maxWidth: 500, maxHeight: 400, crop: CENTER)
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          productType
          tags
          title
          totalInventory
          vendor
          variants(first: 100) {
            edges {
              node {
                availableForSale
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
                id
                image {
                  transformedSrc(maxWidth: 500, maxHeight: 400, crop: CENTER)
                }
                priceV2 {
                  amount
                  currencyCode
                }
                quantityAvailable
                title
              }
            }
          }
        }
      }
    }
  }
}
`