import mongoose, { Schema } from "mongoose";
import { ReportDocuments } from "./reports.interface";

const ReportSchema = new Schema<ReportDocuments>({
  user_id:{type:Schema.Types.ObjectId,ref:"User",required:true},
  image_url: {type:String, required: true},
})

export const Report = mongoose.model<ReportDocuments>("Report", ReportSchema);