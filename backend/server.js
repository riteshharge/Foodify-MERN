import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config.js";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import uploadRouter from "./routes/uploadRoute.js";

// --- App Config ---
const app = express();
const port = process.env.PORT || 4000;
const __dirname = path.resolve();

// --- Middleware ---
app.use(express.json());

// Advanced CORS configuration (for local + Render)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // user frontend
      "http://127.0.0.1:5173",
      "http://localhost:5174", // admin frontend local
      "http://127.0.0.1:5174",
      "https://foodify-mern.onrender.com",
      "https://foodify-mern-admin.onrender.com",
    ],
    credentials: true,
  })
);

// --- Database Connection ---
connectDB();

// --- Serve Uploaded Images ---
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// --- API Routes ---
app.use("/api/food", foodRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// --- Health Check Route ---
app.get("/", (req, res) => {
  res.status(200).send("Foodify API is running successfully!");
});

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`🚀 Server running at: http://localhost:${port}`);
});
