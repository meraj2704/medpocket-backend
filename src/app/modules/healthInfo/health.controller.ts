// controllers/health.controllers.ts
import { Request, Response } from "express";
import { Health } from "./health.models";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";

 const updateHealthData = async (req: Request, res: Response) => {
  const user_id = req.user._id; 
  const { glucose, oxygen, height, weight, pressure } = req.body;

  let bmi: number | undefined;
  if (height && weight) {
    bmi = weight / Math.pow(height / 100, 2); 
  }

  try {
    const current_date = new Date();
    const start_date = new Date(current_date.setHours(0, 0, 0, 0));

    const healthRecord = await Health.findOneAndUpdate(
      { user_id, "healthData.time_stamp": { $gte: start_date } },
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

    return sendSuccessResponse(res, healthRecord, "Health data updated successfully", 200);
  } catch (error) {
    return sendErrorResponse(res, "Failed to update health data", [], 500);
  }
};

 const getHealthHistory = async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { metric, days } = req.query;
  
    try {
      const dateLimit = new Date();
      dateLimit.setDate(dateLimit.getDate() - parseInt(days as string, 10));
  
      const records = await Health.find(
        { userId, "healthData.timestamp": { $gte: dateLimit } },
        { healthData: { $elemMatch: { timestamp: { $gte: dateLimit } } } }
      );
  
      const metricData = records
        .map((record) =>
          record.healthData.map((data) => ({
            timestamp: data.timestamp,
            value: data[metric as keyof typeof data],
          }))
        )
        .flat()
        .filter((data) => data.value !== undefined);
  
      return sendSuccessResponse(res, metricData, `Last ${days} days of ${metric} data`, 200);
    } catch (error) {
      return sendErrorResponse(res, "Failed to retrieve health data", [], 500);
    }
  };

export const healthControllers ={
    updateHealthData,
    getHealthHistory
}