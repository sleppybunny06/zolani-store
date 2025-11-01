import { useState, useEffect } from 'react';
import { fetchCollections, fetchCollectionByHandle } from '../services/shopifyService';

/**
 * Custom hook for fetching all Shopify collections
 * @param {number} limit - Number of collections to fetch
 * @returns {Object} - { collections, loading, error }
 */
export const useShopifyCollections = (limit = 50) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCollections = async () => {
      try {
        setLoading(true);
        const data = await fetchCollections(limit);
        const collectionList = data?.collections?.edges?.map(edge => edge.node) || [];
        setCollections(collectionList);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };

    getCollections();
  }, [limit]);

  return { collections, loading, error };
};

/**
 * Custom hook for fetching a single collection by handle
 * @param {string} handle - Collection handle
 * @param {number} limit - Number of products to fetch in collection
 * @returns {Object} - { collection, loading, error }
 */
export const useCollectionByHandle = (handle, limit = 50) => {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(!!handle);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!handle) {
      setCollection(null);
      return;
    }

    const getCollection = async () => {
      try {
        setLoading(true);
        const data = await fetchCollectionByHandle(handle, limit);
        setCollection(data?.collectionByHandle || null);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCollection(null);
      } finally {
        setLoading(false);
      }
    };

    getCollection();
  }, [handle, limit]);

  return { collection, loading, error };
};