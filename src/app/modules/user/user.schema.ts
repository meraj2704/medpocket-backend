import mongoose from "mongoose";
import { z } from "zod";

const objectIdSchema = z
  .string()
  .refine((value) => mongoose.isValidObjectId(value), {
    message: "Invalid ObjectId format",
  });

const setupSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    phone_number: z.string().min(11, "Phone number is required"),
    blood_group: z.string().min(1, "Blood Group is required"),
    date_of_birth: z.string().min(1, "Date of Birth is required"),
    gender: z.string().min(1, "Gender is required"),
    height: z.string().min(1, "Height is required"),
    weight: z.string().min(1, "Weight is required"),
  }),
});

export const userSchema = {
  setup: setupSchema,
};
