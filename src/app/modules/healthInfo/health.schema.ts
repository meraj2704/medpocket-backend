import { z } from "zod";

const addMeasurements = z.object({
  body: z.object({
    height: z.string().min(1, "BMI is required"),
    weight: z.string().min(1, "BMI is required"),
  }),
});

const addGlucose = z.object({
  body: z.object({
    glucose: z.string().min(1, "Glucose level is required"),
  }),
});

export const healthSchema = {
  addMeasurements,
  addGlucose,
};
