// routes/health.routes.ts
import express from "express";
import upload from "../../config/multer.config";
import { healthControllers } from "./health.controller";


const healthRouter = express.Router();

healthRouter.post("/update",upload.none(), healthControllers.updateHealthData);
healthRouter.get("/history", upload.none(), healthControllers.getHealthHistory);

export { healthRouter };
