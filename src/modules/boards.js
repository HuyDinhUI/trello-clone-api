import mongoose, { Schema } from "mongoose";

const boardsSchema = new mongoose.Schema({
    title: { type: String, require: true },
    cover: { type: String, require: true },
    visibility: { type: String, enum: ['workspace', 'private', 'public'], default: 'workspace' },
    ownerIds: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    columns: [{ type: Schema.Types.ObjectId, ref: 'Columns' }],
    columnsOrder: [{ type: Schema.Types.ObjectId, ref: 'Columns' }],
    _destroy: { type: Boolean, default: false }
}, { timestamps: true })

export const Board = mongoose.model('Boards', boardsSchema)