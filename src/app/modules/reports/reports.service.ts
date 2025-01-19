import mongoose from "mongoose";
import { ReportBodyDataI, ReportI, UpdateReportI } from "./reports.interface";
import { ReportModel } from "./report.models";

const createNewReport = async (data: ReportBodyDataI) => {
  const report = await ReportModel.create(data);
  return report;
};

const allReportsInFolder = async (
  folderId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId
) => {
  const reports = await ReportModel.find({
    folderId,
    userId,
  });
  return reports;
};

const existReport = async (id: string) => {
  const report = await ReportModel.findById(id);
  return report;
};

const updateReport = async (id: string, data: UpdateReportI) => {
  const report = await ReportModel.findByIdAndUpdate(id, data, { new: true });
  return report;
};

const deleteReport = async (id: string) => {
  const report = await ReportModel.findByIdAndDelete(id);
  return report;
};

// const getReportsByUserId = async(user_id: mongoose.Types.ObjectId)=> {
//     const reports = await Report.find({user_id: user_id});
//     return reports;
// }

export const ReportService = {
  createNewReport,
  allReportsInFolder,
  updateReport,
  existReport,
  deleteReport,
  // getReportsByUserId,
};
