import express from "express";
import upload from "../../config/multer.config";
import { reportControllers } from "./reports.controller";
const reportRouter = express.Router();


reportRouter.post('/upload/:user_id', upload.single('file'),reportControllers.uploadReport);
reportRouter.get('/reports/:user_id', reportControllers.getReportsByUserId);

export default reportRouter;