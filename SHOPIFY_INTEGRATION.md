# Shopify Backend Integration Guide

## Overview
The ZOLANI e-commerce platform is now integrated with Shopify Admin API v2024-01. All product, collection, order, and customer data flows directly from your Shopify store.

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the project root with your Shopify credentials:

```env
VITE_SHOPIFY_STORE_NAME=zolani-2
VITE_SHOPIFY_ADMIN_TOKEN=<your-shopify-admin-token>
VITE_SHOPIFY_API_VERSION=2024-01
VITE_API_BASE_URL=https://zolani-2.myshopify.com/admin/api
```

### 2. Required Shopify App Scopes
Ensure your Shopify app has the following API scopes enabled:
- `read_products` - Read product data
- `read_collections` - Read collection data
- `read_orders` - Read order information
- `read_customers` - Read customer data
- `write_customers` - Create/update customers
- `read_product_metafields` - Read custom product data
- `write_product_metafields` - Write custom product data

## Usage Examples

### Fetching Products

#### In a Component (Hook-based):
```jsx
import { useShopifyProducts } from '../hooks';

function ProductsPage() {
  const { products, loading, error } = useShopifyProducts(50);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.title}</h3>
          <p className="price">${product.priceRange.minVariantPrice.amount}</p>
          <img src={product.images.edges[0]?.node.url} alt={product.title} />
        </div>
      ))}
    </div>
  );
}
```

### Search Products

```jsx
import { useSearchProducts } from '../hooks';
import { useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const { products, loading } = useSearchProducts(query, 20);

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Searching...</p>}
      <div className="search-results">
        {products.map(product => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
    </div>
  );
}
```

### Fetch Collections

```jsx
import { useShopifyCollections } from '../hooks';

function CollectionsGrid() {
  const { collections, loading, error } = useShopifyCollections();

  if (loading) return <div>Loading collections...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-2 gap-8">
      {collections.map(collection => (
        <div key={collection.id} className="collection-card">
          <img src={collection.image?.url} alt={collection.title} />
          <h2>{collection.title}</h2>
          <p>{collection.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Get Single Product

```jsx
import { useShopifyProduct } from '../hooks';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { productHandle } = useParams();
  const { product, loading, error } = useShopifyProduct(productHandle);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <p className="vendor">By {product.vendor}</p>
      <div className="price">
        ${product.priceRange.minVariantPrice.amount}
        {product.priceRange.maxVariantPrice.amount !== product.priceRange.minVariantPrice.amount &&
          ` - $${product.priceRange.maxVariantPrice.amount}`}
      </div>
      <div className="images">
        {product.images.edges.map(({ node: img }) => (
          <img key={img.id} src={img.url} alt={img.altText} />
        ))}
      </div>
      <p className="description">{product.description}</p>
      
      <select className="variant-selector">
        {product.variants.edges.map(({ node: variant }) => (
          <option key={variant.id} value={variant.id}>
            {variant.title} - ${variant.price.amount}
          </option>
        ))}
      </select>
    </div>
  );
}
```

### Get Collection Products

```jsx
import { useCollectionByHandle } from '../hooks';
import { useParams } from 'react-router-dom';

function CollectionPage() {
  const { collectionHandle } = useParams();
  const { collection, loading, error } = useCollectionByHandle(collectionHandle);

  if (loading) return <div>Loading collection...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!collection) return <div>Collection not found</div>;

  return (
    <div>
      <h1>{collection.title}</h1>
      <p>{collection.description}</p>
      
      <div className="product-grid">
        {collection.products.edges.map(({ node: product }) => (
          <div key={product.id} className="product-card">
            <img 
              src={product.images.edges[0]?.node.url} 
              alt={product.title} 
            />
            <h3>{product.title}</h3>
            <p>${product.priceRange.minVariantPrice.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Fetch Orders

```jsx
import { useShopifyOrders } from '../hooks';

function OrdersPage() {
  const { orders, loading, error, refetch } = useShopifyOrders(50, 'FULFILLED');

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="orders-list">
      {orders.map(order => (
        <div key={order.id} className="order-card">
          <h3>{order.name}</h3>
          <p>Email: {order.email}</p>
          <p>Total: {order.totalPriceSet.shopMoney.currencyCode} {order.totalPriceSet.shopMoney.amount}</p>
          <p>Status: {order.fulfillmentStatus}</p>
        </div>
      ))}
    </div>
  );
}
```

### Manage Customers

```jsx
import { useShopifyCustomers, useCreateCustomer, useUpdateCustomer } from '../hooks';

function CustomerManagement() {
  const { customers, loading, error } = useShopifyCustomers();
  const { createNewCustomer, loading: creating } = useCreateCustomer();
  const { updateExistingCustomer, loading: updating } = useUpdateCustomer();

  const handleCreateCustomer = async () => {
    try {
      const newCustomer = await createNewCustomer({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890'
      });
      console.log('Customer created:', newCustomer);
    } catch (err) {
      console.error('Failed to create customer:', err);
    }
  };

  return (
    <div>
      <h2>Customers</h2>
      <button onClick={handleCreateCustomer} disabled={creating}>
        {creating ? 'Creating...' : 'Add Customer'}
      </button>
      
      <div className="customer-list">
        {customers.map(customer => (
          <div key={customer.id} className="customer-card">
            <h3>{customer.firstName} {customer.lastName}</h3>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## API Response Structure

### Product Object
```javascript
{
  id: "gid://shopify/Product/...",
  title: "Product Name",
  handle: "product-name",
  description: "Product description...",
  vendor: "Brand Name",
  productType: "Category",
  priceRange: {
    minVariantPrice: { amount: "99.99", currencyCode: "USD" },
    maxVariantPrice: { amount: "199.99", currencyCode: "USD" }
  },
  images: {
    edges: [{
      node: {
        id: "gid://shopify/ProductImage/...",
        url: "https://...",
        altText: "Alt text"
      }
    }]
  },
  variants: {
    edges: [{
      node: {
        id: "gid://shopify/ProductVariant/...",
        title: "Size: Large",
        price: { amount: "99.99", currencyCode: "USD" },
        availableForSale: true
      }
    }]
  },
  tags: ["tag1", "tag2"]
}
```

## Error Handling

All hooks include error handling. Errors are returned in the `error` property:

```jsx
const { products, loading, error } = useShopifyProducts();

if (error) {
  console.error('Failed to load products:', error);
  return <ErrorBoundary message={error} />;
}
```

## Troubleshooting

### 1. CORS Issues
If you encounter CORS errors, ensure:
- Your Shopify app has the correct scopes
- The API token has proper permissions
- You're using the correct API endpoint

### 2. Invalid Token Error
- Verify the token is copied correctly from Shopify Admin
- Check for trailing/leading whitespace
- Ensure the token hasn't expired

### 3. GraphQL Query Errors
- Check GraphQL query syntax in `shopifyService.js`
- Verify API version (currently 2024-01)
- Confirm required fields are being queried

## Performance Optimization

### Use Pagination
```jsx
const [after, setAfter] = useState(null);
const { products } = useShopifyProducts(50);
// Implement pagination logic using cursor
```

### Debounce Search
The `useSearchProducts` hook already includes 300ms debounce to reduce API calls.

### Cache Data
Consider implementing caching for frequently requested data:
```jsx
const [cache, setCache] = useState({});
// Store fetched data to avoid duplicate requests
```

## Security Notes

⚠️ **Important**: 
- Never commit `.env` file with real tokens
- Rotate API tokens regularly
- Use different tokens for development and production
- Consider using a backend proxy for sensitive operations
- Monitor API usage in Shopify Admin

## Next Steps

1. Update existing components to use Shopify data hooks
2. Implement shopping cart functionality with Shopify Cart API
3. Add product reviews using product metafields
4. Build checkout integration
5. Implement customer authentication
6. Create admin dashboard for order management