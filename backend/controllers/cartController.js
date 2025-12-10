import userModel from "./../models/userModel.js";

// Add item to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Validate required data
    if (!userId || !itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);

    // Check if user exists
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Ensure cartData exists
    const cartData = userData.cartData || {};

    // Update item quantity
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error in addToCart" });
  }
};

// Remove item from user cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error in removeFromCart" });
  }
};

// Get user cart data
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    return res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error in getCart:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error in getCart" });
  }
};

export { addToCart, removeFromCart, getCart };
