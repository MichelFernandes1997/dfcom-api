import mongoose, { Schema } from 'mongoose'

import IProducts from '../interface/IProducts'

const productsSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: Number,
        sku: {
            type: String,
            required: true,
            unique: true
        },
        image: String,
        usersWithFavorities: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IProducts>('Products', productsSchema)