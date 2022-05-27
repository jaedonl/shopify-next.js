import Shopify from '@shopify/shopify-api'

const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

const storefrontClient = new Shopify.Clients.Storefront(
    process.env.SHOPIFY_STORE_DOMAIN,
    process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
); 

export const fetchCollectionInfo = (handle) => {    
    const collectionData = storefrontClient.query({
        data: `{
            collectionByHandle (handle: "${handle}") {
                id
                title
                description
                image {
                    id
                    url
                }
                products (first: 20) {
                  edges {
                    node {
                      id
                    }
                  }
                }
            }
        }`,
    });    

    return collectionData
}