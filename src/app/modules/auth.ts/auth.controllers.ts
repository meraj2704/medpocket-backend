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

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AuthServices.login(email, password);
    if (!user)
      return sendErrorResponse(res, "Invalid email or password", [], 401);

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    return sendSuccessResponse(res, userData, "Login successful", 200);
  } catch (error: any) {}
};

export const SignUpController = {
  signup,
  login,
};
