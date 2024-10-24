import { NextFunction, Request, Response } from "express";
import userModels from "../modules/users/user.models";

export const checkUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, phone } = req.body;
  console.log(name, email, phone);
  try {
    const userExistWithEmail = await userModels.findOne({ email: email });
    if (userExistWithEmail) {
      return res
        .status(400)
        .json({ message: "User already exist with this email" });
    }
    const existUserWithPhone = await userModels.findOne({ phone: phone });
    if (existUserWithPhone) {
      return res
        .status(400)
        .json({ message: "User already exist with this phone number" });
    }
    console.log('middle ware passed')
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
