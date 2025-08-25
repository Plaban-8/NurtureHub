import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded); // Debugging line
    req.id = decoded.id;
    req.email = decoded.email;

    next();
  } catch (e) {
    return res.status(403).json({
      message: "Forbidden: Invalid token",
    });
  }
};
