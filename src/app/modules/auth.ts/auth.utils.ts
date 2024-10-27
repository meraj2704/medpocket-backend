// auth.utils.ts
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const sendOTPEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASS
    }
  });

  const mailOptions ={
    from:process.env.EMAIL_USER,
    to:email,
    subject:"Password reset OTP",
    text:`Your OTP for password is :${otp}`
  }
  await transporter.sendMail(mailOptions);
};

export const AuthUtils = {
  hashPassword,
  comparePassword,
  generateOTP,
  sendOTPEmail
};
