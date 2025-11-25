import {StatusCodes} from 'http-status-codes'
import { cardServices } from '../services/cardsService.js'


const getCard = async (req, res) => {
    const UserId = req.jwtDecoded.id
    try {
        const card = await cardServices.getCard(req.params.id, UserId)

        res.status(StatusCodes.OK).json(card)
    } 
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

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

const upadateContent = async (req, res) => {
    const UserId = req.jwtDecoded.id
    try {
        await cardServices.upadateContent(req.body, UserId)

        res.status(StatusCodes.OK).json()
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

export const cardControllers = {
    getCard,
    createNew,
    updateOrderAndPosition,
    upadateContent
}