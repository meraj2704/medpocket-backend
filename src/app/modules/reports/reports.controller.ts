import { Request, Response } from "express";
import { ReportService } from "./reports.service";
import mongoose from "mongoose";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";

const uploadReport = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const image_url = req.file ? req.file.path : undefined;
  const newUserId = new mongoose.Types.ObjectId(user_id);
  try {
    const report = await ReportService.saveReport(newUserId, image_url);
    if (!report) {
      return sendErrorResponse(res, "Failed to upload report", [], 500);
    }
    console.log('reports', report)
    return sendSuccessResponse(
      res,
      report,
      "Successfully uploaded report",
      201
    );
  } catch (error) {
    console.error(error);
    console.log(error);
    return sendErrorResponse(res, "Failed to upload report", [], 500);
  }
};

const getReportsByUserId = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const newUserId = new mongoose.Types.ObjectId(user_id);
    try {
      const reports = await ReportService.getReportsByUserId(newUserId);
      if (!reports) {
        return sendErrorResponse(res, "Failed to fetch reports", [], 500);
      }
      return sendSuccessResponse(res, reports, "Reports retrieved", 200);
    } catch (error) {
      console.error(error);
      return sendErrorResponse(res, "Failed to fetch reports", [], 500);
    }
  
}


export const reportControllers = {
    uploadReport,
    getReportsByUserId,
}