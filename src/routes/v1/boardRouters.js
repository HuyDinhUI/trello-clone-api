import express from "express"

import {boardControllers} from '../../controllers/boardsController.js'
import { authMiddleware } from "../../middlewares/authMiddleware.js"

const Router = express.Router()

Router.use(authMiddleware.isAuthozied)

Router.get('/',boardControllers.getAllBoard)

Router.get('/search', boardControllers.search)

Router.get('/:id', boardControllers.getOneBoard)

Router.post('/',boardControllers.createNew)

Router.put('/reorderColumn/:id',boardControllers.updateReorder)

Router.put('/starred', boardControllers.starred)

Router.put('/visibility', boardControllers.updateVisibility)

Router.put('/cover',boardControllers.updateCover)

Router.put('/closed', boardControllers.updateStatusBoard)

export const boardsRouter = Router