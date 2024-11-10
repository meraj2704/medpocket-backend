import mongoose from "mongoose";
import {
  BodyMeasurement,
  Glucose,
  Pressure,
} from "../healthInfo/health.models";

const latestDataOfUser = async (user_id: mongoose.Types.ObjectId) => {
  const glucose = await Glucose.findOne({ user_id: user_id }).sort({
    date: -1,
  });
  const measurements = await BodyMeasurement.findOne({ user_id: user_id }).sort(
    { date: -1 }
  );
  const pressure = await Pressure.findOne({ user_id: user_id }).sort({
    date: -1,
  });
  return {
    glucose: glucose,
    measurements: measurements,
    pressure: pressure,
  };
};

const bmiHomeData = async (user_id: mongoose.Types.ObjectId) => {
  const measureMents = await BodyMeasurement.find({ user_id });
  if (measureMents.length === 0) {
    return { averageBmi: 0, minBmi: 0, maxBmi: 0 };
  }
  const bmiValues = measureMents.map((measurement) => measurement.bmi);
  const totalBmi = bmiValues.reduce((sum, bmi) => sum + bmi, 0);
  const averageBmi = parseFloat((totalBmi / bmiValues.length).toFixed(1));
  const minBmi = Math.min(...bmiValues);
  const maxBmi = Math.max(...bmiValues);
  return { averageBmi, minBmi, maxBmi };
};

export const homeService = {
  latestDataOfUser,
  bmiHomeData,
};
