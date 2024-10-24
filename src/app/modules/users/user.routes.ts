import express from "express";
import { checked, getAllUsers, getSingleUser } from "./user.controller";
import { checkUserExist } from "../../middlewares/checkUserExist.middleware";
import { checkLoginData, checkSignUpData } from './user.middleware';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/user/:id', getSingleUser);

export const userRouter = router;
