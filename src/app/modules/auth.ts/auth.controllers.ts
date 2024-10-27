// auth.controller.ts
import { Request, Response } from "express";
import { AuthServices } from "./auth.services";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { AuthUtils } from "./auth.utils";

const otpStore: { [key: string]: string } = {};

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

const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await AuthServices.findUserByEmail(email);
    if (!user) return sendErrorResponse(res, "User not found", [], 404);
    const otp = AuthUtils.generateOTP();
    console.log("otp", otp);
    otpStore[email] = otp;
    AuthUtils.sendOTPEmail(email, otp);
    return sendSuccessResponse(res, null, "Password reset email sent", 200);
  } catch (error: any) {
    return sendErrorResponse(res, error.message, null, 400);
  }
};

const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;
  try {
    if (!otpStore[email] || otpStore[email] !== otp)
      return sendErrorResponse(res, "Invalid OTP", [], 401);
    const updatedUser = await AuthServices.updatePassword(email, newPassword);
    delete otpStore[email];
    const updatedUserData = {
      _id: updatedUser?._id,
      name: updatedUser?.name,
      email: updatedUser?.email,
    };
    return sendSuccessResponse(
      res,
      updatedUserData,
      "Password reset successful",
      200
    );
  } catch (error: any) {
    return sendErrorResponse(res, error.message, null, 400);
  }
};

export const AuthController = {
  signup,
  login,
  requestPasswordReset,
  resetPassword
};
