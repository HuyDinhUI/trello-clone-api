import express from "express";
import { userValidation } from "../../validations/userValidation.js";
import { authController } from "../../controllers/authController.js";
const Router = express.Router();

Router.route("/signup").post(userValidation.SignUp,authController.signup)

// API login
Router.route("/login").post(userValidation.Login,authController.login);

// API logout
Router.route("/logout").delete(authController.logout);

//API Resfresh Token
Router.route("/resfresh_token").put(authController.refreshToken);

export const authRoute = Router;