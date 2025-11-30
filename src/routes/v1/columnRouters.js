import express from "express"
import {columnControllers} from '../../controllers/columnsController.js'
import { authMiddleware } from "../../middlewares/authMiddleware.js"

const Router = express.Router()

Router.use(authMiddleware.isAuthozied)

Router.post('/',columnControllers.createNew)

Router.put('/',columnControllers.updateLabel)

Router.delete('/:id',columnControllers.deleteColumn)

export const columnsRouter = Router