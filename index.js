import debug from 'debug'
require('dotenv').load()
const log = debug('app')

let applicationEnvVars = [ 'APP_ENVIROMENT', 'PORT', 'USE_MONGODB', 'MONGO_HOSTNAME', 'MONGO_PORT', 'MONGO_DATABASE' ]

let unusedEnvVars = applicationEnvVars.filter((i) => !process.env[i])

if (unusedEnvVars.length) {
  log('Required ENV variables are not set: [' + unusedEnvVars.join(', ') + ']')
  process.exit(1)
}

const { app } = require('./server/app.js')
app.listen(process.env.PORT)

export default app
