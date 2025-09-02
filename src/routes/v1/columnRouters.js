import express from "express"

import {columnControllers} from '../../controllers/columnsController.js'

const Router = express.Router()

Router.post('/',columnControllers.createNew)

export const columnsRouter = Router