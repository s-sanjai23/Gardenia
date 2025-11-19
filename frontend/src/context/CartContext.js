import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      getCart();
    }
  }, [token]);

  const getCart = async () => {
    if (!token) return;
    try {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const res = await axios.get('http://localhost:5000/api/users/cart', config);
      setCartItems(res.data);
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
      } else {
        console.error('Error fetching cart:', err.message);
      }
    }
  };

  const addItem = async (item) => {
    if (!token) {
      alert('Please log in to add items to your cart.');
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ itemId: item.id, quantity: 1 });

    try {
      const res = await axios.post('http://localhost:5000/api/users/cart', body, config); // config is kept for Content-Type
      setCartItems(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/users/cart/${itemId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      return removeItem(itemId);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ quantity });

    try {
      const res = await axios.put(`http://localhost:5000/api/users/cart/${itemId}`, body, config); // config is kept for Content-Type
      setCartItems(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const clearCart = () => {
    // This will be handled by the backend when an order is created
    setCartItems([]);
  };

  const value = {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};