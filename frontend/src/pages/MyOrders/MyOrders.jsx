// frontend/src/pages/MyOrders/MyOrders.jsx
import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../components/context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);   // always start true so loading message shows first
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const fetchOrders = async () => {
      // if token is not present yet, keep showing loading until it arrives
      if (!token) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          `${url}/api/order/userorders`,
          {},
          {
            headers: { token },
            signal: controller.signal,
          }
        );

        if (cancelled) return;

        if (response?.data?.success) {
          setData(response.data.data || []);
        } else {
          // backend returned success: false
          setData([]);
          setError(response?.data?.message || "Failed to fetch orders");
          console.error("Failed to fetch orders:", response?.data);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          // request cancelled
          console.log("Orders fetch cancelled");
        } else {
          console.error("Error fetching orders:", err);
          setError(err?.message || "Network error fetching orders");
          setData([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchOrders();

    // safety: if token never comes, hide loading after 8s and show a friendly message
    // (optional — you can remove this timeout if you prefer to wait indefinitely)
    let fallbackTimer = null;
    if (!token) {
      fallbackTimer = setTimeout(() => {
        if (!cancelled) {
          setLoading(false);
          setError("Unable to load orders (not signed in / token missing).");
        }
      }, 8000);
    }

    return () => {
      cancelled = true;
      controller.abort();
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [token, url]);

  const handleTrackOrder = (order) => {
    if (order && order._id) {
      navigate(`/track/${order._id}`);
    } else {
      console.error("Missing order id for", order);
    }
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      <div className="container">
        {/* 1) Loading state (always shown first) */}
        {loading ? (
          <p className="loading-text">⏳ Please wait… your orders are loading</p>

        ) : /* 2) If finished and error (network / token) */ error ? (
          <div className="orders-error" style={{ textAlign: "center", color: "#c00" }}>
            <p>⚠️ {error}</p>
            <p>Please try again or refresh the page.</p>
          </div>

        ) : /* 3) finished and no orders */ data.length === 0 ? (
          <p className="no-orders-text">No orders found.</p>

        ) : /* 4) finished and have orders */ (
          data.map((order, index) => (
            <div key={order._id || index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="parcel" />
              <p>
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} × {item.quantity}
                    {idx !== order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p>₹{order.amount}</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>●</span> <b>{order.status}</b>
              </p>
              <button onClick={() => handleTrackOrder(order)}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
