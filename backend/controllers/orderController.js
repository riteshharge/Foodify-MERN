import Order from "../models/orderModel.js";
import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// INR → USD rate (includes 4% fee)
const INR_TO_USD = 1 / 91.8689; // ≈ 0.010889 ($1 = ₹91.8689)
const STRIPE_MIN_USD = 0.5;

/**
 * PLACE ORDER → Creates Stripe Checkout Session
 */
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: missing user" });
    }

    const { items, amount, address } = req.body;
    if (!items?.length || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order data" });
    }

    console.log("🟢 Received order:", req.body);

    // Save order in DB (amount in INR)
    const order = new Order({
      userId,
      items,
      amount,
      address,
      status: "Food Processing",
    });
    await order.save();

    // Prepare Stripe line items (food + delivery)
    const line_items = items.map((it) => {
      const priceINR = Number(it.price) || 0;
      const priceUSD = priceINR * INR_TO_USD;
      const unit_amount = Math.round(priceUSD * 100); // cents
      return {
        price_data: {
          currency: "usd",
          product_data: { name: it.name || "Food Item" },
          unit_amount: Math.max(unit_amount, 50), // min $0.50 per Stripe
        },
        quantity: it.quantity || 1,
      };
    });

    // Add ₹40 delivery fee
    const deliveryUSD = 40 * INR_TO_USD;
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery Fee" },
        unit_amount: Math.round(deliveryUSD * 100),
      },
      quantity: 1,
    });

    // Total USD (for log/debug)
    const totalUSD = (amount + 40) * INR_TO_USD;
    console.log(`💰 Total Order: ₹${amount + 40} → $${totalUSD.toFixed(2)}`);

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${
        process.env.FRONTEND_URL || "http://localhost:5173"
      }/verify?success=true&orderId=${order._id}`,
      cancel_url: `${
        process.env.FRONTEND_URL || "http://localhost:5173"
      }/verify?success=false&orderId=${order._id}`,
    });

    console.log("Stripe session created:", session.id);
    res.json({ success: true, session_url: session.url, data: order });
  } catch (err) {
    console.error("❌ placeOrder error:", err);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to place order",
        error: err.message,
      });
  }
};

/**
 * VERIFY PAYMENT
 */
export const verifyPayment = async (req, res) => {
  try {
    const { success, orderId } = req.body;
    if (!orderId)
      return res
        .status(400)
        .json({ success: false, message: "orderId is required" });

    const order = await Order.findById(orderId);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    if (success === "true" || success === true) {
      order.payment = true;
      order.status = "Food Processing";
      await order.save();
      return res.json({
        success: true,
        data: order,
        message: "Payment verified",
      });
    } else {
      return res.json({
        success: false,
        data: order,
        message: "Payment not completed",
      });
    }
  } catch (err) {
    console.error("❌ verifyPayment error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to verify payment" });
  }
};

/**
 * USER ORDERS
 */
export const userOrders = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: missing user" });

    const orders = await Order.find({ userId }).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    console.error("❌ userOrders error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

/**
 * ADMIN - LIST ALL ORDERS
 */
export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    console.error("❌ listOrders error:", err);
    res.status(500).json({ success: false, message: "Failed to list orders" });
  }
};

/**
 * ADMIN - UPDATE STATUS
 */
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "You are not admin" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json({ success: true, data: order });
  } catch (err) {
    console.error("❌ Update status error:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to update status" });
  }
};

/**
 * ADMIN - DELETE ORDER
 */
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "You are not admin" });
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error("❌ deleteOrder error:", err.message);
    res.status(500).json({ success: false, message: "Failed to delete order" });
  }
};
