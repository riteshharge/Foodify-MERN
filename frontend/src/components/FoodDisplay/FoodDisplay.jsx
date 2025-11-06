import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Tracks loaded images
  const [loadedCount, setLoadedCount] = useState(0);

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  return (
    <div className="food-display" id="food-display">
      <h3>Our Signature Dishes</h3>

      {loadedCount < 4 && (
        <p
          className="food-loading-message"
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          🍽️ Are you hungry? Please wait… loading delicious items!
        </p>
      )}

      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                rating={item.rating}
                onImageLoad={handleImageLoad} // important!
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
