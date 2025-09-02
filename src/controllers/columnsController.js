import {StatusCodes} from 'http-status-codes'
import { columnServices } from '../services/columnsService.js'

const createNew = async (req, res, next) => {
    try{

        const createColumn = await columnServices.createNew(req.body)

        res.status(StatusCodes.CREATED).json(createColumn)
    }
    catch (error){
        next(error)
    }
}

export const columnControllers = {
    createNew
}