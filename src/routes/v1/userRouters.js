import express from "express"
import {authMiddleware} from "../../middlewares/authMiddleware.js"
import { userController } from "../../controllers/userController.js"

const Router = express.Router()

Router.use(authMiddleware.isAuthozied)

Router.get('/get/me', userController.getUser)

Router.put('/update/recentBoard/:boardId', userController.updateRecentBoards)

export const userRouter = Router