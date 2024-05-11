const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const studentRoutes = require('./routes/student')

const app = express()
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

app.use(express.json())
app.use(cors(
    {
        origin: [process.env.FRONT_END_URL]
    }
))

app.use('/api/student', studentRoutes)
app.use('*', (req, res) => {
    res.send('404 - Not Found!')
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
    
