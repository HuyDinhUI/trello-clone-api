import { Card } from "../modules/cards.js"
import { Column } from "../modules/columns.js"



const createNew = async (data) => {
    try{

        const model = new Card(data)
        const card = await model.save()
        await Column.findByIdAndUpdate(data.columnId,{$push: {cards: card._id}})
        const dataRes = {
            card
        }

    return dataRes

    } catch (error) { throw error}
}

export const cardServices = {
    createNew
}