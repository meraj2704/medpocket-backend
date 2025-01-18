import { z } from "zod";

const reportSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "User Id is required"),
    folderId: z.string().min(1, "Folder Id is required"),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
  }),
});

export const ReportSchema = {
  reportSchema,
};
