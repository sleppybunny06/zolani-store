import { useState, useEffect } from 'react';
import { fetchCustomers, createCustomer, updateCustomer } from '../services/shopifyService';

/**
 * Custom hook for fetching Shopify customers
 * @param {number} limit - Number of customers to fetch
 * @returns {Object} - { customers, loading, error, refetch }
 */
export const useShopifyCustomers = (limit = 50) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchCustomers(limit);
      const customerList = data?.customers?.edges?.map(edge => edge.node) || [];
      setCustomers(customerList);
      setError(null);
    } catch (err) {
      setError(err.message);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  return { customers, loading, error, refetch: fetchData };
};

/**
 * Custom hook for creating a new customer
 * @returns {Object} - { createNewCustomer, loading, error }
 */
export const useCreateCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNewCustomer = async (customerData) => {
    try {
      setLoading(true);
      const response = await createCustomer(customerData);
      const newCustomer = response?.customerCreate?.customer;
      const errors = response?.customerCreate?.userErrors;

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }

      setError(null);
      return newCustomer;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createNewCustomer, loading, error };
};

/**
 * Custom hook for updating a customer
 * @returns {Object} - { updateExistingCustomer, loading, error }
 */
export const useUpdateCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateExistingCustomer = async (customerId, customerData) => {
    try {
      setLoading(true);
      const response = await updateCustomer(customerId, customerData);
      const updatedCustomer = response?.customerUpdate?.customer;
      const errors = response?.customerUpdate?.userErrors;

      if (errors && errors.length > 0) {
        throw new Error(errors[0].message);
      }

      setError(null);
      return updatedCustomer;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateExistingCustomer, loading, error };
};