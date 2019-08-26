import Joi from 'joi'

export const newLocation = Joi.object().keys({
  name: Joi.string().min(3).required(),
  male: Joi.number().integer().required(),
  female: Joi.number().integer().required(),
  region: Joi.string().required()
})

export const updateLocation = Joi.object().keys({
  male: Joi.number().integer(),
  female: Joi.number().integer()
})
