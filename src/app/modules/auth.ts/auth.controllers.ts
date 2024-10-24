import { NextFunction, Request, Response } from "express";
import { UserDocument } from '../users/user.interface';
import bcrypt from 'bcrypt';
import User from "../users/user.models";
import jwt from 'jsonwebtoken';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, userRole, name, phone, address } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: UserDocument = new User({
      email,
      password: hashedPassword,
      userRole,
      name,
      phone,
      address,
    });
    const user = await newUser.save();
    console.log("user" + user);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("catched error");
    console.log(error);
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({ user: user, token: token });
  } catch (error) {
    next(error);
  }
};
