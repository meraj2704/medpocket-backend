import mongoose from "mongoose";
import { ReportBodyDataI, ReportI } from "./reports.interface";
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

// const getReportsByUserId = async(user_id: mongoose.Types.ObjectId)=> {
//     const reports = await Report.find({user_id: user_id});
//     return reports;
// }

export const ReportService = {
  createNewReport,
  allReportsInFolder,
  // getReportsByUserId,
};
