import mongoose from "mongoose";


export interface GlucoseDocument extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  glucose: number;
  date: Date;
}

export interface PressureDocument extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  high_pressure: number;
  low_pressure: number;
  date: Date;
}

export interface OxygenDocument extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  oxygen: number;
  date: Date;
}

export interface BodyMeasurementDocument {
  user_id: mongoose.Schema.Types.ObjectId;
  height: number;
  weight: number;
  bmi: number;
  date:Date;
}
