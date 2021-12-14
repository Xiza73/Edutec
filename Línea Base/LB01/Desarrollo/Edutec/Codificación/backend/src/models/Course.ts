import { model, Schema, Document } from 'mongoose'
import { IInstitution } from './Institution';
import { ISchedule } from './Schedule';
const { ObjectId } = Schema.Types

export interface ICourse extends Document {
    _id: string,
    name: string,
    institution: IInstitution,
    description: string,
    price: number,
    currency: string,
    shedule: ISchedule[],
    score: number,
    votes: number
}

const Course = new Schema({
    name: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    institution: {
        type: ObjectId,
        ref: 'Institution',
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
    },
    schedule: [{
        type: ObjectId,
        ref: 'Schedule',
        required: true
    }],
    score: {
        type: Number,
        required: true //init 0
    },
    votes: {
        type: Number,
        required: true //init 0
    }
}, { timestamps: true });


export default model<ICourse>('Course', Course);