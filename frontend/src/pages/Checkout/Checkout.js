import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const recommendedAccessories = [
  {
    id: 'a1',
    name: 'Modern Ceramic Pot',
    price: 499,
    image: 'https://images.unsplash.com/photo-1557291269-96f37fd69392?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'a2',
    name: 'Stylish Watering Can',
    price: 799,
    image: 'https://images.unsplash.com/photo-1586251986492-8a1c2a5a5b18?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'a3',
    name: 'Gardening Tool Set',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1617582995183-55499ae3f3bf?q=80&w=1974&auto=format&fit=crop',
  },
];

const Checkout = () => {
  const { cartItems, addItem, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const showRecommendations = cartItems.some(cartItem => cartItem.item.id.startsWith('p'));

  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [id]: value }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.zip) {
        alert('Please fill out all shipping fields.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const orderData = {
      items: cartItems.map(cartItem => ({
        name: cartItem.item.name,
        price: cartItem.item.price,
        image: cartItem.item.image,
        quantity: cartItem.quantity,
      })),
      total: calculateTotal(),
    };
    addOrder(orderData);
    clearCart();
    navigate('/my-orders');
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-form-container">
          <div className="step-progress-bar">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>Shipping</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>Payment</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>Review</div>
          </div>

          {step === 1 && (
            <form onSubmit={handleNextStep}>
              {showRecommendations && (
                <div className="recommendations-container">
                  <h2>Recommended For You</h2>
                  <div className="recommendations-grid">
                    {recommendedAccessories.map(acc => (
                      <div key={acc.id} className="rec-card">
                        <img src={acc.image} alt={acc.name} />
                        <h3>{acc.name}</h3>
                        <p className="price">₹{acc.price}</p>
                        <button type="button" onClick={() => addItem(acc)}>Add to Cart</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <h2>Shipping Information</h2>
              <div className="form-group">
                <input type="text" id="name" required onChange={handleInputChange} value={shippingInfo.name} />
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="form-group">
                <input type="text" id="address" required onChange={handleInputChange} value={shippingInfo.address} />
                <label htmlFor="address">Street Address</label>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" id="city" required onChange={handleInputChange} value={shippingInfo.city} />
                  <label htmlFor="city">City</label>
                </div>
                <div className="form-group">
                  <input type="text" id="zip" required onChange={handleInputChange} value={shippingInfo.zip} />
                  <label htmlFor="zip">Postal Code</label>
                </div>
              </div>
              <div className="step-actions">
                <button type="submit" className="place-order-btn">Continue to Payment</button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div>
              <h2>Payment Method</h2>
              <div className="payment-methods">
                <label className="payment-option">
                  <input type="radio" name="payment" value="credit" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} />
                  <span>Credit Card</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} />
                  <span>PayPal</span>
                </label>
              </div>
              <div className="step-actions">
                <button type="button" className="back-btn" onClick={handlePrevStep}>Go Back</button>
                <button type="button" className="place-order-btn" onClick={handleNextStep}>Continue to Review</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2>Review Your Order</h2>
              <div className="review-details">
                <div className="review-section">
                  <h4>Shipping To:</h4>
                  <p>{shippingInfo.name}</p>
                  <p>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.zip}</p>
                </div>
                <div className="review-section">
                  <h4>Payment Method:</h4>
                  <p>{paymentMethod === 'credit' ? 'Credit Card' : 'PayPal'}</p>
                </div>
              </div>
              <div className="step-actions">
                <button type="button" className="back-btn" onClick={handlePrevStep}>Go Back</button>
                <button type="button" className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
              </div>
            </div>
          )}
        </div>

        <div className="order-summary-container">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cartItems.length > 0 ? cartItems.map(cartItem => (
              <div key={cartItem.item.id} className="summary-item">
                <span>{cartItem.item.name} (x{cartItem.quantity})</span>
                <span>₹{(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
              </div>
            )) : <p>Your cart is empty.</p>}
          </div>
          <div className="summary-total">
            <strong>Total</strong>
            <strong>₹{calculateTotal().toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
