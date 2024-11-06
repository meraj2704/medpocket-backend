// controllers/health.controllers.ts
import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { findUserById } from "../../utils/findUser";
import mongoose from "mongoose";
import { HealthServices } from "./health.service";

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
    return res.status(400).json({ message: "Invalid number of days provided" });
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
    console.error("Error fetching measurements by days: ", err);
    return sendErrorResponse(
      res,
      "Failed to retrieve body measurements",
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

const createGlucose = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const objectUserId = new mongoose.Types.ObjectId(user_id);
  const { glucose } = req.body;

  console.log("user_id ", user_id);
  console.log("glucose ", glucose);
  try {
    const glucoseMeasurement = await HealthServices.createGlucose(
      objectUserId,
      glucose
    );
    const data = {
      _id: glucoseMeasurement._id,
      user_id: glucoseMeasurement.user_id,
      glucose: glucoseMeasurement.glucose,
      date: glucoseMeasurement.date,
    };
    if (!glucoseMeasurement) {
      return sendErrorResponse(
        res,
        "Failed to create glucose measurement",
        [],
        500
      );
    }
    return sendSuccessResponse(res, data, "Glucose measurement created", 201);
  } catch (err) {
    console.log("Error creating glucose measurement: ", err);
    return sendErrorResponse(
      res,
      "Failed to create glucose measurement",
      [],
      500
    );
  }
};

export const healthControllers = {
  CreateBodyMeasurements,
  getSingleMeasurements,
  getAllUserMeasurements,
  getMeasurementsByDays,
  createGlucose,
};
