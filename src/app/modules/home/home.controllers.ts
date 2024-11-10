import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { homeService } from "./home.service";
import mongoose from "mongoose";
import { HealthServices } from "../healthInfo/health.service";

const getLatestUserData = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const id = new mongoose.Types.ObjectId(user_id);
  try {
    const { glucose, measurements, pressure } =
      await homeService.latestDataOfUser(id);
    const todayGlucose = await HealthServices.glucoseByDays(id, 1);
    const todayPressure = await HealthServices.pressureByDays(id, 1);
    const bmiData = await homeService.bmiHomeData(id);
    const newData = {
      glucose: {
        glucose: glucose?.glucose,
        todayGlucose: todayGlucose,
        date: glucose?.date,
      },
      measurements: {
        height: measurements?.height,
        weight: measurements?.weight,
        bmi: measurements?.bmi,
        date: measurements?.date,
      },
      pressure: {
        low_pressure: pressure?.low_pressure,
        high_pressure: pressure?.high_pressure,
        todayPressure,
        data: pressure?.date,
      },
      averageBmi: bmiData.averageBmi,
      maxBmi: bmiData.maxBmi,
      minBmi: bmiData.minBmi,
    };

    return sendSuccessResponse(
      res,
      newData,
      "Successfully retrieved data!",
      200
    );
  } catch (error) {
    console.log(error);
    console.error(error);
    return sendErrorResponse(res, "Failed to fetch latest data", [], 500);
  }
};

export const homeController = {
  getLatestUserData,
};
