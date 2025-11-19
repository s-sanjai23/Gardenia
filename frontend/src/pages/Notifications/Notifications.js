import React from 'react';
import './Notifications.css';

const Notifications = () => {
  return (
    <div className="notifications-page">
      <h1 className="notifications-title">Notifications</h1>
      <div className="notification-list">
        <div className="notification-item">
          <p className="notification-message">Your order #1234 has been shipped!</p>
          <p className="notification-date">October 2, 2025</p>
        </div>
        <div className="notification-item">
          <p className="notification-message">New plant care guide available for your Monstera Deliciosa.</p>
          <p className="notification-date">October 1, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
