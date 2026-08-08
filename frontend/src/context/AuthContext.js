import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Set REACT_APP_API_URL in the deployment environment for production.
// Local development falls back to the existing Express server.
const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
      loadUser();
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/users/me`);
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Failed to load user', err);
      setToken(null);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setToken(res.data.token);
      setIsLoggedIn(true);
      return { success: true, data: res.data };
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.msg || err.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/api/users/register`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setToken(res.data.token);
      setIsLoggedIn(true);
      return { success: true, data: res.data };
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.msg || err.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
  };

  const value = {
    isLoggedIn,
    user,
    token,
    login,
    logout,
    register,
    apiUrl: API_URL,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
