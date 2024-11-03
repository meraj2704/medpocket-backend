import express from "express";
import upload from "../../config/multer.config";
import validate from "../../middlewares/validate";
import { userSchema } from "./user.schema";
import { UserControllers } from "./user.controllers";
const router = express.Router();

router.post(
  "/profile-setup/:user_id",
  upload.single("file"),
  validate(userSchema.setup),
  UserControllers.userProfileSetup
);

router.get("/profile/:user_id", UserControllers.getProfile);
router.post("/profile-edit/:user_id",upload.single("file"), UserControllers.useProfileEdit);

export const userRouter = router;
