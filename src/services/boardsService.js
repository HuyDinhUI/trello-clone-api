import { Board } from "../modules/boards.js"
import { slugtify } from "../utils/formatter.js"


const getAllBoardByUser = async (UserId) => {
    try {
        return await Board.find(
            {
                $or: [
                    { ownerIds: UserId },
                    { memberIds: UserId }
                ]
            }
        )
            .populate("ownerIds", "username email")
            .populate("memberIds", "username email")
            .populate({
                path: "columns",
                populate: { path: "cards" }
            })
    } catch (error) { throw error }
}

const getOneBoard = async (UserId, BoardId) => {
    try {
        return await Board.findOne(
            {
                _id: BoardId,
                $or: [
                    { ownerIds: UserId },
                    { memberIds: UserId },
                    { visibility: "public" }
                ]
            }
        )
            .populate("ownerIds", "username email")
            .populate("memberIds", "username email")
            .populate({
                path: "columns",
                populate: { path: "cards" }
            })
    } catch (error) { throw error }
}


const createNew = async (reqData, UserId) => {
    try {
        // const newBoard = {
        //     ...data,
        //     slug: slugtify(data.title)
        // }

        const data = {
            ...reqData,
            ownerIds: UserId
        }

        const model = new Board(data)
        const newData = await model.save()
        const newBoard = {
            newData,
            slug: slugtify(newData.title)
        }

        return newBoard

    } catch (error) { throw error }
}

export const boardServices = {
    createNew,
    getAllBoardByUser,
    getOneBoard
}