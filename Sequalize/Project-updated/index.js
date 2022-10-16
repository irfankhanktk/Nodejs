import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './src/models/index.js'
import * as routes from './src/routes/index.js'
dotenv.config()

db.sequelize
    .sync({alter: true})
    .then(async () => {
        await autoCreate()
    })
    .catch((error) => {
        console.error(error.message)
    })

const app = express() // initializes express

// create .env variable
const port = process.env.PORT || 3000

// using sequelize ORM to create tables

app.listen(port, () => {
    console.log('listening onn port ' + port)
})
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))
app.use(cors())

// image url
// http://localhost:3000/1646415882481.png
app.use(express.static('src/uploads/users'))

app.use('/', routes.router)

app.get('/', (_req, res) => {
    res.json('api is working')
})
