import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      getOrders();
    }
  }, [token]);

  const getOrders = async () => {
    if (!token) return;
    try {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const res = await axios.get('http://localhost:5000/api/orders', config);
      setOrders(res.data);
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
      } else {
        console.error('Error fetching orders:', err.message);
      }
    }
  };

  const addOrder = async (orderData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('http://localhost:5000/api/orders', orderData, config); // config is kept for Content-Type
      setOrders(prevOrders => [res.data, ...prevOrders]);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const value = {
    orders,
    addOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};