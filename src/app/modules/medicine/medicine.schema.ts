import { z } from "zod";

const timingSchema = z.object({
  take: z.boolean(),
  afterMeal: z.boolean(),
});

const dosesSchema = z.object({
  morning: timingSchema,
  afternoon: timingSchema,
  evening: timingSchema,
});

const durationSchema = z.object({
    start: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()),
    end: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()),
});

const medicineSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "User Id is required"),
    medicineName: z.string().min(1, "Medicine Name is required"),
    type: z.string().min(1, "Type is required"),
    description: z.string().min(1, "Description is required"),
    dosage: dosesSchema,
    duration: durationSchema,
  }),
});

export const MedicineSchema = {
  medicineSchema,
};
