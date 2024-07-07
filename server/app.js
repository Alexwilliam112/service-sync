'use strict'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const { createServer } = require('http')
const bodyParser = require('body-parser')
const initializeSocket = require('./services/socket')
const router = require('./routers/index')
const cors = require('cors')

const app = express()
const httpServer = createServer(app)

const corsOptions = {
    origin: 'http://localhost:8000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())

app.use(router)
initializeSocket(httpServer)

module.exports = httpServer
