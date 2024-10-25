// auth.route.ts
import express from "express";
import validate from "../../middlewares/validate";
import { authSchema } from "./auth.schema";
import { SignUpController } from "./auth.controllers";
import multer from "multer";

const router = express.Router();
const upload = multer();

// Define the signup route with validation middleware
router.post(
  "/signup",
  upload.none(),
  validate(authSchema.create),
  SignUpController.signup
);

export const authRouter = router;
