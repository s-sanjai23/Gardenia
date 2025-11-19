import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Home.css';

const featuredPlants = [
  {
    id: 'p1',
    name: 'Monstera Deliciosa',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'p2',
    name: 'Snake Plant',
    price: 899,
    image: 'https://tse4.mm.bing.net/th/id/OIP.pRgS0Sblwd9LBSXqrY4f-wHaFj?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 'p3',
    name: 'Fiddle Leaf Fig',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1600411832986-5a4477b64a1c?q=80&w=1974&auto=format&fit=crop',
  },
];

const featuredAccessories = [
  {
    id: 'a1',
    name: 'Modern Ceramic Pot',
    price: 499,
    image: 'https://m.media-amazon.com/images/I/81vrR9Iv1+L.jpg',
  },
  {
    id: 'a2',
    name: 'Stylish Watering Can',
    price: 799,
    image: 'https://thegardeningcook.com/wp-content/uploads/2014/08/purple-watering-can-planter.jpg',
  },
  {
    id: 'a3',
    name: 'Gardening Tool Set',
    price: 1499,
    image: 'https://wonderfulengineering.com/wp-content/uploads/2016/09/Gardening-Tool-Sets.jpg',
  },
];

const Home = () => {
  const { addItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (item) => {
    clearCart();
    addItem(item);
    navigate('/checkout');
  };

  return (
    <div className="home-container">
      <section
        className="hero-section"
        style={{
          backgroundImage: `url('https://tse1.mm.bing.net/th/id/OIP.7lymZJ8OSXb4QlI9UV0rcgHaFD?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3')`
        }}
      >
        <div className="hero-content">
          <h1>Find Your Perfect Plant</h1>
          <p>Transform your home with our stunning collection of indoor and outdoor plants.</p>
          <Link to="/plants" className="cta-button">Explore Our Collection</Link>
        </div>
      </section>

      <section className="featured-plants-section">
        <h2>Featured Plants</h2>
        <div className="plant-cards-container">
          {featuredPlants.map(plant => (
            <div key={plant.id} className="plant-card">
              <img src={plant.image} alt={plant.name} />
              <h3>{plant.name}</h3>
              <p className="price">₹{plant.price}</p>
              <div className="card-actions">
                <button className="add-to-cart-btn" onClick={() => addItem(plant)}>Add to Cart</button>
                <button className="buy-now-btn-card" onClick={() => handleBuyNow(plant)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-accessories-section">
        <h2>Featured Accessories</h2>
        <div className="plant-cards-container">
          {featuredAccessories.map(accessory => (
            <div key={accessory.id} className="plant-card">
              <img src={accessory.image} alt={accessory.name} />
              <h3>{accessory.name}</h3>
              <p className="price">₹{accessory.price}</p>
              <div className="card-actions">
                <button className="add-to-cart-btn" onClick={() => addItem(accessory)}>Add to Cart</button>
                <button className="buy-now-btn-card" onClick={() => handleBuyNow(accessory)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
