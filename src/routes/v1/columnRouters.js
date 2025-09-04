import express from "express"

import {columnControllers} from '../../controllers/columnsController.js'
import { authMiddleware } from "../../middlewares/authMiddleware.js"

const Router = express.Router()

Router.post('/',authMiddleware.isAuthozied,columnControllers.createNew)

Router.put('/',authMiddleware.isAuthozied,columnControllers.updateLabel)

export const columnsRouter = Router