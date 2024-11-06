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

export interface GlucoseDocument extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  value: number;
  time_stamp: Date;
}

export interface PressureDocument extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  value: number;
  time_stamp: Date;
}

export interface OxygenDocument extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  value: number;
  time_stamp: Date;
}

export interface BodyMeasurementDocument {
  user_id: mongoose.Schema.Types.ObjectId;
  height: number;
  weight: number;
  bmi: number;
  date:Date;
}
