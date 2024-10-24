// auth.controller.ts
import { Request, Response } from 'express';
import { AuthServices } from './auth.services';


 const signup = async (req: Request, res: Response) => {
  try {
    const user = await AuthServices.signup(req.body); // `req.body` is already validated by middleware
    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};


export const SignUpController = {
  signup,
}