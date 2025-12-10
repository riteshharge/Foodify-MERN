// backend/routes/foodRoute.js
import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Use multer memory storage so file buffer is available in req.file.buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add food (admin only) - expects form-data with 'image' file
router.post("/add", authMiddleware, upload.single("image"), addFood);

// Get all foods (public)
router.get("/list", listFood);

// Remove food (admin only)
router.post("/remove", authMiddleware, removeFood);

export default router;
