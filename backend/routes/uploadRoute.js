import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

// Configure Cloudinary with your environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use multer memory storage so files are kept in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: stream upload to Cloudinary (avoids writing to disk)
function uploadBufferToCloudinary(buffer, folder = "foodify/foods") {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        public_id: `food_${Date.now()}`, // unique name
        overwrite: false,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

// --- Upload Endpoint ---
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Upload buffer to Cloudinary
    const result = await uploadBufferToCloudinary(req.file.buffer, "foodify/foods");

    // Return Cloudinary secure URL
    res.status(200).json({
      success: true,
      image: result.secure_url,
      public_id: result.public_id, // optional, if you want to delete later
    });
  } catch (err) {
    console.error("🔥 Cloudinary upload failed:", err);
    res.status(500).json({ success: false, message: "Image upload failed", error: err.message });
  }
});

export default router;
