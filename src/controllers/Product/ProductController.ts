import { Request, Response } from 'express'

import Products from '../../models/Products'

const ProductController = {
    async index (req: Request, res: Response) {
        try {
            const products = await Products.find()

            return res.json(products)
        } catch (err) {
            return res.status(err.statusCode || 500).json({ message: err.message, code: err.code })
        }
    },
    async upsert (req: Request, res: Response) {
        try {
            const { id, authUser, ...params } = req.body
            
            const productInDb = await Products.findOne({ _id: id }) as any
            
            Object.keys(params).map(key => {
                productInDb[key] = params[key]
            })

            if (!id) {
                return res.status(400).json({ message: "Property /id/ are required but not sent on this request!" })
            }

            await Products.updateOne(
                { _id: id } ,
                productInDb,
                {
                    upsert: true
                }
            )

            const createdProduct = await Products.findOne({ _id: id })

            return res.json(createdProduct)
        } catch (err) {
            return res.status(err.statusCode || 500).json({ message: err.message, code: err.code })
        }
    },
    async delete (req: Request, res: Response) {
        try {
            const { id: _id } = req.params

            const deletedProduct = await Products.deleteOne({ _id })

            if (deletedProduct.deletedCount === 0) {
                return res.json({ message: "No product was deleted as there was no match with the sent /id/" })
            }

            return res.json(deletedProduct)
        } catch (err) {
            return res.status(err.statusCode || 500).json({ message: err.message, code: err.code })
        }
    }
}

export default ProductController