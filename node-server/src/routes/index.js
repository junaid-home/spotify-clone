const userRouter = require('./user-router')

function register(app) {
  app.use('/user', userRouter)
}

module.exports = { register }
