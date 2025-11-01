# Repository Configuration

## Project Type
Luxury Fashion E-Commerce Website (ZOLANI)

## Current Status
**SHOPIFY INTEGRATION COMPLETE** - Backend integrated with Shopify Admin API v2024-01 for products, collections, orders, and customer management.

## Target Framework
targetFramework: Playwright

## Technology Stack
- Frontend: React with Vite
- Testing: Playwright
- Styling: TailwindCSS
- Backend Integration: Shopify Admin API v2024-01 (GraphQL)
- State Management: React Context + Custom Hooks
- API Client: Fetch API with GraphQL

## Project Structure
```
src/
  components/     # Reusable UI components
  pages/         # Route-based pages
  contexts/      # React context providers (Theme, Cart, etc.)
  data/          # Static data and configurations
  hooks/         # Custom React hooks for Shopify API
    useShopifyProducts.js      # Products fetching & searching
    useShopifyCollections.js   # Collections management
    useShopifyProduct.js       # Single product details
    useShopifyOrders.js        # Orders management
    useShopifyCustomers.js     # Customer management
  services/      # External API services
    shopifyService.js          # Shopify Admin API GraphQL queries
tests/           # Playwright E2E tests
.env             # Environment variables (Shopify credentials)
.env.example     # Example environment configuration
```

## Shopify API Integration

### Configured Endpoints
- **Store**: zolani-2.myshopify.com
- **API Version**: 2024-01
- **GraphQL Endpoint**: https://zolani-2.myshopify.com/admin/api/2024-01/graphql.json

### Available Features
1. **Products**
   - Fetch all products with pagination
   - Search products by title/description
   - Get single product by handle
   - Filter by vendor, type, tags
   
2. **Collections**
   - Fetch all collections
   - Get collection by handle with products
   - Display products within collections

3. **Orders** (Admin API with token authentication)
   - Fetch orders with status filtering
   - Get order details including line items
   - Track fulfillment status

4. **Customers** (Admin API with token authentication)
   - Fetch all customers
   - Create new customers
   - Update customer information
   - Manage customer addresses

5. **Product Metafields**
   - Store custom data (reviews, ratings)
   - Query product reviews by namespace

### Custom Hooks
All Shopify data fetching is handled through custom React hooks:
- `useShopifyProducts(limit)` - Fetch all products
- `useSearchProducts(query, limit)` - Search products
- `useShopifyProduct(handle)` - Get single product
- `useShopifyCollections(limit)` - Fetch all collections
- `useCollectionByHandle(handle, limit)` - Get single collection
- `useShopifyOrders(limit, status)` - Fetch orders
- `useShopifyCustomers(limit)` - Fetch customers
- `useCreateCustomer(data)` - Create customer
- `useUpdateCustomer(id, data)` - Update customer

### Environment Variables
Create a `.env` file in the project root with:
```
VITE_SHOPIFY_STORE_NAME=zolani-2
VITE_SHOPIFY_ADMIN_TOKEN=<your-shopify-admin-token>
VITE_SHOPIFY_API_VERSION=2024-01
VITE_API_BASE_URL=https://zolani-2.myshopify.com/admin/api
```
See `.env.example` for reference.

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run Playwright tests
- `npm run test:ui` - Run Playwright tests with UI

## Implementation Features
- ✅ Dark mode support (React Context)
- ✅ Luxury design system with TailwindCSS
- ✅ Responsive layout for mobile/tablet/desktop
- ✅ Product grid with filtering
- ✅ Collections showcase
- ✅ Smooth animations with Framer Motion
- ✅ E2E test coverage (Playwright)
- ✅ Shopify Admin API integration (v2024-01 GraphQL)