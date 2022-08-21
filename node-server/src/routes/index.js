const userRouter = require('./auth-router')
const homeRouter = require('./home-router')

function register(app) {
  app.use('/home', homeRouter)
  app.use('/auth', userRouter)
}

module.exports = { register }
