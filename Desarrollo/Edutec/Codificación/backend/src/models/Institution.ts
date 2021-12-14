import { model, Schema, Document } from 'mongoose'

export interface IInstitution extends Document {
    _id: string,
    name: string,
    description: string,
    url: string,
    score: number,
    votes: number
}

const Institution = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: false //init 0
    },
    votes: {
        type: Number,
        required: false //init 0
    }
}, { timestamps: true });

export default model<IInstitution>('Institution', Institution);