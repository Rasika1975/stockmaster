const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testRegistrationAndLogin() {
  try {
    console.log('Testing Registration...');
    
    // Test registration
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('Registration Response:', registerResponse.data);
    
    console.log('\nTesting Login...');
    
    // Test login
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('Login Response:', loginResponse.data);
    
    console.log('\nTesting Profile (with token)...');
    
    // Test profile with token
    const profileResponse = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${loginResponse.data.token}`
      }
    });
    
    console.log('Profile Response:', profileResponse.data);
    
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testRegistrationAndLogin();