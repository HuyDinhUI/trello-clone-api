import express from "express"

import {cardControllers} from '../../controllers/cardsController.js'

const Router = express.Router()

Router.post('/',cardControllers.createNew)

export const cardsRouter = Router