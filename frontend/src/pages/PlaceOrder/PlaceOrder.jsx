// frontend/src/pages/PlaceOrder/PlaceOrder.jsx
import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    try {
      // Build order items from cart
      const orderItems = [];
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          const itemInfo = { ...item, quantity: cartItems[item._id] };
          orderItems.push(itemInfo);
        }
      });

      if (orderItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      const orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
      };

      console.log("Placing order, payload:", orderData);

      // Proper axios call with Authorization header
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Order response:", response.data);

      // Stripe redirect
      if (response.data && response.data.session_url) {
        const { session_url } = response.data;
        window.location.replace(session_url);
        return;
      }

      // If order placed without Stripe
      if (response.data && response.data.success) {
        const createdOrderId =
          response.data.data && response.data.data._id
            ? response.data.data._id
            : null;
        alert("Order placed successfully.");

        if (createdOrderId) {
          navigate(`/track/${createdOrderId}`);
          return;
        }
        navigate("/myorders");
        return;
      }

      console.error("Unexpected response from server:", response.data);
      alert("Unable to complete order. Check console for details.");
    } catch (err) {
      console.error("Place order error:", err);
      alert("Error placing order. Check console for details.");
    }
  };

  useEffect(() => {
    if (!token) {
      // You can redirect to login if required
      // navigate("/login");
    }
  }, [token, navigate]);

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-inner">
        <div className="order-form">
          <h2>Shipping Details</h2>
          <div className="fields">
            <div className="multi-fields">
              <input
                required
                name="firstName"
                onChange={onChangeHandler}
                value={data.firstName}
                type="text"
                placeholder="First Name"
              />
              <input
                required
                name="lastName"
                onChange={onChangeHandler}
                value={data.lastName}
                type="text"
                placeholder="Last Name"
              />
            </div>
            <input
              required
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Email address"
            />
            <input
              required
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              type="text"
              placeholder="Street"
            />
            <div className="multi-fields">
              <input
                required
                name="city"
                onChange={onChangeHandler}
                value={data.city}
                type="text"
                placeholder="City"
              />
              <input
                required
                name="state"
                onChange={onChangeHandler}
                value={data.state}
                type="text"
                placeholder="State"
              />
            </div>
            <div className="multi-fields">
              <input
                required
                name="zipcode"
                onChange={onChangeHandler}
                value={data.zipcode}
                type="text"
                placeholder="Zip code"
              />
              <input
                required
                name="country"
                onChange={onChangeHandler}
                value={data.country}
                type="text"
                placeholder="Country"
              />
            </div>
            <input
              required
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              type="text"
              placeholder="Phone"
            />
          </div>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {food_list.map((item) => {
              const qty = cartItems[item._id] || 0;
              if (qty <= 0) return null;
              return (
                <div className="summary-item" key={item._id}>
                  <p>
                    {item.title || item.name} × {qty}
                  </p>
                  <p>₹{(item.price * qty).toFixed(2)}</p>
                </div>
              );
            })}
            <div className="summary-item">
              <p>Delivery Fee</p>
              <p>₹40.00</p>
            </div>

            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : (getTotalCartAmount() + 40).toFixed(2)}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
