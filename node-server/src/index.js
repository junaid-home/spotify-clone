require('dotenv').config()
const cors = require('cors')
const express = require('express')
const cookieSession = require('cookie-session')

const logger = require('./utils/console')
const routes = require('./routes')

const $PORT = process.env.PORT || 8080
const $SESSION_KEY = process.env.SESSION_KEY || 'abc123'
const $ENVIRONMENT = process.env.NODE_ENV || 'development'
const $CORS_ORIGIN = process.env.CORS_ORIGIN || 'localhost:3000'

const sessionMiddleware = cookieSession({
  secure: $ENVIRONMENT === 'production',
  httpOnly: true,
  secret: $SESSION_KEY,
})

const corsMiddleware = cors({
  credentials: true,
  allowedHeaders: true,
  origin: $CORS_ORIGIN,
  methods: ['POST', 'PUT', 'GET', 'PATCH', 'DELETE'],
})

const app = express()

app.use(express.json())
app.use(sessionMiddleware)
app.use(corsMiddleware)

routes.register(app)

app.listen(
  $PORT,
  logger.log('listening on', { linkText: `localhost:${$PORT}` })
)
