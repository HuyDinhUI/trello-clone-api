import mongoose, { Schema } from "mongoose";

const columnsSchema = new mongoose.Schema({
    title: { type: String, require: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'Boards', require: true },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Cards' }],
    _destroy: { type: Boolean, default: false }
}, { timestamps: true })

export const Column = mongoose.model('Columns', columnsSchema)