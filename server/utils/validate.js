import Joi from 'joi'
import { httpStatus } from './httpStatus'

export const validate = (schemaname) => {
  return function (req, res, next) {
    const isValid = Joi.validate(req.body, schemaname, { abortEarly: false })

    if (isValid.error === null) return next()
    const message = isValid.error.details.map(show => show.message)
    return res.status(httpStatus.BAD_REQUEST).json({ success: false, message })
  }
}
