import { Request, Response, NextFunction } from 'express'

import jwt from '../../helpers/jwt'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { url, originalUrl, headers: { "user-agent": agent } } = req

        const authorization: any = req.headers?.authorization?.split(' ')

        if (!authorization && url.toUpperCase().includes('USERS/REGISTER')) {
            return next()
        }

        const [tokenType, token] = authorization
        
        const validToken = await jwt.verify(token)
        
        if (!validToken) return res.status(401).send({ message: "Unauthorized user" })

        if (
            (
                url.toUpperCase().includes('USERS/LOGIN') || 
                url.toUpperCase().includes('USERS/REGISTER')
            ) &&
            (
                agent?.toUpperCase().includes('POSTMAN') || 
                agent?.toUpperCase().includes('INSOMNIA')
            ) &&
            validToken
        ) return res.json({ message: 'User are authenticated' })

        if (
            (
                url.toUpperCase().includes('USERS/LOGIN') || 
                url.toUpperCase().includes('USERS/REGISTER')
            ) && 
            validToken
        ) return res.redirect(originalUrl)

        req.body.authUser = validToken

        next()
    } catch (err) {
        if (err.message.toUpperCase() === 'JWT MALFORMED') return res.status(401).send({ message: "An invalid token received" })

        return res.status(500).send({ message: err.message })
    }
}