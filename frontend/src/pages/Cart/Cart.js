import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeItem, updateQuantity } = useCart();

  console.log(cartItems);

  const calculateTotal = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is currently empty.</p>
            <Link to="/plants" className="start-shopping-btn">Start Shopping</Link>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map(cartItem => (
                <div key={cartItem.item.id} className="cart-item">
                  <img src={cartItem.item.image} alt={cartItem.item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{cartItem.item.name}</h3>
                    <p className="cart-item-price">₹{cartItem.item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}>-</button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}>+</button>
                  </div>
                  <div className="cart-item-subtotal">
                    <p>₹{(cartItem.item.price * cartItem.quantity).toFixed(2)}</p>
                  </div>
                  <div className="cart-item-remove">
                    <button onClick={() => removeItem(cartItem.item.id)}>×</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="cart-total">
                <h3>Total: ₹{calculateTotal()}</h3>
              </div>
              <div className="cart-actions">
                <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
