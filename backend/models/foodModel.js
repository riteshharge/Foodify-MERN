// backend/models/foodModel.js
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  public_id: { type: String },
  // Random rating between 2.5 and 5.0
  rating: {
    type: Number,
    default: () => parseFloat((Math.random() * (5 - 2.5) + 2.5).toFixed(1)),
  },
});

export default mongoose.model("food", foodSchema);
