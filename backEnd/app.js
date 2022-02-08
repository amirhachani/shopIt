const express = require('express')
const errorMiddleware = require('./middlewares/errors')
const app = express()

app.use(express.json())

//import all routes
const products = require('./routes/product')
const auth = require('./routes/auth')

app.use('/api/v1', products)
app.use('/api/v1', auth)

// MiddleWare to handle errors
app.use(errorMiddleware);

module.exports = app