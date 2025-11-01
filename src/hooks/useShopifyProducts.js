import { useState, useEffect } from 'react';
import { fetchProducts, searchProducts } from '../services/shopifyService';

/**
 * Custom hook for fetching Shopify products
 * @param {number} limit - Number of products to fetch
 * @returns {Object} - { products, loading, error }
 */
export const useShopifyProducts = (limit = 50) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(limit);
        const productList = data?.products?.edges?.map(edge => edge.node) || [];
        setProducts(productList);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [limit]);

  return { products, loading, error };
};

/**
 * Custom hook for searching Shopify products
 * @param {string} query - Search query
 * @param {number} limit - Number of results to return
 * @returns {Object} - { products, loading, error }
 */
export const useSearchProducts = (query, limit = 20) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setProducts([]);
      return;
    }

    const search = async () => {
      try {
        setLoading(true);
        const data = await searchProducts(query, limit);
        const productList = data?.products?.edges?.map(edge => edge.node) || [];
        setProducts(productList);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => search(), 300);
    return () => clearTimeout(debounceTimer);
  }, [query, limit]);

  return { products, loading, error };
};