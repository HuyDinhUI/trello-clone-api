import express from "express"

import {cardControllers} from '../../controllers/cardsController.js'
import { authMiddleware } from "../../middlewares/authMiddleware.js"

const Router = express.Router()

Router.post('/',cardControllers.createNew)

Router.put('/updateOrderAndPosition',authMiddleware.isAuthozied, cardControllers.updateOrderAndPosition)

export const cardsRouter = Router