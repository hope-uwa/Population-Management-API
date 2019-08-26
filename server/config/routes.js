import express from 'express'
import { locationRoutes } from '../modules/location/location.routes'
const Router = express.Router()

Router.use('/api/v1', locationRoutes)

export { Router }
