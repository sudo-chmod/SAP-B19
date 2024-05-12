const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const studentRoutes = require('./routes/student')

const app = express()
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Server is Running!')
})

app.use('/api/student', studentRoutes)

app.use('*', (req, res) => {
    res.send('No Route Found!')
})

mongoose.connect(DB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT:${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
    
