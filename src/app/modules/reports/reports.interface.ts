import mongoose from "mongoose";

export interface ReportDocuments extends Document{
    user_id: mongoose.Schema.Types.ObjectId;
    image_url: string;
}