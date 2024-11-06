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

const measurementsByDays = async (
  user_id: mongoose.Types.ObjectId,
  days: number
) => {
  // Calculate the date 'days' ago
  const dateForm = new Date();
  dateForm.setDate(dateForm.getDate() - days);

  // Fetch measurements from the database
  const measurements = await BodyMeasurement.find({
    user_id,
    date: { $gte: dateForm },
  });
  return measurements;
};


const allUserMeasurements = async () => {
  const measurements = await BodyMeasurement.find();
  return measurements;
};

export const HealthServices = {
  CreateBodyMeasurements,
  singleMeasurement,
  allUserMeasurements,
  measurementsByDays
};
