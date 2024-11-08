import express from "express";
import { homeController } from "./home.controllers";
const homeRouter = express.Router();

homeRouter.get('/dashboard/:user_id', homeController.getLatestUserData);

export default homeRouter;