import mongoose from "mongoose";
import { BodyMeasurement, Glucose } from "./health.models";

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

const createGlucose = async (id: mongoose.Types.ObjectId, glucose: number) => {
  const today = new Date();
  const newGlucose = await Glucose.create({
    user_id: id,
    glucose: glucose,
    date: today,
  });
  return newGlucose;
};

export const HealthServices = {
  CreateBodyMeasurements,
  singleMeasurement,
  allUserMeasurements,
  measurementsByDays,
  createGlucose,
};
