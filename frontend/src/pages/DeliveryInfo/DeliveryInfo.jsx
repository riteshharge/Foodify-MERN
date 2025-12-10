import React from 'react';
import './DeliveryInfo.css';

const DeliveryInfo = () => {
  return (
    <div className="page-container delivery-page">
      <h1>Delivery Information</h1>
      <p>
        At <strong>Foodify</strong>, we ensure your meals are delivered hot, fresh, and on time.
        Our trusted delivery partners make sure every order reaches you safely and quickly.
      </p>

      <hr />

      <section className="delivery-section">
        <h2>Delivery Timings</h2>
        <p>
          We operate from <strong>9:00 AM to 11:00 PM</strong> daily.  
          The average delivery time is between <strong>30–45 minutes</strong>, depending on your
          location and order size. During peak hours, delivery may take a little longer — we
          appreciate your patience.
        </p>
      </section>

      <section className="delivery-section">
        <h2>Delivery Areas</h2>
        <p>
         We offer delivery across all major parts of your city and are actively working to expand our
         service network to new locations.
        </p>

      </section>

      <section className="delivery-section">
        <h2>Delivery Charges</h2>
        <ul>
          <li>🍔 Enjoy a complimentary gift with orders above ₹499</li>
          <li>💸 ₹40 delivery charge for orders </li>
          <li>⏱️ Delivery times may vary based on location and order volume.</li>
        </ul>
      </section>

      <section className="delivery-section">
        <h2>Order Tracking</h2>
        <p>
          Once your order is placed, you can track its status in real-time through the
          <strong> “Track Order”</strong> page. You’ll see updates from preparation to delivery,
          ensuring full transparency until your food reaches your doorstep.
        </p>
      </section>

      <section className="delivery-section">
        <h2>Contact & Support</h2>
        <p>
          Have any delivery issues or delays? Our support team is here to help!  
          You can reach us at <a href="mailto:support@foodify.com">support@foodify.com</a>  
          or call us at <strong>+91-9876543210</strong>.
        </p>
      </section>

      <p className="delivery-note">
        Thank you for choosing <strong>Foodify</strong> — fast, fresh, and reliable food delivery!
      </p>
    </div>
  );
};

export default DeliveryInfo;
