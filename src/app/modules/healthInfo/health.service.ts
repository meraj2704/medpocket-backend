import mongoose from "mongoose";
import { BodyMeasurement, Glucose, Pressure } from "./health.models";

const CreateBodyMeasurements = async (
  user_id: mongoose.Types.ObjectId,
  height: number,
  weight: number
) => {
  const bmi = +(weight / Math.pow(height / 100, 2)).toFixed(1);
  const date = new Date();
  const currentDate = new Date();
  const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));
  let existBodyMeasurements = await BodyMeasurement.findOne({
    user_id,
    date: { $gte: startOfDay, $lte: endOfDay },
  });
  if (existBodyMeasurements) {
    existBodyMeasurements.height = height;
    existBodyMeasurements.weight = weight;
    existBodyMeasurements.bmi = bmi;
    existBodyMeasurements.date = date;
    await existBodyMeasurements.save();
    return existBodyMeasurements;
  } else {
    const bodyMeasurement = await BodyMeasurement.create({
      user_id,
      height,
      weight,
      bmi,
      date,
    });
    return bodyMeasurement;
  }
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

const singleGlucose = async (_id: mongoose.Types.ObjectId) => {
  const glucose = await Glucose.findById(_id);
  return glucose;
};

const allUsersGlucose = async () => {
  const glucoses = await Glucose.find();
  return glucoses;
};

const glucoseByDays = async (
  user_id: mongoose.Types.ObjectId,
  days: number
) => {
  const dateForm = new Date();
  dateForm.setDate(dateForm.getDate() - days);

  // Fetch measurements from the database
  const measurements = await Glucose.find({
    user_id,
    date: { $gte: dateForm },
  });
  return measurements;
};
const createPressure = async (
  id: mongoose.Types.ObjectId,
  high_pressure: number,
  low_pressure: number
) => {
  const today = new Date();
  const newPressure = await Pressure.create({
    user_id: id,
    high_pressure,
    low_pressure,
    date: today,
  });
  return newPressure;
};

const singlePressure = async (_id: mongoose.Types.ObjectId) => {
  const pressure = await Pressure.findById(_id);
  return pressure;
};

const allUsersPressure = async () => {
  const pressure = await Pressure.find();
  return pressure;
};

const pressureByDays = async (
  user_id: mongoose.Types.ObjectId,
  days: number
) => {
  const dateForm = new Date();
  dateForm.setDate(dateForm.getDate() - days);

  // Fetch measurements from the database
  const pressures = await Pressure.find({
    user_id,
    date: { $gte: dateForm },
  });
  return pressures;
};

export const HealthServices = {
  CreateBodyMeasurements,
  singleMeasurement,
  allUserMeasurements,
  measurementsByDays,
  createGlucose,
  singleGlucose,
  allUsersGlucose,
  glucoseByDays,
  createPressure,
  singlePressure,
  allUsersPressure,
  pressureByDays,
};
