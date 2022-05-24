const productId = "7038313070637";
// `session` is built as part of the OAuth process
const client = new Shopify.Clients.Rest(
  session.shop,
  session.accessToken
);
const product = await client.get({
  path: `products/${productId}`,
  query: {id: 1, title: "title"}
});