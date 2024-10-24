import { z } from "zod";

const create_bmi_schema = z.object({
  body: z.object({
    bmi: z.number().min(1, "BMI is required"),
  }),
});

export const bmi_schema = {
  create: create_bmi_schema,
};
