// auth.controller.ts
import { Request, Response } from "express";
import { AuthServices } from "./auth.services";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";

const signup = async (req: Request, res: Response) => {
  try {
    const response = await AuthServices.signup(req.body);
    const user = {
      _id: response._id,
      name: response.name,
      email: response.email,
    };
    return sendSuccessResponse(res, user, "User registered successfully", 201);
  } catch (error: any) {
    return sendErrorResponse(
      res,
      error.message || "Signup failed",
      error.details || [],
      400
    );
  }
};

export const SignUpController = {
  signup,
};
