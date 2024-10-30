import mongoose from "mongoose";

export interface HealthInfo {
  glucose?: number;
  oxygen?: number;
  height?: number;
  weight?: number;
  pressure?: number;
  bmi: number;
  time_stamp: Date;
}

export interface UserHealthDocument extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  health_data: HealthInfo[];
}
