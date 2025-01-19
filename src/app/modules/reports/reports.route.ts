import express from "express";
import upload from "../../config/multer.config";
import { reportControllers } from "./reports.controller";
import validate from "../../middlewares/validate";
import { ReportSchema } from "./reports.schema";
const reportRouter = express.Router();

reportRouter.post(
  "/upload",
  upload.array("images", 10),
  validate(ReportSchema.reportSchema),
  reportControllers.uploadReport
);

reportRouter.get("/all-reports/:id", reportControllers.getAllReportsInFolder);

reportRouter.put(
  "/update-report/:id",
  upload.array("images", 10),
  reportControllers.updateReport
);
// reportRouter.get("/reports/:id", reportControllers.getReportsByUserId);

export default reportRouter;
