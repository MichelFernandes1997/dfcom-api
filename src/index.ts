import express from 'express'

import routes from './routes'

import process from 'process'

import cors from 'cors'

import './setup/database'

import authMiddleware from './middleware/auth'

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()

app.use(cors())

app.use(express.json())

app.use(authMiddleware)

app.use('/api/v1', routes)

app.listen(process.env.SERVER_PORT)