import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { homeService } from "./home.service";
import mongoose from "mongoose";

const getLatestUserData = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const id = new mongoose.Types.ObjectId(user_id);
  try {
    const { glucose, measurements, pressure } =
      await homeService.latestDataOfUser(id);

    if (!glucose || !measurements || !pressure) {
      return sendErrorResponse(res, "Failed to fetch latest data", [], 500);
    }

    const newData = {
      glucose: {
        glucose:glucose.glucose,
        date:glucose.date
      },
      measurements: {
        height: measurements.height,
        weight: measurements.weight,
        bmi: measurements.bmi,
        date:measurements.date
      },
      pressure: {
        low_pressure: pressure.low_pressure,
        high_pressure: pressure.high_pressure,
        data:pressure.date
      },
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
