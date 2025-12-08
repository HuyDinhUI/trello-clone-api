import express from "express";
import { StatusCodes } from "http-status-codes";
import { authRoute } from "./authRouters.js";
import { accountRoute } from "./accountRouters.js";
import { OauthRouter } from "./OauthRouters.js";
import { boardsRouter } from "./boardRouters.js";
import { columnsRouter } from "./columnRouters.js";
import { cardsRouter } from "./cardRouters.js";
import { userRouter } from "./userRouters.js";

const Router = express.Router();

Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "APIs V1 are ready to use" });
});

Router.use("/authorization", authRoute);

Router.use("/account", accountRoute);

Router.use("/user", userRouter)

Router.use("/boards",boardsRouter)

Router.use("/column", columnsRouter)

Router.use("/card",cardsRouter)

Router.use("/auth", OauthRouter);

export const APIs_v1 = Router;
