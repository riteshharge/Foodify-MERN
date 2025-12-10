import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

// Main pages
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import TrackOrder from "./pages/TrackOrder/TrackOrder.jsx";

// Footer-linked pages
import AboutUs from "./pages/AboutUs/AboutUs";
import DeliveryInfo from "./pages/DeliveryInfo/DeliveryInfo";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";

// 🔍 Search Results Page
import SearchResults from "./pages/SearchResults/SearchResults";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();

  // Pages where Navbar & Footer should be hidden
  const hideLayoutPages = ["/about", "/delivery", "/privacy-policy"];
  const shouldHideLayout = hideLayoutPages.includes(location.pathname);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        {/* Show Navbar only when not on about/delivery/privacy */}
        {!shouldHideLayout && <Navbar setShowLogin={setShowLogin} />}

        <Routes>
          {/* Main App Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/track/:orderId" element={<TrackOrder />} />

          {/* 🔍 Search Page */}
          <Route path="/search" element={<SearchResults />} />

          {/* Footer-linked Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/delivery" element={<DeliveryInfo />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>

      {/* Show Footer only when not on about/delivery/privacy */}
      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default App;
