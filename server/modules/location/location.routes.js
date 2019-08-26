import express from 'express'
import { asyncWrapper } from '../../utils/asyncWrapper'
import { validate } from '../../utils/validate'
import { newLocation, updateLocation } from './location.validations'
import LocationController from './location.controller'

const locationRoutes = express.Router()

locationRoutes.get('/location/:locationId', asyncWrapper(LocationController.getALocation))
locationRoutes.post('/location', validate(newLocation), asyncWrapper(LocationController.createLocation))
locationRoutes.put('/location/:locationId', validate(updateLocation), asyncWrapper(LocationController.updateLocation))
locationRoutes.delete('/location/:locationId', asyncWrapper(LocationController.deleteLocation))
// locationRoutes.get('/location/:locationId/tree', asyncWrapper(LocationController.index))

export { locationRoutes }
