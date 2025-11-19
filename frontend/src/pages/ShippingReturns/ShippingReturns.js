import React from 'react';
import './ShippingReturns.css';

const ShippingReturns = () => {
  return (
    <div className="shipping-returns-container">
      <h1>Shipping & Returns</h1>
      <div className="shipping-policy">
        <h2>Shipping Policy</h2>
        <p>We are committed to bringing the beauty of nature to your doorstep with the utmost care. Here's what you need to know about our shipping process:</p>
        <ul>
          <li><strong>Processing Time:</strong> Orders are typically processed within 1-2 business days.</li>
          <li><strong>Shipping Times:</strong> Shipping usually takes 3-5 business days, depending on your location.</li>
          <li><strong>Shipping Costs:</strong> Shipping costs are calculated at checkout based on the size and weight of your order.</li>
          <li><strong>Packaging:</strong> Our plants are carefully packaged to ensure they arrive in perfect condition.</li>
        </ul>
      </div>
      <div className="returns-policy">
        <h2>Returns Policy</h2>
        <p>We stand by the quality of our plants. If you are not satisfied with your purchase, please review our returns policy:</p>
        <ul>
          <li><strong>30-Day Guarantee:</strong> We offer a 30-day guarantee on all our plants. If your plant arrives damaged or in poor condition, please contact us within 30 days of delivery.</li>
          <li><strong>How to Initiate a Return:</strong> To initiate a return, please email us at support@gardenia.com with your order number and a photo of the plant.</li>
          <li><strong>Refunds:</strong> We offer a full refund or a replacement plant for all eligible returns.</li>
        </ul>
      </div>
    </div>
  );
};

export default ShippingReturns;
