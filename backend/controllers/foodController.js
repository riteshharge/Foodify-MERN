// backend/controllers/foodController.js
import foodModel from "../models/foodModel.js";
import cloudinary from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// helper: upload buffer to Cloudinary
function uploadBufferToCloudinary(buffer, folder = "foodify/foods") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

// Helper to generate a random rating (4 or 5)
function generateRandomRating() {
  return parseFloat((Math.random() * (5 - 2.5) + 2.5).toFixed(1));
}

// Add Food Item (expects multipart/form-data with 'image' and other fields)
const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Basic validation
    if (!name || !description || !price || !category) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Upload buffer to Cloudinary if provided
    let imageUrl = "";
    let public_id = "";
    if (req.file && req.file.buffer) {
      const uploadResult = await uploadBufferToCloudinary(req.file.buffer, "foodify/foods");
      imageUrl = uploadResult.secure_url;
      public_id = uploadResult.public_id;
    }

    // Add random rating (persisted)
    const rating = generateRandomRating();

    // Create new food document
    const newFood = new foodModel({
      name,
      description,
      price: Number(price),
      image: imageUrl,      // blank string if none
      public_id,           // optional for deletion later
      category,
      rating,
    });

    await newFood.save();

    // return the created object
    return res.status(201).json({ success: true, message: "Food added", food: newFood });
  } catch (err) {
    console.error("Error in addFood:", err);
    return res.status(500).json({ success: false, message: "Server error adding food", error: err.message });
  }
};

// List Food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({}).lean(); // .lean() returns plain objects
    // If some old records lack rating, ensure they get a rating here (one-time)
    const foodsWithRating = foods.map(f => ({
      ...f,
      rating: typeof f.rating === "number" ? f.rating : generateRandomRating()
    }));
    return res.json({ success: true, data: foodsWithRating });
  } catch (err) {
    console.error("Error in listFood:", err);
    return res.status(500).json({ success: false, message: "Server error fetching foods" });
  }
};

// Remove Food
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Missing food id." });
    }
    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found." });
    }

    // Optional: delete Cloudinary asset if public_id present
    if (food.public_id) {
      try {
        await cloudinary.v2.uploader.destroy(food.public_id);
      } catch (e) {
        console.warn("Cloudinary delete warning:", e.message || e);
      }
    }

    await foodModel.findByIdAndDelete(id);
    return res.json({ success: true, message: "Food removed successfully!" });
  } catch (error) {
    console.error("Error in removeFood:", error);
    return res.status(500).json({ success: false, message: "Server error removing food." });
  }
};

export { addFood, listFood, removeFood };
