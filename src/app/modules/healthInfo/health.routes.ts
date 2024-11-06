// routes/health.routes.ts
import express from "express";
import upload from "../../config/multer.config";
import { healthControllers } from "./health.controller";
import validate from "../../middlewares/validate";
import { healthSchema } from "./health.schema";

const healthRouter = express.Router();

healthRouter.post(
  "/add-measurement/:user_id",
  upload.none(),
  validate(healthSchema.addMeasurements),
  healthControllers.CreateBodyMeasurements
);
healthRouter.get(
  "/single-measurement/:_id",
  healthControllers.getSingleMeasurements
);
healthRouter.get(
  "/all-user-measurements",
  healthControllers.getAllUserMeasurements
);
healthRouter.get(
  "/measurements-by-days/:user_id",
  healthControllers.getMeasurementsByDays
);

healthRouter.post(
  "/add-glucose/:user_id",
  upload.none(),
  validate(healthSchema.addGlucose),
  healthControllers.createGlucose
);

export { healthRouter };
