
import { Board } from "../modules/boards.js"
import { Column } from "../modules/columns.js"



const createNew = async (data) => {
    try{

        const model = new Column(data)
        const column = await model.save()
        await Board.findByIdAndUpdate(data.boardId,{$push: {columns: column._id}})
        const dataRes = {
            column
        }

    return dataRes

    } catch (error) { throw error}
}

export const columnServices = {
    createNew
}