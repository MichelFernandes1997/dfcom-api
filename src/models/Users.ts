import mongoose, { Schema } from 'mongoose'

import crypto from 'crypto'

import IUsers from '../interface/IUsers'

const usersSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            select: false,
            set: (value: string) =>
                crypto.createHash('md5').update(value).digest('hex')
        },
        favoritiesProducts: [{ type: Schema.Types.ObjectId, ref: 'Products' }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IUsers>('Users', usersSchema)