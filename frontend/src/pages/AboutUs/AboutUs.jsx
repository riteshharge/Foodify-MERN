import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="page-container about-page">
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Foodify</strong> — your one-stop destination to discover, order, and enjoy your favorite meals with just a few clicks.
        At Foodify, we believe that great food brings people together. Our mission is to make your dining experience
        faster, easier, and more enjoyable — whether you’re craving a quick bite or planning a family feast.
      </p>

      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2025, Foodify started with a simple idea — to connect food lovers with their favorite local restaurants
          through technology. What began as a small college project soon grew into a community-driven platform trusted by
          thousands of customers and restaurants across the city.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          To deliver happiness through food by providing a seamless, fast, and reliable food delivery experience while
          supporting local restaurants and food entrepreneurs.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          To become the most loved and trusted food delivery platform, known for innovation, quality, and customer delight —
          where every order is a moment of joy.
        </p>
      </section>

      <section className="about-section">
        <h2>What Makes Us Different</h2>
        <ul>
          <li>🍕 <strong>Wide Selection:</strong> Access to a variety of cuisines and local favorites.</li>
          <li>⚡ <strong>Quick Delivery:</strong> Average delivery time of 30–45 minutes.</li>
          <li>💳 <strong>Secure Payments:</strong> Safe and multiple payment options.</li>
          <li>💬 <strong>24/7 Support:</strong> Our team is always ready to help.</li>
          <li>🌱 <strong>Eco-Friendly:</strong> We encourage sustainable packaging and delivery practices.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Join Our Journey</h2>
        <p>
          Whether you’re a food lover, a restaurant owner, or a delivery partner — Foodify welcomes you to be part of
          our growing community. Together, let’s redefine the way the world enjoys food.
        </p>
      </section>

      <p className="about-thanks">Thank you for choosing <strong>Foodify</strong> — where taste meets technology!</p>
    </div>
  );
};

export default AboutUs;
