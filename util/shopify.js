import Client from 'shopify-buy';


const client = Client.buildClient({
    domain: 'jdonlee.myshopify.com',
    storefrontAccessToken: '898aae94400e2c84aa9306cbadc1a72c'
  });

export default client;