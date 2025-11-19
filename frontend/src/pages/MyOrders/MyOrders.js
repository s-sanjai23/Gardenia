import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { Link } from 'react-router-dom';
import './MyOrders.css';

const MyOrders = () => {
  const { orders } = useOrders();

  console.log('Orders in MyOrders component:', orders);

  return (
    <div className="my-orders-page">
      <div className="my-orders-container">
        <h1 className="my-orders-title">My Orders</h1>
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
            <Link to="/plants" className="start-shopping-btn">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-card-header">
                  <div className="order-info">
                    <h3>Order ID: {order._id}</h3>
                    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="order-status">
                    {order.status && <span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span>}
                    <p className="order-total">Total: ₹{order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="order-card-body">
                  <h4>Items:</h4>
                  {order.items.map(item => (
                    <div key={item._id} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <p>{item.name}</p>
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
