import { Router } from "express";
import { loginController } from "./login/login.controller.js";
import { signupController } from "./signup/signup.controller.js";

export const authController = Router();

authController.use('/login', loginController);
authController.use('/signup', signupController);