// global.error.ts
import { NextFunction, Request, Response } from 'express';
import { sendErrorResponse } from '../utils/response';
import { CustomError } from '../utils/customError'; // Import the custom error class

const errorHandler = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  // Log the error if needed
  console.error('Error:', err);

  // Check if the error is a CustomError and has `status` and `details`, otherwise default values
  const statusCode = err instanceof CustomError ? err.status : 500;
  const message = err.message || 'Internal Server Error';
  const details = err instanceof CustomError ? err.details : [];

  sendErrorResponse(res, message, details, statusCode);
};

export default errorHandler;
