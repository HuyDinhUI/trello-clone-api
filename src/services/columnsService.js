
import { Board } from "../modules/boards.js"
import { Column } from "../modules/columns.js"



const createNew = async (data) => {
    try {

        const model = new Column(data)
        const column = await model.save()
        await Board.findByIdAndUpdate(
            data.boardId,
            {
                $push:
                {
                    columns: column._id,
                    columnsOrder: column._id
                }
            },
            { new: true }
        ).populate("columnsOrder")

        const dataRes = {
            column
        }

        return dataRes

    } catch (error) { throw error }
}

const updateLabel = async (title, boardId) => {
    try {
        const update = await Column.findByIdAndUpdate(
            boardId,
            { $set: { title } },
            { new: true }
        )

        return update
    }
    catch (error) { throw error }
}

export const columnServices = {
    createNew,
    updateLabel
}