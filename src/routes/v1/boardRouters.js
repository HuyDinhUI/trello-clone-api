import express from "express"

import {boardControllers} from '../../controllers/boardsController.js'
import { authMiddleware } from "../../middlewares/authMiddleware.js"

const Router = express.Router()

Router.get('/',authMiddleware.isAuthozied,boardControllers.getAllBoard)

Router.get('/:id', authMiddleware.isAuthozied,boardControllers.getOneBoard)

Router.post('/',authMiddleware.isAuthozied,boardControllers.createNew)

export const boardsRouter = Router