import React, { useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, admin, setAdmin, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken("");
    setAdmin(false);
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="navbar">
      <img
        className="logo"
        src={assets.logo}
        alt="Foodify Logo"
        onClick={() => navigate("/")}
      />

      {token && admin ? (
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      ) : (
        <p className="login-condition" onClick={() => navigate("/")}>
          Login
        </p>
      )}

      <img className="profile" src={assets.profile_image} alt="Profile" />
    </div>
  );
};

export default Navbar;
