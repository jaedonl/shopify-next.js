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
                        items {
                            title
                            url
                        }
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
                id
                title
                description
                productType
                tags
                vendor
                compareAtPriceRange {
                    maxVariantPrice {
                        amount
                    }
                }
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

export const fetchCollectionMetafields = (handle) => {    
    const res = storefrontClient.query({
        data: `{
            collection (handle: "${handle}") {
                title
                material: metafield (namespace: "category", key: "material") {
                    value
                }
                style: metafield (namespace: "category", key: "style") {
                    value
                }
                size: metafield (namespace: "category", key: "size") {
                    value
                }
            }
        }`
    })
    return res
}

export const fetchCollectionInfo = (handle) => {    
    const res = storefrontClient.query({
        data: `{
            collection (handle: "${handle}") {
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
                            title
                            handle
                            description
                            productType
                            tags
                            createdAt
                            compareAtPriceRange {
                                maxVariantPrice {
                                    amount
                                }
                            }
                            promotion: metafield (namespace: "product_info", key: "promo") {
                                value
                            }
                            keywords: metafield (namespace: "keywords", key: "filter") {
                                value
                            }
                            materials: metafield (namespace: "product_info", key: "materials") {
                                value
                            }
                            images (first:5) {
                                edges {
                                    node {
                                        url
                                    }
                                }
                            }
                            variants (first: 20) {
                                edges {
                                    node {
                                        id
                                        title
                                        image {
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

export async function createCheckout(id, quantity) {
    const res = storefrontClient.query({
        data: `
            mutation {
                checkoutCreate(input: {
                    lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
                }) {
                    checkout {
                        id
                        webUrl
                    }
                }
            }`
    })    
    const checkout = res.data.checkoutCreate.checkout ? res.data.checkoutCreate.checkout : []

    return checkout
}

export async function updateCheckout(id, lineItems) {
    const lineItemsObject = lineItems.map(item => {
        return `{
            variantId: "${item.id}",
            quantity:  ${item.variantQuantity}
        }`
    })

    const res = storefrontClient.query({
        data: `
            mutation {
                checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
                    checkout {
                        id
                        webUrl
                        lineItems(first: 25) {
                            edges {
                                node {
                                    id
                                    title
                                    quantity
                                }
                            }
                        }
                    }
                }
            }`
    })   
  
    const checkout = res.data.checkoutLineItemsReplace.checkout ? res.data.checkoutLineItemsReplace.checkout : []
  
    return checkout
}