/**
 * Shopify Admin API Service
 * Handles all Shopify API calls for products, collections, orders, customers, etc.
 */

const SHOPIFY_STORE = import.meta.env.VITE_SHOPIFY_STORE_NAME;
const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_ADMIN_TOKEN;
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION;
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const SHOPIFY_API_URL = `${API_BASE}/${API_VERSION}`;

// Headers for API requests
const headers = {
  'X-Shopify-Access-Token': SHOPIFY_TOKEN,
  'Content-Type': 'application/json',
};

/**
 * Generic GraphQL query handler
 */
const graphqlQuery = async (query, variables = {}) => {
  try {
    const response = await fetch(`${SHOPIFY_API_URL}/graphql.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      throw new Error(data.errors[0]?.message || 'GraphQL Error');
    }

    return data.data;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
};

/**
 * Fetch all products with filters
 */
export const fetchProducts = async (limit = 50, after = null) => {
  const query = `
    query GetProducts($limit: Int!, $after: String) {
      products(first: $limit, after: $after) {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  id
                  url
                  altText
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  inventory: inventoryQuantity
                }
              }
            }
            collections(first: 5) {
              edges {
                node {
                  id
                  title
                  handle
                }
              }
            }
            tags
            createdAt
            updatedAt
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `;

  return graphqlQuery(query, { limit, after });
};

/**
 * Search products by title, description, or vendor
 */
export const searchProducts = async (query, limit = 20) => {
  const searchQuery = `
    query SearchProducts($query: String!, $limit: Int!) {
      products(first: $limit, query: $query) {
        edges {
          node {
            id
            title
            handle
            description
            vendor
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 3) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  return graphqlQuery(searchQuery, { query, limit });
};

/**
 * Fetch single product by handle
 */
export const fetchProductByHandle = async (handle) => {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        vendor
        productType
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 20) {
          edges {
            node {
              id
              url
              altText
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              weight {
                unit
                value
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
        collections(first: 10) {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
        tags
        createdAt
      }
    }
  `;

  return graphqlQuery(query, { handle });
};

/**
 * Fetch all collections
 */
export const fetchCollections = async (limit = 50) => {
  const query = `
    query GetCollections($limit: Int!) {
      collections(first: $limit) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
            products(first: 10) {
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
                  images(first: 1) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  return graphqlQuery(query, { limit });
};

/**
 * Fetch single collection by handle
 */
export const fetchCollectionByHandle = async (handle, limit = 50) => {
  const query = `
    query GetCollectionByHandle($handle: String!, $limit: Int!) {
      collectionByHandle(handle: $handle) {
        id
        title
        handle
        description
        image {
          url
          altText
        }
        products(first: $limit) {
          edges {
            node {
              id
              title
              handle
              description
              vendor
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 3) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  return graphqlQuery(query, { handle, limit });
};

/**
 * Fetch all customers (requires additional permissions)
 */
export const fetchCustomers = async (limit = 50) => {
  const query = `
    query GetCustomers($limit: Int!) {
      customers(first: $limit) {
        edges {
          node {
            id
            email
            firstName
            lastName
            phone
            defaultAddress {
              address1
              address2
              city
              province
              country
              zip
            }
            createdAt
          }
        }
      }
    }
  `;

  return graphqlQuery(query, { limit });
};

/**
 * Fetch orders (requires additional permissions)
 */
export const fetchOrders = async (limit = 50, status = 'ANY') => {
  const query = `
    query GetOrders($limit: Int!, $status: OrderStatus!) {
      orders(first: $limit, query: "status:$status") {
        edges {
          node {
            id
            name
            email
            phone
            totalPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  originalTotalSet {
                    shopMoney {
                      amount
                    }
                  }
                }
              }
            }
            createdAt
            cancelledAt
            fulfillmentStatus
          }
        }
      }
    }
  `;

  return graphqlQuery(query, { limit, status });
};

/**
 * Create a customer (requires write access)
 */
export const createCustomer = async (customerData) => {
  const query = `
    mutation CreateCustomer($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
          phone
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  return graphqlQuery(query, {
    input: customerData,
  });
};

/**
 * Update a customer (requires write access)
 */
export const updateCustomer = async (customerId, customerData) => {
  const query = `
    mutation UpdateCustomer($input: CustomerInput!) {
      customerUpdate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
          phone
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  return graphqlQuery(query, {
    input: {
      id: customerId,
      ...customerData,
    },
  });
};

/**
 * Fetch product reviews/metafields
 */
export const fetchProductMetafields = async (productId, namespace = 'reviews') => {
  const query = `
    query GetProductMetafields($id: ID!, $namespace: String!) {
      product(id: $id) {
        id
        metafields(first: 20, namespace: $namespace) {
          edges {
            node {
              id
              namespace
              key
              value
              type
            }
          }
        }
      }
    }
  `;

  return graphqlQuery(query, { id: productId, namespace });
};

/**
 * Set product metafields (e.g., reviews, ratings)
 */
export const setProductMetafield = async (productId, metafield) => {
  const query = `
    mutation SetProductMetafield($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          metafields(first: 10) {
            edges {
              node {
                id
                key
                value
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  return graphqlQuery(query, {
    input: {
      id: productId,
      metafields: [metafield],
    },
  });
};

/**
 * STOREFRONT API FUNCTIONS (Customer-facing)
 * These functions use the Storefront API with customer access tokens
 */

const storefrontGraphqlQuery = async (query, variables = {}, accessToken = null) => {
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
  };

  if (accessToken) {
    // If customer token provided, it's already in the query or headers
  }

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      throw new Error(data.errors[0]?.message || 'GraphQL Error');
    }

    return data.data;
  } catch (error) {
    console.error('Shopify Storefront API Error:', error);
    throw error;
  }
};

/**
 * Fetch customer orders using Storefront API
 */
export const fetchCustomerOrders = async (customerAccessToken) => {
  const query = `
    query GetCustomerOrders($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        email
        firstName
        lastName
        orders(first: 20) {
          edges {
            node {
              id
              orderNumber
              processedAt
              totalPriceV2 {
                amount
                currencyCode
              }
              statusUrl
              fulfillmentStatus
              lineItems(first: 20) {
                edges {
                  node {
                    id
                    title
                    quantity
                    variantTitle
                    originalTotalPrice {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  return storefrontGraphqlQuery(query, { customerAccessToken });
};

/**
 * Fetch single order details
 */
export const fetchOrderDetails = async (orderId, customerAccessToken) => {
  const query = `
    query GetOrderDetails($id: ID!) {
      node(id: $id) {
        ... on Order {
          id
          orderNumber
          processedAt
          totalPriceV2 {
            amount
            currencyCode
          }
          statusUrl
          fulfillmentStatus
          shippingAddress {
            name
            address1
            address2
            city
            province
            country
            zip
            phone
          }
          lineItems(first: 50) {
            edges {
              node {
                id
                title
                quantity
                variantTitle
                originalTotalPrice {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  return storefrontGraphqlQuery(query, { id: orderId }, customerAccessToken);
};

/**
 * Create a draft order (checkout)
 */
export const createDraftOrder = async (lineItems, customerEmail) => {
  const query = `
    mutation CreateDraftOrder($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
          invoiceUrl
          checkoutUrl
          lineItems(first: 50) {
            edges {
              node {
                id
                title
                quantity
                originalUnitPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const input = {
    lineItems: lineItems.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity,
    })),
    customAttributes: [
      {
        key: 'email',
        value: customerEmail,
      },
    ],
  };

  return graphqlQuery(query, { input });
};

/**
 * Get shop information
 */
export const fetchShopInfo = async () => {
  const query = `
    query {
      shop {
        name
        description
        url
        currencyCode
      }
    }
  `;

  return storefrontGraphqlQuery(query);
};

export default {
  fetchProducts,
  searchProducts,
  fetchProductByHandle,
  fetchCollections,
  fetchCollectionByHandle,
  fetchCustomers,
  fetchOrders,
  createCustomer,
  updateCustomer,
  fetchProductMetafields,
  setProductMetafield,
  fetchCustomerOrders,
  fetchOrderDetails,
  createDraftOrder,
  fetchShopInfo,
};