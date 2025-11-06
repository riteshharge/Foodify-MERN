
import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../context/StoreContext";

/**
 * Optimize Cloudinary URLs ONLY.
 */
const getOptimizedImage = (url, opts = { w: 350, h: 250 }) => {
  if (!url || typeof url !== "string") return url;

  try {
    const cloudinaryPattern = /https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\//i;
    if (cloudinaryPattern.test(url) && url.includes("/upload/")) {
      const transform = `f_auto,q_auto,w_${opts.w},h_${opts.h},c_fill/`;
      return url.replace("/upload/", `/upload/${transform}`);
    }
  } catch (e) {
    return url;
  }

  return url;
};

const FoodItem = ({ id, name, price, description, image, rating, onImageLoad }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const qty = cartItems[id] || 0;

  const [loaded, setLoaded] = useState(false);

  const optimizedSrc = getOptimizedImage(image);

  // ✅ Helper: handle load + notify parent
  const handleLoad = () => {
    setLoaded(true);
    if (onImageLoad) onImageLoad(); // notify FoodDisplay
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container" style={{ position: "relative" }}>
        
        {/* ✅ Placeholder shimmer */}
        {!loaded && (
          <div
            className="image-placeholder"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, #f3f3f3 25%, #e9e9e9 37%, #f3f3f3 63%)",
              backgroundSize: "400% 100%",
              animation: "shimmer 1.2s linear infinite",
              borderRadius: 8,
            }}
          />
        )}

        {/* ✅ Optimized Cloudinary Image */}
        {image && optimizedSrc && (
          <img
            src={optimizedSrc}
            alt={name}
            className="food-item-image"
            loading="eager"
            width={350}
            height={250}
            onLoad={handleLoad}
            onError={handleLoad}
            style={{
              width: "100%",
              height: "auto",
              display: loaded ? "block" : "none",
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
        )}

        {/* ✅ Overlay ADD / Counter — same OLD CLASSNAMES */}
        {loaded && (
          <>
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
          </>
        )}
      </div>

      {/* ✅ Item content section */}
      <div className="food-item-content">
        <p className="food-item-name">{name}</p>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
