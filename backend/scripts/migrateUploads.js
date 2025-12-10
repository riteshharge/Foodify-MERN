// backend/scripts/migrateUploads.js
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import Food from "../models/foodModel.js";
import { fileURLToPath } from "url";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load backend .env
dotenv.config({ path: path.join(__dirname, "../.env") });

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadFile(filePath) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      filePath,
      { folder: "foodify/foods" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

(async () => {
  try {
    const MONGO = process.env.MONGODB_URL;
    if (!MONGO) {
      console.error("❌ Please set MONGODB_URL in backend/.env");
      process.exit(1);
    }

    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Adjust uploads directory to where your images are (backend/uploads)
    const uploadsDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadsDir)) {
      console.error("❌ Uploads folder not found at:", uploadsDir);
      process.exit(1);
    }

    const files = fs.readdirSync(uploadsDir).filter((f) => {
      const ext = f.toLowerCase();
      return (
        ext.endsWith(".png") ||
        ext.endsWith(".jpg") ||
        ext.endsWith(".jpeg") ||
        ext.endsWith(".webp")
      );
    });

    console.log(`🖼️ Found ${files.length} files to upload...`);

    for (const file of files) {
      const filePath = path.join(uploadsDir, file);
      console.log("⬆️ Uploading:", file);
      try {
        const result = await uploadFile(filePath);
        const secureUrl = result.secure_url;

        // Update DB records that reference this filename (assumes old image field contained the filename or path)
        const matched = await Food.findOneAndUpdate(
          { image: { $regex: file, $options: "i" } },
          { $set: { image: secureUrl } },
          { new: true }
        );

        if (matched) {
          console.log("Updated DB for:", matched.name || matched._id);
        } else {
          console.log(
            "⚠️ No DB match for:",
            file,
            "(you may need to update records manually)"
          );
        }
      } catch (err) {
        console.error("❌ Upload failed for", file, err.message || err);
      }
    }

    console.log("🎉 Migration finished!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("🚨 Migration error:", err.message || err);
    process.exit(1);
  }
})();
