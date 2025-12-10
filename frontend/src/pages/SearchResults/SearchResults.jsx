import React, { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.css";
import { StoreContext } from "../../components/context/StoreContext";
import FoodItem from "../../components/FoodItem/FoodItem";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const { food_list = [] } = useContext(StoreContext);
  const query = useQuery();
  const navigate = useNavigate();
  const q = (query.get("q") || "").trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return food_list.filter((item) =>
      (item.name || item.title || "").toLowerCase().includes(q)
    );
  }, [food_list, q]);

  return (
    <div className="search-results-page">
      <div className="search-results-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h2>Search results for “{query.get("q") || ""}”</h2>
      </div>

      {q === "" ? (
        <div className="search-empty">
          <p>Please type something to search.</p>
          <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
      ) : results.length === 0 ? (
        <div className="search-empty">
          <p>No items found for “{query.get("q")}”.</p>
          <button onClick={() => navigate("/")}>Browse Menu</button>
        </div>
      ) : (
        <div className="search-results-list">
          {results.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              rating={item.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
