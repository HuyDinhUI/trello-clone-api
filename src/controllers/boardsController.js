import {StatusCodes} from 'http-status-codes'
import { boardServices } from '../services/boardsService.js'


const getAllBoard = async (req, res, next) => {
    try{
        const UserId = req.jwtDecoded.id
        const boards = await boardServices.getAllBoardByUser(UserId)

        res.status(StatusCodes.OK).json(boards)
    }
    catch (error){
        next(error)
    }
}

const getOneBoard = async (req, res, next) => {
    try{
        const UserId = req.jwtDecoded.id
        const BoardId =req.params.id
        const board = await boardServices.getOneBoard(UserId, BoardId)

        res.status(StatusCodes.OK).json(board)
    }
    catch (error) {
        next(error)
    }
}

const createNew = async (req, res, next) => {
    try{

        const UserId =  req.jwtDecoded.id

        const createBoard = await boardServices.createNew(req.body,UserId)

        res.status(StatusCodes.CREATED).json(createBoard)
    }
    catch (error){
        next(error)
    }
}

export const boardControllers = {
    createNew,
    getAllBoard,
    getOneBoard
}