import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  // Define state here
  const [menu, setMenu] = useState("");

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          With <strong>Foodify</strong>, explore mouth-watering meals from your
          favorite restaurants and get them delivered hot and fresh to your door
          — fast, easy, and delicious.
        </p>

        <button
          onClick={() => {
            setMenu("menu");
            window.location.href = "#explore-menu";
          }}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
