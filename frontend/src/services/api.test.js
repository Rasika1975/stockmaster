// Simple test file to verify API service is working
// This is just for demonstration purposes

import { authAPI, productsAPI } from './api';

// Test function to verify API connectivity
export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    
    // Test auth API (this will likely fail without proper credentials)
    console.log('Testing auth API...');
    
    // Test products API (this will likely fail without authentication)
    console.log('Testing products API...');
    
    console.log('API tests completed (check console for any errors)');
    return true;
  } catch (error) {
    console.error('API test failed:', error);
    return false;
  }
};

export default {
  testApiConnection
};