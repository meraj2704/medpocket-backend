import mongoose from "mongoose";

export interface ReportI extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  folderId: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  hospitalName: string;
  images: string[];
}
export interface ReportBodyDataI {
  userId: mongoose.Types.ObjectId;
  folderId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  hospitalName: string;
  images: string[];
}

export interface UpdateReportI {
  title?: string;
  description?: string;
  hospitalName?: string;
  images?: string[];
}
