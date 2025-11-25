import express from "express"

import {cardControllers} from '../../controllers/cardsController.js'
import { authMiddleware } from "../../middlewares/authMiddleware.js"

const Router = express.Router()

Router.use(authMiddleware.isAuthozied)

Router.get('/get/card/:id',cardControllers.getCard)

Router.post('/',cardControllers.createNew)

Router.put('/updateOrderAndPosition', cardControllers.updateOrderAndPosition)

Router.put('/update/content', cardControllers.upadateContent)

export const cardsRouter = Router