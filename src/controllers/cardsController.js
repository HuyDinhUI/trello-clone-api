import {StatusCodes} from 'http-status-codes'
import { cardServices } from '../services/cardsService.js'

const createNew = async (req, res, next) => {
    try{

        const createCard = await cardServices.createNew(req.body)

        res.status(StatusCodes.CREATED).json(createCard)
    }
    catch (error){
        next(error)
    }
}

const updateOrderAndPosition = async (req, res, next) => {
    try{
        const {boardId, columns} = req.body

        await cardServices.updateOrderAndPosition(boardId, columns)
    }
    catch (error){
        next(error)
    }
}

export const cardControllers = {
    createNew,
    updateOrderAndPosition
}