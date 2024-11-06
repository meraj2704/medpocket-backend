// routes/health.routes.ts
import express from "express";
import upload from "../../config/multer.config";
import { healthControllers } from "./health.controller";

const healthRouter = express.Router();

healthRouter.post("/update", upload.none(), healthControllers.updateHealthData);
healthRouter.get("/history", upload.none(), healthControllers.getHealthHistory);
healthRouter.get(
  "/latest",
  upload.none(),
  healthControllers.getLatestHealthData
);

healthRouter.post(
  "/add-measurement/:user_id",
  upload.none(),
  healthControllers.CreateBodyMeasurements
);
healthRouter.get('/single-measurement/:_id',healthControllers.getSingleMeasurements);
healthRouter.get('/all-user-measurements', healthControllers.getAllUserMeasurements);

export { healthRouter };
