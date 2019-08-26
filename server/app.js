import express from 'express'
import { Router } from './config/routes'
import { connectMongo } from './config/mongoconnect'
import { errorHandler } from './config/errorHandler'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(Router)

// Handle 404
app.use(function (req, res, next) {
  res.status(404).json({ message: 'This route does not exist' })
})

connectMongo()

app.use(errorHandler)

export { app }
