import React, { useState, createContext, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user profile
      authAPI.getProfile()
        .then(profile => {
          setUser(profile);
          setIsAuthenticated(true);
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, ...userData } = response;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      // Set user data
      setUser(userData);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      throw error;
    }
  };

const register = async (username, email, password) => {
    try {
      // For now, we'll just create the user and redirect to login
      // In a real app, you might want to automatically log them in
      await authAPI.register({ username, email, password });
      return true;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
