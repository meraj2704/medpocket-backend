import { NextFunction, Request, Response } from "express";
import User from "../users/user.models";

export const checkSignUpData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email: email});
    if(user){
        return res.status(400).json({ message: "User already exist with this email" });
    }
    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const checkLoginData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    next();
  } catch (error) {
    console.log(error)
  }
};