const userRouter = require('./auth-router')

function register(app) {
  app.use('/auth', userRouter)
}

module.exports = { register }
