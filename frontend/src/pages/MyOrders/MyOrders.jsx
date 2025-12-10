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
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setData(response.data.data);
      } else {
        console.error("Failed to fetch orders:", response.data.message);
      }
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const handleTrackOrder = (order) => {
    const orderId = order._id;
    if (orderId) {
      navigate(`/track/${orderId}`);
    } else {
      console.error("⚠️ Missing order ID:", order);
    }
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
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
              <button onClick={() => handleTrackOrder(order)}>
                Track Order
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
