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


export const homeService ={
    latestDataOfUser,
}