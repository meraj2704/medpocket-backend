import { z } from "zod";

const timingSchema = z.object({
  take: z.boolean(),
  afterMeal: z.boolean(),
});

const dosesSchema = z.object({
  morning: timingSchema.optional(),
  afternoon: timingSchema.optional(),
  evening: timingSchema.optional(),
});

const durationSchema = z.object({
  start: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()),
  end: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date()),
});

const singleMedicineSchema = z.object({
  userId: z.string().min(1, "User Id is required"),
  medicineName: z.string().min(1, "Medicine Name is required"),
  type: z.string().min(1, "Type is required"),
  description: z.string().min(1, "Description is required"),
  dosage: dosesSchema.optional(),
  duration: durationSchema.optional(),
});

const medicineSchema = z.object({
  body: z.array(singleMedicineSchema),
});

export const MedicineSchema = {
  medicineSchema,
};
