import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Restore from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('customerAccessToken')
    const storedUser = localStorage.getItem('customer')
    if (storedToken && storedUser) {
      try {
        setAccessToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch (err) {
        console.error('Error restoring auth:', err)
        localStorage.removeItem('customerAccessToken')
        localStorage.removeItem('customer')
      }
    }
  }, [])

  const login = async (credentials) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await loginCustomer(credentials.email, credentials.password)
      
      if (response.customerAccessToken) {
        setAccessToken(response.customerAccessToken.accessToken)
        setUser(response.customer)
        localStorage.setItem('customerAccessToken', response.customerAccessToken.accessToken)
        localStorage.setItem('customer', JSON.stringify(response.customer))
        return { success: true }
      } else if (response.errors) {
        throw new Error(response.errors[0]?.message || 'Login failed')
      }
    } catch (err) {
      const message = err.message || 'Login failed'
      setError(message)
      return { success: false, error: message }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setAccessToken(null)
    setError(null)
    localStorage.removeItem('customerAccessToken')
    localStorage.removeItem('customer')
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem('customer', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      isLoading,
      error,
      login,
      logout,
      updateUser,
      isLoggedIn: !!user && !!accessToken,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

/**
 * Login customer using Storefront API
 */
async function loginCustomer(email, password) {
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN

  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          message
        }
      }
    }
  `
  
  const variables = {
    input: {
      email,
      password,
    },
  }

  try {
    const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    })

    const data = await res.json()

    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'Authentication failed')
    }

    const { customerAccessToken, customerUserErrors } = data.data.customerAccessTokenCreate

    if (customerUserErrors && customerUserErrors.length > 0) {
      throw new Error(customerUserErrors[0].message)
    }

    if (!customerAccessToken) {
      throw new Error('No access token returned')
    }

    // Fetch customer details
    const customerData = await fetchCustomerData(customerAccessToken.accessToken)

    return {
      customerAccessToken,
      customer: customerData,
      errors: null,
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      customerAccessToken: null,
      customer: null,
      errors: [{ message: error.message }],
    }
  }
}

/**
 * Fetch customer details using access token
 */
async function fetchCustomerData(accessToken) {
  const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN

  const query = `
    query {
      customer(customerAccessToken: "${accessToken}") {
        id
        firstName
        lastName
        email
        phone
        defaultAddress {
          id
          address1
          address2
          city
          province
          country
          zip
        }
        addresses {
          id
          address1
          address2
          city
          province
          country
          zip
        }
      }
    }
  `

  try {
    const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query }),
    })

    const data = await res.json()

    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'Failed to fetch customer data')
    }

    return data.data.customer
  } catch (error) {
    console.error('Error fetching customer data:', error)
    return null
  }
}