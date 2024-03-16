const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require("./routes/auth")
const studentRoutes = require("./routes/student")
const isAuth = require('./middleware')

const app = express()
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use(isAuth)
app.use('/api/student', studentRoutes)

mongoose.connect(DB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT:${ PORT }`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
    