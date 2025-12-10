// backend/middleware/auth.js
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // Accept either Authorization header or token header (flexible)
  const authHeader = req.headers.authorization || req.headers.token;

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized, login again" });
  }

  try {
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded info to request for controllers
    req.user = { id: decoded.id, role: decoded.role };
    req.body.userId = decoded.id; // some controllers expect this
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
