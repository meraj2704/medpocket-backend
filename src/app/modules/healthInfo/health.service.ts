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
const singleMeasurement = async (_id: mongoose.Types.ObjectId) => {
  const measurement = await BodyMeasurement.findById(_id);
  return measurement;
};

const allUserMeasurements = async () => {
  const measurements = await BodyMeasurement.find();
  return measurements;
};

export const HealthServices = {
  CreateBodyMeasurements,
  singleMeasurement,
  allUserMeasurements
};
