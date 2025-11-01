import { useState, useEffect } from 'react';
import { fetchOrders } from '../services/shopifyService';

/**
 * Custom hook for fetching Shopify orders
 * @param {number} limit - Number of orders to fetch
 * @param {string} status - Order status filter (ANY, CANCELLED, FULFILLED, PENDING, PARTIALLY_FULFILLED, RESTOCKED, UNFULFILIED)
 * @returns {Object} - { orders, loading, error, refetch }
 */
export const useShopifyOrders = (limit = 50, status = 'ANY') => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchOrders(limit, status);
      const orderList = data?.orders?.edges?.map(edge => edge.node) || [];
      setOrders(orderList);
      setError(null);
    } catch (err) {
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit, status]);

  return { orders, loading, error, refetch: fetchData };
};