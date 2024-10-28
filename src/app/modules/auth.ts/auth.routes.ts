// auth.route.ts
import express from "express";
import validate from "../../middlewares/validate";
import { authSchema } from "./auth.schema";

import multer from "multer";
import { AuthController } from "./auth.controllers";

const router = express.Router();
const upload = multer();

// Define the signup route with validation middleware
router.post(
  "/signup",
  // upload.none(),
  validate(authSchema.create),
  AuthController.signup
);

router.post(
  "/login",
  // upload.none(),
  validate(authSchema.login),
  AuthController.login
);

router.post(
  "/request-password-reset",
  // upload.none(),
  validate(authSchema.request),
  AuthController.requestPasswordReset
);
router.post(
  "/reset-password",
  // upload.none(),
  validate(authSchema.reset),
  AuthController.resetPassword
);

export const authRouter = router;
