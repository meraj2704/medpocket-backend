// response.util.ts
import { Response } from 'express';

interface SuccessResponse {
  status: 'success';
  data?: any; // You can further refine this type
  message?: string;
}

interface ErrorResponse {
  status: 'false';
  message: string;
  errors?: any; // You can further refine this type if needed
}

export const sendSuccessResponse = (
  res: Response,
  data?: any,
  message?: string
) => {
  const response: SuccessResponse = {
    status: 'success',
    data,
    message: message || 'Request was successful',
  };
  return res.status(200).json(response);
};

export const sendErrorResponse = (
  res: Response,
  message: string,
  errors?: any,
  statusCode: number = 400
) => {
  const response: ErrorResponse = {
    status: 'false',
    message,
    errors,
  };
  return res.status(statusCode).json(response);
};
