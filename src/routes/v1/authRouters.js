import express from "express";
import { userValidation } from "../../validations/userValidation.js";
import { authController } from "../../controllers/authController.js";
import {LoginMonitor} from "../../middlewares/loginMonitor.js";
const Router = express.Router();

Router.route("/register").post(userValidation.SignUp,authController.signup)

// API login
Router.route("/login").post(userValidation.Login,LoginMonitor.createLoginMonitor({mlUrl:'http://localhost:5325/'}),authController.login);

// API logout
Router.route("/logout").delete(authController.logout);

//API Resfresh Token
Router.route("/refresh_token").put(authController.refreshToken);

export const authRoute = Router;