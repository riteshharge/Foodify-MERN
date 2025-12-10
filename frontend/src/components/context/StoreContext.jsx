// src/components/context/StoreContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // 🔍 add search state for Navbar + SearchResults
  const [searchQuery, setSearchQuery] = useState("");

  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);

    const fetchFood = async () => {
      try {
        const res = await axios.get(`${url}/api/food/list`);
        if (res.data && res.data.success) {
          const foodsWithImages = res.data.data.map((item) => ({
            ...item,
            image: item.image.startsWith("http")
              ? item.image
              : `${url}/uploads/${item.image.replace(/^uploads\//, "")}`,
          }));
          setFoodList(foodsWithImages);
        } else {
          console.error("Could not fetch foods:", res.data);
        }
      } catch (err) {
        console.error("Error fetching food list:", err);
      }
    };

    fetchFood();
  }, [url]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updated = { ...prev };
      if (updated[itemId] <= 1) delete updated[itemId];
      else updated[itemId] -= 1;
      return updated;
    });
  };

  const getTotalCartAmount = (itemsMeta = food_list) => {
    if (!itemsMeta || itemsMeta.length === 0) return 0;

    let total = 0;
    Object.keys(cartItems).forEach((id) => {
      const qty = cartItems[id];
      const item = itemsMeta.find(
        (it) => it._id === id || String(it._id) === String(id)
      );
      if (item) total += item.price * qty;
    });
    return total;
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    food_list,
    setFoodList,

    // 🔍 expose search to Navbar
    searchQuery,
    setSearchQuery,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
