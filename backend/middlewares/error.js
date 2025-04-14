class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handle invalid MongoDB ObjectID
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle duplicate key errors (e.g., duplicate email)
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Handle invalid JWT
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid. Try again!`;
    err = new ErrorHandler(message, 400);
  }

  // Handle expired JWT
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token has expired. Try again!`;
    err = new ErrorHandler(message, 400);
  }

  // Send error response
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
