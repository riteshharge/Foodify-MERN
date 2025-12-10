// backend/middleware/adminAuth.js
import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.token;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Debug: uncomment if you need to see what is decoded
    // console.log("Decoded token in adminAuth:", decoded);

    // Ensure we check the same field the token contains (role)
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "You are not admin" });
    }

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error("Admin Auth Error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuth;
