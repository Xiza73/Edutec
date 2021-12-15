import { model, Schema, Document } from 'mongoose'
import { ICourse } from './Course';
const { ObjectId } = Schema.Types

export interface IClient extends Document {
    _id: string,
    email: string,
    favorites: ICourse[],
}

const Client = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    favorites: [{
        type: ObjectId,
        ref: 'Course',
        required: false
    }]
}, { timestamps: true });


export default model<IClient>('Client', Client);