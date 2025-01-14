import { z } from "zod";

const folderSchema = z.object({
  body: z.object({
    user_id: z.string().min(1, "User Id is required"),
    name: z.string().min(1, "Name is required"),
  }),
});

export const FolderSchema = {
  folderSchema,
};
