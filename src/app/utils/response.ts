// response.util.ts
import { Response } from "express";
import { User } from "../modules/auth.ts/auth.models";

interface SuccessResponse<T = any> {
  success: boolean;
  status: number;
  data?: T;
  message?: string;
  meta?: {
    timestamp: string;
  };
}

interface ErrorResponse {
  success: "false";
  status: number;
  message: string;
  errors?: any;
  meta?: {
    timestamp: string;
  };
}

export const sendSuccessResponse = <T = any>(
  res: Response,
  data?: T,
  message: string = "Request was successful",
  statusCode: number = 200
) => {
  const response: SuccessResponse<T> = {
    success: true,
    status: statusCode,
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };
  return res.status(statusCode).json(response);
};

export const sendErrorResponse = (
  res: Response,
  message: string = "An error occurred",
  errors?: any,
  statusCode: number = 400
) => {
  const response: ErrorResponse = {
    success: "false",
    status: statusCode,
    message,
    errors,
    meta: {
      timestamp: new Date().toISOString(),
    },
  };
  return res.status(statusCode).json(response);
};

