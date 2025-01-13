import mongoose, { Schema } from "mongoose";
import { IFolder } from "./folder.interface";

const FolderSchema = new Schema<IFolder>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Glucose = mongoose.model<IFolder>("Glucose", FolderSchema);
