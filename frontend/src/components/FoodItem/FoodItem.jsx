import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, rating }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const qty = cartItems[id] || 0;

  // Helper to render stars visually (full and half)
  const renderStars = (ratingValue) => {
    const fullStars = Math.floor(ratingValue);
    const hasHalf = ratingValue - fullStars >= 0.5;
    const total = 5;
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push(<span key={"f" + i}>★</span>);
    if (hasHalf) stars.push(<span key="half">☆</span>);
    const remaining = total - stars.length;
    for (let i = 0; i < remaining; i++) stars.push(<span key={"e" + i}>☆</span>);
    return <span className="stars">{stars}</span>;
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} className="food-item-image" alt={name} />

        {qty === 0 ? (
          <img
            src={assets.add_icon_white}
            alt="add"
            className="add"
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt="remove"
              onClick={() => removeFromCart(id)}
            />
            <p>{qty}</p>
            <img
              src={assets.add_icon_green}
              alt="add"
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <div className="star">
            <span className="rating-num">{rating ? rating.toFixed(1) : "0.0"}</span>
            <div className="rating-stars">{renderStars(rating || 0)}</div>
          </div>
        </div>

        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
