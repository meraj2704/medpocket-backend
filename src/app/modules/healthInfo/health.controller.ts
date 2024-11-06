// controllers/health.controllers.ts
import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { findUserById } from "../../utils/findUser";
import mongoose from "mongoose";
import { HealthServices } from "./health.service";
import { BodyMeasurement } from "./health.models";

const updateHealthData = async (req: Request, res: Response) => {
  const { user_id, glucose, oxygen, pressure } = req.body;

  try {
    const current_date = new Date();
    const data = {
      user_id,
      glucose,
      oxygen,
      pressure,
    };
    console.log(data);
    const user = await findUserById(user_id);
    if (!user) return sendErrorResponse(res, "user not found", [], 404);
    console.log("user ", user);

    return sendSuccessResponse(
      res,
      null,
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
    // Calculate the date limit based on the specified number of days
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - parseInt(days as string, 10));

    return sendSuccessResponse(
      res,
      null,
      `Last ${days} days of ${metric} data`,
      200
    );
  } catch (error) {
    console.error("Error fetching health history: ", error);
    return sendErrorResponse(res, "Failed to retrieve health data", [], 500);
  }
};

const getLatestHealthData = async (req: Request, res: Response) => {
  const user_id = req.query.user_id as string;

  try {
    return sendSuccessResponse(
      res,
      null,
      "Latest health data retrieved successfully",
      200
    );
  } catch (error) {
    console.log("Error fetching latest health data: ", error);
    return sendErrorResponse(
      res,
      "Failed to retrieve latest health data",
      [],
      500
    );
  }
};

const CreateBodyMeasurements = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const objectUserId = new mongoose.Types.ObjectId(user_id);
  const { height, weight } = req.body;
  try {
    const bodyMeasurement = await HealthServices.CreateBodyMeasurements(
      objectUserId,
      height,
      weight
    );
    const data = {
      _id: bodyMeasurement._id,
      user_id: bodyMeasurement.user_id,
      height: bodyMeasurement.height,
      weight: bodyMeasurement.weight,
      bmi: bodyMeasurement.bmi,
      date: bodyMeasurement.date,
    };
    if (!bodyMeasurement) {
      return sendErrorResponse(
        res,
        "Failed to create body measurement",
        [],
        500
      );
    }
    return sendSuccessResponse(res, data, "Body measurement created", 201);
  } catch (err) {
    console.log("Error fetching latest health data: ", err);
    return sendErrorResponse(
      res,
      "Failed to retrieve latest health data",
      [],
      500
    );
  }
};

const getSingleMeasurements = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const id = new mongoose.Types.ObjectId(_id);
  try {
    const bodyMeasurement = await HealthServices.singleMeasurement(id);
    if (!bodyMeasurement) {
      return sendErrorResponse(
        res,
        "Failed to fetch body measurement",
        [],
        500
      );
    }
    return sendSuccessResponse(
      res,
      bodyMeasurement,
      "Body measurement retrieved",
      200
    );
  } catch (err) {
    console.log("Error fetching single body measurement: ", err);
    return sendErrorResponse(
      res,
      "Failed to retrieve body measurement",
      [],
      500
    );
  }
};

const getMeasurementsByDays = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const days = parseInt(req.query.days as string);

  // Validate 'days' to ensure it's a valid number
  if (isNaN(days) || days < 0) {
    return res.status(400).json({ message: 'Invalid number of days provided' });
  }

  const objectUserId = new mongoose.Types.ObjectId(user_id);

  try {
    const bodyMeasurements = await HealthServices.measurementsByDays(
      objectUserId,
      days
    );
    return sendSuccessResponse(
      res,
      bodyMeasurements,
      `Last ${days} days of body measurements`,
      200
    );
  } catch (err) {
    console.error('Error fetching measurements by days: ', err);
    return sendErrorResponse(
      res,
      'Failed to retrieve body measurements',
      [],
      500
    );
  }
};

const getAllUserMeasurements = async (req: Request, res: Response) => {
  try {
    const bodyMeasurements = await HealthServices.allUserMeasurements();
    return sendSuccessResponse(
      res,
      bodyMeasurements,
      "Body measurements retrieved",
      200
    );
  } catch (err) {
    console.log("Error fetching all user body measurements: ", err);
    return sendErrorResponse(
      res,
      "Failed to retrieve body measurements",
      [],
      500
    );
  }
};

export const healthControllers = {
  updateHealthData,
  getHealthHistory,
  getLatestHealthData,
  CreateBodyMeasurements,
  getSingleMeasurements,
  getAllUserMeasurements,
  getMeasurementsByDays
};
