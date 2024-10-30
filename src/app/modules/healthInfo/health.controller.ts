// controllers/health.controllers.ts
import { Request, Response } from "express";
import { Health } from "./health.models";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";

const updateHealthData = async (req: Request, res: Response) => {
  const { user_id, glucose, oxygen, height, weight, pressure } = req.body;

  let bmi: number | undefined;
  if (height && weight) {
    bmi = weight / Math.pow(height / 100, 2);
  }

  console.log("bmi", bmi);

  try {
    const current_date = new Date();
    const start_date = new Date(current_date.setHours(0, 0, 0, 0));

    const healthRecord = await Health.findOneAndUpdate(
      { user_id, "health_data.time_stamp": { $gte: start_date } },
      {
        $setOnInsert: { user_id },
        $push: {
          health_data: {
            $each: [
              {
                glucose,
                oxygen,
                height,
                weight,
                pressure,
                bmi,
                time_stamp: new Date(),
              },
            ],
            $slice: -1,
          },
        },
      },
      { new: true, upsert: true }
    );

    return sendSuccessResponse(
      res,
      healthRecord,
      "Health data updated successfully",
      200
    );
  } catch (error) {
    console.log("health error: ", error);
    return sendErrorResponse(res, "Failed to update health data", [], 500);
  }
};

const getHealthHistory = async (req: Request, res: Response) => {
  const user_id = req.query.user_id as string;
  const { metric, days } = req.query;

  try {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - parseInt(days as string, 10));

    const records = await Health.find(
      { user_id, "health_data.time_stamp": { $gte: dateLimit } },
      { health_data: { $elemMatch: { time_stamp: { $gte: dateLimit } } } }
    );

    const metricData = records
      .map((record) =>
        record.health_data.map((data) => ({
          timestamp: data.time_stamp,
          value: data[metric as keyof typeof data],
        }))
      )
      .flat()
      .filter((data) => data.value !== undefined);

    return sendSuccessResponse(
      res,
      metricData,
      `Last ${days} days of ${metric} data`,
      200
    );
  } catch (error) {
    return sendErrorResponse(res, "Failed to retrieve health data", [], 500);
  }
};

export const healthControllers = {
  updateHealthData,
  getHealthHistory,
};
