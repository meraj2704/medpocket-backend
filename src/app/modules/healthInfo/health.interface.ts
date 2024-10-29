import mongoose from "mongoose";

export interface HealthInfo {
  glucose?: number;
  oxygen?: number;
  height?: number;
  weight?: number;
  pressure?: number;
  timestamp: Date;
}

export interface UserHealthDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  healthData: HealthInfo[];
}
