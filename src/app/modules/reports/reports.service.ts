import mongoose from "mongoose";
import { Report } from "./report.models";

const saveReport = async(id:mongoose.Types.ObjectId, image:string|undefined)=> {
    const report = await Report.create({
        user_id: id,
        image_url: image,
    });
    return report;
}

const getReportsByUserId = async(user_id: mongoose.Types.ObjectId)=> {
    const reports = await Report.find({user_id: user_id});
    return reports;
}

export const ReportService ={
    saveReport,
    getReportsByUserId,
}