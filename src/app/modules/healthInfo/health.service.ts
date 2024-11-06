import mongoose from "mongoose";
import { BodyMeasurement } from "./health.models";

const CreateBodyMeasurements = async (
  user_id: mongoose.Types.ObjectId,
  height: number,
  weight: number
) => {
    const bmi = +(weight / Math.pow(height / 100, 2)).toFixed(1);
  const date = new Date();
  const bodyMeasurement = await BodyMeasurement.create({
    user_id,
    height,
    weight,
    bmi,
    date,
  });
  return bodyMeasurement;
};

export const HealthServices = {
  CreateBodyMeasurements,
};
