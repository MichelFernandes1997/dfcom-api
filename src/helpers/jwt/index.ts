import process from 'process'

import jwt from 'jsonwebtoken'

import crypto from 'crypto'

interface IJwtHelper {
    sign(payload: string, algorithm?: string, options?: {}): Promise<{ token: string }>,
    verify(token: string | undefined): Promise<{ user: string, iat: number, exp: number } | boolean>
}

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const secret = process.env.SECRET || 'aljfjklsdhbgoçashf97973737939ru'

const defaultOptions = {
    expiresIn: 86400
}

const sign = async (payload: string, options = defaultOptions) => {
    const token = jwt.sign(
        { user: payload },
        secret,
        options
    )

    return { token }
}

const verify = async (token: string | undefined) => {
    if (!token) return false

    return jwt.verify(token, secret)
}

export default { sign, verify } as IJwtHelper