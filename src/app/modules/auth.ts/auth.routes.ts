// auth.route.ts
import express from 'express';
import validate from '../../middlewares/validate';
import { authSchema } from './auth.schema';
import { SignUpController } from './auth.controllers';

const router = express.Router();

// Define the signup route with validation middleware
router.post('/signup', validate(authSchema.create), SignUpController.signup);

export const authRouter=router;
