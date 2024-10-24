import { Response } from "express";

type ResponseData = {
  success: boolean;
  message?: any;
  data?: any;
};

export const sendResponse = (
  res: Response,
  statusCode: number,
  responseData: ResponseData
) => {
  res.status(statusCode).json(responseData);
};
