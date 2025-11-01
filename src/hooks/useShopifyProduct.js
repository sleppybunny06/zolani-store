import { useState, useEffect } from 'react';
import { fetchProductByHandle } from '../services/shopifyService';

/**
 * Custom hook for fetching a single product by handle
 * @param {string} handle - Product handle
 * @returns {Object} - { product, loading, error }
 */
export const useShopifyProduct = (handle) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(!!handle);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!handle) {
      setProduct(null);
      return;
    }

    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductByHandle(handle);
        setProduct(data?.productByHandle || null);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [handle]);

  return { product, loading, error };
};