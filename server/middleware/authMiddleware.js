import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get JWT from HttpOnly cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store decoded user information
    // so protected routes can use req.user.id
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;