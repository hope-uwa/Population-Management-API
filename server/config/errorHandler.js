import { httpStatus } from '../utils/httpStatus'
import debug from 'debug'

const log = debug('app')

const errorHandler = (err, req, res, next) => {
  log(err.toString())

  if (err.name === 'AppError') return res.status(err.status).json({ error: err.message, stack: process.env.APP_ENVIROMENT === 'dev' ? err.stack : undefined })

  if (err.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).json({ error: err.message })

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: process.env.APP_ENVIROMENT === 'dev' ? err.message : 'Oops !! Something went wrong' })
}

export { errorHandler }
