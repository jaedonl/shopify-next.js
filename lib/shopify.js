import Shopify from '@shopify/shopify-api'

const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

const storefrontClient = new Shopify.Clients.Storefront(
    domain,
    storefrontAccessToken,
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
                            title
                            handle
                            description
                            productType
                            tags
                            variants (first: 20) {
                                edges {
                                    node {
                                        id
                                        title
                                        image {
                                            id,
                                            url
                                        }
                                        priceV2 {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }`,
    });    
    return collectionData
}