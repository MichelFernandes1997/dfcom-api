import { Request, Response } from 'express'

import Users from '../../models/Users'

import IUsers from '../../interface/IUsers'

import jwt from '../../helpers/jwt'

const UserController = {
    async login (req: Request, res: Response) {
        try {
            const [hashType, hash]: any = req.headers.authorization?.split(' ')

            if (hashType.toUpperCase() !== 'BASIC') {
                return res.status(500).send({ message: `Expect a /Basic auth/ and receive a /${hashType}/` })
            }

            const [email, password] = Buffer.from(hash, 'base64').toString().split(':')

            const logged = await Users.findOne({ email, password })
            
            if (!logged) {
                return res.status(401).send({ message: "User not found!" })
            }

            const { token } = await jwt.sign(logged._id.toString())

            return res.json({ user: logged, token })
        } catch (err) {
            return res.status(err.statusCode || 500).json({ message: err.message, code: err.code })
        }
    },
    async createAccount (req: Request, res: Response) {
        try {
            const { name, email, password: pass } = req.body

            const result = await Users.create(
                {
                    name,
                    email,
                    password: pass
                }
            ) as unknown as { _doc: IUsers }

            const { password, ...userCreated } = result._doc

            const { token } = await jwt.sign(userCreated._id.toString())
            
            return res.json({ userCreated, token })
        } catch (err) {
            return res.status(err.statusCode || 500).json({ message: err.message, code: err.code })
        }
    },
    async me (req: Request, res: Response) {
        try {
            const myUser = await Users.findById(req.body.authUser.user)

            return res.json(myUser)
        } catch (err) {
            return res.status(err.statusCode || 500).json({ message: err.message, code: err.code })
        }
    }
}

export default UserController