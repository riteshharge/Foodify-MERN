import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TrackOrder.css";
import { StoreContext } from "../../components/context/StoreContext";

const TrackOrder = () => {
  const { token, url } = useContext(StoreContext);
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const res = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        const found = res.data.data.find((o) => o._id === orderId);
        setOrder(found);
      }
    } catch (err) {
      console.error("Error fetching order:", err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const getStatusStep = (status) => {
    switch (status) {
      case "Food Processing":
        return 1;
      case "Out for Delivery":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 0;
    }
  };

  return (
    <div className="track-order-container">
      {!order ? (
        <p>Loading order details...</p>
      ) : (
        <div className="track-order-card">
          <div className="track-header">
            <h2>Order Tracking</h2>
            <p>Order ID: {order._id}</p>
          </div>

          <div className="track-items">
            {order.items.map((item, index) => (
              <div key={index} className="track-item">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
            
          </div>

          <div className="progress-tracker">
            <div
              className={`step ${getStatusStep(order.status) >= 1 ? "active" : ""}`}
            >
              <div className="dot"></div>
              <p>Food Processing</p>
            </div>
            <div
              className={`step ${getStatusStep(order.status) >= 2 ? "active" : ""}`}
            >
              <div className="dot"></div>
              <p>Out for Delivery</p>
            </div>
            <div
              className={`step ${getStatusStep(order.status) >= 3 ? "active" : ""}`}
            >
              <div className="dot"></div>
              <p>Delivered</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
