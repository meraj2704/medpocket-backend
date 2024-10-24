import { NextFunction, Request, Response } from "express";
import { sendErrorResponse } from "../utils/response"; // Importing your utility function

// Error handler middleware function
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error for debugging purposes (optional)
  console.error(err);

  // Call sendErrorResponse with the response object, the error message, and optionally a status code
  sendErrorResponse(res, err.message || "Internal Server Error", 500); // 500 is an example status code for server errors
};

export default errorHandler;
