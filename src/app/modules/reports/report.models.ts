import mongoose, { Schema } from "mongoose";
import { ReportI } from "./reports.interface";

const ReportSchema = new Schema<ReportI>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    folderId: { type: Schema.Types.ObjectId, ref: "Folders", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    hospitalName: { type: String, required: true },
    images: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const ReportModel = mongoose.model<ReportI>("ReportModel", ReportSchema);
