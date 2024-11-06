import mongoose, { Schema, Document } from "mongoose";
import {
  BodyMeasurementDocument,
  GlucoseDocument,
  OxygenDocument,
  PressureDocument,
  UserHealthDocument,
} from "./health.interface";

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

export const Health = mongoose.model<UserHealthDocument>(
  "Health",
  HealthSchema
);

const GlucoseSchema = new Schema<GlucoseDocument>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  value: { type: Number, required: true },
  time_stamp: { type: Date, default: Date.now },
});

export const Glucose = mongoose.model<GlucoseDocument>(
  "Glucose",
  GlucoseSchema
);

const PressureSchema = new Schema<PressureDocument>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  value: { type: Number, required: true },
  time_stamp: { type: Date, default: Date.now },
});

export const Pressure = mongoose.model<PressureDocument>(
  "Pressure",
  PressureSchema
);

const OxygenSchema = new Schema<OxygenDocument>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  value: { type: Number, required: true },
  time_stamp: { type: Date, default: Date.now },
});

export const Oxygen = mongoose.model<OxygenDocument>("Oxygen", OxygenSchema);

const BodyMeasurementSchema = new Schema<BodyMeasurementDocument>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bmi: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const BodyMeasurement = mongoose.model<BodyMeasurementDocument>(
  "BodyMeasurement",
  BodyMeasurementSchema
);
