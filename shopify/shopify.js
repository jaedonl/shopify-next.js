import axios from "axios"
const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query) {
    const URL = `https://${domain}/api/2022-04/graphql.json`
    const options = {
        method: "GET",
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
            "Accept": "application/json",
            "Content-Type": "application/json",
            },
        body: JSON.stringify({ query })
    }
    try {
        const data = await axios.get(URL, options)
        // .then(response => {
        // return response.json()
        // })
        return data
    } catch (error) {
        throw new Error("Products not fetched")
    }
}
export async function getAllProducts() {
    const query = `
    {
    products(first: 25) {
        edges {
        node {
            id
            title
            handle
            priceRange {
            minVariantPrice {
                amount
            }
            }
            images(first: 5) {
            edges {
                node {
                originalSrc
                altText
                }
            }
            }
        }
        }
    }
    }
    `
    const response = await ShopifyData(query)
    const allProducts = response.data.products.edges ? response.data.products.edges : []
    return allProducts
}