import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import './PlantDetail.css';

const PlantDetail = () => {
  const { plantId } = useParams();
  const { addItem, clearCart } = useCart();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);

  // Local state for reviews to simulate adding a new one
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/plants/${plantId}`);
        setPlant(res.data);
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error('Error fetching plant:', err);
      }
    };

    fetchPlant();
  }, [plantId]);

  if (!plant) {
    return <div className="plant-detail-page"><h2>Loading...</h2></div>;
  }

  const handleAddReview = (e) => {
    e.preventDefault();
    const newReview = {
      id: `r${Date.now()}`, // simple unique id
      author: 'Jeevi', // In a real app, this would be the logged-in user
      rating: newReviewRating,
      text: newReviewText,
    };
    setReviews(prevReviews => [newReview, ...prevReviews]);
    setNewReviewText('');
    setNewReviewRating(5);
  };

  const handleBuyNow = () => {
    clearCart();
    addItem(plant);
    navigate('/checkout');
  };

  return (
    <div className="plant-detail-page">
      <div className="detail-container">
        <div className="detail-image-container">
          <img src={plant.image} alt={plant.name} />
        </div>
        <div className="detail-info-container">
          <h1>{plant.name}</h1>
          <p className="detail-price">₹{plant.price.toFixed(2)}</p>
          <p className="detail-description">{plant.description}</p>
          <div className="detail-actions">
            <button className="add-to-cart-btn-detail" onClick={() => addItem(plant)}>Add to Cart</button>
            <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Reviews & Ratings</h2>
        <div className="review-form-container">
          <h3>Add Your Review</h3>
          <form onSubmit={handleAddReview}>
            <div className="rating-input">
              <label>Your Rating:</label>
              <select value={newReviewRating} onChange={e => setNewReviewRating(Number(e.target.value))}>
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Average</option>
                <option value={2}>2 - Fair</option>
                <option value={1}>1 - Poor</option>
              </select>
            </div>
            <textarea 
              rows="4"
              placeholder="Write your review here..."
              value={newReviewText}
              onChange={e => setNewReviewText(e.target.value)}
              required
            ></textarea>
            <button type="submit">Submit Review</button>
          </form>
        </div>

        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <strong>{review.author}</strong>
                  <span className="review-rating">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                </div>
                <p>{review.text}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review this plant!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;