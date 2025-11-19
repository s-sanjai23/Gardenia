import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import './Accessories.css';

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const { addItem, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/accessories');
        setAccessories(res.data);
      } catch (err) {
        console.error('Error fetching accessories:', err);
      }
    };

    fetchAccessories();
  }, []);

  const handleBuyNow = (accessory) => {
    clearCart();
    addItem(accessory);
    navigate('/checkout');
  };

  return (
    <div className="accessories-page">
      <h1 className="accessories-title">Our Accessories Collection</h1>
      <div className="accessories-grid">
        {accessories.map(accessory => (
          <div key={accessory.id} className="accessory-card">
            <Link to={`/accessories/${accessory.id}`} className="accessory-card-link">
              <img src={accessory.image} alt={accessory.name} />
              <h3>{accessory.name}</h3>
            </Link>
            <p className="price">₹{accessory.price}</p>
            <div className="card-actions">
              <button className="add-to-cart-btn" onClick={() => addItem(accessory)}>Add to Cart</button>
              <button className="buy-now-btn-card" onClick={() => handleBuyNow(accessory)}>Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accessories;