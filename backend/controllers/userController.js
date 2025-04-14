import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

// Register User
export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;

  // Check if all required fields are present
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full registration form!", 400));
  }

  // Check for duplicate email
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!", 409));
  }

  // Create the user
  const user = await User.create({ name, email, phone, password, role });

  // If JWT is required after registration
  // sendToken(user, 201, res, "User Registered!");

  res.status(201).json({
    success: true,
    message: "User Registered!",
  });
});

// Login User
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  // Validate request data
  if (!email || !password || !role) {
    return next(
      new ErrorHandler("Please provide email, password, and role.", 400)
    );
  }

  // Find user by email and include password for validation
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password.", 400));
  }

  // Check if password matches
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password.", 400));
  }

  // Check if role matches
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with email and role '${role}' not found!`, 404)
    );
  }

  // Generate JWT and send it in response
  sendToken(user, 200, res, "User Logged In!");
});

// Logout User
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()), // Immediately expire the token
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

// Get Logged-In User Details
export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;

  // Check if user is authenticated
  if (!user) {
    return next(new ErrorHandler("User not authenticated.", 401));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
