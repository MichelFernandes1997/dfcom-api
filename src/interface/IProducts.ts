import { Document } from "mongoose"

export default interface IProducts extends Document {
    name: string,
    title: string,
    description: string,
    price: number,
    stock: Number,
    sku: string,
    image: string,
    usersWithFavorities: string
}