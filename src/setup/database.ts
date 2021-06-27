import mongoose from 'mongoose'

import process from 'process'

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

mongoose.connect(
    `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
    /*'mongodb+srv://dfcom-teste:dfcom-teste@projects.zo2kw.mongodb.net/dfcom-teste?retryWrites=true&w=majority'*/,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

mongoose.connection.on('error', () => console.error('Connection error:'))

mongoose.connection.once('open', () => console.log('Database connected!'))

export default mongoose