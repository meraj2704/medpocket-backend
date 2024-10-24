import { z } from "zod";

const signupSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().min(1, "Name is required"),
  }),
});

export const authSchema = {
    create:signupSchema
}