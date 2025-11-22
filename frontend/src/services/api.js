// API service to handle all HTTP requests to the backend
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make HTTP requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    // Handle successful responses
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    
    // Handle error responses
    let errorMessage = 'Something went wrong';
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || `HTTP Error: ${response.status}`;
    } catch (parseError) {
      // If we can't parse the error response, use the status text
      errorMessage = response.statusText || `HTTP Error: ${response.status}`;
    }
    
    throw new Error(errorMessage);
  } catch (error) {
    // Re-throw network errors or other issues
    if (error instanceof TypeError) {
      throw new Error('Network error - Please check your connection');
    }
    
    // Re-throw other errors
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: (email, password) => 
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  register: (userData) => 
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  getProfile: () => 
    apiRequest('/auth/profile', {
      method: 'GET',
    }),
};

// Products API
export const productsAPI = {
  getAll: () => apiRequest('/products', { method: 'GET' }),
  
  getById: (id) => apiRequest(`/products/${id}`, { method: 'GET' }),
  
  create: (productData) => 
    apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),
  
  update: (id, productData) => 
    apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    }),
  
  delete: (id) => 
    apiRequest(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// Warehouses API
export const warehousesAPI = {
  getAll: () => apiRequest('/warehouses', { method: 'GET' }),
  
  getById: (id) => apiRequest(`/warehouses/${id}`, { method: 'GET' }),
  
  create: (warehouseData) => 
    apiRequest('/warehouses', {
      method: 'POST',
      body: JSON.stringify(warehouseData),
    }),
  
  update: (id, warehouseData) => 
    apiRequest(`/warehouses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(warehouseData),
    }),
  
  delete: (id) => 
    apiRequest(`/warehouses/${id}`, {
      method: 'DELETE',
    }),
};

// Categories API
export const categoriesAPI = {
  getAll: () => apiRequest('/categories', { method: 'GET' }),
  
  getById: (id) => apiRequest(`/categories/${id}`, { method: 'GET' }),
  
  create: (categoryData) => 
    apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    }),
  
  update: (id, categoryData) => 
    apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    }),
  
  delete: (id) => 
    apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    }),
};

// Receipts API
export const receiptsAPI = {
  getAll: () => apiRequest('/receipts', { method: 'GET' }),
  
  getById: (id) => apiRequest(`/receipts/${id}`, { method: 'GET' }),
  
  create: (receiptData) => 
    apiRequest('/receipts', {
      method: 'POST',
      body: JSON.stringify(receiptData),
    }),
  
  update: (id, receiptData) => 
    apiRequest(`/receipts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(receiptData),
    }),
  
  delete: (id) => 
    apiRequest(`/receipts/${id}`, {
      method: 'DELETE',
    }),
};

// Deliveries API
export const deliveriesAPI = {
  getAll: () => apiRequest('/deliveries', { method: 'GET' }),
  
  getById: (id) => apiRequest(`/deliveries/${id}`, { method: 'GET' }),
  
  create: (deliveryData) => 
    apiRequest('/deliveries', {
      method: 'POST',
      body: JSON.stringify(deliveryData),
    }),
  
  update: (id, deliveryData) => 
    apiRequest(`/deliveries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(deliveryData),
    }),
  
  delete: (id) => 
    apiRequest(`/deliveries/${id}`, {
      method: 'DELETE',
    }),
};

// Transfers API
export const transfersAPI = {
  getAll: () => apiRequest('/transfers', { method: 'GET' }),
  
  getById: (id) => apiRequest(`/transfers/${id}`, { method: 'GET' }),
  
  create: (transferData) => 
    apiRequest('/transfers', {
      method: 'POST',
      body: JSON.stringify(transferData),
    }),
  
  update: (id, transferData) => 
    apiRequest(`/transfers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transferData),
    }),
  
  delete: (id) => 
    apiRequest(`/transfers/${id}`, {
      method: 'DELETE',
    }),
};

// Adjustments API
export const adjustmentsAPI = {
  getAll: () => apiRequest('/adjustments', { method: 'GET' }),
  
  getById: (id) => apiRequest(`/adjustments/${id}`, { method: 'GET' }),
  
  create: (adjustmentData) => 
    apiRequest('/adjustments', {
      method: 'POST',
      body: JSON.stringify(adjustmentData),
    }),
  
  update: (id, adjustmentData) => 
    apiRequest(`/adjustments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(adjustmentData),
    }),
  
  delete: (id) => 
    apiRequest(`/adjustments/${id}`, {
      method: 'DELETE',
    }),
};

// Ledger API
export const ledgerAPI = {
  getAll: () => apiRequest('/ledger', { method: 'GET' }),
  
  getById: (id) => apiRequest(`/ledger/${id}`, { method: 'GET' }),
  
  create: (ledgerData) => 
    apiRequest('/ledger', {
      method: 'POST',
      body: JSON.stringify(ledgerData),
    }),
  
  update: (id, ledgerData) => 
    apiRequest(`/ledger/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ledgerData),
    }),
  
  delete: (id) => 
    apiRequest(`/ledger/${id}`, {
      method: 'DELETE',
    }),
};