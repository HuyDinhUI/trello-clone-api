import mongoose, { Schema } from "mongoose";

const cardsSchema = new mongoose.Schema({
    label: { type: String, require: true },
    status: { type: Boolean, default: false },
    columnId: { type: Schema.Types.ObjectId,ref:'Columns', require: true },
    cover: { type: String },
    description: { type: String },
    attechments: [{ type: String }],
    checklist: [{
        label: { type: String, require: true },
        checked: { type: Boolean, default: false }
    }],
    joined: [{type: Schema.Types.ObjectId, ref: 'Users'}],
    _destroy: { type: Boolean, default: false }
}, { timestamps: true })

export const Card = mongoose.model('Cards', cardsSchema)