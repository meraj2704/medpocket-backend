import mongoose from "mongoose";
import { BodyMeasurement, Glucose, Pressure } from "./health.models";
import { endOfDay, startOfDay, today } from "./health.utils";

const CreateBodyMeasurements = async (
  user_id: mongoose.Types.ObjectId,
  height: number,
  weight: number
) => {
  const bmi = +(weight / Math.pow(height / 100, 2)).toFixed(1);
  let existBodyMeasurements = await BodyMeasurement.findOne({
    user_id,
    date: { $gte: startOfDay, $lte: endOfDay },
  });
  if (existBodyMeasurements) {
    existBodyMeasurements.height = height;
    existBodyMeasurements.weight = weight;
    existBodyMeasurements.bmi = bmi;
    existBodyMeasurements.date = today;
    await existBodyMeasurements.save();
    return existBodyMeasurements;
  } else {
    const bodyMeasurement = await BodyMeasurement.create({
      user_id,
      height,
      weight,
      bmi,
      today,
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

const createGlucose = async (
  user_id: mongoose.Types.ObjectId,
  glucose: number
) => {
  const existTodayGlucose = await Glucose.findOne({
    user_id,
    date: { $gte: startOfDay, $lte: endOfDay },
  });
  if (existTodayGlucose) {
    existTodayGlucose.glucose = glucose;
    existTodayGlucose.date = today;
    await existTodayGlucose.save();
    return existTodayGlucose;
  } else {
    const newGlucose = await Glucose.create({
      user_id,
      glucose: glucose,
      date: today,
    });
    return newGlucose;
  }
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
  user_id: mongoose.Types.ObjectId,
  high_pressure: number,
  low_pressure: number
) => {
  const existTodayPressure = await Pressure.findOne({
    user_id,
    date: { $gte: startOfDay, $lte: endOfDay },
  });
  if (existTodayPressure) {
    existTodayPressure.high_pressure = high_pressure;
    existTodayPressure.low_pressure = low_pressure;
    existTodayPressure.date = today;
    await existTodayPressure.save();
    return existTodayPressure;
  } else {
    const newPressure = await Pressure.create({
      user_id,
      high_pressure,
      low_pressure,
      date: today,
    });
    return newPressure;
  }
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
