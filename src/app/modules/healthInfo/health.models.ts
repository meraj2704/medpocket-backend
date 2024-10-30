// models/health.model.ts
import mongoose, { Schema, Document } from "mongoose";
import { UserHealthDocument } from "./health.interface";


const HealthSchema = new Schema<UserHealthDocument>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  health_data: [
    {
      glucose: { type: Number },
      oxygen: { type: Number },
      height: { type: Number },
      weight: { type: Number },
      pressure: { type: Number },
      bmi: { type: Number },
      time_stamp: { type: Date, default: Date.now },
    },
  ],
});

export const Health = mongoose.model<UserHealthDocument>("Health", HealthSchema);
