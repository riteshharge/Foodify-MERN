import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../../assets/assets";

const Navbar = ({ setShowLogin }) => {
  const [activeLink, setActiveLink] = useState("menu");
  const [showSearch, setShowSearch] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const { cartItems, searchQuery, setSearchQuery, token, setToken } =
    useContext(StoreContext);

  const totalCartItems = Object.values(cartItems).reduce((a, b) => a + b, 0);

  /* Close search popup when route changes */
  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setShowSearch(false);
    }
  }, [location]);

  /* Close profile dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Search input typing navigation */
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchQuery(term);

    if (term.trim()) {
      navigate(`/search?q=${encodeURIComponent(term)}`, { replace: true });
    }
  };

  /* Logout handler */
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setOpenDropdown(false);
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          <img src={assets.logo} alt="Foodify Logo" className="logo" />
        </Link>

        {/* MENU LINKS */}
        <nav className="navbar-links">
          <a
            href="#explore-menu"
            className={activeLink === "menu" ? "nav-link active" : "nav-link"}
            onClick={() => setActiveLink("menu")}
          >
            menu
          </a>
          <a
            href="#mobile-app"
            className={
              activeLink === "mobile-app" ? "nav-link active" : "nav-link"
            }
            onClick={() => setActiveLink("mobile-app")}
          >
            mobile-app
          </a>
          <a
            href="#contact"
            className={
              activeLink === "contact-us" ? "nav-link active" : "nav-link"
            }
            onClick={() => setActiveLink("contact-us")}
          >
            contact us
          </a>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="navbar-actions" ref={dropdownRef}>
          {/* SEARCH ICON */}
          <button
            type="button"
            className="icon-button"
            onClick={() => setShowSearch(true)}
          >
            <img src={assets.search_icon} alt="Search" />
          </button>

          {/* CART */}
          <Link to="/cart" className="icon-button cart-button">
            <img src={assets.basket_icon} alt="Cart" />
            {totalCartItems > 0 && <span className="cart-dot" />}
          </Link>

          {/* PROFILE DROPDOWN */}
          {token ? (
            <div className="profile-container">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="profile-icon"
                onClick={() => setOpenDropdown(!openDropdown)}
              />

              {openDropdown && (
                <div className="profile-dropdown">
                  <p
                    onClick={() => {
                      navigate("/myorders");
                      setOpenDropdown(false);
                    }}
                  >
                    My Orders
                  </p>
                  <p onClick={handleLogout}>Logout</p>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              className="nav-signin-btn"
              onClick={() => setShowLogin(true)}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* SEARCH INPUT WITH X CLOSE (NO BACK BUTTON) */}
      {showSearch && (
        <div className="navbar-search-popup">
          <div className="navbar-search-card">
            {/* CROSS ICON TO CLOSE SEARCH */}
            <button
              className="navbar-search-close-btn"
              onClick={() => setShowSearch(false)}
            >
              ×
            </button>

            <input
              type="text"
              placeholder="Search food..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="navbar-search-input"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
