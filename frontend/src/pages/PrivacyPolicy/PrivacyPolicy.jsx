import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  // === Dynamically Get Current Month and Year ===
  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="page-container privacy-page">
      {/* === Page Title === */}
      <h1>Privacy Policy</h1>
      <p>
        At <strong>Foodify</strong>, we value your trust and take your privacy
        seriously. This policy outlines how we collect, use, and protect your
        personal data while ensuring a safe and seamless experience.
      </p>

      <hr />

      {/* === Section: Information Collection === */}
      <section className="policy-section">
        <h2>1. Information We Collect</h2>
        <p>
          We collect personal information that helps us deliver better services
          and improve your ordering experience. This may include:
        </p>
        <ul>
          <li>👤 Personal details such as name, email, and phone number</li>
          <li>🏠 Delivery address and order preferences</li>
          <li>
            💳 Payment details (secured via trusted third-party payment
            gateways)
          </li>
          <li>
            💻 Device and browser information for performance optimization
          </li>
        </ul>
      </section>

      {/* === Section: Usage of Information === */}
      <section className="policy-section">
        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information you provide to ensure a smooth, personalized
          experience:
        </p>
        <ul>
          <li>To process and deliver your food orders efficiently</li>
          <li>📩 To send order confirmations and status updates</li>
          <li>
            ⭐ To improve our platform, menu recommendations, and customer
            service
          </li>
          <li>🔒 To ensure transaction and data security</li>
        </ul>
      </section>

      {/* === Section: Data Protection === */}
      <section className="policy-section">
        <h2>3. Data Protection and Security</h2>
        <p>
          Your data is encrypted and stored securely. We never sell, trade, or
          rent your personal information to others. Our systems comply with
          modern privacy standards.
        </p>
      </section>

      {/* === Section: Third-Party Sharing === */}
      <section className="policy-section">
        <h2>4. Sharing with Third Parties</h2>
        <p>
          We only share data with trusted service providers such as payment
          gateways, delivery partners, or analytics tools — strictly for order
          fulfillment and service improvement purposes.
        </p>
      </section>

      {/* === Section: Data Handling === */}
      <section className="policy-section">
        <h2>5. Data Handling</h2>
        <p>
          Any information you provide is used solely to process your orders,
          ensure accurate deliveries, and enhance your overall experience with
          our service. We only collect essential details such as your name,
          contact number, address, and order preferences.
        </p>
      </section>

      {/* === Section: Policy Updates === */}
      <section className="policy-section">
        <h2>6. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Any changes will be
          reflected here, with the latest revision date shown below.
        </p>
      </section>

      {/* === Section: Contact Information === */}
      <section className="policy-section">
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions or concerns, please contact our support
          team:
        </p>
        <p>
          📧 <a href="mailto:privacy@foodify.com">privacy@foodify.com</a>
          <br />
          📞 +91-9876543211
        </p>
      </section>

      {/* === Dynamic Last Updated Note === */}
      <p className="policy-note">
        Last Updated: {month} {year}
        <br />
        Thank you for trusting <strong>Foodify</strong> — your privacy, our
        priority.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
