import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import './Plants.css';

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const { addItem, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/plants');
        setPlants(res.data);
      } catch (err) {
        console.error('Error fetching plants:', err);
      }
    };

    fetchPlants();
  }, []);

  const handleBuyNow = (plant) => {
    clearCart();
    addItem(plant);
    navigate('/checkout');
  };

  return (
    <div className="plants-page">
      <h1 className="plants-title">Our Plant Collection</h1>
      <div className="plants-grid">
        {plants.map(plant => (
          <div key={plant.id} className="plant-card">
            <Link to={`/plants/${plant.id}`} className="plant-card-link">
              <img src={plant.image} alt={plant.name} />
              <h3>{plant.name}</h3>
            </Link>
            <p className="price">₹{plant.price}</p>
            <div className="card-actions">
              <button className="add-to-cart-btn" onClick={() => addItem(plant)}>Add to Cart</button>
              <button className="buy-now-btn-card" onClick={() => handleBuyNow(plant)}>Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plants;
