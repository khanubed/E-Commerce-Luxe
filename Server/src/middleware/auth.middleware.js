import jwt from "jsonwebtoken";
import { config } from "dotenv";
import User from "../models/userSchema.js";

config();   

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // console.log(decoded)

    // 3. Attach user to request
    req.user = { _id: decoded.userId };
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    
    // If token is expired, return 401 so the frontend interceptor triggers refresh
    return res.status(401).json({
      success: false,
      message: error.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
    });
  }
};

export const protectAdmin = async (req , res , next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const user = await User.findById(req.user._id); 
  
  if (!user || !user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }
  next();
}