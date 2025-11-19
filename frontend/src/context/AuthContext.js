import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

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
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/me');
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Failed to load user", err);
      setToken(null); // This will clear the invalid token
    }
  };

  const login = async ({ email, password }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', body, config);
      setToken(res.data.token);
      setIsLoggedIn(true); // Set logged in state immediately
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received from server. Is the backend running?');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', err.message);
      }
    }
  };

  const register = async (userData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(userData);

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', body, config);
      setToken(res.data.token);
      setIsLoggedIn(true); // Set logged in state immediately
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received from server. Is the backend running?');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', err.message);
      }
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};