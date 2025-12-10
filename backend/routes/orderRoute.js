// backend/routes/orderRoute.js
import express from "express";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  placeOrder,
  userOrders,
  listOrders,
  updateStatus,
  verifyPayment,
  deleteOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// User routes
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);

// Public route to verify payment result (frontend Verify page uses this)
orderRouter.post("/verify", verifyPayment);

// Admin-only routes
orderRouter.get("/list", adminAuth, listOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Fixed: use orderRouter, not router
orderRouter.post("/delete", authMiddleware, deleteOrder);

export default orderRouter;
