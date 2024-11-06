// auth.schema.ts
import { z } from "zod";

const signupSchema = z.object({
  body: z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must have at least 6 characters"),
  }),
});
const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password is required"),
  }),
});

const requestPasswordResetSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
  }),
});

const resetSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    otp: z.string().min(6, "OTP is required"),
    newPassword: z.string().min(6, "Password is required"),
  }),
});

export const authSchema = {
  create: signupSchema,
  login: loginSchema,
  request: requestPasswordResetSchema,
  reset: resetSchema,
};
