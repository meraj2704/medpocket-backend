import { Request, Response } from "express";
import { ReportService } from "./reports.service";
import mongoose from "mongoose";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { userService } from "../user/user.services";
import { FolderServices } from "../folder/folder.services";
import { UpdateReportI } from "./reports.interface";

const uploadReport = async (req: Request, res: Response) => {
  const imageUrls = req.file
    ? [req.file.path]
    : req.files
    ? Array.isArray(req.files)
      ? req.files.map((file) => file.path)
      : []
    : [];
  console.log("req file", req.file);
  console.log("image urls: ", imageUrls);
  const { userId, folderId, title, description, hospitalName } = req.body;
  const newUserId = new mongoose.Types.ObjectId(userId);
  const newFolderId = new mongoose.Types.ObjectId(folderId);
  const bodyData = {
    userId: newUserId,
    folderId: newFolderId,
    title,
    description,
    hospitalName,
    images: imageUrls,
  };
  try {
    const user = await userService.existUserWithId(newUserId);
    if (!user) {
      return sendErrorResponse(res, "User not found", [], 404);
    }
    const folder = await FolderServices.folderById(newFolderId);
    if (!folder) {
      return sendErrorResponse(res, "Folder not found", [], 404);
    }
    if (
      !new mongoose.Types.ObjectId(folder.user_id.toString()).equals(newUserId)
    ) {
      return sendErrorResponse(
        res,
        "This Folder is not for this user",
        [],
        404
      );
    }
    const newReport = await ReportService.createNewReport(bodyData);
    if (!newReport) {
      return sendErrorResponse(res, "Failed to create report", [], 500);
    }
    console.log("new report created");
    return sendSuccessResponse(
      res,
      newReport,
      "Report uploaded successfully",
      201
    );
  } catch (error) {
    console.error(error);
    console.log(error);
    return sendErrorResponse(res, "Failed to upload report", [], 500);
  }
};

const getAllReportsInFolder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId } = req.query;
  try {
    const folderId = new mongoose.Types.ObjectId(id);
    const newUserId = new mongoose.Types.ObjectId(userId as string);
    const user = await userService.existUserWithId(newUserId);
    if (!user) {
      return sendErrorResponse(res, "User not found", [], 404);
    }
    const folder = await FolderServices.folderById(folderId);
    if (!folder) {
      return sendErrorResponse(res, "Folder not found", [], 404);
    }
    const reports = await ReportService.allReportsInFolder(folderId, newUserId);
    if (!reports) {
      return sendErrorResponse(res, "No reports found in this folder", [], 404);
    }
    return sendSuccessResponse(
      res,
      reports,
      "Reports retrieved successfully",
      200
    );
  } catch (error) {
    console.error(error);
    console.log(error);
    return sendErrorResponse(res, "Failed to retrieve reports", [], 500);
  }
};

const updateReport = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, hospitalName } = req.body;
  const imageUrls = req.file
    ? [req.file.path]
    : req.files
    ? Array.isArray(req.files)
      ? req.files.map((file) => file.path)
      : []
    : [];
  try {
    const existReport = await ReportService.existReport(id);
    if (!existReport) {
      return sendErrorResponse(res, "Report not found", [], 404);
    }
    const newData: UpdateReportI = {};
    if (title) {
      newData.title = title;
    }
    if (description) {
      newData.description = description;
    }
    if (hospitalName) {
      newData.hospitalName = hospitalName;
    }
    if (imageUrls.length > 0) {
      newData.images = imageUrls;
    }

    console.log("title", title);

    console.log("new report data", newData);

    const updatedReport = await ReportService.updateReport(id, newData);
    if (!updatedReport) {
      return sendErrorResponse(res, "Failed to update report", [], 404);
    }
    return sendSuccessResponse(
      res,
      updatedReport,
      "Report updated successfully",
      200
    );
  } catch (error) {
    console.error(error);
    console.log(error);
    return sendErrorResponse(res, "Failed to update report", [], 500);
  }
};

export const reportControllers = {
  uploadReport,
  getAllReportsInFolder,
  updateReport,
};
