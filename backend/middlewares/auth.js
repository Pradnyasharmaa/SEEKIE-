import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  let token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  console.log("🔹 Received Token:", token); // Debugging step

  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); // Ensure thi~s matches the payload structure
    if (!req.user) {
      return next(new ErrorHandler("User Not Found", 404));
    }
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or Expired Token", 403));
  }
});
