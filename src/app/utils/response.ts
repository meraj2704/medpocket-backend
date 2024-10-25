// response.util.ts
import { Response } from 'express';

interface SuccessResponse<T = any> {
  status: 'success';
  data?: T;
  message?: string;
  meta?: {
    timestamp: string;
  };
}

interface ErrorResponse {
  status: 'false';
  message: string;
  errors?: any;
  meta?: {
    timestamp: string;
  };
}

export const sendSuccessResponse = <T = any>(
  res: Response,
  data?: T,
  message: string = 'Request was successful',
  statusCode: number = 200
) => {
  const response: SuccessResponse<T> = {
    status: 'success',
    data,
    message,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };
  return res.status(statusCode).json(response);
};

export const sendErrorResponse = (
  res: Response,
  message: string = 'An error occurred',
  errors?: any,
  statusCode: number = 400
) => {
  const response: ErrorResponse = {
    status: 'false',
    message,
    errors,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };
  return res.status(statusCode).json(response);
};
