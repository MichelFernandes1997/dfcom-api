import { Router } from "express"

import ProductRoute from './productsRoute'

import UserRoute from "./usersRoute"

const routes = Router()

routes.get('/', (req, res) => {
    return res.send('Api are running!')
})

routes.use(ProductRoute, UserRoute)

export default routes