import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Orders = () => {
  const { token } = useContext(StoreContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading
  const [error, setError] = useState(null);

  const API_BASE_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const fetchOrders = async () => {
    if (!token) {
      setLoading(false);
      setError("Admin not logged in");
      return toast.error("Admin not logged in");
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`${API_BASE_URL}/api/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success) {
        setOrders(res.data.data || []);
      } else {
        setError(res.data?.message || "Failed to fetch orders");
        toast.error(res.data?.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err?.response?.data?.message || "Network error fetching orders");
      toast.error(err?.response?.data?.message || "Error fetching orders");
    } finally {
      setLoading(false); // Always stop loading
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/order/status`,
        { orderId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success) {
        toast.success("Order status updated");
        fetchOrders();
      } else {
        toast.error(res.data?.message || "Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(err?.response?.data?.message || "Error updating status");
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/order/delete`,
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.success) {
        toast.success("Order deleted successfully");
        fetchOrders();
      } else {
        toast.error(res.data?.message || "Failed to delete order");
      }
    } catch (err) {
      console.error("Delete order error:", err);
      toast.error(err?.response?.data?.message || "Error deleting order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="orders-container">
      <h2 className="orders-title">📦 All Orders</h2>

      {/* Loading State */}
      {loading && (
        <p className="loading-message">⏳ Please wait… Loading orders…</p>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
        </div>
      )}

      {/* No Orders */}
      {!loading && !error && orders.length === 0 && (
        <div className="no-orders">
          <p>No orders found.</p>
        </div>
      )}

      {/* Display Orders After Loading */}
      {!loading && !error && orders.length > 0 && (
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="order-id">{order._id}</td>

                  <td className="user-info">
                    {typeof order.userId === "object"
                      ? order.userId.email ||
                        order.userId.phone ||
                        order.userId._id
                      : order.userId}
                  </td>

                  <td className="order-items">
                    {Array.isArray(order.items)
                      ? order.items.map((it, idx) => (
                          <div key={idx} className="item-entry">
                            <span className="item-name">
                              {it.name || it.title || it._id}
                            </span>{" "}
                            × {it.quantity || 1}
                          </div>
                        ))
                      : "No items"}
                  </td>

                  <td className="order-amount">₹{order.amount}</td>

                  <td className="order-address">
                    {typeof order.address === "object" ? (
                      <>
                        <div>{order.address.street || order.address.line1}</div>
                        <div>
                          {order.address.city}, {order.address.state}{" "}
                          {order.address.zipcode}
                        </div>
                        {order.address.phone && (
                          <div>📞 {order.address.phone}</div>
                        )}
                      </>
                    ) : (
                      order.address
                    )}
                  </td>

                  <td className="order-status">{order.status}</td>

                  <td className="order-action">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="status-dropdown"
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <button
                      onClick={() => handleDelete(order._id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
