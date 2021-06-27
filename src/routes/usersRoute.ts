import { Router } from "express"

import UserController from "../controllers/User/UserController"

const UserRoute = Router()

UserRoute.get('/users/login', UserController.login)

UserRoute.post('/users/register', UserController.createAccount)

UserRoute.get('/users/me', UserController.me)

export default UserRoute