const userRouter = require('./auth-router')
const homeRouter = require('./home-router')
const searchRouter = require('./seatch-router')

function register(app) {
  app.use('/auth', userRouter)
  app.use('/home', homeRouter)
  app.use('/search', searchRouter)
}

module.exports = { register }
