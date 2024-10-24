import { Router } from "express";
import { login, signUp } from "./auth.controllers";
import { checkLoginData, checkSignUpData } from "./auth.middlewares";
import { checkPrimeSync } from "crypto";

const router = Router();

router.post('/signup',checkSignUpData, signUp);
router.post('/login',checkLoginData, login)

export const authRouter = router;