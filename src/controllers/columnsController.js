import {StatusCodes} from 'http-status-codes'
import { columnServices } from '../services/columnsService.js'

const createNew = async (req, res, next) => {
    try{

        const createColumn = await columnServices.createNew(req.body)

        res.status(StatusCodes.CREATED).json(createColumn)
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
}

const updateLabel = async (req, res, next) => {
    try{
        const update = await columnServices.updateLabel(req.body.title, req.body.boardId)

        res.status(StatusCodes.OK).json(update)
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
}

export const columnControllers = {
    createNew,
    updateLabel
}