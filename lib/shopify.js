import Shopify from '@shopify/shopify-api'

const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN
const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESSTOKEN

const storefrontClient = new Shopify.Clients.Storefront(
    domain,
    storefrontAccessToken,
); 

export const fetchMenuItems = () => {
    const res = storefrontClient.query({
        data: `{
            menu (handle: "main-menu") {
                items {
                    items {
                        title
                        url
                    }      
                }
            }
        }`,
    });    
    return res
}

export const fetchProductByHandle = (handle) => {    
    const res = storefrontClient.query({
        data: `{
            product (handle: "${handle}") {                
                title
                description
                productType
                tags
                vendor
                images (first: 5) {
                    edges {
                        node {        
                            url
                        }
                    }
                }
                variants (first: 5) {
                    nodes {
                        priceV2 {
                            amount
                        }
                    }
                }               
                dimensions: metafield (namespace: "product_info", key: "dimensions") {
                    key
                    value
                }
                weight: metafield (namespace: "product_info", key: "weight") {
                    key
                    value
                }
                colors: metafield (namespace: "product_info", key: "colors") {
                    key
                    value
                }
                materials: metafield (namespace: "product_info", key: "materials") {
                    key
                    value
                }                
            }
        }`,
    });    
    return res
}

export const fetchAllCollection = () => {
    const res = storefrontClient.query({
        data: `{
            collections (first: 20) {    
                nodes {
                    title
                    handle
                    description
                    image {
                        url          
                    }
                }
            }
        }`,
    });    
    return res
}

export const fetchCollectionInfo = (handle) => {    
    const res = storefrontClient.query({
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
    return res
}