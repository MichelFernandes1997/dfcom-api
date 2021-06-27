import { Router } from "express"

import ProductController from "../controllers/Product/ProductController"

const ProductRoute = Router()

ProductRoute.get('/products', ProductController.index)

ProductRoute.post('/products', ProductController.upsert)

ProductRoute.put('/products', ProductController.upsert)

ProductRoute.delete('/products/:id', ProductController.delete)

export default ProductRoute